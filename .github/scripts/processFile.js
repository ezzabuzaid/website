const fs = require('fs');
const matter = require('gray-matter');

function removeFrontmatter(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);
  return `${matter(content).data.title}\ncontent`.trim();
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('No file path provided');
  process.exit(1);
}

try {
  const cleanedContent = removeFrontmatter(filePath);
  console.log(cleanedContent);
} catch (error) {
  console.error(`Error processing file ${filePath}:`, error);
  process.exit(1);
}
