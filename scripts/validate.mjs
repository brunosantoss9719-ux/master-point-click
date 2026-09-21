import fs from 'node:fs';
import vm from 'node:vm';

const files=['index.html','styles.css','app.js','content/sources.js','content/master-case.js','manifest.webmanifest','sw.js','STORY.md','SOURCES.md','ART_BIBLE.md','PROJECT_STATE.md'];
for(const file of files)if(!fs.existsSync(file))throw Error(`${file} ausente`);
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync('content/sources.js','utf8'),context);
vm.runInContext(fs.readFileSync('content/master-case.js','utf8'),context);
const C=context.window.MASTER_CASE,S=context.window.MASTER_SOURCES;
if(C.scenes.length!==9)throw Error('Campanha deve ter 9 cenas');
const evidenceFields=['title','summary','type','eventDate','documentDate','knownToPFDate','knownToPlayerDate','publishedDate','status','sourceId','knownBy','supports','contradicts','recontextualizes'];
for(const [id,e] of Object.entries(C.evidence)){for(const key of evidenceFields)if(!(key in e))throw Error(`${id}.${key} ausente`);if(!S[e.sourceId])throw Error(`${id}: fonte ${e.sourceId} ausente`);if(e.summary.split(/\s+/).length>42)throw Error(`${id}: resumo longo demais`)}
const verbs=new Set(['rastrear','verificar','confrontar','formalizar']),actionIds=new Set();
for(const scene of C.scenes){
 if(!scene.question||!scene.outcome||!scene.actions?.length||!scene.starter||!scene.objects)throw Error(`Cena incompleta: ${scene.id}`);
 for(const id of scene.starter)if(!C.evidence[id])throw Error(`${scene.id}: starter ${id} ausente`);
 for(const [id] of scene.objects)if(!C.evidence[id])throw Error(`${scene.id}: objeto ${id} ausente`);
 if(!scene.actions.some(a=>a.complete))throw Error(`${scene.id}: sem consequência conclusiva`);
 for(const action of scene.actions){if(actionIds.has(action.id))throw Error(`Ação duplicada ${action.id}`);actionIds.add(action.id);if(!verbs.has(action.verb)||!action.title||!action.detail||!Array.isArray(action.result))throw Error(`${scene.id}/${action.id}: ação inválida`);for(const id of action.discover||[])if(!C.evidence[id])throw Error(`${action.id}: descobre evidência inexistente ${id}`)}
}
for(const verb of verbs)if(!C.scenes.some(s=>s.actions.some(a=>a.verb===verb)))throw Error(`Verbo ${verb} nunca usado`);
const html=fs.readFileSync('index.html','utf8');for(const id of ['new','continue','dossier','casework','dialogue','panel','objects','audio'])if(!html.includes(`id="${id}"`))throw Error(`DOM ${id} ausente`);
const app=fs.readFileSync('app.js','utf8');for(const marker of ['master-investigation-v3','completedActions','characterKnowledge','leadOrder','await audio.resume()','pendingSound'])if(!app.includes(marker))throw Error(`Motor sem ${marker}`);if(app.includes('requireInspection')||app.includes('renderTimeline')||app.includes('renderSort'))throw Error('Motor antigo de minigames ainda presente');if(/tone\((?:[2-9]\d\d|\d{4,})/.test(app))throw Error('Paleta sonora contém frequência aguda direta');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));if(manifest.display!=='fullscreen'||manifest.orientation!=='landscape')throw Error('PWA não mantém fullscreen landscape');
if(!fs.readFileSync('sw.js','utf8').includes('diligencias-1'))throw Error('Service worker sem shell v3');
console.log(`PASS: ${C.scenes.length} cenas, ${Object.keys(C.evidence).length} evidências, ${actionIds.size} diligências, 4 verbos, firewall e PWA.`);
