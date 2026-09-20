import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';

const APP_URL=process.env.APP_URL||'http://127.0.0.1:4173/';
const CHROME=process.env.CHROME_BIN||'/usr/bin/google-chrome';
const DEBUG='http://127.0.0.1:9222';
let chromeStderr='';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitForChrome(){
  let lastError='';
  for(let i=0;i<180;i++){
    for(const endpoint of ['/json/list','/json']){
      try{
        const response=await fetch(DEBUG+endpoint);
        if(!response.ok){lastError='HTTP '+response.status;continue}
        const pages=await response.json();
        const page=pages.find(item=>item.type==='page'&&!String(item.url||'').startsWith('chrome-extension://'));
        if(page)return page;
      }catch(error){lastError=error?.message||String(error)}
    }
    await sleep(100);
  }
  throw new Error('Chrome headless não expôs CDP: '+lastError+'\n'+chromeStderr.slice(-4000));
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

async function tap(send,selector){
  const point=await evaluate(send,`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',clickCount:1});
}

async function waitForDom(send){
  for(let i=0;i<80;i++){
    const ready=await evaluate(send,"document.readyState==='complete' && !!document.querySelector('#new-game') && !!document.querySelector('#bonus-game')");
    if(ready)return;
    await sleep(100);
  }
  const state=await evaluate(send,"JSON.stringify({href:location.href,state:document.readyState,title:document.title,body:document.body?.innerText?.slice(0,300)})");
  throw new Error('App não carregou no Chrome: '+state);
}

await fs.mkdir('artifacts',{recursive:true});
const serverProbe=await fetch(APP_URL);
if(!serverProbe.ok)throw new Error('Servidor local indisponível: HTTP '+serverProbe.status);
const chrome=spawn(CHROME,[
  '--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--hide-scrollbars',
  '--disable-extensions','--disable-background-networking','--disable-component-update',
  '--no-first-run','--no-default-browser-check','--no-proxy-server',
  '--remote-debugging-address=127.0.0.1','--remote-debugging-port=9222',
  '--user-data-dir=/tmp/master-chrome-'+process.pid,
  '--window-size=915,412','about:blank'
],{stdio:['ignore','ignore','pipe']});
chrome.stderr.setEncoding('utf8');
chrome.stderr.on('data',chunk=>{chromeStderr+=chunk});
chrome.on('exit',(code,signal)=>{chromeStderr+='\nChrome exited code='+code+' signal='+signal});


try{
  const page=await waitForChrome();
  const {ws,send}=await connect(page.webSocketDebuggerUrl);
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{
    width:915,height:412,deviceScaleFactor:1,mobile:true,
    screenWidth:915,screenHeight:412,
    screenOrientation:{type:'landscapePrimary',angle:90}
  });
  const navigation=await send('Page.navigate',{url:APP_URL});
  if(navigation.errorText&&navigation.errorText!=='net::ERR_ABORTED')throw new Error('Falha de navegação: '+navigation.errorText);
  await waitForDom(send);
  const manifestLink=await evaluate(send,"document.querySelector('link[rel=manifest]')?.getAttribute('href')||''");
  if(manifestLink!=='manifest.webmanifest')throw new Error('Link do manifesto ausente');
  const manifest=await (await fetch(new URL('manifest.webmanifest',APP_URL))).json();
  const pngSizes=new Set((manifest.icons||[]).filter(icon=>icon.type==='image/png').map(icon=>icon.sizes));
  if(!pngSizes.has('192x192')||!pngSizes.has('512x512'))throw new Error('Manifesto sem ícones PNG instaláveis');

  await tap(send,'#new-game');
  await sleep(650);
  const landscape=await evaluate(send,"(()=>({width:innerWidth,height:innerHeight,rotate:!!document.querySelector('#rotate'),game:getComputedStyle(document.querySelector('#game-screen')).display,appHeight:Math.round(document.querySelector('#app').getBoundingClientRect().height),dialogue:!document.querySelector('#dialogue').classList.contains('hidden'),audioButton:!!document.querySelector('#audio-btn'),audio:audio.debug()}))()");
  if(landscape.rotate||landscape.game==='none'||!landscape.dialogue||!landscape.audioButton||!landscape.audio.supported||landscape.audio.state!=='running'||!landscape.audio.wakePlayed||landscape.audio.mediaPlays<1||landscape.audio.mediaFailures>0)throw new Error('Fluxo landscape/áudio real não entrou no jogo: '+JSON.stringify(landscape));
  if(Math.abs(landscape.appHeight-landscape.height)>2)throw new Error('Viewport cortado: app='+landscape.appHeight+', viewport='+landscape.height);

  let daniel=null;
  for(let i=0;i<12;i++){
    daniel=await evaluate(send,"(()=>{const el=document.querySelector('#character');const sprite=el?.querySelector('.sprite');return {person:el?.dataset.person||'',show:!!el?.classList.contains('show'),background:sprite?getComputedStyle(sprite).backgroundImage:''}})()");
    if(daniel.person==='daniel'&&daniel.show&&daniel.background.includes('daniel-vorcaro.webp'))break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");
    await sleep(180);
  }
  if(!daniel||daniel.person!=='daniel'||!daniel.show||!daniel.background.includes('daniel-vorcaro.webp'))throw new Error('Retrato novo do Daniel não apareceu: '+JSON.stringify(daniel));
  await capture(send,'artifacts/mobile-landscape.png');

  await evaluate(send,"enterScene(5); true");
  await sleep(300);
  let toffoli=null;
  for(let i=0;i<8;i++){
    toffoli=await evaluate(send,"(()=>{const el=document.querySelector('#character');const sprite=el?.querySelector('.sprite');return {person:el?.dataset.person||'',show:!!el?.classList.contains('show'),background:sprite?getComputedStyle(sprite).backgroundImage:'',scene:document.querySelector('#scene-bg')?.getAttribute('src')||''}})()");
    if(toffoli.person==='toffoli'&&toffoli.show&&toffoli.background.includes('toffoli.webp')&&toffoli.scene.includes('stf-office.webp'))break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");
    await sleep(160);
  }
  if(!toffoli||toffoli.person!=='toffoli'||!toffoli.show||!toffoli.background.includes('toffoli.webp')||!toffoli.scene.includes('stf-office.webp'))throw new Error('Arco Toffolinho não apareceu: '+JSON.stringify(toffoli));
  await capture(send,'artifacts/mobile-toffolinho.png');

  await evaluate(send,"enterScene(8); true");
  await sleep(300);
  let mendonca=null;
  for(let i=0;i<8;i++){
    mendonca=await evaluate(send,"(()=>{const el=document.querySelector('#character');const sprite=el?.querySelector('.sprite');return {person:el?.dataset.person||'',show:!!el?.classList.contains('show'),background:sprite?getComputedStyle(sprite).backgroundImage:'',scene:document.querySelector('#scene-bg')?.getAttribute('src')||''}})()");
    if(mendonca.person==='mendonca'&&mendonca.show&&mendonca.background.includes('andre-mendonca.webp')&&mendonca.scene.includes('stf-office.webp'))break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");await sleep(160);
  }
  if(!mendonca||mendonca.person!=='mendonca'||!mendonca.show||!mendonca.background.includes('andre-mendonca.webp'))throw new Error('Arco Mendonça não apareceu: '+JSON.stringify(mendonca));
  await capture(send,'artifacts/mobile-mendonca.png');

  await evaluate(send,"reset('copa'); true");
  await sleep(300);
  const copa=await evaluate(send,"(()=>{const el=document.querySelector('#character');return {portrait:!!el?.classList.contains('show'),scene:document.querySelector('#scene-bg')?.getAttribute('src')||'',speaker:document.querySelector('#speaker')?.textContent||'',line:document.querySelector('#line')?.textContent||''}})()");
  if(copa.portrait||!copa.scene.includes('copa-residence-street.webp')||copa.speaker!=='NARRADOR'||!copa.line.startsWith('Meia-noite.'))throw new Error('Bônus deveria abrir na rua, sem retrato e com roteiro próprio: '+JSON.stringify(copa));
  await capture(send,'artifacts/mobile-copa-2022.png');

  for(let i=0;i<12;i++){
    const hidden=await evaluate(send,"document.querySelector('#dialogue').classList.contains('hidden')");
    if(hidden)break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");await sleep(60);
  }
  await evaluate(send,"document.querySelector('.hotspot.required').click(); true");
  for(let i=0;i<8;i++){
    const open=await evaluate(send,"!document.querySelector('#modal').classList.contains('hidden') && document.querySelector('.mechanism')?.dataset.mode==='mosaic'");
    if(open)break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");await sleep(60);
  }
  const copaPuzzle=await evaluate(send,"(()=>({mode:document.querySelector('.mechanism')?.dataset.mode||'',pieces:document.querySelectorAll('.mosaic-piece').length,arts:document.querySelectorAll('.fragment-art').length,meter:document.querySelector('.mosaic-meter')?.textContent||'',portrait:document.querySelector('#character')?.classList.contains('show')}))()");
  if(copaPuzzle.mode!=='mosaic'||copaPuzzle.pieces!==6||copaPuzzle.arts!==6||!copaPuzzle.meter.includes('/ 7')||copaPuzzle.portrait)throw new Error('Primeiro puzzle do bônus inválido: '+JSON.stringify(copaPuzzle));
  await capture(send,'artifacts/mobile-copa-puzzle.png');
  await evaluate(send,"closeModal(); true");

  await evaluate(send,"enterScene(8); true");
  await sleep(200);

  for(let i=0;i<14;i++){
    const hidden=await evaluate(send,"document.querySelector('#dialogue').classList.contains('hidden')");
    if(hidden)break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");await sleep(80);
  }
  await evaluate(send,"document.querySelector('.hotspot.required').click(); true");
  for(let i=0;i<8;i++){
    const open=await evaluate(send,"!document.querySelector('#modal').classList.contains('hidden') && document.querySelectorAll('[data-puzzle-action]').length>0");
    if(open)break;
    await evaluate(send,"document.querySelector('#dialogue').click(); true");await sleep(80);
  }
  const puzzle=await evaluate(send,"(()=>({open:!document.querySelector('#modal').classList.contains('hidden'),actions:document.querySelectorAll('[data-puzzle-action]').length,mode:document.querySelector('.mechanism')?.dataset.mode||'',title:document.querySelector('#modal-title').textContent,overflow:document.querySelector('.modal-panel').scrollHeight>document.querySelector('.modal-panel').clientHeight}))()");
  if(!puzzle.open||puzzle.actions<8||puzzle.mode!=='circuit'||puzzle.title!=='A fronteira do fluxo')throw new Error('Puzzle Mendonça mobile não abriu corretamente: '+JSON.stringify(puzzle));
  await capture(send,'artifacts/mobile-puzzle.png');

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

  const swReady=await evaluate(send,"Promise.race([navigator.serviceWorker?.ready.then(()=>true).catch(()=>false),new Promise(resolve=>setTimeout(()=>resolve(false),5000))])");
  if(!swReady)throw new Error('Service worker não ficou pronto em 5s');

  console.log('PASS mobile smoke:',JSON.stringify({landscape,toffoli,mendonca,puzzle,portrait,swReady}));
  ws.close();
}finally{
  chrome.kill('SIGTERM');
}
