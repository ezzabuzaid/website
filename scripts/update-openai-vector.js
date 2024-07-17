import glob from 'fast-glob';
import { createReadStream, statSync } from 'fs';
import { OpenAI } from 'openai';

const DOCS_VECTORSTORE_ID = 'vs_YyCuanTAV01erLARFE2rb9f6';
const WEBSITE_VECTORSTORE_ID = 'vs_MesKThnNuAD2iYGZm3Nc79Mv';

async function uploadToAssistant(assistantId) {
  const openai = new OpenAI();

  const { data: vectorFiles } = await openai.beta.vectorStores.files.list(
    assistantId,
    { limit: 100 }
  );

  const { data: docsFiles } = await openai.beta.vectorStores.files.list(
    DOCS_VECTORSTORE_ID,
    {
      limit: 100,
    }
  );

  // delete existing files as vectorstore appends and doesn't overwrite
  for (const file of vectorFiles) {
    await openai.beta.vectorStores.files.del(assistantId, file.id);
  }

  const files = glob.globSync('pages/**/*.{md,mdx}');
  const filesStreams = files
    .filter(path => statSync(path).size)
    .filter(
      path => !(path.includes('learn') || path.includes('javascript-bites'))
    )
    .map(path => {
      const stream = createReadStream(path, { encoding: 'utf8' });
      stream.path = path.replace('.mdx', '.md');
      return stream;
    });
  await openai.beta.vectorStores.fileBatches.uploadAndPoll(assistantId, {
    files: filesStreams,
    fileIds: docsFiles.map(file => file.id),
  });
}

export default async () => {
  await uploadToAssistant(WEBSITE_VECTORSTORE_ID);
};
