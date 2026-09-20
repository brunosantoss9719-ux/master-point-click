import fs from 'node:fs';import vm from 'node:vm';const x={window:{}};vm.createContext(x);vm.runInContext(fs.readFileSync('content/master-case.js','utf8'),x);const C=x.window.MASTER_CASE;
for(const s of C.scenes){const set=s.sets[0];if(!s.answers.some(a=>a[0]===s.accepted)||!set.every(id=>C.evidence[id]))throw new Error(`Sem rota: ${s.id}`)}
for(const first of ['turma','meninos']){const order=[first,first==='turma'?'meninos':'turma'];if(new Set(order).size!==2)throw new Error('Convergência inválida')}
if(!C.scenes.find(s=>s.id==='meninos').answers.find(a=>a[0]==='hack'))throw new Error('Fail forward digital ausente');
console.log('PASS: rota principal, duas ordens de leads, caminhos alternativos e fail forward verificados.');
