# Arquitetura do Sistema - Dojo Digital

## Visão Geral
O Dojo Digital é uma aplicação Web de página única (SPA) desenhada para entregar uma experiência de aprendizado de alto padrão (Premium), semelhante a plataformas como Hotmart Club, Kiwify e Masterclass. 

## Stack Tecnológica
- **Framework Core**: React 19 + Vite 6
- **Roteamento**: React Router DOM v6
- **Estilização**: Tailwind CSS v4 (com `@tailwindcss/typography` para renderização perfeita de textos longos)
- **Animações**: Framer Motion (para transições suaves entre módulos e entradas de tela)
- **Renderização de Conteúdo**: Markdown via `react-markdown` e `rehype-raw`, permitindo que os gestores adicionem conteúdo em texto simples (Markdown) com suporte a tags HTML avançadas (iframes de vídeo).
- **Ícones**: Lucide React
- **Deploy Recomendado**: Hostinger (Node.js/Estático) ou Vercel.

## Estrutura de Pastas e Arquivos
- `/src/content/`: Onde residem os arquivos `.md` (Markdown). É aqui que o conteúdo das aulas fica armazenado. Para editar uma aula, basta editar o arquivo Markdown correspondente.
- `/src/data/chapters.ts`: O "Banco de Dados" local que mapeia a ordem dos módulos, títulos e conecta os arquivos Markdown aos seus respectivos links (slugs).
- `/src/pages/`: Páginas completas (Ex: `Chapter.tsx` para a visualização da aula e `Login.tsx` para a entrada).
- `/src/components/`: Componentes reutilizáveis como a Barra Lateral (`Sidebar.tsx`), o Cabeçalho (`Header.tsx`) e a Busca (`SearchModal.tsx`).
- `/public/`: Arquivos estáticos e logomarcas.

## Funcionalidades Chave (UX/UI)
1. **Vídeo Nativo (Wrapper Inteligente)**: O sistema intercepta qualquer `iframe` colado nos arquivos Markdown e o envelopa automaticamente em um container 16:9 responsivo, com suporte a rotação de tela (celular) e tela cheia, sem quebrar o layout.
2. **Leitura Focada**: Uso do plugin `prose` do Tailwind para garantir que a largura da linha de texto não ultrapasse o limite ideal para os olhos humanos (cerca de 65-75 caracteres).
3. **Cabeçalho Hero (Hero Header)**: O título 1 (`#`) de cada arquivo Markdown é transformado em um banner expansivo (Hero), dando a sensação de um módulo de curso premium.
4. **Live Search (Busca Instantânea)**: Um índice local que varre todas as aulas simultaneamente ao digitar `Ctrl+K`.

## Instruções para IA de Otimização
Ao analisar este projeto, a IA deve focar em sugerir:
- Estratégias de Caching e Service Workers (PWA) para permitir leitura offline dos textos.
- Integração de Banco de Dados via Firebase Firestore para salvar o progresso de leitura (qual módulo o aluno parou) e as marcações de "Concluído".
- Estratégias de SEO (embora seja uma SPA protegida por login, meta-tags dinâmicas para as rotas públicas podem ser úteis).
