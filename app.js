(()=>{
'use strict';
const SAVE='master-investigation-v3',C=window.MASTER_CASE,S=window.MASTER_SOURCES,$=q=>document.querySelector(q);
const VERBS={rastrear:['RASTREAR','Seguir um nome, data ou identificador'],verificar:['VERIFICAR','Pedir confirmação a uma fonte adequada'],confrontar:['CONFRONTAR','Pressionar uma afirmação com precisão'],formalizar:['FORMALIZAR','Fixar o que a prova permite dizer']};
let state,activeVerb='rastrear',dialogueQueue=[],typing=null,currentLine=null,pendingResolution=null;
let audio=null,master=null,muted=false,pendingSound=null;
const fresh=()=>({version:3,sceneId:'cold',discoveredEvidence:[],inspected:[],conclusions:{},interviewFlags:{},characterKnowledge:{mara:[]},leadOrder:[],completedBeats:[],completedActions:[],actionLog:[],recontextualizedEvidence:[],hintLevels:{},sourceViews:[],finished:false});
state=fresh();
const scene=()=>C.scenes.find(s=>s.id===state.sceneId);
const uniq=(arr,item)=>{if(!arr.includes(item))arr.push(item)};
function save(){localStorage.setItem(SAVE,JSON.stringify(state));syncContinue()}
function load(){try{const v=JSON.parse(localStorage.getItem(SAVE));return v?.version===3?{...fresh(),...v}:fresh()}catch{return fresh()}}
function syncContinue(){$('#continue').hidden=!localStorage.getItem(SAVE)}

async function unlockAudio(){
 if(muted)return false;
 try{
  if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});master=audio.createGain();master.gain.value=.78;master.connect(audio.destination)}
  if(audio.state!=='running')await audio.resume();
  if(audio.state==='running'){if(pendingSound){const s=pendingSound;pendingSound=null;playSound(s)}return true}
 }catch{}return false;
}
function tone(freq,{duration=.16,volume=.018,delay=0,type='sine',cutoff=380}={}){
 if(muted||!audio||audio.state!=='running')return;
 const t=audio.currentTime+delay,o=audio.createOscillator(),f=audio.createBiquadFilter(),g=audio.createGain();
 o.type=type;o.frequency.setValueAtTime(freq,t);f.type='lowpass';f.frequency.setValueAtTime(cutoff,t);f.Q.value=.35;
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
 o.connect(f).connect(g).connect(master);o.start(t);o.stop(t+duration+.04);
}
function playSound(kind,voice=118){
 if(muted)return;if(!audio||audio.state!=='running'){pendingSound=kind;return}
 if(kind==='voice'){tone(voice,{duration:.055,volume:.004,type:'sine',cutoff:260});return}
 const sounds={wake:[[82,.28,.022,0,'sine'],[110,.36,.014,.07,'triangle']],paper:[[92,.12,.016,0,'triangle'],[123,.18,.009,.035,'sine']],step:[[73,.15,.019,0,'triangle'],[98,.2,.012,.045,'sine']],success:[[82,.28,.021,0,'sine'],[110,.34,.017,.08,'triangle'],[147,.42,.011,.16,'sine']],limit:[[92,.18,.017,0,'triangle'],[78,.3,.011,.07,'sine']]};
 (sounds[kind]||sounds.paper).forEach(([f,d,v,delay,type])=>tone(f,{duration:d,volume:v,delay,type,cutoff:340}));
}
document.addEventListener('pointerdown',unlockAudio,{capture:true});
document.addEventListener('touchend',unlockAudio,{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&audio?.state==='suspended')pendingSound='wake'});

function immersive(){document.documentElement.requestFullscreen?.().catch(()=>{});screen.orientation?.lock?.('landscape').catch(()=>{})}
async function showGame(){await unlockAudio();playSound('wake');immersive();$('#start').classList.remove('active');$('#game').classList.add('active');renderScene();if(state.finished)finish()}
function start(){state=fresh();save();showGame()}
function notice(text){const n=$('#notice');n.textContent=text;n.classList.add('show');clearTimeout(n.timer);n.timer=setTimeout(()=>n.classList.remove('show'),2300)}
function openPanel(kicker,title,html){$('#panel-kicker').textContent=kicker;$('#panel-title').textContent=title;$('#panel-body').innerHTML=html;$('#panel').classList.remove('hidden')}
function closePanel(){$('#panel').classList.add('hidden')}
function tag(status){return `<span class="tag ${String(status).toLowerCase()}">${status}</span>`}
function discover(id,silent=false){if(!C.evidence[id])return;const isNew=!state.discoveredEvidence.includes(id);uniq(state.discoveredEvidence,id);uniq(state.characterKnowledge.mara,id);if(isNew&&!silent)notice(`ARQUIVADO · ${C.evidence[id].title}`)}

