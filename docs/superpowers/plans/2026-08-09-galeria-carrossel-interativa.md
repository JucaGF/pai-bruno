# Galeria Carrossel Interativa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar a galeria Yellowar em um carrossel inicial com duas fileiras animadas e uma grade completa revelada por botão.

**Architecture:** A galeria continuará mantendo uma única fonte de verdade: os 52 itens existentes em `.gallery-grid`. O JavaScript lerá essas imagens e criará duas faixas visuais duplicadas para o preview; o botão alternará classes, acessibilidade e visibilidade entre preview e grade. O CSS cuidará do loop infinito, máscaras laterais, transições, responsividade e redução de movimento.

**Tech Stack:** HTML estático, CSS, JavaScript vanilla, testes Node com `node:assert` e diálogo HTML existente.

## Global Constraints

- O estado inicial é compacto.
- O preview ocupa toda a largura da janela e tem duas fileiras de miniaturas.
- As duas faixas se movem em sentidos opostos e usam conteúdo duplicado para um loop sem salto.
- O botão alterna entre “Ver todas as fotos” e “Recolher galeria” usando `aria-expanded`.
- A grade expandida preserva todas as 52 fotos e a abertura no diálogo ampliado.
- As animações pausam ao passar o mouse ou focar a galeria.
- `prefers-reduced-motion: reduce` desativa o movimento contínuo.
- A implementação não adiciona dependências.
- As alterações devem preservar os arquivos não relacionados já existentes no workspace.

---

### Task 1: Criar os testes de contrato visual e de interação

**Files:**
- Create: `tests/gallery-interaction.test.js`
- Read: `index.html`, `styles.css`, `script.js`

**Interfaces:**
- Consumes: os seletores e classes da galeria atual.
- Produces: verificações estáticas para a estrutura do preview, estados acessíveis, animação e alternância.

- [ ] **Step 1: Write the failing test**

Criar um teste Node que leia os três arquivos e verifique os contratos abaixo:

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

assert.match(html, /data-gallery-preview/);
assert.match(html, /data-gallery-track="forward"/);
assert.match(html, /data-gallery-track="reverse"/);
assert.match(html, /data-gallery-toggle/);
assert.match(html, /aria-expanded="false"/);
assert.match(html, /id="gallery-grid"/);
assert.match(css, /@keyframes gallery-marquee/);
assert.match(css, /gallery-preview[\s\S]*?100vw/);
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.match(js, /gallery--expanded/);
assert.match(js, /aria-hidden/);
assert.match(js, /inert/);

console.log('gallery interaction contract checks passed');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/gallery-interaction.test.js`

Expected: FAIL porque a página ainda não contém o preview, o botão de alternância nem os ganchos de estado da galeria.

- [ ] **Step 3: Commit**

```bash
git add tests/gallery-interaction.test.js
git commit -m "test: define interactive gallery contract"
```

### Task 2: Adicionar a estrutura compacta e os estilos do carrossel

**Files:**
- Modify: `index.html:148-367`
- Modify: `styles.css:807-924` e blocos responsivos da galeria

**Interfaces:**
- Consumes: `data-gallery-image` e a grade existente de 52 fotos.
- Produces: `[data-gallery-preview]`, `[data-gallery-track="forward"]`, `[data-gallery-track="reverse"]`, `[data-gallery-toggle]`, `#gallery-grid` e as classes CSS de preview/estado.

- [ ] **Step 1: Add the compact gallery markup**

Inserir antes da grade existente:

```html
<div class="gallery-preview" data-gallery-preview aria-label="Prévia animada das memórias Yellowar">
  <div class="gallery-track gallery-track--forward" data-gallery-track="forward"></div>
  <div class="gallery-track gallery-track--reverse" data-gallery-track="reverse"></div>
</div>
<button class="gallery-toggle" type="button" data-gallery-toggle aria-expanded="false" aria-controls="gallery-grid">
  <span data-gallery-toggle-label>Ver todas as fotos</span>
  <span class="gallery-toggle-mark" aria-hidden="true">↗</span>
</button>
```

Adicionar `id="gallery-grid"` e `data-gallery-grid` à grade existente. A estrutura deve continuar contendo todos os botões `data-gallery-image` para preservar o diálogo ampliado.

- [ ] **Step 2: Add the carousel styles**

Implementar o visual com estes contratos:

