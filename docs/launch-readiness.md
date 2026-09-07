# Checklist de Preparação para Lançamento (Launch Readiness)

Este documento reflete o status **REAL** técnico, jurídico, comercial e pedagógico do **Dojo Digital** antes de abrir as vendas ao público.

*Domínio Oficial:* `dojo.ossconnect.com.br`
*Data de Geração:* 2026-09-03

---

## 1. DOMÍNIO E INFRAESTRUTURA
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Domínio atual | AI Studio URL | O app está rodando no ambiente de homologação (`run.app`) |
| Subdomínio escolhido | `dojo.ossconnect.com.br` | Definido. Requer configuração no registro DNS (CNAME/A) apontando para o Cloud Run. |
| Status DNS | ❌ **Pendente** | Configuração manual do CNAME a ser feita no provedor (Registro.br/Cloudflare). |
| HTTPS | ❌ **Pendente** | O certificado SSL será gerado automaticamente assim que o DNS propagar no Cloud Run. |
| Cloud Run Configuração | ❌ **Pendente** | Precisa mapear o domínio personalizado na interface do Cloud Run. |
| Firebase Authorized Domains | ❌ **Pendente** | Inserir `dojo.ossconnect.com.br` em Firebase Console > Auth > Settings > Authorized Domains. |
| Google OAuth Authorized Domains | ❌ **Pendente** | Inserir as URLs de redirecionamento no painel GCP (APIs & Services > Credentials). |
| Apple Sign in return URLs | ❌ **Pendente** | Não configurado no backend/portal da Apple. |
| Stripe success/cancel URLs | ❌ **Pendente** | Precisa atualizar as variáveis de ambiente com a URL de produção antes do deploy final. |

---

## 2. AUTENTICAÇÃO E DADOS (FIREBASE & FIRESTORE)
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Firebase Auth configurado? | ⚠️ **Parcial** | Código implementado (`AuthContext.tsx`), mas dependendo da ativação de domínio no console. |
| Google login configurado? | ⚠️ **Parcial** | Botão e provedor implementados. Requer o domínio autorizado no painel do GCP. |
| Apple login configurado? | ❌ **Pendente** | Nenhuma implementação Apple no código atual. |
| Firestore em produção? | ❌ **Pendente** | Persistência real em nuvem não ativada. O app usa `localStorage` para progresso (`useProgress.ts`). |
| Regras de segurança testadas? | ❌ **Pendente** | Arquivo `firestore.rules` existe, mas precisa de deploy e testes de escrita/leitura. |
| Usuário admin possui custom claim? | ❌ **Pendente** | Não há claims (`customClaims`) sendo setados ou verificados pelo backend/auth. |
| LocalStorage separado de dados críticos? | ❌ **Pendente** | Dados de login e progresso ainda dependem pesadamente do client-side. |
| Migração local para cloud pronta? | ❌ **Pendente** | Precisa de lógica para mesclar progresso anônimo (local) com o progresso logado (Firestore). |

---

## 3. PAGAMENTO E PAYWALL (STRIPE)
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Stripe conta criada? | ❌ **Pendente** | Depende de ação externa do titular (Gustavo). |
| Stripe test mode configurado? | ❌ **Pendente** | Chaves ausentes no `.env` de homologação. |
| Produto R$ 97 criado? | ✅ **Pronto (Via Código)** | O servidor Express (`server.ts`) já injeta os `price_data` de R$97 automaticamente na sessão. |
| Price ID configurado? | N/A | Não necessário, pois o valor de R$97 é construído dinamicamente na API, mas pode ser mudado para um Price ID fixo se desejado. |
| Cartão habilitado? | ❌ **Pendente** | Depende da conta Stripe ativa. |
| Pix Stripe aprovado ou pendente? | ❌ **Pendente** | Geralmente requer ativação manual na aba de métodos de pagamento no Stripe Dashboard. |
| Webhook configurado? | ⚠️ **Parcial** | Endpoint (`/api/stripe/webhook`) programado, mas falta registrar a URL na Stripe e pegar a chave `whsec_`. |
| Assinatura do webhook validada? | ⚠️ **Parcial** | Código pronto, mas falta a variável `STRIPE_WEBHOOK_SECRET` real. |
| Idempotência implementada? | ❌ **Pendente** | Webhook salva dados, mas precisa ignorar processamentos duplicados para o mesmo evento. |
| Checkout testado? | ❌ **Pendente** | Nenhum teste ponta a ponta (E2E) foi realizado. |
| Liberação somente por webhook? | ✅ **Pronto (Lógica)** | Servidor só marca a subscription após o evento `checkout.session.completed` e `payment_intent.succeeded`. |
| Plano B de Pix definido? | ❌ **Pendente** | Se Pix da Stripe demorar compensação, qual será o plano manual (WhatsApp)? |

