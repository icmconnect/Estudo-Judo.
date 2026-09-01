# Arquitetura Next.js SSG + Google Drive Sync (Para o Futuro)

Este documento descreve como o sistema foi estruturado e como a integração com o Google Drive solicitada nos prompts (SSG/Next.js) pode ser implementada.

> **Importante:** O aplicativo atual está rodando em **React + Vite (SPA)** para garantir a compatibilidade, alta velocidade de visualização e edição dentro do ambiente Sandbox do Google AI Studio. As mudanças solicitadas sobre SEO (Next.js) requerem uma mudança de infraestrutura que deve ser feita no momento do deploy final para produção.

## 1. O Script de Sincronização do Drive (`sync-drive.mjs`)

Para buscar o conteúdo diretamente do seu Google Drive e injetar nos arquivos Markdown (substituindo a necessidade de digitar tudo à mão), você precisará rodar o seguinte script Node.js na sua máquina ou servidor. 

Este script lê a API do Google Drive e converte os documentos.

### Pré-requisitos
1. Criar um projeto no **Google Cloud Console**.
2. Ativar a **Google Drive API**.
3. Criar uma **Conta de Serviço (Service Account)** e baixar a chave JSON.
4. Compartilhar a pasta do Drive (`1Fols2VrRQKbuNUMXayLBrIPqCC-Aj417`) com o e-mail dessa Service Account.

### O Script (Salvar como `scripts/sync-drive.mjs`)
```javascript
import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

// Configuração da Conta de Serviço
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const FOLDER_ID = '1Fols2VrRQKbuNUMXayLBrIPqCC-Aj417';

async function syncDrive() {
  console.log('Iniciando sincronização com Google Drive...');
  
  // A chave JSON da service account deve estar no arquivo credentials.json
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
    });

    const files = res.data.files;
    if (files.length === 0) {
      console.log('Nenhum arquivo encontrado.');
      return;
    }

    console.log(`Encontrados ${files.length} arquivos. Processando...`);

    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.document') {
        // Exporta Google Docs como Texto/Markdown
        const result = await drive.files.export({
          fileId: file.id,
          mimeType: 'text/plain',
        });
        
        const content = result.data;
        const filePath = path.join(process.cwd(), 'src', 'content', `${file.name.replace(/\s+/g, '-').toLowerCase()}.md`);
        
        await fs.writeFile(filePath, content);
        console.log(`✅ Salvo: ${filePath}`);
      }
    }
    console.log('Sincronização concluída com sucesso!');
  } catch (err) {
    console.error('Erro na API do Google Drive:', err);
  }
}

syncDrive();
```

## 2. A Evolução do Layout
Aplicamos o **Design System Premium** (estilo Hotmart Club / Kiwify) no código atual.
- **Fundo Cinza/Escuro (Zinc)** com destaques em **Verde Esmeralda (Emerald)**.
- **Modo Foco**: A largura máxima do texto é controlada pela tipografia ideal (65-75 caracteres).
- **Gamificação**: Implementamos um hook local `useProgress.ts` que gerencia o estado de conclusão de cada aula no `localStorage`.
- **Vídeos Nativos**: Os iframes foram reestruturados para ocupar a tela com proporção exata 16:9 (`aspect-video`), sem bordas brancas, permitindo full-screen e rotação móvel.
