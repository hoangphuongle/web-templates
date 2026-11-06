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

-->
<style>
.ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.ct-info{display:grid;gap:30px;margin-top:40px}
.ct-info small{display:block;font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.ct-info div{font-size:1.05rem}
.ct-form{display:grid;gap:26px;border:1px solid var(--line);padding:50px;background:var(--bg-2)}
.ct-form h3{font-size:2rem}
.ct-field{position:relative}
.ct-field input,.ct-field select{width:100%;background:none;border:none;border-bottom:1px solid var(--line);color:var(--text);font:inherit;padding:14px 0;transition:.3s}
.ct-field select option{background:var(--bg)}
.ct-field input:focus,.ct-field select:focus{outline:none;border-color:var(--gold)}
.ct-field label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.ct-row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.ct-note{font-size:.8rem;color:var(--muted);text-align:center}
@media(max-width:900px){.ct-grid{grid-template-columns:1fr;gap:50px}}
@media(max-width:600px){.ct-form{padding:34px 24px}.ct-row{grid-template-columns:1fr}}
</style>
<section class="section" id="lien-he">
  <div class="container ct-grid">
    <div class="reveal">
      <span class="label">Liên hệ</span>
      <h2 class="title">Hẹn gặp bạn tại <em>NOIR</em></h2>
      <div class="ct-info">
        <div><small>Địa chỉ</small>88 Lê Thánh Tôn, Quận 1, TP.HCM</div>
        <div><small>Giờ mở cửa</small>9:30 – 21:30 · Tất cả các ngày</div>
        <div><small>Hotline / Zalo</small>0909 888 999</div>
        <div><small>Ưu đãi</small><span class="gold-text">Giảm 15% cho khách đặt lịch online lần đầu</span></div>
      </div>
    </div>
    <form class="ct-form reveal" id="ctForm">
      <h3>Đặt lịch hẹn</h3>
      <div class="ct-row">
        <div class="ct-field"><label>Họ tên</label><input name="ten" required></div>
        <div class="ct-field"><label>Số điện thoại</label><input name="sdt" type="tel" required></div>
      </div>
      <div class="ct-field"><label>Gói dịch vụ</label><select name="goi"><option>Essential – 290K</option><option>Signature – 590K</option><option>Bridal – 1.290K</option><option>Khác / cần tư vấn</option></select></div>
      <div class="ct-row">
        <div class="ct-field"><label>Ngày</label><input name="ngay" type="date" required></div>
        <div class="ct-field"><label>Giờ</label><input name="gio" type="time" required></div>
      </div>
      <button class="btn btn-gold" type="submit">Gửi qua Zalo ✦</button>
      <p class="ct-note">Nội dung đặt lịch sẽ được sao chép, bạn chỉ cần dán vào Zalo.</p>
    </form>
  </div>
</section>
<script>
(()=>{
  const ZALO='0909888999'; // ← ĐỔI SỐ ZALO
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
