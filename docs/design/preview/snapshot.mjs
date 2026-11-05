import fs from 'node:fs';
const base='http://localhost:3457';const out=process.argv[2];
let html=await (await fetch(base+'/design-preview')).text();
const hrefs=[...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map(m=>m[1]);
let css='';for(const h of new Set(hrefs))css+=await (await fetch(base+h)).text();
const urls=[...new Set([...css.matchAll(/url\(([^)"']*\.woff2[^)"']*)\)|url\(["']([^"']*\.woff2[^"']*)["']\)/g)].map(m=>m[1]||m[2]))];
for(const u of urls){const abs=u.startsWith('http')?u:new URL(u,base+hrefs[0]).href;const b=Buffer.from(await (await fetch(abs)).arrayBuffer());css=css.split(u).join('data:font/woff2;base64,'+b.toString('base64'))}
html=html.replace(/<script\b[\s\S]*?<\/script>/g,'').replace(/<link[^>]*>/g,'').replace(/<!--\/?\$\??-->/g,'');
html=html.replace('<title>Brew &amp; Co.</title>','<title>Brew &amp; Co. style guide</title>');
html=html.replace('</head>',()=>'<style>'+css+'</style></head>');
html=html.replace(/\s(?:srcset|srcSet|sizes)="[^"]*"/g,'');
const images=[...new Set([...html.matchAll(/src="(\/_next\/image[^"]*)"/g)].map(m=>m[1]))];
for(const src of images){const url=base+src.replace(/&amp;/g,'&').replace(/w=\d+/,'w=828');const r=await fetch(url,{headers:{accept:'image/jpeg'}});const b=Buffer.from(await r.arrayBuffer());html=html.split(`src="${src}"`).join(`src="data:${r.headers.get('content-type')};base64,${b.toString('base64')}"`)}
fs.writeFileSync(out,html);console.log('fonts inlined',urls.length,'KB',Math.round(html.length/1024),'external refs',(html.match(/(src|href)="\/_next[^"]*"/g)||[]).length,'scripts',(html.match(/<script/g)||[]).length);
