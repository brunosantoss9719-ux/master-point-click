# AGENTS.md

- App estático: HTML/CSS/JS, sem build e sem backend.
- Rodar local: `npm start`; validar estrutura: `npm test`.
- Conteúdo e engine estão em `app.js`; estado salvo em `localStorage` (`master-ultima-chamada-v1`).
- Não apresentar dramatização como fato. Atualizar `SOURCES.md` ao mudar fatos.
- Validar mudanças visuais em landscape móvel e testar Continuar após recarga.
- GitHub é o cânone. Atualizar `PROJECT_STATE.md` no mesmo commit de handoff.
- PWA: `manifest.webmanifest` usa `display: fullscreen` e `orientation: landscape`; `sw.js` mantém o shell disponível offline.
- No primeiro toque em Novo jogo/Continuar, tentar Fullscreen API + Screen Orientation API; nunca bloquear o jogador se o navegador negar.
- Áudio é original e procedural via Web Audio API em `app.js`: apenas efeitos pontuais e discretos; não reintroduzir música ou ambiência contínua e não copiar efeitos de outros jogos.
