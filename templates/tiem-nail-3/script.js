(()=>{
  const h=document.getElementById('ha'),m=document.getElementById('haMenu');
  addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40));
  document.getElementById('haToggle').onclick=()=>m.classList.toggle('open');
  m.querySelectorAll('a').forEach(a=>a.onclick=()=>m.classList.remove('open'));
})();

document.getElementById('bhForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('bhMsg').style.display='block';
  e.target.reset();
};

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.1+'s';io.observe(el)});
})();
