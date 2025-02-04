const path = require('path');
const glob = require('glob');

// Функция для поиска всех файлов с Tailwind классами
function findTailwindFiles() {
  return glob.sync('./src/**/*.{js,jsx,ts,tsx,css}', {
    ignore: ['./node_modules/**/*']
  });
}

// Функция для проверки циклических импортов в CSS
function checkCyclicImports(file, visited = new Set(), stack = new Set()) {
  if (stack.has(file)) {
    console.error('Циклическая зависимость обнаружена:', Array.from(stack).join(' -> ') + ' -> ' + file);
    return true;
  }

  if (visited.has(file)) {
    return false;
  }

  visited.add(file);
  stack.add(file);

  // Читаем файл и ищем @import
  const content = require('fs').readFileSync(file, 'utf8');
  const importRegex = /@import\s+['"](.+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = path.resolve(path.dirname(file), match[1]);
    if (checkCyclicImports(importPath, visited, stack)) {
      return true;
    }
  }

  stack.delete(file);
  return false;
}

// Проверка конфигурации Tailwind
async function checkTailwindConfig() {
  const tailwindConfig = require('./tailwind.config.js');
  console.log('Content paths:', tailwindConfig.content);
  
  // Проверяем все файлы в content paths
  const files = findTailwindFiles();
  console.log('\nНайдено файлов для проверки:', files.length);
  
  // Проверяем циклические импорты
  let hasCycles = false;
  files.forEach(file => {
    if (file.endsWith('.css')) {
      if (checkCyclicImports(file)) {
        hasCycles = true;
      }
    }
  });

  if (!hasCycles) {
    console.log('Циклических зависимостей не обнаружено');
  }
}

checkTailwindConfig().catch(console.error);