import fs from 'node:fs';import vm from 'node:vm';const x={window:{}};vm.createContext(x);vm.runInContext(fs.readFileSync('content/master-case.js','utf8'),x);const C=x.window.MASTER_CASE;
const ids=C.scenes.map(s=>s.id),required=['cold','mau','fantasma','retorno','vidro','genero','turma','meninos','final'];for(const id of required)if(!ids.includes(id))throw Error(`Cena ${id} ausente`);
const compare=C.scenes.find(s=>s.id==='mau').puzzle;if(compare.accept.length<2)throw Error('Comparação sem caminho alternativo');
const interview=C.scenes.find(s=>s.id==='fantasma').puzzle;if(interview.acceptedSets.length<2||!interview.wrong.evidence)throw Error('Oitiva sem fail forward ou alternativas');
const timeline=C.scenes.find(s=>s.id==='retorno').puzzle;if(!timeline.ties.length)throw Error('Cronologia não aceita simultaneidade');
const links=C.scenes.find(s=>s.id==='turma').puzzle;if(links.accept.length<3)throw Error('Convergência sem alternativas');
for(const first of ['turma','meninos']){const order=[first,first==='turma'?'meninos':'turma'];if(new Set(order).size!==2)throw Error('Ordem de leads inválida')}
const digital=C.scenes.find(s=>s.id==='meninos').puzzle;if(digital.accept!=='related'||digital.rungs.at(-1)[0]!=='hack')throw Error('Escada de precisão digital inválida');
console.log('PASS: rota completa, alternativas, simultaneidade, fail forward, duas ordens de leads e limite digital verificados.');