function renderScene(replay=true){
 const s=scene();s.starter.forEach(id=>discover(id,true));
 $('#chapter').textContent=s.chapter;$('#scene-title').textContent=s.title;$('#date-card').textContent=s.date;$('#background').src=s.bg;$('#background').alt=s.title;$('#evidence-count').textContent=state.discoveredEvidence.length;
 $('#objects').innerHTML='';s.objects.forEach(([id,label,x,y])=>{const b=document.createElement('button'),seen=state.inspected.includes(`${s.id}:${id}`);b.className=`scene-object ${seen?'seen':''}`;b.style.left=x+'%';b.style.top=y+'%';b.dataset.evidence=id;b.innerHTML=`<span class="object-corner"></span><strong>${seen?'REVER':'ABRIR'}</strong><small>${label}</small>`;b.onclick=e=>{e.stopPropagation();inspect(id)};$('#objects').append(b)});
 closePanel();renderActionbar();save();
 if(replay&&!state.completedBeats.includes(`intro:${s.id}`)){uniq(state.completedBeats,`intro:${s.id}`);save();playDialogue(s.intro)}
}
function renderActionbar(){const done=state.completedActions.filter(id=>scene().actions.some(a=>a.id===id)).length;$('#casework').innerHTML=`Diligências <b>${done}/${scene().actions.length}</b>`;$('#casework').hidden=false;$('#scene-view').hidden=false}
function playDialogue(lines,resolution=null){if(!lines?.length){if(resolution)showResolution(resolution);return}pendingResolution=resolution;dialogueQueue=[...lines];$('#dialogue').classList.remove('hidden');nextLine()}
function nextLine(){
 if(typing){clearInterval(typing);typing=null;$('#line').textContent=currentLine.text;$('#dialogue-prompt').textContent='TOQUE PARA CONTINUAR';return}
 const row=dialogueQueue.shift();if(!row){$('#dialogue').classList.add('hidden');currentLine=null;if(pendingResolution){const r=pendingResolution;pendingResolution=null;showResolution(r)}return}
 const ch=C.characters[row[0]]||{name:String(row[0]).toUpperCase(),role:'',voice:118};currentLine={text:row[1],voice:ch.voice};$('#speaker').textContent=ch.name;$('#role').textContent=ch.role;$('#line').textContent='';$('#dialogue-prompt').textContent='TOQUE PARA COMPLETAR';let i=0;
 typing=setInterval(()=>{i++;$('#line').textContent=currentLine.text.slice(0,i);if(i%4===0&&/\S/.test(currentLine.text[i-1]||''))playSound('voice',currentLine.voice);if(i>=currentLine.text.length){clearInterval(typing);typing=null;$('#dialogue-prompt').textContent='TOQUE PARA CONTINUAR'}},21);
}
function inspect(id){const key=`${scene().id}:${id}`,seen=state.inspected.includes(key);uniq(state.inspected,key);discover(id,seen);playSound('paper');save();renderSceneObjects();openEvidence(id)}
function renderSceneObjects(){scene().objects.forEach(([id])=>{const b=document.querySelector(`[data-evidence="${id}"]`);if(!b)return;const seen=state.inspected.includes(`${scene().id}:${id}`);b.classList.toggle('seen',seen);b.querySelector('strong').textContent=seen?'REVER':'ABRIR'});$('#evidence-count').textContent=state.discoveredEvidence.length}
function openEvidence(id){const e=C.evidence[id],src=S[e.sourceId],changed=state.recontextualizedEvidence.includes(id)?'<p class="recontext">Há algo neste item que merece nova leitura.</p>':'';uniq(state.sourceViews,id);save();openPanel(e.type,e.title,`${tag(e.status)}<p class="evidence-summary">${e.summary}</p>${changed}<dl class="evidence-dates"><div><dt>FATO</dt><dd>${e.eventDate||'—'}</dd></div><div><dt>DOCUMENTO</dt><dd>${e.documentDate||'—'}</dd></div><div><dt>PF SOUBE</dt><dd>${e.knownToPFDate||'—'}</dd></div><div><dt>PUBLICADO</dt><dd>${e.publishedDate||'não público'}</dd></div></dl>${src?`<a class="source-link" target="_blank" rel="noopener" href="${src.url}">Abrir fonte · ${src.publisher}</a>`:''}`)}

