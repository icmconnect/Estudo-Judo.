# Arquitetura do Sistema - Dojo Digital

## Visão Geral
O **Dojo Digital** (desenvolvido por **OSSCONNECT**) é uma aplicação Web de página única (SPA) desenhada para entregar uma experiência de aprendizado de alto padrão (Premium) e rigor pedagógico no ensino do Judô Kodokan.

## Stack Tecnológica
- **Framework Core**: React 19 + Vite 6
- **Roteamento**: React Router DOM v6
- **Estilização**: Tailwind CSS v4 (com `@tailwindcss/typography` para renderização fluida e legível)
- **Animações**: Framer Motion (para transições suaves entre módulos e diálogos acessíveis)
- **Renderização de Conteúdo**: Markdown via `react-markdown` e `rehype-raw`
- **Ícones**: Lucide React
- **Acessibilidade**: Em total conformidade com WCAG AA (contraste mínimo 4.5:1, skip links, aria-labels e suporte completo a navegação por teclado).

## Estrutura de Pastas e Arquivos
- `/src/content/`: Arquivos `.md` (Markdown) onde residem os textos curriculares e pedagógicos.
- `/src/data/chapters.ts`: Catálogo de dados que mapeia a ordem dos módulos, títulos e metadados dos capítulos.
- `/src/data/gokyoVideos.ts`: Base de dados completa com mais de 100 técnicas do Judô Kodokan (*Dai-Ikkyo*, *Dai-Nikyo*, *Dai-Sankyo*, *Dai-Yonkyo*, *Dai-Gokyo*, *Shinmeisho-no-Waza*, *Habukareta-Waza*, *Katame-Waza* e *Katas*) com links oficiais da Kodokan.
- `/src/components/GokyoCatalog.tsx`: Catálogo interativo com filtros por categoria biomecânica, busca instantânea, status de conclusão e modal de vídeo com foco acessível.
- `/src/hooks/useProgress.ts`: Hook de persistência de progresso com chave versionada em `localStorage` e suporte a sincronização entre abas.
- `/src/hooks/useTheme.ts`: Hook de controle de tema claro/escuro integrado a `prefers-color-scheme`.
- `/src/pages/`: Páginas completas (`Chapter.tsx` para exibição de aulas e `Login.tsx` para acesso).
- `/src/components/`: Componentes modulares (`Sidebar.tsx`, `Header.tsx`, `Logo.tsx`, `SearchModal.tsx`, `VideoModal.tsx`, `VideoPlayer.tsx`).
- `/public/`: Arquivos estáticos e logomarcas.

## Funcionalidades Chave (UX/UI)
1. **Vídeo Nativo (Wrapper Inteligente)**: O sistema intercepta qualquer `iframe` e o envelopa automaticamente em um container 16:9 responsivo com suporte a rotação de tela e tela cheia.
2. **Vídeo de Boas-Vindas Oficial**: Vídeo institucional (`https://www.youtube.com/watch?v=FWoXF9nQw1U`) embutido na aula introdutória.
3. **Catálogo Interativo Gokyo**: Filtros multifacetados por grupo anatômico (*Te-waza*, *Koshi-waza*, *Ashi-waza*, *Sutemi-waza*, *Osae-waza*, *Shime-waza*, *Kansetsu-waza* e *Katas*), indicador de progresso e busca em tempo real.
4. **Leitura Focada**: Largura de linha de texto otimizada para legibilidade (65–75 caracteres) com alto contraste no modo escuro e claro.
5. **Live Search (Busca Instantânea `Ctrl+K`)**: Varredura instantânea de todos os títulos, descrições, técnicas do Gokyo e conteúdos das aulas.

## Modificações Recentes e Correções de Interface
* **Correção de Overflow (Transbordamento Lateral) no Mobile**:
  * Adicionado o controle de largura restrita (`w-full min-w-0`) aos containers-raiz das páginas `TheoryLibrary`, `TheoryProgress`, `TheoryVideosGallery` e `TheoryLessonView`.
  * Isso impede que textos com `line-clamp-1` e `truncate` ou decorações com posicionamento absoluto estiquem os `flex-containers` da tag `<main>` para fora da tela. Eliminou o comportamento da interface de ficar "comendo aos lados" (scroll horizontal fantasma) em celulares.
* **Truncamento de Texto Flexível**:
  * Adicionado `break-words` e restrições de `max-w-full shrink-0` em badges longas (ex: "Formação Teórica • Progresso") para evitar que textos inline empurrem as margens da página.
* **Reposição da Galeria de Vídeos na Teoria**:
  * A opção "Galeria de Vídeos" foi movida da base do banner escuro principal para as abas de navegação centrais (logo ao lado da aba "7 Trilhas Formativas"), ganhando protagonismo e resolvendo o problema de ocultação e quebra de layout de botões em telas pequenas.
* **Card de Banner Dividido no Mobile**:
  * O banner "Sua Jornada do Conhecimento" adaptou-se com `flex-wrap text-balance` no Mobile para não alargar o container em celulares menores.
