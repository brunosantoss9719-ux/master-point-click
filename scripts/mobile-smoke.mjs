import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';

const APP_URL=process.env.APP_URL||'http://127.0.0.1:4173/';
const CHROME=process.env.CHROME_BIN||'/usr/bin/google-chrome';
const DEBUG='http://127.0.0.1:9222';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitForChrome(){
  for(let i=0;i<50;i++){
    try{
      const pages=await fetch(DEBUG+'/json').then(r=>r.json());
      if(pages.length)return pages[0];
    }catch{}
    await sleep(100);
  }
  throw new Error('Chrome headless não iniciou');
}

async function connect(url){
  const ws=new WebSocket(url);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  let id=0;
  const pending=new Map();
  ws.onmessage=event=>{
    const msg=JSON.parse(event.data);
    if(!msg.id)return;
    const task=pending.get(msg.id);if(!task)return;
    pending.delete(msg.id);
    if(msg.error)task.reject(new Error(msg.error.message));else task.resolve(msg.result);
  };
  const send=(method,params={})=>new Promise((resolve,reject)=>{
    const callId=++id;pending.set(callId,{resolve,reject});ws.send(JSON.stringify({id:callId,method,params}));
  });
  return {ws,send};
}

async function evaluate(send,expression){
  const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(result.exceptionDetails)throw new Error(result.exceptionDetails.text||'Falha em Runtime.evaluate');
  return result.result?.value;
}

async function capture(send,file){
  const shot=await send('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  await fs.writeFile(file,Buffer.from(shot.data,'base64'));
}

await fs.mkdir('artifacts',{recursive:true});
const chrome=spawn(CHROME,[
  '--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars',
  '--remote-debugging-port=9222','--user-data-dir=/tmp/master-chrome',
  '--window-size=915,412',APP_URL
],{stdio:'ignore'});

try{
  const page=await waitForChrome();
  const {ws,send}=await connect(page.webSocketDebuggerUrl);
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{
    width:915,height:412,deviceScaleFactor:1,mobile:true,
    screenWidth:915,screenHeight:412,
    screenOrientation:{type:'landscapePrimary',angle:90}
  });
  await send('Page.navigate',{url:APP_URL});
  await sleep(1200);

  const manifest=await evaluate(send,"fetch('manifest.webmanifest').then(r=>r.json())");
  if(manifest.display!=='fullscreen'||manifest.orientation!=='landscape')throw new Error('Manifesto não está fullscreen landscape');

  await evaluate(send,"document.querySelector('#new-game').click(); true");
  await sleep(650);
  const landscape=await evaluate(send,"(()=>({width:innerWidth,height:innerHeight,rotate:!!document.querySelector('#rotate'),game:getComputedStyle(document.querySelector('#game-screen')).display,appHeight:Math.round(document.querySelector('#app').getBoundingClientRect().height),dialogue:!document.querySelector('#dialogue').classList.contains('hidden'),audioButton:!!document.querySelector('#audio-btn')}))()");
  if(landscape.rotate||landscape.game==='none'||!landscape.dialogue||!landscape.audioButton)throw new Error('Fluxo landscape não entrou no jogo');
  if(Math.abs(landscape.appHeight-landscape.height)>2)throw new Error('Viewport cortado: app='+landscape.appHeight+', viewport='+landscape.height);
  await capture(send,'artifacts/mobile-landscape.png');

  await send('Emulation.setDeviceMetricsOverride',{
    width:412,height:915,deviceScaleFactor:1,mobile:true,
    screenWidth:412,screenHeight:915,
    screenOrientation:{type:'portraitPrimary',angle:0}
  });
  await sleep(350);
  const portrait=await evaluate(send,"(()=>({width:innerWidth,height:innerHeight,rotate:!!document.querySelector('#rotate'),appVisibility:getComputedStyle(document.querySelector('#app')).visibility,appHeight:Math.round(document.querySelector('#app').getBoundingClientRect().height)}))()");
  if(portrait.rotate||portrait.appVisibility==='hidden')throw new Error('Retrato ainda bloqueia o jogo');
  if(Math.abs(portrait.appHeight-portrait.height)>2)throw new Error('Viewport retrato cortado: app='+portrait.appHeight+', viewport='+portrait.height);
  await capture(send,'artifacts/mobile-portrait-fallback.png');

  const swReady=await evaluate(send,"navigator.serviceWorker?.ready.then(()=>true).catch(()=>false)");
  if(!swReady)throw new Error('Service worker não ficou pronto');

  console.log('PASS mobile smoke:',JSON.stringify({landscape,portrait,swReady}));
  ws.close();
}finally{
  chrome.kill('SIGTERM');
}
