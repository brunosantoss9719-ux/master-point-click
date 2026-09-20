(()=>{
'use strict';
const SAVE='master-investigation-v2',C=window.MASTER_CASE,S=window.MASTER_SOURCES,$=q=>document.querySelector(q);
let audio=null,muted=false,pendingSound=null,dialogueQueue=[],typing=null,currentLine=null,selectedToken=null;
const fresh=()=>({version:2,sceneId:'cold',discoveredEvidence:[],inspected:[],conclusions:{},interviewFlags:{},characterKnowledge:{mara:[]},leadOrder:[],completedBeats:[],recontextualizedEvidence:[],hintLevels:{},sourceViews:[],sceneProgress:{},finished:false});
let state=fresh();
const scene=()=>C.scenes.find(x=>x.id===state.sceneId);
const progress=()=>state.sceneProgress[state.sceneId]||(state.sceneProgress[state.sceneId]={});
function save(){localStorage.setItem(SAVE,JSON.stringify(state));syncContinue()}
function load(){try{const value=JSON.parse(localStorage.getItem(SAVE));return value?.version===2?{...fresh(),...value}:fresh()}catch{return fresh()}}
function syncContinue(){$('#continue').hidden=!localStorage.getItem(SAVE)}

/* O contexto só nasce em gesto confiável. Sons pedidos enquanto o resume termina ficam na fila. */
async function unlockAudio(){
 if(muted)return false;
 try{
  if(!audio)audio=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});
  if(audio.state!=='running')await audio.resume();
  if(audio.state==='running'){
   const buffer=audio.createBuffer(1,1,audio.sampleRate),source=audio.createBufferSource();source.buffer=buffer;source.connect(audio.destination);source.start();
   if(pendingSound){const next=pendingSound;pendingSound=null;playSound(next)}
   return true;
  }
 }catch{}
 return false;
}
function tone(freq,{duration=.08,volume=.009,delay=0,type='sine',cutoff=620,detune=0}={}){
 if(muted||!audio||audio.state!=='running')return;
 const t=audio.currentTime+delay,o=audio.createOscillator(),f=audio.createBiquadFilter(),g=audio.createGain();
 o.type=type;o.frequency.setValueAtTime(freq,t);o.detune.setValueAtTime(detune,t);
 f.type='lowpass';f.frequency.setValueAtTime(cutoff,t);f.Q.setValueAtTime(.45,t);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
 o.connect(f).connect(g).connect(audio.destination);o.start(t);o.stop(t+duration+.03);
}
function playSound(kind,voice=146){
 if(muted)return;
 if(!audio||audio.state!=='running'){pendingSound=kind;return}
 const map={
  wake:[[110,.18,.010,0],[147,.25,.008,.08]],paper:[[123,.07,.008,0],[164,.11,.005,.035]],
  place:[[98,.08,.010,0],[130,.1,.006,.025]],success:[[110,.16,.011,0],[147,.22,.009,.07],[196,.28,.006,.14]],
  limit:[[110,.12,.008,0],[92,.2,.006,.06]]
 };
 if(kind==='voice'){tone(voice,{duration:.045,volume:.0035,cutoff:430,detune:(Math.random()-.5)*18});return}
 (map[kind]||map.paper).forEach(([f,d,v,delay])=>tone(f,{duration:d,volume:v,delay,type:'sine',cutoff:560}));
}
document.addEventListener('pointerdown',unlockAudio,{capture:true});
document.addEventListener('touchend',unlockAudio,{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&audio?.state==='suspended')pendingSound='wake'});

function immersive(){document.documentElement.requestFullscreen?.().catch(()=>{});screen.orientation?.lock?.('landscape').catch(()=>{})}
async function showGame(){await unlockAudio();playSound('wake');immersive();$('#start').classList.remove('active');$('#game').classList.add('active');renderScene();if(state.finished)finish()}
function start(){state=fresh();save();showGame()}
function notice(text){const n=$('#notice');n.textContent=text;n.classList.add('show');clearTimeout(n.timer);n.timer=setTimeout(()=>n.classList.remove('show'),2100)}
function openPanel(kicker,title,html){$('#panel-kicker').textContent=kicker;$('#panel-title').textContent=title;$('#panel-body').innerHTML=html;$('#panel').classList.remove('hidden')}
function closePanel(){$('#panel').classList.add('hidden');selectedToken=null}
function tag(status){return `<span class="tag ${String(status).toLowerCase()}">${status}</span>`}

