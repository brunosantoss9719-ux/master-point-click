import fs from 'node:fs';
import vm from 'node:vm';

class Classes {
  constructor(initial=''){ this.values=new Set(initial.split(/\s+/).filter(Boolean)); }
  add(...v){v.forEach(x=>this.values.add(x))}
  remove(...v){v.forEach(x=>this.values.delete(x))}
  contains(v){return this.values.has(v)}
}
class Element {
  constructor(classes=''){this.classList=new Classes(classes);this.style={};this.dataset={};this.children=[];this.hidden=false;this.attributes={};this._html='';}
  set innerHTML(v){this._html=v;this.children=[]}
  get innerHTML(){return this._html}
  set textContent(v){this._text=String(v)}
  get textContent(){return this._text||''}
  appendChild(v){this.children.push(v);return v}
  setAttribute(k,v){this.attributes[k]=v}
  removeAttribute(k){delete this.attributes[k]}
  addEventListener(){ }
  closest(){return null}
}
const selectors=['#start-screen','#game-screen','#dialogue','#line','#speaker','#choices','#character','#toast','#scene-bg','#scene-tint','#chapter','#date','#hotspots','#phone-badge','#dossier-count','#modal-title','#modal-kicker','#modal-body','#modal','#new-game','#continue-game','#start-sources','#phone-btn','#inventory-btn','#dossier-btn','#menu-btn','#modal-close','#scene','#dialogue-hint'];
const elements=Object.fromEntries(selectors.map(s=>[s,new Element(s==='#dialogue'||s==='#modal'?'hidden':'')]));
elements['#start-screen'].classList.add('active');
const document={querySelector:s=>elements[s]||new Element(),querySelectorAll:()=>[],createElement:()=>new Element(),addEventListener:()=>{}};
const storage=new Map();
const sandbox={document,localStorage:{setItem:(k,v)=>storage.set(k,v),getItem:k=>storage.get(k)||null,removeItem:k=>storage.delete(k)},matchMedia:()=>({matches:true}),setTimeout:fn=>{fn();return 1},clearTimeout:()=>{},setInterval:fn=>{fn();return 1},clearInterval:()=>{},console};
vm.createContext(sandbox);
const source=fs.readFileSync('app.js','utf8')+'\n;this.__game={getState:()=>state,getQueue:()=>queue,getActivePuzzle:()=>activePuzzle,selectPuzzleTool,usePuzzleTool,scenes,begin,reset,enterScene,nextLine,openPhone,openInventory,openDossier,save,load};';
vm.runInContext(source,sandbox,{filename:'app.js'});
const g=sandbox.__game;

function drain(){let guard=0;while(!elements['#dialogue'].classList.contains('hidden')&&elements['#choices'].children.length===0&&guard++<80)g.nextLine();if(guard>=80)throw new Error('Diálogo não encerrou')}
function solvePuzzle(){
  if(!g.getActivePuzzle())return;
  let guard=0;
  while(g.getActivePuzzle()&&guard++<30){
    const active=g.getActivePuzzle();
    const target=active.puzzle.targets.find(item=>!active.completed.includes(item.id)&&(item.requires||[]).every(id=>active.completed.includes(id)));
    if(!target)throw new Error(`Puzzle ${active.puzzle.title} ficou sem alvo disponível`);
    const accepted=Array.isArray(target.accept)?target.accept:[target.accept];
    const tool=active.tools.find(item=>accepted.includes(item.id)&&(!item.requires||item.requires.every(id=>active.completed.includes(id))));
    if(!tool)throw new Error(`Puzzle ${active.puzzle.title} ficou sem ferramenta para ${target.id}`);
    g.selectPuzzleTool(tool.id);
    if(!g.usePuzzleTool(target.id))throw new Error(`Puzzle ${active.puzzle.title} rejeitou ${tool.id} em ${target.id}`);
  }
  if(guard>=30)throw new Error('Puzzle excedeu o limite de ações');
  if(g.getActivePuzzle())throw new Error('Puzzle permaneceu aberto após a solução');
  drain();
}
function clickHotspot(index,choice=0){const button=elements['#hotspots'].children[index];if(!button)throw new Error(`Hotspot ${index} ausente na cena ${g.getState().scene}`);button.onclick({stopPropagation(){}});drain();solvePuzzle();if(elements['#choices'].children.length){elements['#choices'].children[choice].onclick({stopPropagation(){}});drain()}}

