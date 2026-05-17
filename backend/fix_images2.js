const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'seeders', 'productSeeder.js');
let content = fs.readFileSync(filePath, 'utf-8');

let counter = 1;
// Replace ALL image URLs with placehold.co reliable ones
content = content.replace(/url:\s*'https:\/\/[^']+'/g, (match) => {
    return `url: 'https://placehold.co/600x400/EEE/31343C?text=Product+${counter++}'`;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('successfully updated productSeeder.js with placehold.co');
