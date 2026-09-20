import fs from 'node:fs';
const required=['index.html','styles.css','app.js','manifest.webmanifest','sw.js','assets/icon-192.svg','assets/icon-512.svg','assets/office.webp','assets/boardroom.webp','assets/hangar.webp','assets/interview.webp','assets/characters.webp','assets/toffoli.webp','assets/stf-office.webp','assets/andre-mendonca.webp','assets/pf-lab.webp','assets/copa-2022-operatives.webp','assets/copa-residence-street.webp','assets/copa-civic-avenue.webp','assets/copa-abort-road.webp','AGENTS.md','PROJECT_STATE.md','SOURCES.md','STORY.md','ART_BIBLE.md'];
const missing=required.filter(f=>!fs.existsSync(f));
if(missing.length){console.error('Arquivos ausentes:',missing.join(', '));process.exit(1)}
const js=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
const scenes=(js.match(/chapter:'(?:CAPÍTULO|TOFFOLINHO|MENDONÇA|BÔNUS)/g)||[]).length;
const endings=(js.match(/title:'(?:A PASTA ABERTA|A FORTALEZA VAZIA|O HOMEM NO VIDRO)'/g)||[]).length;
const puzzles=(js.match(/puzzle:\{type:/g)||[]).length;
const mechanisms=['mosaic','slider','dials','circuit','switches','cipher'];
if(scenes!==17||endings!==3||puzzles!==15||!js.includes('showToffoliEnding')||!js.includes('showMendoncaEnding')||!js.includes('showCopaEnding')||!js.includes('solveAdventurePuzzle')||mechanisms.some(mode=>!js.includes(`mode:'${mode}'`))){console.error({scenes,endings,puzzles,toffoliEnding:js.includes('showToffoliEnding'),mendoncaEnding:js.includes('showMendoncaEnding'),copaEnding:js.includes('showCopaEnding'),mechanisms});process.exit(1)}
if(manifest.display!=='fullscreen'||manifest.orientation!=='landscape'){console.error('PWA não está configurada para fullscreen landscape');process.exit(1)}
const iconSizes=new Set((manifest.icons||[]).map(icon=>icon.sizes));
if(!iconSizes.has('192x192')||!iconSizes.has('512x512')){console.error('Ícones PWA obrigatórios ausentes');process.exit(1)}
if(!html.includes('rel="manifest"')||!html.includes('id="bonus-game"')||html.includes('id="rotate"')){console.error('Entrada PWA/bônus/rotação inválida');process.exit(1)}
if(!js.includes('requestFullscreen')||!js.includes("orientation.lock('landscape')")||!js.includes('serviceWorker.register')){console.error('Modo imersivo incompleto');process.exit(1)}
if(!js.includes('audio.blip')||!js.includes('audio.interact')||!js.includes('audio.puzzleTick')||!js.includes('audio.success')||!js.includes('wakeSound')||js.includes('scheduleChord')||js.includes('startAmbience')){console.error('Efeitos pontuais/desbloqueio de áudio ausentes ou música contínua ainda presente');process.exit(1)}
if(js.includes('data-puzzle-tool')||js.includes('data-puzzle-target')||js.includes('Ligue cada')){console.error('Interface antiga de ferramenta/alvo ainda está ativa');process.exit(1)}
console.log(`OK: ${scenes} cenas, ${puzzles} puzzles em ${mechanisms.length} mecanismos, campanha bônus Copa 2022, ${endings} finais principais, PWA fullscreen landscape e áudio desbloqueável.`);
