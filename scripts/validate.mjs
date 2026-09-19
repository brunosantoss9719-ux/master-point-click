import fs from 'node:fs';
const required=['index.html','styles.css','app.js','manifest.webmanifest','sw.js','assets/icon-192.svg','assets/icon-512.svg','assets/office.webp','assets/boardroom.webp','assets/hangar.webp','assets/interview.webp','assets/characters.webp','AGENTS.md','PROJECT_STATE.md','SOURCES.md','STORY.md','ART_BIBLE.md'];
const missing=required.filter(f=>!fs.existsSync(f));
if(missing.length){console.error('Arquivos ausentes:',missing.join(', '));process.exit(1)}
const js=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
const scenes=(js.match(/chapter:'CAPÍTULO/g)||[]).length;
const endings=(js.match(/title:'(?:A PASTA ABERTA|A FORTALEZA VAZIA|O HOMEM NO VIDRO)'/g)||[]).length;
if(scenes!==5||endings!==3){console.error({scenes,endings});process.exit(1)}
if(manifest.display!=='fullscreen'||manifest.orientation!=='landscape'){console.error('PWA não está configurada para fullscreen landscape');process.exit(1)}
const iconSizes=new Set((manifest.icons||[]).map(icon=>icon.sizes));
if(!iconSizes.has('192x192')||!iconSizes.has('512x512')){console.error('Ícones PWA obrigatórios ausentes');process.exit(1)}
if(!html.includes('rel="manifest"')||html.includes('id="rotate"')){console.error('Entrada PWA/rotação inválida');process.exit(1)}
if(!js.includes('requestFullscreen')||!js.includes("orientation.lock('landscape')")||!js.includes('serviceWorker.register')){console.error('Modo imersivo incompleto');process.exit(1)}
if(!js.includes('audio.blip')||!js.includes('scheduleChord')){console.error('Camada de áudio ausente');process.exit(1)}
console.log(`OK: ${scenes} cenas, ${endings} finais, PWA fullscreen landscape, áudio e ${required.length} arquivos essenciais.`);
