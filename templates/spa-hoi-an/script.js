(()=>{
  const h=document.getElementById('sh'),m=document.getElementById('shMenu');
  addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40));
  document.getElementById('shToggle').onclick=()=>m.classList.toggle('open');
  m.querySelectorAll('a').forEach(a=>a.onclick=()=>m.classList.remove('open'));
})();

(()=>{
  let cur='vnd';
  const fmt=(v)=>cur==='vnd'?(+v).toLocaleString('vi-VN')+'đ':'$'+v;
  const cards=[...document.querySelectorAll('.sm-card')];
  cards.forEach(c=>{
    const times=c.dataset.time.split('|'),box=c.querySelector('.sm-times');
    c._i=0;
    times.forEach((t,i)=>{const b=document.createElement('button');b.textContent=t+' phút';b.onclick=()=>{c._i=i;render(c)};box.appendChild(b)});
    render(c);
  });
  function render(c){
    c.querySelectorAll('.sm-times button').forEach((b,i)=>b.classList.toggle('active',i===c._i));
    c.querySelector('.sm-price').textContent=fmt(c.dataset[cur].split('|')[c._i]);
  }
  document.querySelectorAll('.sm-tab').forEach(t=>t.onclick=()=>{
    document.querySelectorAll('.sm-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');
    cards.forEach(c=>c.classList.toggle('hide',t.dataset.cat!=='all'&&c.dataset.cat!==t.dataset.cat));
  });
  document.querySelectorAll('.sm-cur button').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('.sm-cur button').forEach(x=>x.classList.remove('active'));b.classList.add('active');
    cur=b.dataset.cur;cards.forEach(render);
  });
})();

document.getElementById('sdForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('sdMsg').style.display='block';
  e.target.reset();
};

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.1+'s';io.observe(el)});
})();
