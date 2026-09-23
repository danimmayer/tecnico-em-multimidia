import assert from 'node:assert/strict';
import {readProject, pageStart, postStart, renderSvg, editorHtml, fitLabel, wrapText, checks, pageExample} from './lessons/design-web-08-editor.mjs';

const image = {id:'asset-1',kind:'image',x:48,y:48,w:120,h:80,src:'data:image/png;base64,aGVsbG8=',decorative:true};
const text = {id:'text-1',kind:'text',x:48,y:48,w:220,h:140,title:'<script>alert("x")</script> & teste',color:'#112233',font:'Georgia, serif',scale:1.4};
const project = {version:2,page:[...pageStart,image,text],post:postStart,background:{page:'#112233',post:'#FFFFFF'}};
const loaded = readProject(JSON.parse(JSON.stringify(project)));
assert.equal(loaded.page.at(-2).src,image.src);
assert.equal(loaded.page.at(-1).title,text.title);
assert.equal(loaded.page.at(-1).font,text.font);
assert.equal(loaded.background.page,'#112233');
assert.equal(readProject({version:1,page:pageStart,post:postStart}).page.length,pageStart.length);
const svg = renderSvg('page',loaded.page,false,loaded.background.page);
assert.ok(!svg.includes('<script>'));
assert.ok(svg.includes('&lt;script&gt;'));
assert.ok(svg.includes('overflow="hidden"'));
assert.ok(svg.includes(image.src));
assert.deepEqual(checks('page',[...pageExample,image]),checks('page',pageExample));
for (const invalid of [
  {...image,src:'https://example.com/image.svg'},
  {...image,src:'data:image/svg+xml;base64,PHN2Zz4='},
  {...image,id:'bad" onclick="x'},
  {...image,x:-1}, {...image,w:1000}, {...image,h:Infinity}, {...image,kind:'unknown'}
]) assert.throws(()=>readProject({...project,page:[invalid]}));
assert.throws(()=>readProject({...project,page:[image,image]}));
assert.throws(()=>readProject({...project,page:[]}));
assert.throws(()=>readProject({...project,version:999}));
assert.ok(fitLabel('Um título muito longo para este espaço',32,80,'Arial').size<=32);
assert.ok(wrapText('Um texto com várias palavras para distribuir nas linhas',120,28,'Arial').length>1);
const html=editorHtml();
const code=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
new Function(code);
const start=code.indexOf('const offlineSource=')+'const offlineSource='.length;
const end=code.indexOf(';\n(function startEditor',start);
const offline=JSON.parse(code.slice(start,end));
new Function(offline.slice(offline.indexOf('<script>')+8,offline.lastIndexOf('</script>')));
console.log('Customization: project roundtrip, legacy import, embedded assets, malformed input, text bounds, decorative checks and offline scripts passed.');

for (const align of ['left','center','right']) {
  const item={...text,title:'Linha um\nLinha dois',align,decorative:true};
  const roundtrip=readProject({...project,page:[item]}).page[0];
  assert.equal(roundtrip.align,align);
  const rendered=renderSvg('page',[roundtrip],false);
  const anchor=align==='center'?'middle':align==='right'?'end':'start';
  assert.ok(rendered.includes('text-anchor="'+anchor+'"'));
}
assert.equal(readProject({...project,page:[{...text,align:'invalid'}]}).page[0].align,undefined);
