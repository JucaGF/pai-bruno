# Design: galeria sem legendas e com preenchimento masonry

## Objetivo

Melhorar a aba da galeria removendo os textos posicionados sobre as imagens e reduzir os espaços vazios entre fotos, mantendo a moldura branca, o caráter de colagem, o carrossel de prévia e a abertura da imagem em tamanho ampliado.

## Abordagem escolhida

Usar CSS Grid responsivo com fluxo denso (`grid-auto-flow: dense`). A grade continuará trabalhando com spans de linhas e colunas para preservar a variedade visual, mas os itens poderão ocupar lacunas disponíveis com mais eficiência. As imagens continuarão preenchendo seus cards com `object-fit: cover`, sem alterar os arquivos ou os textos alternativos.

As legendas visuais (`.gallery-caption`) serão removidas do HTML. O texto alternativo permanecerá nos elementos `img` para acessibilidade, e o comportamento de clique/zoom continuará ligado ao botão `.gallery-item`.

## Responsividade

- Desktop: grade de quatro colunas proporcionais, linhas menores e fluxo denso para reduzir buracos.
- Tablet: grade de três colunas, com os mesmos spans adaptados.
- Mobile: grade de duas colunas, sem legendas e com gaps menores.
- A moldura branca será preservada em todos os tamanhos.

## Verificação

Os testes existentes de completude e interação devem continuar passando. Será adicionada uma verificação simples para garantir que não existam legendas visuais na galeria e que o CSS use fluxo denso.

## Fora do escopo

Não serão alterados o carrossel animado, o modal de zoom, a seleção de imagens, os textos alternativos, a moldura branca ou as demais seções da página.
