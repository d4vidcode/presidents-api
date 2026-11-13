import fs from 'node:fs';
import path from 'node:path';

for (const dir of ['public', 'data']) {
  const src = path.resolve(dir);
  const dest = path.resolve('dist', dir);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
    console.log(`copied ${dir} -> ${dest}`);
  }
}
