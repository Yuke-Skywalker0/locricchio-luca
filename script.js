/* ══════════════════════════════════════════════════
   LUCA LO CRICCHIO — script.js v2.0
   ══════════════════════════════════════════════════ */

/* ── CURSOR + TRAIL ──────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;
  if (window.matchMedia('(pointer:coarse)').matches) return; // touch devices

  let mx=0,my=0,rx=0,ry=0;
  const TRAIL_LEN=18, trailDots=[];
  for(let i=0;i<TRAIL_LEN;i++){
    const d=document.createElement('div');
    d.className='trail-dot';
    const s=1-i/TRAIL_LEN;
    d.style.cssText=`width:${s*8}px;height:${s*8}px;background:rgba(79,195,247,${s*0.45});`;
    document.body.appendChild(d);
    trailDots.push({el:d,x:0,y:0});
  }
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function animC(){
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
    ring.style.left=rx+'px';   ring.style.top=ry+'px';
    trailDots[0].x+=(mx-trailDots[0].x)*0.4;
    trailDots[0].y+=(my-trailDots[0].y)*0.4;
    for(let i=1;i<TRAIL_LEN;i++){
      trailDots[i].x+=(trailDots[i-1].x-trailDots[i].x)*0.35;
      trailDots[i].y+=(trailDots[i-1].y-trailDots[i].y)*0.35;
    }
    trailDots.forEach(d=>{d.el.style.left=d.x+'px';d.el.style.top=d.y+'px';});
    requestAnimationFrame(animC);
  })();
})();

/* ── BIG BANG INTRO ──────────────────────────────── */
(function initIntro(){
  const canvas=document.getElementById('intro-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize);

  let phase='void',t=0,bangT=0;
  const voidP=Array.from({length:200},()=>({
    x:Math.random(),y:Math.random(),vx:0,vy:0,
    r:Math.random()*1.5+.3,a:Math.random()*.5+.1,
    col:Math.random()<.5?'79,195,247':'168,216,240'
  }));
  const rings=[],debris=[];
  const stars=Array.from({length:300},()=>({
    tx:Math.random(),ty:Math.random(),x:.5,y:.5,
    r:Math.random()*1.4+.2,a:0,ta:Math.random()*.8+.1,
    speed:Math.random()*.003+.001,tw:Math.random()*Math.PI*2,delay:Math.random()*120
  }));
  const particles=Array.from({length:55},()=>({
    tx:Math.random(),ty:Math.random(),x:.5,y:.5,
    vx:(Math.random()-.5)*.0003,vy:(Math.random()-.5)*.0003,
    r:Math.random()*2+.5,a:0,ta:Math.random()*.5+.2,
    pulse:Math.random()*Math.PI*2,delay:Math.random()*180
  }));
  const cols=Math.floor(window.innerWidth/28);
  const drops=Array.from({length:cols},()=>Math.random()*-80);
  const chars='01アイウエオ</>{}[]ABCDEF0123456789';
  let settled=0;

  function triggerBang(){
    phase='BANG';bangT=0;
    for(let i=0;i<6;i++) rings.push({r:0,maxR:Math.max(W,H)*1.2*(0.4+i*.14),speed:22+i*8,a:1-(i*.12),width:3-i*.3,delay:i*4});
    for(let i=0;i<500;i++){const ang=Math.random()*Math.PI*2,sp=Math.pow(Math.random(),.4)*18+1;debris.push({x:W/2,y:H/2,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,r:Math.random()*2.5+.3,a:1,decay:.012+Math.random()*.018,col:Math.random()<.6?'79,195,247':Math.random()<.5?'255,255,255':'168,100,255'});}
  }

  function draw(){
    t++;ctx.clearRect(0,0,W,H);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
    if(phase==='void'){
      const cx=W/2,cy=H/2;
      voidP.forEach(p=>{
        const px=p.x*W,py=p.y*H,dx=cx-px,dy=cy-py;
        p.vx+=dx*.00005;p.vy+=dy*.00005;p.vx*=.98;p.vy*=.98;
        p.x+=p.vx/W;p.y+=p.vy/H;
        ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.col},${Math.min(1,t/60)*p.a})`;ctx.fill();
      });
      if(t>40){
        const pulse=Math.sin(t*.08)*.4+.6,cr=4+pulse*6;
        const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,cr*8);
        cg.addColorStop(0,`rgba(79,195,247,${pulse*.9})`);cg.addColorStop(.4,`rgba(37,87,214,${pulse*.4})`);cg.addColorStop(1,'transparent');
        ctx.beginPath();ctx.arc(cx,cy,cr*8,0,Math.PI*2);ctx.fillStyle=cg;ctx.fill();
        ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);ctx.fillStyle='white';ctx.fill();
      }
      if(t===160)triggerBang();
    }
    if(phase==='BANG'){
      bangT++;const cx=W/2,cy=H/2;
      if(bangT<12){const fa=Math.max(0,1-(bangT/12));ctx.fillStyle=`rgba(255,255,255,${fa*.95})`;ctx.fillRect(0,0,W,H);}
      if(bangT<30){
        const ba=Math.max(0,1-(bangT/30)),br=bangT*40;
        const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,br);
        bg.addColorStop(0,`rgba(255,255,255,${ba})`);bg.addColorStop(.3,`rgba(79,195,247,${ba*.8})`);bg.addColorStop(.7,`rgba(37,87,214,${ba*.4})`);bg.addColorStop(1,'transparent');
        ctx.beginPath();ctx.arc(cx,cy,br,0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();
      }
      rings.forEach(ring=>{
        if(bangT>ring.delay){ring.r+=ring.speed;const ra=Math.max(0,ring.a*(1-ring.r/ring.maxR));if(ra>0){ctx.beginPath();ctx.arc(cx,cy,ring.r,0,Math.PI*2);ctx.strokeStyle=`rgba(79,195,247,${ra})`;ctx.lineWidth=ring.width;ctx.stroke();}}
      });
      debris.forEach(d=>{d.x+=d.vx;d.y+=d.vy;d.vx*=.97;d.vy*=.97;d.a-=d.decay;if(d.a>0){ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(${d.col},${d.a})`;ctx.fill();}});
      if(bangT>90)phase='settle';
    }
    if(phase==='settle'){
      bangT++;settled=Math.min(1,(bangT-90)/200);
      const cx=W/2,cy=H/2;
      const bgG=ctx.createRadialGradient(cx,cy*.7,0,cx,cy,W*.8);
      bgG.addColorStop(0,`rgba(10,10,40,${settled*.9})`);bgG.addColorStop(.5,`rgba(5,5,26,${settled*.8})`);bgG.addColorStop(1,'rgba(3,3,15,0)');
      ctx.fillStyle=bgG;ctx.fillRect(0,0,W,H);
      stars.forEach(s=>{
        if(bangT-90<s.delay)return;
        const prog=Math.min(1,(bangT-90-s.delay)/120);
        s.x=.5+(s.tx-.5)*prog;s.y=.5+(s.ty-.5)*prog;s.a=prog*s.ta;s.tw+=s.speed;
        ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(168,216,240,${s.a*(0.5+0.5*Math.sin(s.tw))})`;ctx.fill();
      });
      debris.forEach(d=>{d.x+=d.vx*.3;d.y+=d.vy*.3;d.a=Math.max(0,d.a-d.decay*.5);if(d.a>0){ctx.beginPath();ctx.arc(d.x,d.y,d.r*.6,0,Math.PI*2);ctx.fillStyle=`rgba(${d.col},${d.a*.3})`;ctx.fill();}});
      ctx.font='13px JetBrains Mono,monospace';
      for(let i=0;i<drops.length;i++){
        if(drops[i]>0){ctx.fillStyle=`rgba(79,195,247,${settled*.08})`;ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*28,drops[i]*18);}
        if(drops[i]*18>H&&Math.random()>.975)drops[i]=0;drops[i]+=.4;
      }
      particles.forEach(p=>{
        if(bangT-90<p.delay)return;
        const prog=Math.min(1,(bangT-90-p.delay)/150);
        p.x=.5+(p.tx-.5)*prog;p.y=.5+(p.ty-.5)*prog;p.a=prog*p.ta;p.pulse+=.02;
        const pa=p.a*(.6+.4*Math.sin(p.pulse)),px=p.x*W,py=p.y*H;
        const g=ctx.createRadialGradient(px,py,0,px,py,p.r*6);
        g.addColorStop(0,`rgba(79,195,247,${pa*.5})`);g.addColorStop(1,'transparent');
        ctx.beginPath();ctx.arc(px,py,p.r*6,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(79,195,247,${pa})`;ctx.fill();
      });
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── ENTER SITE ──────────────────────────────────── */
function enterSite(){
  const intro=document.getElementById('intro');
  const site =document.getElementById('site');
  const nav  =document.getElementById('mainnav');
  intro.classList.add('fade-out');
  setTimeout(()=>{
    intro.style.display='none';
    site.classList.add('visible');
    setTimeout(()=>nav.classList.add('visible'),400);
    startUniverse();
    startTypewriter();
    initReveal();
    initSkillsCanvas();
    initTilt();
    initScramble();
    initCounters();
    initTimeline();
    initWarp();
  },1400);
}
document.getElementById('enterBtn').addEventListener('click',enterSite);
document.getElementById('skipBtn').addEventListener('click',enterSite);
setTimeout(enterSite,6500);

/* ── MOBILE MENU ─────────────────────────────────── */
const hamburger=document.querySelector('.nav-hamburger');
const mobileMenu=document.querySelector('.nav-mobile-menu');
if(hamburger&&mobileMenu){
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow=mobileMenu.classList.contains('open')?'hidden':'';
  });
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow='';
    });
  });
}

