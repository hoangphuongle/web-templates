(()=>{
  const h=document.getElementById('nh'),m=document.getElementById('nhMenu');
  addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40));
  document.getElementById('nhToggle').onclick=()=>m.classList.toggle('open');
  m.querySelectorAll('a').forEach(a=>a.onclick=()=>m.classList.remove('open'));
})();

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,end=+el.dataset.count;let n=0;
    const t=setInterval(()=>{n++;el.textContent=n+(n===end?'+':'');if(n>=end)clearInterval(t)},60);
    io.unobserve(el);
  }));
  document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
})();

(()=>{
  const t=document.getElementById('hsTrack');
  document.getElementById('hsPrev').onclick=()=>t.scrollBy({left:-324,behavior:'smooth'});
  document.getElementById('hsNext').onclick=()=>t.scrollBy({left:324,behavior:'smooth'});
})();

(()=>{
  const s=[...document.querySelectorAll('.ts-slide')],d=document.getElementById('tsDots');let i=0,timer;
  s.forEach((_,k)=>{const b=document.createElement('button');b.setAttribute('aria-label','Đánh giá '+(k+1));b.onclick=()=>go(k);d.appendChild(b)});
  const dots=[...d.children];
  function go(k){s[i].classList.remove('active');dots[i].classList.remove('active');i=k;s[i].classList.add('active');dots[i].classList.add('active');clearInterval(timer);timer=setInterval(()=>go((i+1)%s.length),5000)}
  go(0);
})();

document.querySelectorAll('.fq-q').forEach(q=>q.onclick=()=>{
  const it=q.parentElement,a=q.nextElementSibling,open=it.classList.toggle('open');
  a.style.maxHeight=open?a.scrollHeight+'px':0;
});

(()=>{
  const ZALO='0974100372'; // ← ĐỔI SỐ ZALO
  document.getElementById('ctForm').onsubmit=e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const msg=`Đặt lịch NOIR\nTên: ${f.get('ten')}\nSĐT: ${f.get('sdt')}\nGói: ${f.get('goi')}\nThời gian: ${f.get('gio')} ngày ${f.get('ngay')}`;
    navigator.clipboard?.writeText(msg).catch(()=>{});
    alert('Đã sao chép nội dung đặt lịch. Zalo sẽ mở ra – bạn dán (Ctrl/Cmd+V) và gửi nhé!');
    window.open('https://zalo.me/'+ZALO,'_blank');
  };
})();

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.12+'s';io.observe(el)});
})();