function renderScene(replay=true){
 const s=scene();$('#casework').hidden=false;$('#scene-view').hidden=false;$('#chapter').textContent=s.chapter;$('#scene-title').textContent=s.title;$('#date-card').textContent=s.date;$('#background').src=s.bg;$('#background').alt=s.title;
 $('#evidence-count').textContent=state.discoveredEvidence.length;$('#objects').innerHTML='';
 s.objects.forEach(([id,label,x,y])=>{
  const b=document.createElement('button'),seen=state.inspected.includes(`${s.id}:${id}`);
  b.className=`scene-object ${seen?'seen':''}`;b.style.left=x+'%';b.style.top=y+'%';b.dataset.evidence=id;
  b.innerHTML=`<span class="object-corner"></span><strong>${seen?'REVER':'EXAMINAR'}</strong><small>${label}</small>`;$('#objects').append(b);
 });
 closePanel();if(replay&&!state.completedBeats.includes(`intro:${s.id}`)){state.completedBeats.push(`intro:${s.id}`);playDialogue(s.intro)}
 save();
}
function playDialogue(lines){
 if(!lines?.length)return;
 dialogueQueue=[...lines];$('#dialogue').classList.remove('hidden');nextLine();
}
function nextLine(){
 if(typing){clearInterval(typing);typing=null;$('#line').textContent=currentLine.text;$('#dialogue-prompt').textContent='TOQUE PARA CONTINUAR';return}
 const row=dialogueQueue.shift();
 if(!row){$('#dialogue').classList.add('hidden');currentLine=null;return}
 const ch=C.characters[row[0]]||{name:String(row[0]).toUpperCase(),role:'',voice:146};
 currentLine={text:row[1],voice:ch.voice};$('#speaker').textContent=ch.name;$('#role').textContent=ch.role;$('#line').textContent='';$('#dialogue-prompt').textContent='TOQUE PARA COMPLETAR';
 let i=0;typing=setInterval(()=>{i++;$('#line').textContent=currentLine.text.slice(0,i);const c=currentLine.text[i-1];if(i%3===0&&c&&/\S/.test(c))playSound('voice',currentLine.voice);if(i>=currentLine.text.length){clearInterval(typing);typing=null;$('#dialogue-prompt').textContent='TOQUE PARA CONTINUAR'}},24);
}
function inspect(id){
 const s=scene(),key=`${s.id}:${id}`,e=C.evidence[id],first=!state.discoveredEvidence.includes(id);
 if(!state.inspected.includes(key))state.inspected.push(key);
 if(first){state.discoveredEvidence.push(id);state.characterKnowledge.mara.push(id);notice(`ARQUIVADO · ${e.title}`)}
 else notice('Há algo aqui que pode ganhar outro sentido.');
 playSound('paper');save();renderObjects();openEvidence(id);
}
function renderObjects(){
 const s=scene();s.objects.forEach(([id])=>{const b=document.querySelector(`[data-evidence="${id}"]`);if(!b)return;const seen=state.inspected.includes(`${s.id}:${id}`);b.classList.toggle('seen',seen);b.querySelector('strong').textContent=seen?'REVER':'EXAMINAR'});
 $('#evidence-count').textContent=state.discoveredEvidence.length;
}
function openEvidence(id){
 const e=C.evidence[id],src=S[e.sourceId],connections=state.recontextualizedEvidence.includes(id)?'<p class="recontext">Este item mudou de valor depois de uma descoberta posterior.</p>':'';
 openPanel(e.type,e.title,`${tag(e.status)}<p class="evidence-summary">${e.summary}</p>${connections}<dl class="evidence-dates"><div><dt>FATO</dt><dd>${e.eventDate||'—'}</dd></div><div><dt>DOCUMENTO</dt><dd>${e.documentDate||'—'}</dd></div><div><dt>PF SOUBE</dt><dd>${e.knownToPFDate||'—'}</dd></div><div><dt>PUBLICADO</dt><dd>${e.publishedDate||'não público'}</dd></div></dl>${src?`<a class="source-link" target="_blank" rel="noopener" href="${src.url}">Abrir fonte · ${src.publisher}</a>`:''}`);
}
function requireInspection(){
 const missing=scene().objects.filter(([id])=>!state.inspected.includes(`${scene().id}:${id}`));
 if(!missing.length)return true;
 openPanel('MESA INCOMPLETA',scene().question,`<p>Há ${missing.length} ${missing.length===1?'item ainda fechado':'itens ainda fechados'} no ambiente.</p><button class="submit" id="back-scene">Voltar à cena</button>`);$('#back-scene').onclick=closePanel;return false;
}
function openCasework(){
 if(!requireInspection())return;
 const s=scene(),p=s.puzzle;selectedToken=null;
 openPanel('MESA DO CASO',s.question,`<p class="task">${p.prompt}</p><div id="puzzle"></div><div id="puzzle-result"></div>`);
 const renderers={brief:renderSlots,custody:renderSlots,compare:renderCompare,timeline:renderTimeline,interview:renderInterview,sort:renderSort,links:renderLinks,ladder:renderLadder};
 renderers[p.type]?.();
}
function renderSlots(){
 const p=scene().puzzle,pg=progress();pg.assign||={};
 $('#puzzle').innerHTML=`<div class="form-slots">${p.slots.map(s=>`<button class="paper-slot ${pg.assign[s.id]?'filled':''}" data-slot="${s.id}"><small>${s.label}</small><strong>${p.tokens.find(t=>t[0]===pg.assign[s.id])?.[1]||'em branco'}</strong></button>`).join('')}</div><div class="token-bank">${p.tokens.map(t=>`<button class="word-token ${selectedToken===t[0]?'selected':''}" data-token="${t[0]}">${t[1]}</button>`).join('')}</div><button class="submit" id="check-puzzle">Assinar registro</button>`;
 document.querySelectorAll('[data-token]').forEach(b=>b.onclick=()=>{selectedToken=b.dataset.token;renderSlots()});
 document.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{if(!selectedToken){notice('Escolha um trecho primeiro.');return}pg.assign[b.dataset.slot]=selectedToken;selectedToken=null;playSound('place');save();renderSlots()});
 $('#check-puzzle').onclick=()=>{const ok=p.slots.every(s=>s.accept.includes(pg.assign[s.id]));ok?solve():incomplete('O termo contém uma afirmação que os registros não sustentam. Você pode substituir qualquer campo.')};
}
function renderCompare(){
 const p=scene().puzzle,pg=progress();pg.fields||=[];
 const doc=d=>`<article class="compare-doc"><h3>${d.title}</h3>${d.rows.map(r=>`<button data-field="${r[0]}" class="${pg.fields.includes(r[0])?'marked':''}"><small>${r[1]}</small><strong>${r[2]}</strong></button>`).join('')}</article>`;
 $('#puzzle').innerHTML=`<div class="compare">${doc(p.left)}${doc(p.right)}</div><button class="submit" id="check-puzzle">Registrar divergência</button>`;
 document.querySelectorAll('[data-field]').forEach(b=>b.onclick=()=>{const id=b.dataset.field;pg.fields=pg.fields.includes(id)?pg.fields.filter(x=>x!==id):[...pg.fields,id];playSound('paper');save();renderCompare()});
 $('#check-puzzle').onclick=()=>{const chosen=[...pg.fields].sort().join('|'),ok=p.accept.some(set=>[...set].sort().join('|')===chosen);ok?solve():incomplete(pg.fields.includes('id')?'O identificador coincide nos dois arquivos.':'A diferença escolhida não explica por que o mesmo lote tem duas histórias.')};
}
function renderTimeline(){
 const p=scene().puzzle,pg=progress();pg.order||=[];
 const remaining=p.cards.filter(c=>!pg.order.includes(c[0]));
 $('#puzzle').innerHTML=`<div class="timeline-strip">${pg.order.map((id,i)=>{const c=p.cards.find(x=>x[0]===id);return `<button data-remove="${id}"><small>${i+1}</small>${c[1]}</button>`}).join('')||'<p>Toque nas fichas para montar a sequência.</p>'}</div><div class="token-bank">${remaining.map(c=>`<button data-add="${c[0]}" class="word-token">${c[1]}</button>`).join('')}</div><button class="submit" id="check-puzzle">Conferir cronologia</button>`;
 document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{pg.order.push(b.dataset.add);playSound('place');save();renderTimeline()});document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{pg.order=pg.order.filter(x=>x!==b.dataset.remove);save();renderTimeline()});
 $('#check-puzzle').onclick=()=>{let order=[...pg.order],target=p.accept;const exact=order.join('|')===target.join('|');const tied=p.ties?.some(([a,b])=>{const copy=[...target],ia=copy.indexOf(a),ib=copy.indexOf(b);[copy[ia],copy[ib]]=[copy[ib],copy[ia]];return order.join('|')===copy.join('|')});exact||tied?solve():incomplete('A sequência mistura data do fato com interpretação posterior. Retire uma ficha e tente outra ordem.')};
}
function renderInterview(){
 const p=scene().puzzle,pg=progress();
 $('#puzzle').innerHTML=`<div class="transcript">${p.statements.map(s=>`<button class="${pg.statement===s.id?'selected':''}" data-statement="${s.id}">${s.text}</button>`).join('')}</div>${pg.statement?`<p class="instruction">Apresente um registro:</p><div class="evidence-rack">${p.evidence.map(id=>`<button data-present="${id}"><small>${C.evidence[id].type}</small>${C.evidence[id].title}</button>`).join('')}</div>`:''}`;
 document.querySelectorAll('[data-statement]').forEach(b=>b.onclick=()=>{pg.statement=b.dataset.statement;playSound('paper');save();renderInterview()});
 document.querySelectorAll('[data-present]').forEach(b=>b.onclick=()=>{const pair=[pg.statement,b.dataset.present],ok=p.acceptedSets.some(x=>x.join('|')===pair.join('|'));if(ok)solve();else{state.interviewFlags[state.sceneId]=(state.interviewFlags[state.sceneId]||0)+1;incomplete(pg.statement!==p.correct?(p.wrong[pg.statement]||p.wrong.evidence):p.wrong.evidence);save()}});
}
function renderSort(){
 const p=scene().puzzle,pg=progress();pg.sorted||={};
 $('#puzzle').innerHTML=`<div class="folder-grid">${p.bins.map(b=>`<button data-bin="${b[0]}" class="case-folder"><strong>${b[1]}</strong><small>${p.cards.filter(c=>pg.sorted[c[0]]===b[0]).map(c=>c[1]).join(' · ')||'vazia'}</small></button>`).join('')}</div><div class="token-bank">${p.cards.filter(c=>!pg.sorted[c[0]]).map(c=>`<button data-sort-card="${c[0]}" class="word-token ${selectedToken===c[0]?'selected':''}">${c[1]}</button>`).join('')}</div><button id="clear-sort">Reabrir pastas</button><button class="submit" id="check-puzzle">Fechar classificação</button>`;
 document.querySelectorAll('[data-sort-card]').forEach(b=>b.onclick=()=>{selectedToken=b.dataset.sortCard;renderSort()});document.querySelectorAll('[data-bin]').forEach(b=>b.onclick=()=>{if(!selectedToken)return notice('Escolha um rastro primeiro.');pg.sorted[selectedToken]=b.dataset.bin;selectedToken=null;playSound('place');save();renderSort()});
 $('#clear-sort').onclick=()=>{pg.sorted={};save();renderSort()};$('#check-puzzle').onclick=()=>{const ok=p.cards.every(c=>pg.sorted[c[0]]===c[2]);ok?solve():incomplete('Uma pasta mistura funções diferentes. Reabra e olhe o verbo de cada rastro.')};
}
function renderLinks(){
 const p=scene().puzzle,pg=progress();pg.edges||=[];pg.linkPick||=[];
 $('#puzzle').innerHTML=`<div class="link-board">${p.nodes.map(id=>`<button data-node="${id}" class="${pg.linkPick.includes(id)?'selected':''}"><small>${C.evidence[id].type}</small><strong>${C.evidence[id].title}</strong></button>`).join('')}</div><div class="edge-log">${pg.edges.map(e=>`<span>${C.evidence[e[0]].title} ↔ ${C.evidence[e[1]].title}</span>`).join('')||'<span>Nenhuma conexão testada.</span>'}</div><button id="clear-links">Limpar conexões</button><button class="submit" id="check-puzzle">Testar hipótese de identidade</button>`;
 document.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>{const id=b.dataset.node;if(pg.linkPick.includes(id))pg.linkPick=pg.linkPick.filter(x=>x!==id);else pg.linkPick.push(id);if(pg.linkPick.length===2){const edge=[...pg.linkPick].sort(),key=edge.join('|');if(!pg.edges.some(e=>e.join('|')===key))pg.edges.push(edge);pg.linkPick=[];playSound('place')}save();renderLinks()});
 $('#clear-links').onclick=()=>{pg.edges=[];save();renderLinks()};$('#check-puzzle').onclick=()=>{const accepted=p.accept.map(e=>[...e].sort().join('|')),good=pg.edges.filter(e=>accepted.includes(e.join('|'))),hasAlias=good.filter(e=>e.includes('sictag')).length>=2;good.length>=p.needed&&hasAlias?solve():incomplete('A hipótese ainda depende de um único salto. Faça o codinome encontrar dois rastros independentes.')};
}
function renderLadder(){
 const p=scene().puzzle,pg=progress();
 $('#puzzle').innerHTML=`<div class="claim-ladder">${p.rungs.map((r,i)=>`<button data-rung="${r[0]}" class="${pg.rung===r[0]?'selected':''}"><small>NÍVEL ${i+1}</small><strong>${r[1]}</strong></button>`).join('')}</div><button class="submit" id="check-puzzle">Fixar limite da conclusão</button>`;
 document.querySelectorAll('[data-rung]').forEach(b=>b.onclick=()=>{pg.rung=b.dataset.rung;playSound('place');save();renderLadder()});$('#check-puzzle').onclick=()=>{if(pg.rung===p.accept)solve();else if(pg.rung==='file')incomplete('Isso é sustentado, mas deixa sem uso a resposta institucional. Há uma conclusão um pouco mais forte.');else incomplete('A formulação atravessa uma lacuna técnica que os arquivos não fecham.')};
}
function incomplete(message){playSound('limit');$('#puzzle-result').className='result incomplete';$('#puzzle-result').innerHTML=`<strong>LINHA INCOMPLETA</strong><p>${message}</p>`}
function solve(){
 const s=scene();state.conclusions[s.id]='SUPPORTED';if(!state.completedBeats.includes(s.id))state.completedBeats.push(s.id);
 if(s.id==='mau')state.recontextualizedEvidence.push('voo');playSound('success');save();
 $('#puzzle-result').className='result supported';$('#puzzle-result').innerHTML=`<strong>REGISTRO SUSTENTADO</strong><p>${s.outcome}</p><button class="submit" id="advance">Prosseguir</button>`;$('#advance').onclick=advance;
}
function advance(){
 const s=scene();
 if(s.branch)return openBranch();
 if(s.lead)return afterLead();
 if(s.end)return finish();
 state.sceneId=s.next;renderScene();
}
function openBranch(){
 openPanel('DUAS PORTAS','Qual linha você abre primeiro?',`<p>As duas serão examinadas. A segunda linha começa com o que você descobrir na primeira.</p><div class="choice-door"><button data-lead="turma"><strong>A TURMA</strong><small>nomes, visitas, pagamentos alegados</small></button><button data-lead="meninos"><strong>OS MENINOS</strong><small>arquivo, proveniência, limite técnico</small></button></div>`);
 document.querySelectorAll('[data-lead]').forEach(b=>b.onclick=()=>{state.leadOrder=[b.dataset.lead];state.sceneId=b.dataset.lead;save();renderScene()});
}
function afterLead(){
 const s=scene();if(!state.leadOrder.includes(s.lead))state.leadOrder.push(s.lead);
 if(state.leadOrder.length===1){const next=s.lead==='turma'?'meninos':'turma';state.sceneId=next;save();renderScene(false);playDialogue(next==='turma'?[['bia','O arquivo digital repetiu um contato. Quero ver esse nome fora da tela.'],['mara','Abre visitas e pagamentos.']]:[['jo','O livro de visitas trouxe o mesmo nó. Agora eu quero saber o que existe no dispositivo.'],['mara','Sem chamar captura de invasão.'],['jo','Já gostei mais.']])}else{state.sceneId='final';save();renderScene()}
}
function finish(){
 state.finished=true;save();closePanel();$('#objects').innerHTML='<div class="sealed-drive"><span>PF–MÍDIA 500 GB</span><i></i><small>DESTINO: __________________</small></div>';$('#date-card').textContent='19 SET 2026 · CUSTÓDIA PRESERVADA';$('#dialogue').classList.add('hidden');$('#casework').hidden=true;$('#scene-view').hidden=true;playSound('place');
 setTimeout(()=>openPanel('ESTADO · PENDENTE','',`<div class="final-still"></div><button id="open-dossier-final">Abrir Dossiê</button><button id="restart" class="submit">Nova investigação</button>`),1200);
 setTimeout(()=>{$('#open-dossier-final')?.addEventListener('click',openDossier);$('#restart')?.addEventListener('click',start)},1250);
}
function openDossier(){
 const rows=state.discoveredEvidence.map(id=>{const e=C.evidence[id],src=S[e.sourceId];return `<article class="dossier-item"><div>${tag(e.status)} ${tag(e.type)}</div><h3>${e.title}</h3><p>${e.summary}</p><dl class="mini-dates"><div><dt>evento</dt><dd>${e.eventDate}</dd></div><div><dt>documento</dt><dd>${e.documentDate}</dd></div><div><dt>disponível</dt><dd>${e.knownToPlayerDate}</dd></div></dl>${src?`<a class="source-link" href="${src.url}" target="_blank" rel="noopener">${src.publisher}</a>`:''}</article>`}).join('')||'<p>Nenhum item arquivado.</p>';
 openPanel('DOSSIÊ','O que você encontrou',rows);
}
function hint(){const s=scene(),n=Math.min(3,(state.hintLevels[s.id]||0)+1);state.hintLevels[s.id]=n;save();openPanel(`DICA ${n}`,'Uma direção, não a resposta',`<p>${s.hints[n-1]}</p>`)}
function about(){openPanel('TRANSPARÊNCIA','Fatos, alegações e dramatização',`<p>Mara, Lia, Bia e Jo são personagens ficcionais compostas. Autoridades reais aparecem por atos, decisões, sessões e manifestações públicas.</p><p>As etiquetas distinguem documento, alegação, contestação e pendência. Relatório policial não é sentença. Versão da defesa não vira fato por ser uma defesa.</p><p>A oitiva é dramatizada a partir de padrões conversacionais observáveis nas oitivas públicas, sem copiar fraseologia distintiva.</p>`)}

$('#new').onclick=start;$('#continue').onclick=()=>{state=load();showGame()};$('#about').onclick=about;$('#close-panel').onclick=closePanel;$('#dialogue').onclick=nextLine;$('#casework').onclick=openCasework;$('#scene-view').onclick=closePanel;$('#dossier').onclick=openDossier;$('#hint').onclick=hint;
$('#audio').onclick=async()=>{muted=!muted;$('#audio').textContent=muted?'Som · desligado':'Som · ligado';$('#audio').setAttribute('aria-label',muted?'Som desligado':'Som ligado');if(!muted){await unlockAudio();playSound('wake');notice('SOM LIGADO')}};
$('#bonus').onclick=()=>openPanel('EXTRA PRESERVADO','Punhal Verde e Amarelo','<p>O bônus continua preservado, fora da campanha principal enquanto é adaptado ao novo motor.</p>');
$('#objects').addEventListener('click',e=>{const b=e.target.closest('[data-evidence]');if(b)inspect(b.dataset.evidence)});
window.__MASTER_TEST__={fresh,getState:()=>state,setState:x=>state=x,scene,renderScene,openCasework,load,save,scenes:C.scenes,evidence:C.evidence};
syncContinue();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