function runRoute(requiredChoices,sceneThreeChoice=0,checkSave=false){
  g.reset();drain();
  for(let scene=0;scene<5;scene++){
    if(g.getState().scene!==scene)throw new Error(`Esperava cena ${scene}, recebeu ${g.getState().scene}`);
    const sceneData=g.scenes[scene];
    const requiredIndex=sceneData.hotspots.findIndex(h=>h.required);
    const firstOptional=sceneData.hotspots.findIndex(h=>!h.required);
    clickHotspot(firstOptional,scene===2?sceneThreeChoice:0);
    if(scene===2&&checkSave){g.openPhone();g.openInventory();g.openDossier();g.save();if(g.load().scene!==2)throw new Error('Autosave não retomou a cena 3')}
    if(scene===1){
      const xandaoIndex=sceneData.hotspots.findIndex(h=>h.id==='xandao_tv');
      clickHotspot(xandaoIndex);
    }
    clickHotspot(requiredIndex,requiredChoices[scene]);
  }
  if(!g.getState().finished)throw new Error('Playthrough não chegou ao final');
  return elements['#modal-title'].textContent;
}

const endings=new Set([
  runRoute([0,0,0,0,0],0,true),
  runRoute([1,0,1,1,2],1),
  runRoute([1,2,0,2,0],2)
]);
if(g.getState().dossier.length!==9)throw new Error(`Dossiê do arco Vorcaro incompleto: ${g.getState().dossier.length}`);
g.enterScene(5);drain();
for(let scene=5;scene<8;scene++){
  if(g.getState().scene!==scene)throw new Error(`Esperava cena Toffolinho ${scene}, recebeu ${g.getState().scene}`);
  const sceneData=g.scenes[scene];
  const optional=sceneData.hotspots.findIndex(h=>!h.required);
  const required=sceneData.hotspots.findIndex(h=>h.required);
  clickHotspot(optional);
  clickHotspot(required,0);
}
let end=g.getState();
if(elements['#modal-title'].textContent!=='A CHAVE MUDA DE MÃO')throw new Error('Arco Toffolinho não terminou em André Mendonça');
if(end.dossier.length!==13)throw new Error(`Dossiê do arco Toffolinho incompleto: ${end.dossier.length}`);
g.enterScene(8);drain();
for(let scene=8;scene<12;scene++){
  if(g.getState().scene!==scene)throw new Error(`Esperava cena Mendonça ${scene}, recebeu ${g.getState().scene}`);
  const sceneData=g.scenes[scene];
  const optional=sceneData.hotspots.findIndex(h=>!h.required);
  const required=sceneData.hotspots.findIndex(h=>h.required);
  clickHotspot(optional);
  clickHotspot(required,scene%2);
}
end=g.getState();
if(elements['#modal-title'].textContent!=='A CHAVE SEM SENHA')throw new Error('Arco Mendonça não terminou no pedido de ajuda técnica à PF');
if(end.dossier.length!==17)throw new Error(`Dossiê final incompleto: ${end.dossier.length}`);
if(Object.keys(end.flags).filter(flag=>flag.startsWith('puzzle_')&&!flag.startsWith('puzzle_clean_')).length!==10)throw new Error('Os 10 puzzles narrativos não foram concluídos');
if(!storage.has('master-ultima-chamada-v1'))throw new Error('Autosave não foi persistido');
if(endings.size!==3)throw new Error(`Ramificação produziu apenas ${endings.size} finais: ${[...endings].join(', ')}`);
console.log(`PASS: 3 rotas Vorcaro + arcos Toffolinho e Mendonça; 12 cenas; 10 puzzles multietapa; finais ${[...endings].join(' / ')} / A CHAVE MUDA DE MÃO / A CHAVE SEM SENHA; Dossiê e save/continue verificados.`);
