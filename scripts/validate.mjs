import fs from 'node:fs';
const required=['index.html','styles.css','app.js','assets/office.webp','assets/boardroom.webp','assets/hangar.webp','assets/interview.webp','assets/characters.webp','AGENTS.md','PROJECT_STATE.md','SOURCES.md','STORY.md','ART_BIBLE.md'];
const missing=required.filter(f=>!fs.existsSync(f));
if(missing.length){console.error('Arquivos ausentes:',missing.join(', '));process.exit(1)}
const js=fs.readFileSync('app.js','utf8');
const scenes=(js.match(/chapter:'CAPÍTULO/g)||[]).length;
const endings=(js.match(/title:'(?:A PASTA ABERTA|A FORTALEZA VAZIA|O HOMEM NO VIDRO)'/g)||[]).length;
if(scenes!==5||endings!==3){console.error({scenes,endings});process.exit(1)}
console.log(`OK: ${scenes} cenas, ${endings} finais, ${required.length} arquivos essenciais.`);
