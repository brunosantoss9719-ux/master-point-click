# Estado do projeto

## LAST VERIFIED STATE
Jogo na `main` com dois arcos e 8 cenas: 5 cenas de Daniel Vorcaro e 3 cenas jogáveis de Toffolinho, celular, inventário, Dossiê com 13 entradas, escolhas, consequências atrasadas, 3 finais do primeiro arco, encerramento `A CHAVE MUDA DE MÃO` e autosave/Continuar. O arco Toffolinho cobre sigilo, custódia das provas, pressão envolvendo o Tayayá e livre redistribuição; termina quando o sorteio leva o caso a André Mendonça. A intenção de “ferrar tudo” é tratada explicitamente como lente satírica, não como fato, e decisões/documentos aparecem classificados no Dossiê.

Direção visual em pixel art/cartum detalhado. Toffolinho usa o retrato transparente original `assets/toffoli.webp` sobre o novo gabinete noturno `assets/stf-office.webp`; Daniel mantém `assets/daniel-vorcaro.webp` e Helena, Otávio, Caio e Investigadora continuam em `assets/characters.webp`. As referências foram registradas em `ART_BIBLE.md` e os novos arquivos integram o shell offline `master-shell-v6`.

O jogo permanece uma PWA instalável com `display: fullscreen`, orientação landscape preferencial, tentativa de Fullscreen API + lock de orientação no primeiro toque e fallback jogável em retrato sem tela bloqueadora. O viewport acompanha a área visual real do navegador e respeita safe areas. A instalação agora usa ícones PNG 192/512 além dos SVGs e o botão `Instalar app` permanece acessível fora do modo instalado, com instrução curta quando o navegador interno não expõe o prompt nativo. Áudio original procedural: cama lo-fi noturna, ambiência filtrada, beat discreto, blips de diálogo por personagem e controle de mudo; a mixagem foi reforçada para alto-falantes de celular e retoma o contexto de áudio ao voltar ao jogo.

Preview do código integrado: https://raw.githack.com/brunosantoss9719-ux/master-point-click/25b47691042414793605007cb381ff2baeca69f8/index.html

## LAST TEST
2026-09-19: QA run 29 (`35471443371`) passou no commit `25b47691042414793605007cb381ff2baeca69f8`. `npm test` confirmou 3 rotas Vorcaro, o arco Toffolinho completo, 8 cenas, 13 entradas de Dossiê, os 3 finais anteriores e `A CHAVE MUDA DE MÃO`; `node --check app.js` e `git diff --check` passaram. O smoke real em Chrome headless validou 915×412 landscape, 412×915 retrato, service worker ativo e os novos assets. As três capturas foram revisadas visualmente: viewport preenchido, diálogo legível, hotspots livres, Toffolinho bem enquadrado e fallback em retrato sem tela bloqueadora.

## LAST COMMIT
25b47691042414793605007cb381ff2baeca69f8 (arco jogável do Toffolinho, arte original, novo cenário, 4 entradas de Dossiê e final em André Mendonça).

## CURRENT BLOCKERS
Nenhum bloqueador funcional conhecido no código. Preview Vercel continua dependendo de autenticação/conexão do projeto; a experiência instalada em um aparelho Android físico ainda não foi verificada nesta sessão.

## NEXT REAL
Se o próximo arco for solicitado, começar exatamente no recebimento do processo por André Mendonça. Antes disso, o polimento de maior impacto é criar expressões alternativas de Toffolinho para as escolhas de sigilo, caixa lacrada e saída da relatoria.
