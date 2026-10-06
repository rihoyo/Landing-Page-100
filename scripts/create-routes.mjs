import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const html=readFileSync('dist/index.html','utf8');
for(const page of ['aa0001','aa0002']){mkdirSync(`dist/${page}`,{recursive:true});writeFileSync(`dist/${page}/index.html`,html);}
