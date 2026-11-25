(function(){
var d=document,h=d.documentElement;
h.classList.remove('no-js');h.classList.add('js');
var BP=900;
function setMenu(o){
  if(o){h.classList.add('menu-open')}else{h.classList.remove('menu-open')}
  var b=d.getElementById('burger');if(b){b.setAttribute('aria-expanded',o?'true':'false')}
  var dr=d.getElementById('mob-drawer');if(dr){dr.setAttribute('aria-hidden',o?'false':'true')}
}
var burger=d.getElementById('burger');
if(burger){burger.addEventListener('click',function(){setMenu(!h.classList.contains('menu-open'))})}
var cl=d.getElementById('mob-close');if(cl){cl.addEventListener('click',function(){setMenu(false)})}
var ov=d.getElementById('mob-overlay');if(ov){ov.addEventListener('click',function(){setMenu(false)})}
d.querySelectorAll('#mob-drawer a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false)}});
window.addEventListener('resize',function(){if(window.innerWidth>BP){setMenu(false)}});
d.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){
    var a=q.nextElementSibling,open=q.getAttribute('aria-expanded')==='true';
    q.setAttribute('aria-expanded',open?'false':'true');
    a.style.maxHeight=open?'0px':a.scrollHeight+'px';
  });
});
var tabs=d.querySelectorAll('[role=tab]');
tabs.forEach(function(t){
  t.addEventListener('click',function(){selectTab(t)});
  t.addEventListener('keydown',function(e){
    var list=Array.prototype.slice.call(t.parentNode.querySelectorAll('[role=tab]')),i=list.indexOf(t);
    if(e.key==='ArrowRight'){e.preventDefault();selectTab(list[(i+1)%list.length],true)}
    if(e.key==='ArrowLeft'){e.preventDefault();selectTab(list[(i+list.length-1)%list.length],true)}
  });
});
function selectTab(t,focus){
  var bar=t.parentNode;
  bar.querySelectorAll('[role=tab]').forEach(function(x){
    var sel=x===t;x.setAttribute('aria-selected',sel?'true':'false');x.tabIndex=sel?0:-1;
    var p=d.getElementById(x.getAttribute('aria-controls'));if(p){p.hidden=!sel}
  });
  if(focus){t.focus()}
}
var first=d.querySelector('[role=tab][aria-selected=true]');if(first){selectTab(first)}
var fc=d.getElementById('float-call'),ft=d.querySelector('footer.site');
if(fc&&ft&&'IntersectionObserver' in window){
  new IntersectionObserver(function(en){en.forEach(function(e){fc.classList.toggle('hide',e.isIntersecting)})},{threshold:0}).observe(ft);
}
})();