```css
.gallery-preview {
  position: relative;
  display: grid;
  gap: 14px;
  width: 100vw;
  margin: 42px calc(50% - 50vw) 28px;
  overflow: hidden;
  padding: 14px 0;
}

.gallery-preview::before,
.gallery-preview::after {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: min(12vw, 130px);
  content: "";
  pointer-events: none;
}

.gallery-preview::before {
  left: 0;
  background: linear-gradient(90deg, var(--paper) 0%, transparent 100%);
}

.gallery-preview::after {
  right: 0;
  background: linear-gradient(270deg, var(--paper) 0%, transparent 100%);
}

.gallery-track {
  display: flex;
  width: max-content;
  gap: 14px;
  animation: gallery-marquee 58s linear infinite;
}

.gallery-track--reverse {
  animation-direction: reverse;
  animation-duration: 66s;
}

.gallery-preview:hover .gallery-track,
.gallery-preview:focus-within .gallery-track {
  animation-play-state: paused;
}

@keyframes gallery-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

As miniaturas devem ter largura fluida, proporção 4/3, moldura branca e pequenas rotações alternadas para manter a colagem. O preview deve ser edge-to-edge sem criar rolagem horizontal no `body`.

- [ ] **Step 3: Style the compact/expanded states and responsive layout**

O modo interativo deve esconder visualmente a grade enquanto compacto e revelar ambos com transição quando `.gallery--expanded` estiver presente. O modo sem JavaScript deve continuar mostrando a grade normalmente. No mobile, reduzir miniaturas, gap e bordas sem remover as duas fileiras.

- [ ] **Step 4: Run the contract test**

Run: `node tests/gallery-interaction.test.js`

Expected: ainda pode falhar somente nas verificações do comportamento JavaScript (`gallery--expanded`, `aria-hidden` e `inert`), caso esses ganchos ainda não tenham sido adicionados.

### Task 3: Implementar a alternância acessível e a criação das faixas

**Files:**
- Modify: `script.js:1-140`
- Test: `tests/gallery-interaction.test.js`

**Interfaces:**
- Consumes: `[data-gallery-preview]`, `[data-gallery-track]`, `[data-gallery-toggle]`, `[data-gallery-grid]` e os 52 `[data-gallery-image]`.
- Produces: inicialização visual da galeria e função de alternância entre os estados.

- [ ] **Step 1: Add gallery references and track builder**

Adicionar referências aos elementos e uma função que transforme cada imagem da grade em um cartão não-interativo de preview. Cada faixa deve receber a sequência completa duas vezes; os cartões duplicados devem usar `aria-hidden="true"` e `alt=""` para não duplicar conteúdo para leitores de tela.

```js
const gallery = document.querySelector('.gallery');
const galleryPreview = document.querySelector('[data-gallery-preview]');
const galleryGrid = document.querySelector('[data-gallery-grid]');
const galleryToggle = document.querySelector('[data-gallery-toggle]');
const galleryToggleLabel = document.querySelector('[data-gallery-toggle-label]');
const galleryTracks = [...document.querySelectorAll('[data-gallery-track]')];
```

- [ ] **Step 2: Add the state transition**

Implementar `setGalleryExpanded(expanded)` para:

```js
gallery.classList.toggle('gallery--expanded', expanded);
galleryToggle.setAttribute('aria-expanded', String(expanded));
galleryGrid.setAttribute('aria-hidden', String(!expanded));
galleryGrid.inert = !expanded;
galleryToggleLabel.textContent = expanded ? 'Recolher galeria' : 'Ver todas as fotos';
```

O botão deve iniciar compacto, alternar ao clique e manter foco no próprio botão. A grade deve recuperar a navegação por teclado apenas quando expandida.

- [ ] **Step 3: Respect reduced motion**

Adicionar em CSS a regra `@media (prefers-reduced-motion: reduce)` para zerar a animação das faixas, sem esconder o preview nem impedir a expansão.

- [ ] **Step 4: Run the focused tests**

Run: `node tests/gallery-interaction.test.js`

Expected: `gallery interaction contract checks passed`.

- [ ] **Step 5: Commit the feature**

```bash
git add index.html styles.css script.js tests/gallery-interaction.test.js
git commit -m "feat: add interactive yellowar gallery"
```

### Task 4: Verificar regressões e revisar a experiência no navegador

**Files:**
- Read: `index.html`, `styles.css`, `script.js`
- Test: `tests/gallery-interaction.test.js`, `tests/gallery-completeness.test.js`, `tests/tribute-layout.test.js`, `tests/audio-title.test.js`

**Interfaces:**
- Consumes: a implementação completa das Tasks 1–3.
- Produces: confirmação de que a galeria, a homenagem, a trilha e o diálogo continuam funcionando.

- [ ] **Step 1: Run all static checks**

Run:

```bash
node tests/gallery-interaction.test.js
node tests/gallery-completeness.test.js
node tests/tribute-layout.test.js
node tests/audio-title.test.js
node --check script.js
git diff --check
```

Expected: todos os testes passam, a verificação de sintaxe não produz erro e `git diff --check` não imprime problemas.

- [ ] **Step 2: Inspect the compact state with Computer Use**

Abrir/recarregar `file:///Users/juca/Projects/pai-bruno/index.html`, navegar até `#galeria` e verificar que:

- há duas fileiras ocupando a largura da janela;
- as bordas têm fade e não há barra de rolagem horizontal;
- as fileiras se movimentam suavemente em sentidos opostos;
- o botão está legível e não encobre nenhuma foto.

- [ ] **Step 3: Inspect the expanded state with Computer Use**

Ativar “Ver todas as fotos” e verificar que:

- o carrossel some suavemente;
- a grade completa aparece sem sobreposições;
- as 52 fotos continuam legíveis e clicáveis;
- o botão vira “Recolher galeria”;
- o layout continua utilizável em uma largura móvel.

- [ ] **Step 4: Review the diff and preserve unrelated files**

Run: `git status --short` e `git diff --stat HEAD^ HEAD`.

Confirmar que somente a implementação da galeria e seu teste foram registrados, preservando os itens não relacionados já presentes no workspace.

