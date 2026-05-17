const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'seeders', 'productSeeder.js');
let content = fs.readFileSync(filePath, 'utf-8');

let counter = 1;
// Replace Amazon URLs with picsum photos
content = content.replace(/url:\s*'https:\/\/m\.media-amazon\.com[^']+'/g, () => {
    return `url: 'https://picsum.photos/seed/product${counter++}/500/500'`;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('successfully updated productSeeder.js');
