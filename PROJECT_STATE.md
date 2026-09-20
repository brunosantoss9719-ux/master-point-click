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

20/09/2026 — campanha v2 implementada; fluxo e dados validados. Passe final no preview publicado pendente.

## LAST TEST

`npm test` — PASS: 9 cenas, 26 evidências, 8 mecânicas, firewall temporal, áudio/PWA, rotas alternativas e convergência.

## LAST COMMIT

A preencher após checkpoint desta reformulação.

## CURRENT BLOCKERS

- Playtest humano cego ainda necessário.
- Bônus Copa 2022 preservado fora do fluxo principal.

## NEXT REAL

Publicar checkpoint, executar no preview em landscape 915×412, landscape menor e retrato, corrigir falhas e registrar commit final.