---

## 4. ADMINISTRAÇÃO DO SISTEMA
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Role admin backend? | ❌ **Pendente** | Nenhuma verificação de admin na API (Express). |
| Firestore rules admin? | ❌ **Pendente** | Regras não diferenciam Admin de Usuário normal adequadamente para manipulação. |
| Logs administrativos? | ❌ **Pendente** | Ações de admin não estão sendo auditadas no Firestore. |
| Bloquear/desbloquear alunos? | ❌ **Pendente** | Função inexistente. |
| Conceder acesso manual? | ❌ **Pendente** | Função inexistente. |
| Revogar acesso? | ❌ **Pendente** | Função inexistente. |
| Histórico de pagamento do aluno? | ❌ **Pendente** | Visualização financeira (painel) para suporte inexistente. |

---

## 5. LGPD, POLÍTICAS E PROTEÇÃO DE MENORES
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Termos de Uso publicados? | ❌ **Pendente** | Página inexistente no React Router. |
| Política de Privacidade publicada? | ❌ **Pendente** | Página inexistente. |
| Política de Reembolso publicada? | ❌ **Pendente** | Página inexistente. |
| Política de menores publicada? | ❌ **Pendente** | É necessário, pois o esporte atrai pais e filhos (menores de idade não podem assinar contratos sem responsáveis). |
| Canal de suporte definido? | ❌ **Pendente** | E-mail de suporte institucional (ex: `suporte@ossconnect.com.br`) não aparente na interface. |
| Consentimento de responsável (Backend)?| ❌ **Pendente** | Nenhuma checkbox/auditoria no momento da compra/cadastro. |
| Exportação de dados cloud? | ❌ **Pendente** | Não implementado, exigência da LGPD. |
| Exclusão de conta cloud? | ❌ **Pendente** | Não implementado (exigência das lojas de apps e LGPD). |
| Política de retenção de dados? | ❌ **Pendente** | Não definido em contrato nem tecnicamente. |

---

## 6. CONTEÚDO E VÍDEOS PEDAGÓGICOS
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Módulos preservados? | ✅ **Pronto** | Estrutura dos 6 módulos e Formação Teórica preservadas. |
| Gokyo preservado? | ✅ **Pronto** | Componente e dados dos golpes imutados. |
| 139 vídeos preservados? | ✅ **Pronto** | Referências oficiais da Kodokan mantidas. |
| Vídeos críticos confirmados? | ✅ **Pronto** | Vídeo institucional/Boas vindas ativo na Introdução. |
| Vídeos pendentes? | ✅ **Pronto** | Base de conteúdo está 100% pronta. |
| Fallback "Abrir no YouTube"? | ✅ **Pronto** | Funciona perfeitamente. |
| Fontes e datas de revisão? | ✅ **Pronto** | Citações e conteúdos acadêmicos estruturados. |

---

## 7. PWA, ACESSIBILIDADE E PERFORMANCE
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Manifest válido? | ✅ **Pronto** | `manifest.json` existe com cores, ícones e diretrizes. |
| HTTPS? | ❌ **Pendente** | Depende do subdomínio entrar em produção. |
| Instalar app Android? | ⚠️ **Parcial** | Depende do Service Worker e HTTPS para surgir prompt nativo do Chrome. |
| Instrução iOS? | ❌ **Pendente** | Usuário Apple precisa de modal ensinando "Adicionar à Tela de Início". |
| Service Worker existe? | ❌ **Pendente** | Não há lógica de cache offline configurada via Vite/Workbox. |
| Offline testado? | ❌ **Pendente** | Sistema crashea/não carrega sem rede (arquivos não estão no Cache Storage). |
| Fonte grande & Alto Contraste? | ✅ **Pronto** | UI validada e aprovada pelo cliente. |
| TTS (Text to Speech)? | ❌ **Pendente** | Não implementado ainda. |
| Navegação por teclado? | ✅ **Pronto** | Interface possui `focus-visible` adequados. |

