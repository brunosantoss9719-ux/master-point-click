# PROJECT STATE

## Estado atual

MASTER v3 é um thriller investigativo point-and-click em HTML/CSS/JavaScript. A arte aprovada foi preservada. O bloqueio “inspecione tudo → abra um minigame” e as oito mecânicas descartáveis foram removidos.

O núcleo agora é um grafo de 41 diligências com quatro verbos persistentes:

- **RASTREAR:** seguir nome, data, entidade ou identificador;
- **VERIFICAR:** pedir confirmação à fonte adequada;
- **CONFRONTAR:** pressionar uma afirmação e decidir o que revelar;
- **FORMALIZAR:** registrar uma conclusão estreita e sua consequência.

Objetos de cenário são opcionais e dão contexto. Diligências surgem pelo conhecimento já adquirido. Linhas fracas geram correção, resistência ou limite probatório; não existe “ERRADO”. A Turma e Os Meninos funcionam nas duas ordens e convergem.

## Conteúdo e voz

- 9 cenas, 27 evidências e 41 diligências.
- Mara, Lia, Bia e Jo têm sintaxe, tamanho médio de fala e objetivo distintos.
- A oitiva aceita preparação por data ou função, exige confronto documental e inclui apresentação inadequada com fail forward.
- Prólogo curto e operacional; aeroporto recontextualizado depois.
- Autoridades reais aparecem somente por atos públicos.
- Final mantém Pet 16662 e destino da cópia como PENDENTE.
- Bônus Copa 2022 preservado fora do fluxo principal.

## Estado e persistência

Chave `master-investigation-v3`. O save representa cena, evidências, inspeções, conclusões, flags de confronto, conhecimento, ordem das linhas, beats, diligências concluídas, log de ações, recontextualizações, dicas e fontes abertas. Saves v2 são ignorados porque o modelo de jogo mudou.

## Áudio

Web Audio procedural, desbloqueado no primeiro gesto e nunca bloqueante. Paleta principal em 73–147 Hz, passa-baixa de 260–340 Hz, volumes maiores que na v2, ataque macio e caudas curtas. Há sinais distintos para papel, diligência, limite, conclusão e fala. Sem música/ambiência contínua, conforme o cânone; nenhum efeito foi copiado.

## Validação

`npm test` valida schema, fontes, PWA, ausência do motor antigo, quatro verbos, resumo de evidências, 41 diligências e quatro playthroughs completos: dois caminhos iniciais × duas ordens de leads. As rotas incluem escolhas ruins, confronto inadequado e conclusão digital exagerada.

O navegador automatizado local não estava disponível (`google-chrome` e `agent-browser` ausentes). Depois da publicação do commit, o navegador remoto abriu o mesmo SHA por espelho estático: título, arte, diálogo, caderno, ação, fail forward e retomada foram exercitados. Os únicos erros de console pertenciam à extensão do navegador de QA, não ao jogo.

## LAST VERIFIED STATE

21/09/2026 — v3 publicada no `main`. Browser em 1363×936: abertura, objetos, Caderno de Diligências, conferência da ordem/embarque, formalização excessiva sobre fuga, correção sem bloqueio, conclusão do prólogo, reload e Continuar em “O mau cheiro” passaram. Não houve overflow horizontal. A checagem foi feita contra o SHA publicado, não contra arquivos locais.

## LAST TEST

`npm test` — PASS: 9 cenas, 27 evidências, 41 diligências, 4 verbos, firewall, PWA, caminhos alternativos, fail forward e duas ordens de leads. Browser público: prólogo, fail forward e save/reload/Continuar PASS.

## LAST COMMIT

`492a6d89c725bf27a5304b7d388e99ad5445079a` — `feat: rebuild case around investigative diligences`.

## CURRENT BLOCKERS

- Verificação visual exata em 915×412, landscape menor e retrato: o navegador remoto não expõe mudança de viewport e o Chrome local não existe.
- Playtest humano cego continua necessário para medir diversão e dificuldade; automação não prova isso.
- Não há integração de deploy no repositório: sem workflow, GitHub Pages, CLI Vercel ou vínculo `.vercel`. O código está no GitHub; não há produção para promover automaticamente.

## NEXT REAL

Abrir o jogo em aparelho landscape, percorrer uma campanha sem conhecer as soluções e ajustar somente fricção observada. Depois, configurar um destino de deploy canônico se a publicação pública for desejada.
