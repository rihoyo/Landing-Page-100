import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {landingRoutes} from '../src/pages/registry.ts';
const html=readFileSync('dist/index.html','utf8');
for(const {paths} of landingRoutes) for(const path of paths){
 if(path==='/') continue;
 const directory=`dist${path}`;
 mkdirSync(directory,{recursive:true});
 writeFileSync(`${directory}/index.html`,html);
}
