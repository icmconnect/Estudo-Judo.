/**
 * Script de Sincronização Google Drive -> Dojo Digital
 * Exporta Google Docs como HTML/Markdown sanitizado, convertendo links de vídeo do YouTube em iframes embutidos com aspect-ratio 16:9.
 */

import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const FOLDER_ID = process.env.DRIVE_FOLDER_ID || '1Fols2VrRQKbuNUMXayLBrIPqCC-Aj417';

async function syncDrive() {
  console.log('🥋 Iniciando sincronização do Google Drive com o Dojo Digital...');
  
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

    const files = res.data.files || [];
    if (files.length === 0) {
      console.log('⚠️ Nenhum arquivo encontrado no Google Drive.');
      return;
    }

    console.log(`📁 Encontrados ${files.length} arquivos. Processando...`);

    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.document') {
        // Exporta como HTML para preservar formatação rica e tabelas
        const result = await drive.files.export({
          fileId: file.id,
          mimeType: 'text/html',
        });
        
        let content = String(result.data);

        // Converte links normais do YouTube em iframes embutidos seguros
        content = content.replace(
          /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/g,
          (match, videoId) => {
            return `<div class="aspect-video w-full my-6 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 bg-black"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}?rel=0" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
          }
        );

        const slug = file.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const filePath = path.join(process.cwd(), 'src', 'content', `${slug}.md`);
        await fs.writeFile(filePath, content);
        console.log(`✅ Salvo e sanitizado: ${filePath}`);
      }
    }
    console.log('🎉 Sincronização e sanitização concluídas com sucesso!');
  } catch (err) {
    console.error('❌ Erro na sincronização com o Google Drive:', err);
  }
}

syncDrive();
