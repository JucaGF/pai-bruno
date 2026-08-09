# Carta-amarela do Yellowar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Construir uma homenagem estática, responsiva e navegável para o Pai Bruno, com estética de colagem Yellowar, fotos do encontro de 11 de julho de 2025, mensagens de carinho, referência a Santo Inácio e trilha sonora controlável.

**Architecture:** A página será um site estático sem framework: index.html define a narrativa e os elementos acessíveis, styles.css concentra a identidade visual e os breakpoints, e script.js controla player, entrada suave e galeria ampliada. Os arquivos principais serão copiados para assets/ com nomes estáveis.

**Tech Stack:** HTML semântico, CSS moderno, JavaScript de navegador sem dependências, áudio M4A, imagens JPEG/PNG e servidor estático local para verificação.

## Global Constraints

- O site deve chamar o homenageado de Pai Bruno e o círculo de Yellowar.
- A data deve aparecer como 11 de julho de 2025 e 11.07.2025.
- O texto final deve ser exatamente: Com amor família Yellowar! 🌻💛
- A página deve funcionar sem build step ou dependência externa.
- A reprodução inicia por ação explícita do usuário.
- Imagens verticais permanecem verticais e rostos não podem ser escondidos por recortes.
- Movimento deve respeitar prefers-reduced-motion.
- Nenhum arquivo enviado pelo usuário deve ser sobrescrito ou removido.

## File Map

- Create: index.html — shell semântico, textos, imagens e controles.
- Create: styles.css — tokens, colagem, tipografia, layout, foco e reduced motion.
- Create: script.js — player, reveal, navegação e galeria ampliada.
- Create: assets/pai-bruno.jpg, assets/yellowar-grupo.jpg, assets/yellowar-maos.jpg, assets/cartaz-yellowar.jpg, assets/logo-ejc.png, assets/trilha-yellowar.m4a.
- Create: assets/galeria/ — cópias adicionais selecionadas.
- Modify: README.md — instruções de visualização e mapa de ativos.

---

### Task 1: Preparar o site estático e os ativos estáveis

**Files:**
- Create: assets/pai-bruno.jpg
- Create: assets/yellowar-grupo.jpg
- Create: assets/yellowar-maos.jpg
- Create: assets/cartaz-yellowar.jpg
- Create: assets/logo-ejc.png
- Create: assets/trilha-yellowar.m4a
- Create: assets/galeria/

**Interfaces:**
- Produces: os caminhos estáveis usados pelo HTML: os seis arquivos acima.

- [ ] Step 1: Confirmar os arquivos-fonte

Run:
    file "fotos e vídeos/WhatsApp Image 2026-08-09 at 15.10.42 (1).jpeg" "fotos e vídeos/WhatsApp Image 2026-08-09 at 15.14.59.jpeg" "fotos e vídeos/WhatsApp Image 2026-08-09 at 15.17.48 (3).jpeg" "fotos e vídeos/cartaz.jpg" "fotos e vídeos/logo.png" "música do encontro/AUDIO-2026-08-09-18-29-50.m4a"

Expected: os seis arquivos existem e são reconhecidos como imagens ou áudio.

- [ ] Step 2: Criar assets e copiar arquivos principais

Run:
    mkdir -p assets/galeria
    cp "fotos e vídeos/WhatsApp Image 2026-08-09 at 15.10.42 (1).jpeg" assets/pai-bruno.jpg
    cp "fotos e vídeos/WhatsApp Image 2026-08-09 at 15.14.59.jpeg" assets/yellowar-grupo.jpg
    cp "fotos e vídeos/WhatsApp Image 2026-08-09 at 15.17.48 (3).jpeg" assets/yellowar-maos.jpg
    cp "fotos e vídeos/cartaz.jpg" assets/cartaz-yellowar.jpg
    cp "fotos e vídeos/logo.png" assets/logo-ejc.png
    cp "música do encontro/AUDIO-2026-08-09-18-29-50.m4a" assets/trilha-yellowar.m4a

Expected: os seis novos caminhos existem; fontes continuam intactas.

- [ ] Step 3: Selecionar fotos adicionais

Copiar pelo menos quatro fotos adicionais de fotos e vídeos/ para assets/galeria/, sem apagar originais, priorizando pessoas visíveis e variedade de orientação. Usar nomes estáveis, como yellowar-01.jpg e yellowar-02.jpg.

