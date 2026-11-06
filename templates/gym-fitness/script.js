// Nav scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>60);
},{passive:true});

// Mobile drawer
const drawer=document.getElementById('mobDrawer');
const openDrawer=()=>{ drawer.classList.add('open'); document.body.style.overflow='hidden'; };
const closeDrawer=()=>{ drawer.classList.remove('open'); document.body.style.overflow=''; };
document.getElementById('navHam').addEventListener('click',openDrawer);
document.getElementById('mobClose').addEventListener('click',closeDrawer);
document.getElementById('mobBackdrop').addEventListener('click',closeDrawer);
document.querySelectorAll('.mob-link,.mob-cta').forEach(a=>a.addEventListener('click',closeDrawer));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el=>el.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});

// Reveal on scroll
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})
},{threshold:.1});
document.querySelectorAll('.rv').forEach((el,i)=>{
  el.style.transitionDelay=(i%4)*.1+'s';
  io.observe(el);
});
