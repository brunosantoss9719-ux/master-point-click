# PROJECT STATE

## Estado atual

MASTER é uma campanha point-and-click em HTML/CSS/JavaScript. A identidade visual foi preservada; o loop “círculo → cartões → resposta binária” foi removido.

O motor oferece oito ações: termo operacional, comparação de documentos, confronto com evidência, cronologia, classificação, conexões independentes, teto de conclusão digital e termo de custódia. Marcadores circulares viraram etiquetas discretas ligadas a objetos. A Mesa do Caso abre após inspeção, sem pixel hunting.

## Áudio

Áudio procedural em 92–196 Hz, passa-baixa e envelopes curtos. Fala digitada caractere a caractere com blips discretos por personagem. O primeiro `pointerdown/touchend` retoma o AudioContext; pedidos durante o desbloqueio ficam em fila. O botão mostra estado. Sem música contínua.

## Persistência

Chave `master-investigation-v2`: cena, evidências, inspeções, conclusões, falhas, conhecimento, ordem das linhas, beats, recontextualização, dicas, fontes, progresso de puzzle e término. Save v1 é ignorado porque o modelo mudou.

## Conteúdo

- 9 cenas, 26 evidências e firewall temporal.
- Documentos compostos marcados DRAMATIZAÇÃO.
- Autoridades reais somente por atos públicos.
- Segunda prisão separada da primeira.
- Ordem A Turma/Os Meninos livre e convergente.
- Final em 19/09/2026 PENDENTE.

## Validação honesta

`npm test` cobre schema, fontes, PWA, ausência de rodas, oito mecânicas, alternativas, simultaneidade, fail forward, duas ordens e limite digital. Automação não certifica diversão ou dificuldade humana.

## LAST VERIFIED STATE

20/09/2026 — campanha v2 implementada e percorrida no preview publicado até o final. Objetos por toque, dedução exagerada + correção, fail forward da oitiva, save/reload/Continuar, Dossiê, convergência e retomada do final passaram. Controle de som alternou sem erro de página.

## LAST TEST

`npm test` — PASS: 9 cenas, 26 evidências, 8 mecânicas, firewall temporal, áudio/PWA, rotas alternativas e convergência. Browser: rota A Turma → Os Meninos → final PASS; save/reload e final retomável PASS.

## LAST COMMIT

`eb741e9b9f9be818ee8816968e459c14f61dfc53` — último commit de código percorrido integralmente no preview. Este documento registra o QA posterior.

## CURRENT BLOCKERS

- Playtest humano cego ainda necessário para calibrar diversão e dificuldade.
- O navegador de QA conectado não oferece mudança de viewport; o passe visual mobile exato por screenshot continua pendente, sem falso PASS.
- Bônus Copa 2022 preservado fora do fluxo principal.

## NEXT REAL

Executar playtest humano cego e passe visual em aparelho/viewport móvel real; ajustar somente problemas observados.
