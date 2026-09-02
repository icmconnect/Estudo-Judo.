# Relatório de Mapeamento - Dojo Digital

Este documento mapeia como os conteúdos, textos, imagens e links do YouTube foram integrados à estrutura do E-book Dojo Digital, atendendo às exigências da Persona e do Design System.

## Estrutura de Capítulos
A aplicação foi organizada em 3 Módulos contendo um total de 5 Capítulos para proporcionar uma jornada fluida.

### Módulo 1: Apresentação e História
**1. Capa e Apresentação (`introducao.md`)**
- **Conteúdo Integrado:** Textos de apresentação da "Academia Garça Judô", filosofia inicial do Caminho Suave e listas de benefícios físicos e morais.
- **Vídeo (YouTube):** Playlist da Garça (https://www.youtube.com/embed/videoseries?si=z-h3qZX9DiTBHsSE&list=PL8UVMnkghcOeXaWP7U5S6CQOJEYi9WooH).
- **Imagens Alocadas:** (N/A)

**2. História do Judô (`historia.md`)**
- **Conteúdo Integrado:** História da criação do Judô, transição do Jujutsu, biografia de Jigoro Kano.
- **Imagens Alocadas:** 
  - Retrato do fundador (ex: `1 dan.jpg` ou retrato similar se disponível).

### Módulo 2: Prática e Fundamentos
**3. Fundamentos do Judô (`fundamentos.md`)**
- **Conteúdo Integrado:** Rei-ho (saudações), Shisei (posturas), Shintai (movimentação), Tai-sabaki (giros), Kumi-kata (pegadas) e Ukemi (quedas).
- **Imagens Alocadas:**
  - `gokyo-no-waza 4o golpes usar.jpg` (Imagem ilustrativa do Gokyo e agrupamentos).

**4. Técnicas de Projeção e Solo (`tecnicas.md`)**
- **Conteúdo Integrado:** Divisão do Nage-Waza (Te-Waza, Koshi-Waza, Ashi-Waza, Sutemi-Waza) e Katame-Waza (Osae-Komi, Shime, Kansetsu).
- **Vídeos (YouTube):**
  - Ippon-seoi-nage: `https://www.youtube.com/embed/FQnOlCxo4oI`
  - Seoi-nage: `https://www.youtube.com/embed/zIq0xI0ogxk`
  - Tai-otoshi: `https://www.youtube.com/embed/4x6S3Q-Ktv8`
  - O-goshi: `https://www.youtube.com/embed/yhu1mfy2vJ4`
  - Harai-goshi: `https://www.youtube.com/embed/qTo8HlAAkOo`
  - O-soto-gari: `https://www.youtube.com/embed/c-A_nP7mKAc`
  - Uchi-mata: `https://www.youtube.com/embed/iiUpSu5J-bgw`
  - Tomoe-nage: `https://www.youtube.com/embed/880WbHvHv6A`
- **Imagens Alocadas:**
  - `osaekomi waza.jpg` (Ilustração das técnicas de solo, posicionada na seção de Katame-Waza).

**5. Catálogo do Gokyo (`catalogo.md`)**
- **Conteúdo Integrado:** Catálogo completo com 139 links extraídos da playlist da Garça Judô, organizados por Te-Waza, Koshi-Waza, Ashi-Waza, Sutemi-Waza, Katame-Waza e Módulos Comparativos. Todo o material do Lote 2 e Lote 3 foi adicionado aqui como texto complementar de estudos.

### Módulo 3: Aperfeiçoamento
**6. Katas do Judô (`katas.md`)**
- **Conteúdo Integrado:** Importância dos Katas, Nage-no-Kata e Katame-no-Kata.
- **Vídeos (YouTube):**
  - Nage-no-Kata (https://www.youtube.com/embed/9MlyiOQ7_U0).

## Design System "Surreal" Aplicado
- **Cores:** Fundo principal ajustado para um tom de azul muito claro e pastel (`bg-blue-50` em Light Mode, adaptado ao Navy `#0A0E17` no Dark Mode).
- **Blue Judogi:** Destaque nos botões, ícones, divisores e barras de progresso (`blue-600` / `#1D4ED8`).
- **Dourado Tatame:** Acentos, tipografia complementar e badges (`amber-500` / `#F59E0B`).
- **Tipografia:** 
  - `Bebas Neue` aplicada aos títulos `<h1>` e `<h2>` em uppercase, garantindo imponência.
  - `Cormorant Garamond` aplicado nas citações `<blockquote>`, criando o ar clássico "Sensei".
  - `Inter` como fonte global do corpo da aplicação (`font-sans`).

*Nota: As 12 imagens citadas nos prompts foram formatadas no Markdown com sintaxe de imagem (ex: `![Imagem 1](/nome-da-imagem.jpg)`). Caso estejam no diretório `/public`, o player fará a renderização imersiva imediatamente.*