function condition(condition){const [kind,id]=condition.split(':');return kind==='lead'?state.leadOrder.includes(id):kind==='evidence'?state.discoveredEvidence.includes(id):false}
function available(a){
 if(a.requiresActions?.some(id=>!state.completedActions.includes(id)))return false;
 if(a.requiresAnyActions&&!a.requiresAnyActions.some(id=>state.completedActions.includes(id)))return false;
 if(a.requiresEvidence?.some(id=>!state.discoveredEvidence.includes(id)))return false;
 if(a.requiresAnyEvidence&&!a.requiresAnyEvidence.some(id=>state.discoveredEvidence.includes(id)))return false;
 if(a.requiresAnyConditions&&!a.requiresAnyConditions.some(condition))return false;
 return true;
}
function openCasework(verb=activeVerb){activeVerb=verb;const s=scene(),counts={};Object.keys(VERBS).forEach(v=>counts[v]=s.actions.filter(a=>a.verb===v&&available(a)&&!state.completedActions.includes(a.id)).length);if(!counts[activeVerb])activeVerb=Object.keys(VERBS).find(v=>counts[v])||'formalizar';
 openPanel('CADERNO DE DILIGÊNCIAS',s.question,`<p class="task">Escolha o próximo passo. Você não precisa abrir todos os objetos do ambiente.</p><div class="verb-tabs">${Object.entries(VERBS).map(([id,[name]])=>`<button data-verb="${id}" class="${activeVerb===id?'active':''}" ${!s.actions.some(a=>a.verb===id)?'disabled':''}>${name}<b>${counts[id]||''}</b></button>`).join('')}</div><div id="action-list" class="action-list"></div><div class="trail"><small>REGISTRO DA CENA</small>${state.actionLog.filter(x=>x.scene===s.id).map(x=>`<span>${VERBS[x.verb][0]} · ${x.title}</span>`).join('')||'<span>Nenhuma diligência feita.</span>'}</div>`);renderActions();document.querySelectorAll('[data-verb]').forEach(b=>b.onclick=()=>openCasework(b.dataset.verb))}
