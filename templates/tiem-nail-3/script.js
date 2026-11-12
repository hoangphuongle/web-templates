(()=>{
  const h=document.getElementById('ha'),m=document.getElementById('haMenu');
  addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40));
  document.getElementById('haToggle').onclick=()=>m.classList.toggle('open');
  m.querySelectorAll('a').forEach(a=>a.onclick=()=>m.classList.remove('open'));
})();

bên dưới -->
<!-- Đổi bản đồ: Google Maps → Chia sẻ → Nhúng bản đồ → copy link src -->
<style>
.bh{background:var(--wall)}
.bh-box{display:grid;grid-template-columns:1fr 1fr;background:#fffaf0;border-radius:24px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(61,36,23,.5);border:2px solid var(--wood)}
.bh-form{padding:54px 48px;display:grid;gap:16px}
.bh-form h2{font-size:2.2rem;color:var(--wood)}
.bh-form label{font-size:.85rem;font-weight:600;color:var(--wood)}
.bh-form input,.bh-form select{width:100%;margin-top:6px;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(61,36,23,.2);background:#fff;font:inherit;transition:.3s}
.bh-form input:focus,.bh-form select:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 4px rgba(184,56,42,.12)}
.bh-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bh-msg{display:none;padding:14px;border-radius:10px;background:#e7f1eb;color:var(--jade);font-weight:600;text-align:center}
.bh-side{display:flex;flex-direction:column}
.bh-side iframe{flex:1;min-height:300px;border:0;filter:sepia(.35) saturate(1.1)}
.bh-info{background:var(--wood);color:var(--wall);padding:30px 34px;display:grid;gap:10px;font-size:.95rem}
@media(max-width:900px){.bh-box{grid-template-columns:1fr}}
@media(max-width:560px){.bh-form{padding:38px 24px}.bh-row{grid-template-columns:1fr}}
</style>
<section class="section bh" id="dat-lich">
  <div class="container">
    <div class="bh-box reveal">
      <form class="bh-form" id="bhForm">
        <span class="script">Hẹn gặp bạn</span>
        <h2>Đặt lịch làm nail</h2>
        <div class="bh-row">
          <label>Họ tên<input name="ho-ten" required placeholder="Nguyễn Thị Hoa"></label>
          <label>Số điện thoại<input name="sdt" type="tel" required placeholder="09xx xxx xxx"></label>
        </div>
        <label>Dịch vụ
          <select name="dich-vu"><option>Sơn gel tông cổ</option><option>Vẽ sen thủ công</option><option>Combo Rằm</option><option>Combo Áo dài</option><option>Combo Cô dâu phố cổ</option></select>
        </label>
        <div class="bh-row">
          <label>Ngày<input name="ngay" type="date" required></label>
          <label>Giờ<input name="gio" type="time" required></label>
        </div>
        <button class="btn btn-red" type="submit">🏮 Xác nhận đặt lịch</button>
        <div class="bh-msg" id="bhMsg">Cảm ơn bạn! Phố Hội Nail sẽ gọi xác nhận trong ít phút 🌸</div>
      </form>
      <div class="bh-side">
        <iframe title="Bản đồ Phố Hội Nail" loading="lazy" src="https://www.google.com/maps?q=Nguyen+Thai+Hoc+Hoi+An&output=embed"></iframe>
        <div class="bh-info">
          <div>📍 45 Nguyễn Thái Học, Minh An, Hội An</div>
          <div>⏰ 9:00 – 22:00 mỗi ngày</div>
          <div>📞 0974 100 372 (Zalo)</div>
        </div>
      </div>
    </div>
  </div>
</section>
<script>
document.getElementById('bhForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('bhMsg').style.display='block';
  e.target.reset();
};

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.1+'s';io.observe(el)});
})();
