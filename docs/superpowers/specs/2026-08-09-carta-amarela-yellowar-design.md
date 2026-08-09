# Carta-amarela do Yellowar

## Objetivo

Criar uma homenagem digital para o Pai Bruno, celebrando a participação dele no círculo Yellowar do EJC São Pedro Pescador e o encontro de 11 de julho de 2025. A experiência deve funcionar como uma carta coletiva com memórias visuais, não como uma galeria genérica.

## Direção visual aprovada

O conceito é **Carta-amarela do Yellowar**: uma composição afetiva de papel, fotos sobrepostas, fitas, rabiscos e pequenos sinais gráficos inspirados no cartaz do círculo. O amarelo é a cor emocional e identitária; creme e marrom aquecem a página; preto de caneta dá contraste e aparência manual.

Paleta inicial:

- amarelo principal: `#F6C900`;
- creme de papel: `#FFF7E6`;
- preto de tinta: `#171410`;
- marrom quente: `#61351F`;
- areia de apoio: `#E9D5AA`.

Tipografia: uma serifada expressiva para títulos, com aparência editorial, e uma sans-serif limpa para textos de apoio. Os elementos manuscritos devem ser poucos e usados como acentos, para manter leitura e acessibilidade.

## Estrutura da página

### 1. Abertura

- Identificação discreta: `EJC São Pedro Pescador · Círculo Yellowar`.
- Logo da paróquia como selo no cabeçalho.
- Data em formato visual: `11.07.2025`.
- Título principal: `Pai Bruno, nosso presente do Yellowar`.
- Foto principal: Pai Bruno segurando o quadro do círculo e a imagem de Santo Inácio.
- Cartaz do encontro em uma camada de colagem atrás ou ao lado da foto.
- CTA de áudio: `Ouvir a trilha do Yellowar`.

O herói deve comunicar a homenagem em poucos segundos: ele é o protagonista, o Yellowar é a comunidade e o encontro é a memória compartilhada.

### 2. Carta coletiva

Bloco de texto central em formato de folha destacada:

> Pai Bruno, alguns encontros acabam no calendário. O nosso ficou guardado no coração.

Ao redor, cartões curtos de carinho, como:

- `Obrigado por transformar presença em cuidado.`
- `Com você, o círculo virou casa.`
- `Seu jeito de servir deixou marcas bonitas em nós.`

As mensagens são parte fixa da composição. Não haverá editor ou envio de mensagens nesta primeira versão.

### 3. Memórias do encontro

Seção visual com a foto do grupo usando o cartaz Yellowar e a foto das mãos formando o símbolo do círculo. A seção terá uma pequena legenda:

`Um dia, muitos corações, uma só família.`

As imagens devem receber molduras e rotações leves diferentes, como fotografias colocadas à mão sobre uma mesa. A rotação deve ser sutil para não prejudicar a leitura ou o recorte dos rostos.

### 4. Referência a Santo Inácio

Uma pausa mais contemplativa na página, usando a fotografia do Pai Bruno com a imagem de Santo Inácio. O tratamento combina papel claro, detalhe dourado e uma cruz pequena, sem transformar a página em um memorial formal.

Texto de apoio:

`Em tudo amar e servir.`

A referência deve ser visualmente secundária à homenagem e não competir com o retrato principal.

### 5. Galeria Yellowar

Uma colagem responsiva com as fotos disponíveis do encontro. No desktop, a composição usa uma grade irregular com imagens em tamanhos diferentes; no celular, vira uma sequência vertical com espaçamento confortável. As fotos devem manter `object-fit: cover` apenas quando o recorte não esconder pessoas ou elementos importantes; imagens verticais ficam verticais.

### 6. Trilha sonora

O áudio do encontro fica disponível em um player persistente e discreto. O navegador pode bloquear autoplay, então o primeiro botão da experiência inicia a reprodução de modo explícito. Depois de iniciada, a música continua durante a navegação e pode ser pausada a qualquer momento.

O player deve ter:

- play/pause claro;
- indicação textual `A nossa trilha`;
- volume baixo por padrão;
- estado acessível para teclado e leitor de tela.

### 7. Encerramento

O rodapé usa bastante espaço vazio, amarelo e elementos do cartaz. A mensagem final deve aparecer exatamente assim:

`Com amor família Yellowar! 🌻💛`

## Interações e movimento

- Entrada suave das camadas da colagem ao aparecerem na tela.
- Pequeno efeito de elevação ao passar o cursor sobre fotos, sem zoom agressivo.
- Player fixo ou flutuante somente depois que a pessoa inicia a trilha, para não cobrir conteúdo no primeiro carregamento.
- Respeitar `prefers-reduced-motion`, removendo deslocamentos e transições longas quando solicitado pelo sistema.

## Responsividade

- Desktop: herói em duas colunas, colagem com sobreposições e galeria assimétrica.
- Celular: herói empilhado, título menor, fotos sem sobreposição excessiva e player em largura segura.
- Todas as áreas interativas devem ter alvos de toque confortáveis e contraste suficiente sobre o amarelo.

## Mapeamento de arquivos

Os anexos pedidos pelo usuário não estão todos com o mesmo nome no disco. A implementação deve usar os arquivos reais encontrados na pasta de fotos:

- `fotos e vídeos/WhatsApp Image 2026-08-09 at 15.10.42 (1).jpeg`: retrato do Pai Bruno com Santo Inácio;
- `fotos e vídeos/WhatsApp Image 2026-08-09 at 15.14.59.jpeg`: foto principal do grupo com o cartaz;
- `fotos e vídeos/WhatsApp Image 2026-08-09 at 15.17.48 (3).jpeg`: mãos formando o símbolo;
- `fotos e vídeos/cartaz.jpg`: cartaz Yellowar;
- `fotos e vídeos/logo.png`: logo EJC PSPP;
- `música do encontro/AUDIO-2026-08-09-18-29-50.m4a`: trilha sonora enviada.

As demais fotos existentes na pasta podem entrar na galeria depois de uma triagem visual simples.

## Escopo da primeira versão

Incluído: uma página única, estética de colagem, as imagens principais, galeria responsiva, mensagens de carinho, áudio controlável, referências a Santo Inácio e rodapé com a assinatura final.

Fora do escopo: autenticação, comentários públicos, upload de novas fotos, formulário de mensagens e edição do conteúdo pelo navegador.

## Critérios de aceite

1. A primeira dobra identifica Pai Bruno, Yellowar, EJC PSPP e a data do encontro.
2. As três imagens principais, o cartaz e o logo aparecem como destaques reais da composição.
3. Há pelo menos três mensagens de carinho distribuídas pelo conteúdo.
4. A frase final aparece exatamente como `Com amor família Yellowar! 🌻💛`.
5. A trilha pode ser iniciada, pausada e retomada sem bloquear a navegação.
6. A página permanece legível e navegável em celular.
7. A animação respeita a preferência de movimento reduzido.