/* ── UNIVERSE BG ─────────────────────────────────── */
function startUniverse(){
  const canvas=document.getElementById('universe');
  const ctx=canvas.getContext('2d');
  let W,H,scrollY=0;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  window.addEventListener('scroll',()=>{scrollY=window.scrollY;});
  const stars=Array.from({length:280},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.2,a:Math.random(),speed:Math.random()*.003+.001,tw:Math.random()*Math.PI*2,depth:Math.random()}));
  const starsDeep=Array.from({length:120},()=>({x:Math.random(),y:Math.random(),r:Math.random()*.8+.1,a:Math.random()*.4+.1,speed:Math.random()*.001+.0005,tw:Math.random()*Math.PI*2,depth:.2}));
  const particles=Array.from({length:45},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0003,vy:(Math.random()-.5)*.0003,r:Math.random()*2+.5,a:Math.random()*.6+.2,pulse:Math.random()*Math.PI*2}));
  const cols=Math.floor(window.innerWidth/28);
  const drops=Array.from({length:cols},()=>Math.random()*-50);
  const chars='01アイウエオ</>{}[]ABCDEF0123456789';
  const totalH=document.body.scrollHeight;
  function draw(){
    ctx.clearRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.4,0,W*.5,H*.4,W*.8);
    bg.addColorStop(0,'#0a0a28');bg.addColorStop(.5,'#05051a');bg.addColorStop(1,'#03030f');
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const pScroll=scrollY/Math.max(totalH-H,1);
    starsDeep.forEach(s=>{
      s.tw+=s.speed;
      const offY=(pScroll*H*0.3)%H;
      const sy=((s.y*H+offY)%H+H)%H;
      ctx.beginPath();ctx.arc(s.x*W,sy,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(168,216,240,${s.a*(0.3+0.3*Math.sin(s.tw))})`;ctx.fill();
    });
    stars.forEach(s=>{
      s.tw+=s.speed;
      const offY=(pScroll*H*(0.5+s.depth*0.4))%H;
      const sy=((s.y*H+offY)%H+H)%H;
      ctx.beginPath();ctx.arc(s.x*W,sy,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(168,216,240,${s.a*(0.5+0.5*Math.sin(s.tw))})`;ctx.fill();
    });
    ctx.font='13px JetBrains Mono,monospace';
    for(let i=0;i<drops.length;i++){
      if(drops[i]>0){ctx.fillStyle=`rgba(79,195,247,${.03+Math.random()*.05})`;ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*28,drops[i]*18);}
      if(drops[i]*18>H&&Math.random()>.975)drops[i]=0;drops[i]+=.4;
    }
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;
      p.pulse+=.02;
      const pa=p.a*(.6+.4*Math.sin(p.pulse)),px=p.x*W,py=p.y*H;
      const g=ctx.createRadialGradient(px,py,0,px,py,p.r*6);
      g.addColorStop(0,`rgba(79,195,247,${pa*.5})`);g.addColorStop(1,'transparent');
      ctx.beginPath();ctx.arc(px,py,p.r*6,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
      ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(79,195,247,${pa})`;ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=(particles[i].x-particles[j].x)*W,dy=(particles[i].y-particles[j].y)*H;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<140){ctx.beginPath();ctx.moveTo(particles[i].x*W,particles[i].y*H);ctx.lineTo(particles[j].x*W,particles[j].y*H);ctx.strokeStyle=`rgba(79,195,247,${(1-dist/140)*.1})`;ctx.lineWidth=.5;ctx.stroke();}
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── WARP ────────────────────────────────────────── */
function initWarp(){
  const warpEl=document.getElementById('warp');
  const canvas=document.getElementById('warp-canvas');
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
  let warpActive=false,warpProgress=0;
  const warpLines=Array.from({length:200},()=>({angle:Math.random()*Math.PI*2,len:0,speed:Math.random()*15+8,a:Math.random()*.8+.2}));
  let lastSection='';
  const sections=document.querySelectorAll('section');
  const sectionObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting&&e.target.id!==lastSection){lastSection=e.target.id;triggerWarp();}});
  },{threshold:0.5});
  sections.forEach(s=>sectionObs.observe(s));
  function triggerWarp(){if(warpActive)return;warpActive=true;warpProgress=0;warpLines.forEach(l=>{l.len=0;l.angle=Math.random()*Math.PI*2;l.speed=Math.random()*20+10;});}
  function drawWarp(){
    if(!warpActive){requestAnimationFrame(drawWarp);return;}
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx=canvas.width/2,cy=canvas.height/2;
    warpProgress+=0.04;
    const alpha=warpProgress<0.5?warpProgress*2:(1-warpProgress)*2;
    if(alpha<=0||warpProgress>=1){warpActive=false;ctx.clearRect(0,0,canvas.width,canvas.height);warpEl.style.opacity=0;requestAnimationFrame(drawWarp);return;}
    warpEl.style.opacity=1;
    warpLines.forEach(l=>{
      l.len+=l.speed*(1+warpProgress*3);
      const x1=cx+Math.cos(l.angle)*l.len*.3,y1=cy+Math.sin(l.angle)*l.len*.3;
      const x2=cx+Math.cos(l.angle)*(l.len*.3+l.len*.4),y2=cy+Math.sin(l.angle)*(l.len*.3+l.len*.4);
      const grad=ctx.createLinearGradient(x1,y1,x2,y2);
      grad.addColorStop(0,'transparent');grad.addColorStop(.5,`rgba(79,195,247,${l.a*alpha*0.7})`);grad.addColorStop(1,'transparent');
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=grad;ctx.lineWidth=1;ctx.stroke();
    });
    requestAnimationFrame(drawWarp);
  }
  drawWarp();
}

/* ── TYPEWRITER ──────────────────────────────────── */
function startTypewriter(){
  const words=['Full Stack Developer','Digital Systems Builder','Marketing Automation Expert','Problem Architect','Future Engineer'];
  let wi=0,ci=0,deleting=false;
  const tw=document.getElementById('typewriter');
  function type(){
    const word=words[wi];
    if(!deleting){tw.textContent=word.substring(0,ci+1);ci++;if(ci===word.length){deleting=true;setTimeout(type,2200);return;}}
    else{tw.textContent=word.substring(0,ci-1);ci--;if(ci===0){deleting=false;wi=(wi+1)%words.length;setTimeout(type,400);return;}}
    setTimeout(type,deleting?48:78);
  }
  setTimeout(type,1000);
}

/* ── SKILLS ORBIT CANVAS ─────────────────────────── */
function initSkillsCanvas(){
  const canvas=document.getElementById('skills-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width=400,H=canvas.height=400,cx=W/2,cy=H/2;
  const techs=[
    {label:'React',r:80,speed:.008,angle:0,size:9,color:'#61DAFB'},
    {label:'Python',r:80,speed:.008,angle:Math.PI,size:9,color:'#4FC3F7'},
    {label:'JS',r:130,speed:.005,angle:.5,size:8,color:'#F7DF1E'},
    {label:'HTML',r:130,speed:.005,angle:2.0,size:8,color:'#E34F26'},
    {label:'CSS',r:130,speed:.005,angle:3.5,size:8,color:'#264DE4'},
    {label:'SQL',r:170,speed:.003,angle:1.0,size:7,color:'#4FC3F7'},
    {label:'Node',r:170,speed:.003,angle:3.0,size:7,color:'#68A063'},
    {label:'Git',r:170,speed:.003,angle:5.0,size:7,color:'#F05032'},
    {label:'Java',r:50,speed:.015,angle:1.2,size:7,color:'#ED8B00'},
  ];
  function drawOrbit(){
    ctx.clearRect(0,0,W,H);
    [80,130,170].forEach(r=>{ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='rgba(79,195,247,.08)';ctx.lineWidth=1;ctx.stroke();});
    const core=ctx.createRadialGradient(cx,cy,0,cx,cy,28);
    core.addColorStop(0,'rgba(79,195,247,.9)');core.addColorStop(.5,'rgba(37,87,214,.6)');core.addColorStop(1,'rgba(79,195,247,0)');
    ctx.beginPath();ctx.arc(cx,cy,28,0,Math.PI*2);ctx.fillStyle=core;ctx.fill();
    ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
    techs.forEach(t=>{
      t.angle+=t.speed;
      const x=cx+Math.cos(t.angle)*t.r,y=cy+Math.sin(t.angle)*t.r;
      const g=ctx.createRadialGradient(x,y,0,x,y,t.size*3);
      g.addColorStop(0,t.color+'66');g.addColorStop(1,'transparent');
      ctx.beginPath();ctx.arc(x,y,t.size*3,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
      ctx.beginPath();ctx.arc(x,y,t.size,0,Math.PI*2);ctx.fillStyle=t.color;ctx.fill();
      ctx.fillStyle='rgba(240,244,255,.7)';ctx.font='10px JetBrains Mono,monospace';
      ctx.textAlign='center';ctx.fillText(t.label,x,y+t.size+14);
    });
    requestAnimationFrame(drawOrbit);
  }
  drawOrbit();
}

/* ── 3D TILT ─────────────────────────────────────── */
function initTilt(){
  if(window.matchMedia('(pointer:coarse)').matches)return;
  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=e.clientX-rect.left,y=e.clientY-rect.top;
      const cx=rect.width/2,cy=rect.height/2;
      const rotX=((y-cy)/cy)*-8,rotY=((x-cx)/cx)*8;
      card.style.transform=`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px) scale(1.015)`;
      card.style.boxShadow=`${-rotY*2}px ${rotX*2}px 40px rgba(79,195,247,.18),0 0 60px rgba(79,195,247,.06)`;
      const shine=card.querySelector('.card-shine')||createShine(card);
      shine.style.background=`radial-gradient(circle at ${x}px ${y}px,rgba(79,195,247,.1) 0%,transparent 60%)`;
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      card.style.boxShadow='none';
      const shine=card.querySelector('.card-shine');
      if(shine)shine.style.background='transparent';
    });
  });
  function createShine(card){
    const s=document.createElement('div');
    s.className='card-shine';
    s.style.cssText='position:absolute;inset:0;pointer-events:none;transition:background .15s;border-radius:inherit;';
    card.appendChild(s);return s;
  }
}

/* ── TEXT SCRAMBLE ───────────────────────────────── */
const SCRAMBLE_CHARS='!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scrambleText(el,finalText,duration=800){
  let frame=0,totalFrames=duration/16;
  const originalText=finalText.replace(/<br>/g,'\n');
  function step(){
    let out='';
    for(let i=0;i<originalText.length;i++){
      if(originalText[i]==='\n'){out+='<br>';continue;}
      if(frame/totalFrames>i/originalText.length){out+=originalText[i];}
      else{out+=SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)];}
    }
    el.innerHTML=out;frame++;
    if(frame<totalFrames)requestAnimationFrame(step);
    else el.innerHTML=finalText;
  }
  step();
}
function initScramble(){
  const headings=document.querySelectorAll('.scramble-heading');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        scrambleText(e.target,e.target.innerHTML,1000);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.3});
  headings.forEach(h=>obs.observe(h));
}

/* ── COUNTERS ────────────────────────────────────── */
function initCounters(){
  const counters=document.querySelectorAll('.counter');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const target=+e.target.dataset.target;
        const suffix=e.target.dataset.suffix||'';
        let current=0;const inc=target/60;
        const t2=setInterval(()=>{
          current=Math.min(current+inc,target);
          e.target.textContent=Math.floor(current)+(current>=target?suffix:'');
          if(current>=target)clearInterval(t2);
        },16);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.5});
  counters.forEach(c=>obs.observe(c));
}

/* ── TIMELINE ────────────────────────────────────── */
function initTimeline(){
  const track=document.getElementById('timeline-track');
  const items=document.querySelectorAll('.timeline-item');
  if(!track)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        track.classList.add('drawn');
        items.forEach((item,i)=>setTimeout(()=>item.classList.add('dot-visible'),300+i*180));
        obs.disconnect();
      }
    });
  },{threshold:.2});
  obs.observe(document.getElementById('timeline'));
  const bars=document.querySelectorAll('.skill-bar-fill');
  const barObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.pct+'%';barObs.unobserve(e.target);}});
  },{threshold:.4});
  bars.forEach(b=>barObs.observe(b));
}

/* ── REVEAL ──────────────────────────────────────── */
function initReveal(){
  const els=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*70);obs.unobserve(e.target);}
    });
  },{threshold:.08});
  els.forEach(r=>obs.observe(r));
}
