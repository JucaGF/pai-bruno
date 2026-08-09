# Design: galeria Yellowar com carrossel e expansão

## Objetivo

Transformar a seção de fotos da homenagem em uma experiência com dois estados:

- um estado inicial compacto, panorâmico e animado;
- um estado expandido, estático e completo, com as 52 fotos disponíveis.

A mudança preserva a identidade de colagem amarela do site e mantém a abertura das fotos em visualização ampliada.

## Experiência visual

No estado compacto, a seção terá duas fileiras edge-to-edge de miniaturas. Cada fileira será uma faixa contínua com conteúdo duplicado para criar um loop infinito sem salto visível. As faixas se moverão em sentidos opostos e terão máscaras/degradês nas laterais para suavizar a entrada e a saída das imagens.

O botão “Ver todas as fotos” ficará abaixo das faixas, com destaque visual coerente com o restante da homenagem. Ao expandir, as faixas serão ocultadas e a grade atual de fotos aparecerá com uma transição curta. O botão mudará para “Recolher galeria”.

## Comportamento

- O estado inicial é compacto.
- O botão alterna entre compacto e expandido usando `aria-expanded`.
- A grade expandida preserva as 52 fotos e os botões de visualização ampliada existentes.
- As animações pausam ao passar o mouse ou focar a galeria.
- `prefers-reduced-motion: reduce` desativa o movimento contínuo e mantém as fotos estáticas.
- Em telas pequenas, as faixas continuam em duas linhas, com miniaturas menores e espaçamento reduzido.

## Estrutura

- `index.html`: adiciona o preview de duas faixas e o botão de alternância junto da grade existente.
- `styles.css`: cria as faixas edge-to-edge, o loop visual, as máscaras laterais, a transição de estados e os ajustes responsivos.
- `script.js`: controla o estado expandido, atualiza texto e atributos acessíveis e prepara as faixas a partir das imagens existentes.
- `tests/gallery-completeness.test.js`: continua garantindo que todas as fotos permaneçam na grade.
- Novo teste de layout: garante a presença das duas faixas, do botão acessível e dos estados compacto/expandido.

## Critérios de aceite

1. Ao abrir a página, o usuário vê duas fileiras animadas ocupando a largura da janela.
2. As bordas das fileiras não exibem cortes secos ou barras de rolagem horizontais.
3. O botão expande a seção e revela todas as fotos em uma grade estática.
4. O botão recolhe a grade e retorna ao carrossel.
5. As fotos continuam abrindo no diálogo ampliado no estado expandido.
6. O comportamento é utilizável por teclado, toque e usuários que preferem movimento reduzido.

