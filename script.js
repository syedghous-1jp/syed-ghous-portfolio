'use strict';
// Anti-clickjacking: if this page is loaded inside someone else's frame, break out or hide it
if(window.top!==window.self){try{window.top.location=window.self.location}catch(e){document.documentElement.style.display='none'}}
var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
// Email is built here so it is not sitting in the page source as plain text for spam bots
(function(){var m=['syedghxous177','gmail.com'].join('@');$$('[data-mail]').forEach(function(el){el.href='mailto:'+m;var t=el.querySelector('.mt');if(t)t.textContent=m})})();

// images from the repo: tries jpg, jpeg, png, webp
var EXT=['png','jpg','jpeg','webp'];
$$('img[data-b]').forEach(function(img){
  var c=[],i=0,box=img.parentElement;
  img.dataset.b.split('|').forEach(function(b){EXT.forEach(function(e){c.push(b+'.'+e)})});
  if(img.closest('.photo'))img.addEventListener('load',function(){var d=$('#dimg');if(d)d.setAttribute('href',img.src)});
  img.onerror=function(){i++;if(i<c.length)img.src=c[i];else{img.onerror=null;img.classList.add('missing');box.classList.add('missing')}};
  img.src=c[0];
});

// explorer data
var TOPICS=[["Introduction to Cybersecurity","https://vorknyx.online/Cybersecurity_Notes_A_to_Z%20roman%20urdu.pdf"],["Networking","https://vorknyx.online/networking"],["Linux","https://vorknyx.online/linux"],["And many more topics","https://vorknyx.online/"]];
var DATA=[
 [["Vorknyx Learning Hub","https://vorknyx.online/",TOPICS],["Vorknyx Store (my security tools)","https://vorknyx.store/"],["CyberSOC Platform","https://soc-software.onrender.com/"],["Vorknyx OS (code coming soon)",""]],
 [["Networking (Cisco)",""],["Linux command line",""],["Wireshark packet analysis",""],["Web enumeration with dirb",""],["Kali Linux labs",""]],
 [["TryHackMe every day","https://tryhackme.com/p/syedghous"],["CS50 Cybersecurity","#certificates"],["Roman Urdu notes","https://vorknyx.online/"],["CTF-style labs","https://vorknyx.online/"]]
];
var ANG=[-40,20,80],cur=-1,btns=$$('#cats button'),list=$('#list'),needle=$('#needle');
function setCat(i){
  if(i===cur)return;cur=i;
  btns.forEach(function(b,k){b.classList.toggle('on',k===i)});
  needle.style.transform='rotate('+ANG[i]+'deg)';
  list.textContent='';
  DATA[i].forEach(function(d,k){
    var w=mk('div','itw');w.style.animationDelay=(k*70)+'ms';
    var a=mk(d[1]?'a':'div','it'+(d[1]?'':' no'));
    if(d[1]){a.href=d[1];if(d[1].charAt(0)!=='#'){a.target='_blank';a.rel='noopener noreferrer'}}
    a.appendChild(mk('span','',d[0]));a.appendChild(mk('s','','+'));w.appendChild(a);
    if(d[2]){
      var p=mk('div','pop'),pc=mk('div','pc');pc.appendChild(mk('h4','','Topics you can learn'));
      d[2].forEach(function(t,j){var l=mk('a');l.href=t[1];l.target='_blank';l.rel='noopener noreferrer';l.style.transitionDelay=(j*60+80)+'ms';l.appendChild(mk('span','',t[0]));l.appendChild(mk('em','','\u2192'));pc.appendChild(l)});
      p.appendChild(pc);w.appendChild(p);
      a.addEventListener('click',function(e){if(matchMedia('(hover:none)').matches){e.preventDefault();w.classList.toggle('open')}});
    }
    list.appendChild(w);
  });
}
setCat(0);
var ex=$('#work');
btns.forEach(function(b,i){b.addEventListener('click',function(){
  if(innerWidth>900){var seg=(ex.offsetHeight-innerHeight)/3;scrollTo({top:ex.offsetTop+seg*i+seg*.5,behavior:'smooth'})}else setCat(i);
})});

// scroll-driven pieces
var pin=$('#pin'),stmt=$('#stmt'),pills=$$('.pill'),lines=['Learning cybersecurity one room, one lab and one note at a time.','Everything here is something I built, solved or can prove.'],ln=0;
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function onScroll(){
  var r=pin.getBoundingClientRect(),p=clamp(-r.top/(pin.offsetHeight-innerHeight),0,1);
  pills.forEach(function(el,k){el.style.transform='scale('+(0.35+p*(1.5+k*.35))+')'});
  var q=p<.5?p*2:(p-.5)*2,o=q<.25?q/.25:q>.75?(1-q)/.25:1,want=p<.5?0:1;
  if(want!==ln&&o<.1){ln=want;stmt.textContent=lines[ln]}
  stmt.style.opacity=clamp(o,0,1);stmt.style.transform='translateY('+((1-clamp(o,0,1))*(q<.5?24:-24))+'px) scale('+(.96+.04*clamp(o,0,1))+')';
  if(innerWidth>900){var e=ex.getBoundingClientRect(),t=clamp(-e.top/(ex.offsetHeight-innerHeight),0,.999);if(e.top<innerHeight&&e.bottom>0)setCat(Math.floor(t*3))}
  $('#top').style.opacity=scrollY>600?1:0;$('#top').style.pointerEvents=scrollY>600?'auto':'none';
}
var tick=false;addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){onScroll();tick=false})}},{passive:true});
addEventListener('resize',onScroll);onScroll();
$('#top').addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});

// count up
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);
  var el=e.target,n=+el.dataset.n,s=el.dataset.s||'',t0=performance.now();
  (function f(t){var k=clamp((t-t0)/1400,0,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0);
})},{threshold:.6});
$$('.sb b').forEach(function(b){co.observe(b)});

// certificates
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.2});
$$('.cert').forEach(function(c){io.observe(c)});
$$('.tilt').forEach(function(t){
  t.addEventListener('mousemove',function(e){var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg) translateY(-4px)'});
  t.addEventListener('mouseleave',function(){t.style.transform=''});
  t.addEventListener('click',function(e){if(e.target.closest('a'))return;var im=t.querySelector('img');if(im.classList.contains('missing'))return;$('#lbImg').src=im.src;$('#lb').classList.add('open')});
});
$('#lb').addEventListener('click',function(){this.classList.remove('open')});
addEventListener('keydown',function(e){if(e.key==='Escape')$('#lb').classList.remove('open')});
