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

bên dưới -->
<style>
.sd{background:var(--wood);color:var(--wall);position:relative}
.sd::before{content:'';position:absolute;top:0;left:0;right:0;height:14px;background:radial-gradient(circle at 14px 0,var(--paper) 13px,transparent 14px) 0 0/28px 14px repeat-x}
.sd-in{display:grid;grid-template-columns:1fr 1.15fr;gap:70px;align-items:center}
.sd h2{font-size:clamp(2rem,4vw,2.8rem);color:#fff}
.sd .script{color:var(--ochre-l)}
.sd-info{display:grid;gap:18px;margin-top:30px}
.sd-info div{display:flex;gap:14px}
.sd-info span{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;border:1px dashed var(--ochre)}
.sd-info b{display:block;color:#fff}
.sd-info small{opacity:.75}
.sd-form{background:var(--paper);color:var(--ink);border-radius:22px;padding:44px 40px;display:grid;gap:16px;box-shadow:0 30px 60px -30px rgba(0,0,0,.6)}
.sd-form h3{font-size:1.6rem;color:var(--wood)}
.sd-form label{font-size:.85rem;font-weight:600;color:var(--wood)}
.sd-form input,.sd-form select{width:100%;margin-top:6px;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(61,36,23,.18);background:#fff;font:inherit;transition:.3s}
.sd-form input:focus,.sd-form select:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 4px rgba(184,56,42,.12)}
.sd-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.sd-msg{display:none;padding:14px;border-radius:10px;background:#e7f1eb;color:var(--jade);font-weight:600;text-align:center}
@media(max-width:900px){.sd-in{grid-template-columns:1fr;gap:44px}}
@media(max-width:560px){.sd-form{padding:34px 22px}.sd-row{grid-template-columns:1fr}}
</style>
<section class="section sd" id="dat-lich">
  <div class="container sd-in">
    <div class="reveal">
      <span class="script">Hẹn gặp bạn</span>
      <h2>Đặt lịch – giữ phòng trước</h2>
      <p style="opacity:.8;margin-top:14px">Buổi tối thường kín lịch, bạn nên đặt trước 2–3 tiếng. Đặt online giảm ngay 10%.</p>
      <div class="sd-info">
        <div><span>📍</span><div><b>Địa chỉ</b><small>22 Trần Phú, Minh An, Hội An</small></div></div>
        <div><span>📞</span><div><b>Hotline / Zalo</b><small>0974 100 372</small></div></div>
        <div><span>💳</span><div><b>Thanh toán</b><small>Tiền mặt · Chuyển khoản · Thẻ Visa</small></div></div>
      </div>
    </div>
    <form class="sd-form reveal" id="sdForm">
      <h3>Phiếu đặt lịch</h3>
      <div class="sd-row">
        <label>Họ tên<input name="ho-ten" required placeholder="Nguyễn Văn A"></label>
        <label>SĐT / Zalo<input name="sdt" type="tel" required placeholder="09xx xxx xxx"></label>
      </div>
      <div class="sd-row">
        <label>Dịch vụ
          <select name="dich-vu"><option>Massage chân thảo dược</option><option>Foot & Shoulder</option><option>Massage body truyền thống</option><option>Massage đá nóng</option><option>Chăm sóc da mặt</option><option>Gội đầu dưỡng sinh</option><option>Combo Hoài Signature</option><option>Combo cặp đôi</option></select>
        </label>
        <label>Số khách
          <select name="so-khach"><option>1 người</option><option>2 người</option><option>3 người</option><option>4+ người</option></select>
        </label>
      </div>
      <div class="sd-row">
        <label>Ngày<input name="ngay" type="date" required></label>
        <label>Giờ<input name="gio" type="time" required></label>
      </div>
      <label>Khách sạn (nếu cần đón)<input name="khach-san" placeholder="Tên khách sạn / homestay"></label>
      <button class="btn btn-red" type="submit">🏮 Xác nhận đặt lịch</button>
      <div class="sd-msg" id="sdMsg">Cảm ơn bạn! Hoài Spa sẽ liên hệ xác nhận qua Zalo trong ít phút 🌿</div>
    </form>
  </div>
</section>
<script>
document.getElementById('sdForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('sdMsg').style.display='block';
  e.target.reset();
};

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.1+'s';io.observe(el)});
})();
