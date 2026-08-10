# Galeria sem legendas e com preenchimento masonry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover as legendas visuais da galeria e reduzir os espaços vazios entre fotos usando CSS Grid denso, sem alterar o carrossel, o zoom ou a moldura branca.

**Architecture:** `index.html` continuará responsável pela lista de botões e imagens da galeria. `styles.css` controlará a grade responsiva, spans e moldura. `tests/gallery-interaction.test.js` receberá contratos estáticos para garantir que as legendas foram removidas e que o fluxo denso permanece configurado.

**Tech Stack:** HTML estático, CSS Grid, Node.js com `node:assert/strict`.

## Global Constraints

- Manter a moldura branca em todos os tamanhos.
- Preservar `alt`, `data-gallery-image`, carrossel de prévia e modal de zoom.
- Remover apenas as legendas visuais `.gallery-caption` da galeria.
- Usar `grid-auto-flow: dense` para reduzir lacunas no preenchimento da grade.
- Não alterar arquivos de imagem ou outras seções da página.

---

### Task 1: Atualizar os contratos da galeria

**Files:**
- Modify: `tests/gallery-interaction.test.js`

**Interfaces:**
- Consumes: HTML e CSS atuais carregados pelos testes existentes.
- Produces: verificações para ausência de `.gallery-caption` dentro dos itens da galeria e presença de `grid-auto-flow: dense`.

- [ ] **Step 1: Adicionar as asserções de comportamento esperado**

Adicionar ao teste:

```js
assert.doesNotMatch(html, /<span class="gallery-caption">/);
assert.match(css, /\.gallery-grid\s*\{[\s\S]*?grid-auto-flow:\s*dense/);
```

- [ ] **Step 2: Rodar o teste para confirmar a falha**

Run: `node tests/gallery-interaction.test.js`

Expected: FAIL porque o HTML ainda contém legendas e a grade ainda não declara fluxo denso.

### Task 2: Remover as legendas visuais do HTML

**Files:**
- Modify: `index.html:166-` — itens da `.gallery-grid`

**Interfaces:**
- Consumes: os mesmos botões `.gallery-item` usados pelo `script.js`.
- Produces: itens com apenas a imagem, mantendo `alt`, `loading`, `decoding`, `data-gallery-image` e `data-reveal`.

- [ ] **Step 1: Remover os spans de legenda**

Excluir somente as linhas `<span class="gallery-caption">...</span>` dentro de `.gallery-grid`. Não remover os `alt` nem os atributos dos botões e imagens.

- [ ] **Step 2: Confirmar que a galeria continua completa**

Run: `node tests/gallery-completeness.test.js`

Expected: PASS com pelo menos 40 imagens.

### Task 3: Ajustar o Grid responsivo para preencher as lacunas

**Files:**
- Modify: `styles.css:964-1058` — regras principais da galeria
- Modify: `styles.css:1383-1395` — ajuste de tablet
- Modify: `styles.css:1595-1654` — ajuste mobile

**Interfaces:**
- Consumes: classes de span já existentes (`gallery-item--large`, `--landscape`, `--tall`, `--square`, `--archive-wide`).
- Produces: grade com fluxo denso e sem regras de legenda visual.

- [ ] **Step 1: Adicionar fluxo denso e reduzir a unidade vertical**

Na regra principal `.gallery-grid`, manter as quatro colunas proporcionais e o gap atual, adicionar `grid-auto-flow: dense` e reduzir `grid-auto-rows` de `180px` para `150px` para permitir encaixe mais fino das proporções.

- [ ] **Step 2: Preservar as adaptações por breakpoint**

Manter três colunas no breakpoint intermediário e duas colunas no mobile. Ajustar apenas as regras necessárias para evitar spans de duas colunas quando a grade tiver duas colunas, sem remover a moldura nem o efeito de hover.

- [ ] **Step 3: Remover o estilo não utilizado das legendas**

Excluir a regra `.gallery-caption` do CSS principal e a regra equivalente dentro do breakpoint mobile.

- [ ] **Step 4: Rodar os contratos da galeria**

Run: `node tests/gallery-interaction.test.js`

Expected: PASS com os contratos de carrossel, expansão, acessibilidade, fluxo denso e ausência de legendas.

### Task 4: Verificar a página inteira

**Files:**
- Test: `tests/gallery-completeness.test.js`
- Test: `tests/gallery-interaction.test.js`
- Test: `tests/tribute-layout.test.js`

**Interfaces:**
- Consumes: HTML e CSS finais.
- Produces: validação de contagem, interação e layout geral sem regressões.

- [ ] **Step 1: Executar todos os testes estáticos**

Run: `node tests/gallery-completeness.test.js && node tests/gallery-interaction.test.js && node tests/tribute-layout.test.js`

Expected: PASS em todos os testes.

- [ ] **Step 2: Conferir o diff final**

Run: `git diff --check && git diff -- index.html styles.css tests/gallery-interaction.test.js`

Expected: nenhuma falha de whitespace e apenas as mudanças previstas na galeria.
