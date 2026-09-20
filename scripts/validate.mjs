import fs from 'node:fs';import vm from 'node:vm';
for(const f of ['index.html','styles.css','app.js','content/sources.js','content/master-case.js','manifest.webmanifest','sw.js','STORY.md','SOURCES.md','ART_BIBLE.md','PROJECT_STATE.md'])if(!fs.existsSync(f))throw new Error(`${f} ausente`);
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync('content/sources.js','utf8'),context);vm.runInContext(fs.readFileSync('content/master-case.js','utf8'),context);
const C=context.window.MASTER_CASE,S=context.window.MASTER_SOURCES;if(C.scenes.length!==9)throw new Error('Campanha deve ter 9 cenas');
for(const [id,e] of Object.entries(C.evidence)){for(const key of ['title','summary','eventDate','documentDate','knownToPFDate','publishedDate','status','sourceId'])if(!(key in e))throw new Error(`${id}.${key} ausente`);if(!S[e.sourceId])throw new Error(`Fonte ${e.sourceId} ausente`)}
for(const s of C.scenes){if(!s.question||!s.answers||!s.sets?.length)throw new Error(`Mistério incompleto: ${s.id}`);for(const set of s.sets)for(const id of set)if(!C.evidence[id])throw new Error(`${s.id}: evidência ${id} ausente`)}
const html=fs.readFileSync('index.html','utf8');for(const id of ['new','continue','dossier','infer','dialogue','panel'])if(!html.includes(`id="${id}"`))throw new Error(`DOM ${id} ausente`);
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest'));if(manifest.display!=='fullscreen'||manifest.orientation!=='landscape')throw new Error('PWA não mantém fullscreen landscape');
const app=fs.readFileSync('app.js','utf8');if(!app.includes("filter.type='lowpass'")||!app.includes("sound('evidence')")||!app.includes("sound('success')")||/tone\((?:[5-9]\d\d|\d{4,})/.test(app))throw new Error('Paleta sonora confortável não foi aplicada ou ainda contém disparos agudos');
console.log(`PASS: ${C.scenes.length} cenas, ${Object.keys(C.evidence).length} evidências temporais, fontes, PWA e DOM validados.`);