- [ ] Step 4: Verificar ativos

Run:
    find assets -maxdepth 2 -type f -print | sort
    file assets/* assets/galeria/*

Expected: imagens JPEG/PNG válidas e áudio reconhecido como MPEG-4 audio.

- [ ] Step 5: Commit

    git add assets
    git commit -m "feat: add yellowar tribute media assets"

### Task 2: Criar a narrativa HTML da homenagem

**Files:**
- Create: index.html

**Interfaces:**
- Consumes: caminhos da Task 1.
- Produces: landmarks #inicio, #carta, #memorias, #inacio, #galeria e #final, além dos hooks data-audio-toggle, data-gallery-image, data-reveal e #audio-status.

- [ ] Step 1: Escrever shell semântico

Criar doctype HTML com idioma pt-BR, viewport, título Pai Bruno · Yellowar, descrição e skip link para #conteudo. Usar header, main, section, figure, blockquote, nav e footer.

- [ ] Step 2: Montar cabeçalho e herói

O cabeçalho contém logo com alt Logo do EJC São Pedro Pescador, identificação EJC São Pedro Pescador · Círculo Yellowar, links e botão de áudio com aria-pressed false. O herói contém 11.07.2025, título Pai Bruno, nosso presente do Yellowar, assets/pai-bruno.jpg, cartaz como camada decorativa e CTA Ouvir a trilha do Yellowar.

- [ ] Step 3: Montar carta e mensagens

Adicionar a mensagem central: Pai Bruno, alguns encontros acabam no calendário. O nosso ficou guardado no coração. Adicionar três cartões:
    Obrigado por transformar presença em cuidado.
    Com você, o círculo virou casa.
    Seu jeito de servir deixou marcas bonitas em nós.

- [ ] Step 4: Montar memórias, Santo Inácio e galeria

Usar yellowar-grupo.jpg e yellowar-maos.jpg na seção de memórias, legenda Um dia, muitos corações, uma só família., e pai-bruno.jpg na seção de Santo Inácio com Em tudo amar e servir. A galeria terá pelo menos sete imagens, cada uma com alt descritivo e data-gallery-image.

- [ ] Step 5: Montar rodapé e player

Adicionar um único elemento audio com id tribute-audio, preload metadata e loop, apontando para assets/trilha-yellowar.m4a; controles customizados play/pause; aria-live polite em #audio-status; rodapé com Com amor família Yellowar! 🌻💛.

- [ ] Step 6: Validar estrutura textual

Run:
    rg -n "Pai Bruno|Yellowar|11 de julho de 2025|11\\.07\\.2025|Em tudo amar e servir|Com amor família Yellowar" index.html

Expected: textos obrigatórios aparecem e não há referência a Mazal ou nomes antigos dos anexos.

- [ ] Step 7: Commit

    git add index.html
    git commit -m "feat: add yellowar tribute page structure"

### Task 3: Aplicar estética de colagem e responsividade

**Files:**
- Create: styles.css

**Interfaces:**
- Consumes: classes .site-header, .hero, .collage, .message-card, .memory-grid, .gallery-grid, .audio-dock e [data-reveal].
- Produces: layout desktop/mobile, foco acessível, papel, fita, recortes e reduced motion.

- [ ] Step 1: Definir tokens e reset

Definir --yellow #F6C900, --paper #FFF7E6, --ink #171410, --brown #61351F e --sand #E9D5AA. Aplicar box-sizing, Georgia para títulos, system-ui para textos, fundo creme e seleção amarela.

- [ ] Step 2: Estilizar navegação, herói e colagem

Criar duas colunas no herói, composição relativa para retrato, cartaz e fita, sombras suaves, bordas de papel e título com clamp sem ultrapassar a tela.

- [ ] Step 3: Estilizar mensagens, memória e Santo Inácio

Alternar cartões em amarelo, creme e areia, com rotações leves. A seção de Santo Inácio deve ter contraste calmo, detalhe dourado e nenhum fundo escuro atrás de texto longo.

- [ ] Step 4: Estilizar galeria e player

Usar grade irregular no desktop e coluna única no celular. O player deve ser fixo somente com a classe is-visible, com fundo de papel, botão circular amarelo e foco visível.

- [ ] Step 5: Adicionar breakpoints e reduced motion

Em max-width 760px, empilhar herói, reduzir sobreposições, tornar navegação rolável e fazer player ocupar largura segura. Em prefers-reduced-motion, zerar transformações e transições de entrada.

- [ ] Step 6: Verificar CSS

Run:
    git diff --check
    rg -n -- "--yellow|prefers-reduced-motion|@media|audio-dock|gallery-grid" styles.css

Expected: diff sem erros e presença dos tokens, media query e classes principais.

- [ ] Step 7: Commit

    git add styles.css
    git commit -m "feat: style yellowar tribute collage"

### Task 4: Implementar áudio, reveals, navegação e galeria ampliada

**Files:**
- Create: script.js

**Interfaces:**
- Consumes: tribute-audio, data-audio-toggle, audio-status, data-reveal, data-gallery-image, gallery-dialog e data-dialog-close.
- Produces: toggleAudio(), openGalleryImage(image), closeGallery() e listeners registrados no carregamento.

- [ ] Step 1: Implementar estado do player

Criar const audio = document.querySelector('#tribute-audio') e toggleAudio(): chamar audio.play() quando pausado e audio.pause() quando tocando; atualizar aria-pressed, texto, audio-status e is-visible. Capturar rejeição de play() e mostrar A trilha precisa de um toque para começar.

- [ ] Step 2: Sincronizar botões

Registrar click para todos os data-audio-toggle e sincronizar nos eventos play, pause e ended. CTA e dock devem mostrar o mesmo estado.

- [ ] Step 3: Implementar reveal progressivo

Usar IntersectionObserver com threshold 0.18 para adicionar is-visible aos data-reveal; se não existir, adicionar imediatamente. Parar de observar após revelar.

- [ ] Step 4: Implementar galeria ampliada

Ao clicar em data-gallery-image, copiar src e alt para gallery-dialog, abrir dialog e mover foco para fechar. Fechar pelo botão, backdrop e Escape; devolver foco à imagem que abriu.

- [ ] Step 5: Manter navegação independente do JavaScript

Usar links âncora nativos. JavaScript pode adicionar aria-current page ao início, mas a navegação não depende dele.

- [ ] Step 6: Verificar script

Run:
    node --check script.js
    git diff --check

Expected: node --check termina sem erro e o diff permanece limpo.

- [ ] Step 7: Commit

    git add script.js
    git commit -m "feat: add tribute audio and gallery interactions"

### Task 5: Documentar e verificar a experiência completa

**Files:**
- Modify: README.md

**Interfaces:**
- Consumes: assets/, index.html, styles.css e script.js.
- Produces: instruções reproduzíveis para abrir e verificar a homenagem.

- [ ] Step 1: Documentar execução local

Adicionar:
    python3 -m http.server 4173
Depois abrir http://localhost:4173. Explicar que abrir index.html diretamente funciona para imagens, mas o servidor local é preferível para testar áudio.

- [ ] Step 2: Rodar verificações automatizadas

Run:
    node --check script.js
    git diff --check

Expected: ambos terminam com código 0.

- [ ] Step 3: Servir e verificar recursos

Em uma sessão:
    python3 -m http.server 4173
Em outra:
    curl -I http://localhost:4173/index.html
    curl -I http://localhost:4173/assets/pai-bruno.jpg
    curl -I http://localhost:4173/assets/trilha-yellowar.m4a

Expected: os três recursos respondem 200 OK.

- [ ] Step 4: Fazer revisão visual desktop e celular

Conferir primeira dobra sem corte do rosto, logo legível, fotos sem rostos escondidos, mensagens distribuídas, player utilizável e assinatura final visível. Testar teclado, Escape na galeria e reduced motion.

- [ ] Step 5: Confirmar critérios de aceite

    [ ] Pai Bruno, Yellowar, EJC PSPP e datas aparecem na primeira dobra.
    [ ] Retrato, grupo, mãos, cartaz e logo aparecem como destaques.
    [ ] Há pelo menos três mensagens de carinho.
    [ ] A assinatura final está exatamente correta.
    [ ] A trilha inicia no clique e pode ser pausada.
    [ ] A página funciona no celular.
    [ ] Reduced motion remove deslocamentos.

- [ ] Step 6: Commit da documentação final

    git add README.md
    git commit -m "docs: explain how to view yellowar tribute"

