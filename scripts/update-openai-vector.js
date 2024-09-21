import glob from 'fast-glob';
import { createReadStream, statSync } from 'fs';
import { OpenAI } from 'openai';

const DOCS_VECTORSTORE_ID = 'vs_YyCuanTAV01erLARFE2rb9f6';

async function uploadToAssistant(assistantId) {
  const openai = new OpenAI();

  const { data: vectorFiles } = await openai.beta.vectorStores.files.list(
    assistantId,
    { limit: 100 }
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
    // Additional files from another vector store (those files that are already uploaded and need to be connected to this vector store)
    // fileIds: docsFiles.map(file => file.id),
  });
}

export default async () => {
  await uploadToAssistant(DOCS_VECTORSTORE_ID);
};
