# Carrossel móvel da galeria — desenho

## Objetivo

Mostrar duas fileiras de fotos sempre visíveis e em movimento contínuo, com toque no celular e sem ponto final aparente.

## Decisão

Substituir o loop manual atual por duas instâncias independentes do Swiper. Cada instância controla as próprias cópias, posição, autoplay e gesto; nenhuma fileira mede ou altera a posição da outra.

## Comportamento

- A fileira superior desliza para a esquerda e a inferior para a direita.
- Ambas começam com conteúdo visível e seguem em loop contínuo.
- Arrastar uma fileira responde somente àquele gesto e o autoplay continua depois da interação.
- O botão “Ver todas as fotos” mantém o comportamento atual de substituir a prévia pela grade.
- Pessoas com redução de movimento veem as duas fileiras paradas, ainda navegáveis por toque.

## Estrutura

- `index.html` carrega o CSS e o JavaScript do Swiper e troca cada faixa por uma estrutura Swiper independente.
- `script.js` transforma as primeiras 32 fotos da grade em 16 slides por fileira e inicializa as duas instâncias; não calcula largura, `offset`, `requestAnimationFrame`, clones ou captura manual de ponteiro.
- `styles.css` define o visual dos slides, a altura das duas fileiras e a transição para a grade expandida. Não controla o loop.
- `tests/gallery-interaction.test.js` protege a estrutura de duas instâncias e a remoção do mecanismo manual.

## Critérios de aceite

1. As duas fileiras aparecem assim que a seção entra na tela, tanto em iPhone quanto em desktop.
2. Não há final visual após permanecer na seção por vários minutos.
3. Um gesto numa fileira não move a outra nem impede a rolagem vertical da página.
4. A expansão para “Ver todas as fotos” continua funcionando.
5. Sem JavaScript, a grade completa continua acessível na página.
