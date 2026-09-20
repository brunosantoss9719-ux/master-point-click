import fs from 'node:fs';import vm from 'node:vm';
for(const f of ['index.html','styles.css','app.js','content/sources.js','content/master-case.js','manifest.webmanifest','sw.js','STORY.md','SOURCES.md','ART_BIBLE.md','PROJECT_STATE.md'])if(!fs.existsSync(f))throw new Error(`${f} ausente`);
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync('content/sources.js','utf8'),context);vm.runInContext(fs.readFileSync('content/master-case.js','utf8'),context);
const C=context.window.MASTER_CASE,S=context.window.MASTER_SOURCES;if(C.scenes.length!==9)throw new Error('Campanha deve ter 9 cenas');
for(const [id,e] of Object.entries(C.evidence)){for(const key of ['title','summary','eventDate','documentDate','knownToPFDate','knownToPlayerDate','publishedDate','status','sourceId','knownBy'])if(!(key in e))throw new Error(`${id}.${key} ausente`);if(!S[e.sourceId])throw new Error(`Fonte ${e.sourceId} ausente`)}
const modes=new Set(['brief','compare','interview','timeline','sort','links','ladder','custody']);
for(const s of C.scenes){if(!s.question||!s.outcome||!modes.has(s.puzzle?.type)||!s.objects?.length)throw new Error(`Mistério incompleto: ${s.id}`);for(const [id] of s.objects)if(!C.evidence[id])throw new Error(`${s.id}: evidência ${id} ausente`)}
for(const type of modes)if(!C.scenes.some(s=>s.puzzle.type===type))throw new Error(`Mecânica ${type} ausente`);
const html=fs.readFileSync('index.html','utf8');for(const id of ['new','continue','dossier','casework','dialogue','panel','objects','audio'])if(!html.includes(`id="${id}"`))throw new Error(`DOM ${id} ausente`);
const css=fs.readFileSync('styles.css','utf8');if(css.includes('.hotspot'))throw new Error('Rodas/hotspots antigos ainda existem');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest'));if(manifest.display!=='fullscreen'||manifest.orientation!=='landscape')throw new Error('PWA não mantém fullscreen landscape');
const app=fs.readFileSync('app.js','utf8');for(const marker of ['await audio.resume()','pendingSound','setInterval','sceneProgress','knownToPlayerDate'])if(!app.includes(marker))throw new Error(`Motor sem ${marker}`);if(/tone\((?:[4-9]\d\d|\d{4,})/.test(app))throw new Error('Paleta sonora contém disparos agudos');
console.log(`PASS: ${C.scenes.length} cenas, ${Object.keys(C.evidence).length} evidências, 8 mecânicas, firewall temporal, áudio e PWA validados.`);