function renderActions(){const list=$('#action-list');if(!list)return;const actions=scene().actions.filter(a=>a.verb===activeVerb);list.innerHTML=actions.map(a=>{const done=state.completedActions.includes(a.id),locked=!available(a);return `<button class="diligence ${done?'done':''}" data-action="${a.id}" ${done||locked?'disabled':''}><i>${done?'REGISTRADO':locked?'AGUARDANDO':'DISPONÍVEL'}</i><strong>${a.title}</strong><span>${a.detail}</span></button>`}).join('')||'<p class="empty-action">Nenhuma diligência deste tipo nesta cena.</p>';document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>runAction(b.dataset.action))}
function runAction(id){const a=scene().actions.find(x=>x.id===id);if(!a||!available(a)||state.completedActions.includes(id))return;uniq(state.completedActions,id);a.discover?.forEach(x=>discover(x));a.recontextualize?.forEach(x=>uniq(state.recontextualizedEvidence,x));if(a.fail)state.interviewFlags[id]=(state.interviewFlags[id]||0)+1;state.actionLog.push({scene:scene().id,id:a.id,verb:a.verb,title:a.title,result:a.fail?'CONTESTED':a.complete?(a.conclusion||'SUPPORTED'):'OPEN'});playSound(a.fail?'limit':a.complete?'success':'step');save();closePanel();renderActionbar();playDialogue(a.result,a)}
function showResolution(a){if(a.complete){state.conclusions[scene().id]=a.conclusion||'SUPPORTED';uniq(state.completedBeats,scene().id);save();openPanel(tagText(a.conclusion),scene().outcome,`<p class="case-outcome">${scene().outcome}</p><button id="advance" class="submit">${a.end?'Lacrar mídia':'Prosseguir'}</button>`);$('#advance').onclick=()=>advance(a)}else openCasework(a.verb)}
function tagText(status){return status==='PENDING'?'PENDENTE':status==='INCOMPLETE'?'INCOMPLETO':status==='CONTESTED'?'CONTESTADO':'SUSTENTADO'}
function advance(a){if(a.end)return finish();if(a.branch)return openBranch();if(a.lead)return afterLead(a.lead);state.sceneId=scene().next;activeVerb='rastrear';renderScene()}
function openBranch(){openPanel('DUAS PORTAS','Qual linha você abre primeiro?',`<p>As duas serão examinadas. A ordem muda o que a equipe já conhece.</p><div class="choice-door"><button data-lead="turma"><strong>A TURMA</strong><small>nomes, visitas e pagamentos alegados</small></button><button data-lead="meninos"><strong>OS MENINOS</strong><small>arquivo, proveniência e limite técnico</small></button></div>`);document.querySelectorAll('[data-lead]').forEach(b=>b.onclick=()=>{state.leadOrder=[b.dataset.lead];state.sceneId=b.dataset.lead;save();renderScene()})}
function afterLead(lead){uniq(state.leadOrder,lead);if(state.leadOrder.length===1){const next=lead==='turma'?'meninos':'turma';state.sceneId=next;activeVerb='rastrear';save();renderScene(false);playDialogue(next==='turma'?[['bia','O arquivo repetiu um contato. Quero ver esse nome fora da tela.'],['mara','Abre visitas e pagamentos.']]:[['jo','O registro de presença trouxe o mesmo contato. Agora eu quero o arquivo.'],['mara','Com proveniência.'],['jo','Obrigada.']])}else{state.sceneId='final';activeVerb='verificar';save();renderScene()}}
function finish(){state.finished=true;save();closePanel();$('#objects').innerHTML='<div class="sealed-drive"><span>PF–MÍDIA 500 GB</span><i></i><small>DESTINO: __________________</small></div>';$('#date-card').textContent='19 SET 2026 · CUSTÓDIA PRESERVADA';$('#dialogue').classList.add('hidden');$('#casework').hidden=true;$('#scene-view').hidden=true;playSound('success');setTimeout(()=>openPanel('ESTADO · PENDENTE','',`<div class="final-still"></div><button id="open-dossier-final">Abrir Dossiê</button><button id="restart" class="submit">Nova investigação</button>`),900);setTimeout(()=>{$('#open-dossier-final')?.addEventListener('click',openDossier);$('#restart')?.addEventListener('click',start)},950)}
function openDossier(){const rows=state.discoveredEvidence.map(id=>{const e=C.evidence[id],src=S[e.sourceId];return `<button class="dossier-item" data-open-evidence="${id}"><div>${tag(e.status)} ${tag(e.type)}</div><h3>${e.title}</h3><p>${e.summary}</p><dl class="mini-dates"><div><dt>evento</dt><dd>${e.eventDate}</dd></div><div><dt>documento</dt><dd>${e.documentDate}</dd></div><div><dt>disponível</dt><dd>${e.knownToPlayerDate}</dd></div></dl>${src?`<small>${src.publisher}</small>`:''}</button>`}).join('')||'<p>Nenhum item arquivado.</p>';openPanel('DOSSIÊ','O que foi encontrado',`<div class="dossier-list">${rows}</div>`);document.querySelectorAll('[data-open-evidence]').forEach(b=>b.onclick=()=>openEvidence(b.dataset.openEvidence))}
function hint(){const s=scene(),n=Math.min(3,(state.hintLevels[s.id]||0)+1);state.hintLevels[s.id]=n;save();openPanel(`DICA ${n}`,'Uma direção, não a resposta',`<p>${s.hints[n-1]}</p>`)}
function about(){openPanel('TRANSPARÊNCIA','Fatos, alegações e dramatização','<p>Mara, Lia, Bia e Jo são personagens ficcionais compostas. Autoridades reais aparecem por atos, decisões, sessões e manifestações públicas.</p><p>Relatório policial não é sentença. Versão da defesa não vira fato por ser defesa. Documentos compostos são marcados como dramatização.</p><p>A oitiva usa padrões conversacionais observáveis, sem copiar fraseologia distintiva.</p>')}

$('#new').onclick=start;$('#continue').onclick=()=>{state=load();showGame()};$('#about').onclick=about;$('#close-panel').onclick=closePanel;$('#dialogue').onclick=nextLine;$('#casework').onclick=()=>openCasework();$('#scene-view').onclick=closePanel;$('#dossier').onclick=openDossier;$('#hint').onclick=hint;
$('#audio').onclick=async()=>{muted=!muted;$('#audio').textContent=muted?'Som · desligado':'Som · ligado';$('#audio').setAttribute('aria-label',muted?'Som desligado':'Som ligado');if(!muted){await unlockAudio();playSound('wake');notice('SOM LIGADO · PALETA SUAVE')}};
$('#bonus').onclick=()=>openPanel('EXTRA PRESERVADO','Punhal Verde e Amarelo','<p>O bônus permanece preservado fora da campanha principal.</p>');
window.__MASTER_TEST__={fresh,getState:()=>state,setState:x=>state=x,scene,available,runAction,load,save,scenes:C.scenes,evidence:C.evidence};
syncContinue();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
