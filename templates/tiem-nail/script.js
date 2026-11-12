(()=>{
  const h=document.getElementById('header'),m=document.getElementById('hdMenu');
  addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40));
  document.getElementById('hdToggle').onclick=()=>m.classList.toggle('open');
  m.querySelectorAll('a').forEach(a=>a.onclick=()=>m.classList.remove('open'));
})();

document.querySelectorAll('.pr-tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.pr-tab,.pr-group').forEach(e=>e.classList.remove('active'));
  t.classList.add('active');
  document.getElementById(t.dataset.tab).classList.add('active');
});

document.getElementById('bkForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('bkMsg').style.display='block';
  e.target.reset();
};

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.1+'s';io.observe(el)});
})();