---

## 8. COMERCIAL E PAYWALL
| Requisito | Status | Observação |
| :--- | :--- | :--- |
| Plano gratuito definido? | ✅ **Pronto** | Decidido que certas aulas serão abertas (Preview). |
| Plano Fundador R$ 97 definido? | ✅ **Pronto** | Preço engatilhado na API. |
| Conteúdo incluído documentado? | ✅ **Pronto** | Benefícios listados na interface (acesso vitalício). |
| Premium bloqueado de fato? | ❌ **Pendente** | Atualmente, sem backend validando rotas, o frontend pode ser burlado por usuários avançados. |
| Banner free/Pix pendente? | ❌ **Pendente** | Não há tela mostrando o status de pagamento (ex: "Aguardando seu Pix"). |
| Modal premium? | ✅ **Pronto** | Paywall surge ao clicar em aulas bloqueadas. |
| Certificado com aviso legal? | ❌ **Pendente** | Sistema ainda não emite certificados automaticamente ao fim dos módulos. |

---

## 9. CRITÉRIOS PARA ATIVAR VENDAS (PRIORIDADE)

### 🔴 BLOQUEADOR (Fazer Imediatamente - Sem isso não há vendas)
1. **Domínio `dojo.ossconnect.com.br`** apontado e com HTTPS ativo.
2. **Firebase Auth** aceitando logins com segurança.
3. **Páginas LGPD** (Termos de Uso, Privacidade) criadas e lincadas no Footer/Checkout.
4. **Stripe Testes E2E**: Chaves da conta adicionadas no `.env`, Pix da Stripe ativo, Webhook registrado e funcionando perfeitamente em testes para liberar acesso automaticamente.
5. **Bloqueio Backend (Rotas)**: Validar via JWT/Firebase Token no servidor se a conta pagou, em vez de depender apenas do Front-end para esconder conteúdo.

### 🟡 IMPORTANTE (Resolver até 30 dias após lançar)
1. Migração de Progresso (localStorage para Firestore) para que o aluno não perca dados ao trocar de celular para computador.
2. Service Worker para funcionamento 100% Offline das descrições.
3. Painel Administrativo (Conceder/Revogar acessos manualmente).
4. Suporte de e-mail integrado à interface.
5. Exclusão de Conta (Delete account) obrigatória.

### 🟢 MELHORIA (Pode aguardar)
1. Gerador Automático de Certificado (PDF) ao concluir 100% das trilhas.
2. Login com Apple (Apple Sign In).
3. Text-to-Speech (leitor automático das aulas teóricas).
4. Modal visual ensinando usuários de iOS a instalar o PWA via Safari.

---

## 10. PRÓXIMAS AÇÕES (O que fazer agora?)

| # | Ação Exata | Responsável | Dependência | Risco de não fazer | Prazo Sugerido |
|:-:| :--- | :--- | :--- | :--- | :--- |
| **1** | **Aprovação do Domínio:** Criar CNAME para `dojo.ossconnect.com.br` no gerenciador de domínio apontando para a nuvem. | Gustavo | Acesso ao Registro.br / DNS. | O sistema continuará no link de testes (AI Studio). | Imediato |
| **2** | **Ativação Firebase:** Inserir o subdomínio na lista de "Authorized Domains" do Firebase e do Google OAuth. | Gustavo / Desenvolvedor | Domínio (Item 1) existir. | Erro de segurança ao tentar fazer login com Google. | Imediato |
| **3** | **Criação da Conta Stripe e Liberação Pix:** Criar a conta, habilitar o Pix nas configurações de método de pagamento do Stripe e extrair as chaves. | Gustavo | CNPJ/Dados Bancários. | Vendas impossibilitadas. | Dia 1 |
| **4** | **Código LGPD:** Criar páginas em branco/simples de Termos e Privacidade e links no Footer. | Google AI Studio | Textos base do Advogado. | Multas LGPD e bloqueio de serviços pelo Stripe/Google. | Dia 1-2 |
| **5** | **Deploy das Chaves e Testes Webhook:** Inserir `STRIPE_SECRET`, `WEBHOOK_SECRET` nas variáveis de nuvem e fazer compra de teste no cartão fake. | Desenvolvedor | Chaves Stripe (Item 3). | Aluno paga mas sistema não libera acesso. | Dia 2-3 |
