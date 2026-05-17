const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'seeders', 'productSeeder.js');
let content = fs.readFileSync(filePath, 'utf-8');

// I will map categories or use generic reliable stock photos from Unsplash for Amazon links.
const fallbacks = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', // shoes
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', // watch
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', // headphones
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800', // camera
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800', // shoes
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800', // earphone
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', // shoes
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', // sunglass
    'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=800', // watch
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800'  // watch
];

let counter = 0;
// Replace only Amazon URLs or specifically broken URLs with beautiful Unsplash pictures.
content = content.replace(/url:\s*'https:\/\/(m\.media-amazon|images-eu\.ssl-images-amazon|ui-avatars)[^']+'/g, (match) => {
    let f = fallbacks[counter % fallbacks.length];
    counter++;
    return `url: '${f}'`;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('successfully updated productSeeder.js with beautiful placeholders');
