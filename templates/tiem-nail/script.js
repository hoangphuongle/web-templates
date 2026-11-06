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

bên dưới -->
      <form class="bk-form" id="bkForm">
        <div class="bk-row">
          <label>Họ tên<input name="ho-ten" required placeholder="Nguyễn Thị A"></label>
          <label>Số điện thoại<input name="sdt" required type="tel" placeholder="09xx xxx xxx"></label>
        </div>
        <label>Dịch vụ
          <select name="dich-vu"><option>Sơn gel</option><option>Đắp bột / Úp móng</option><option>Vẽ móng nghệ thuật</option><option>Combo cô dâu</option><option>Spa tay / chân</option></select>
        </label>
        <div class="bk-row">
          <label>Ngày<input name="ngay" type="date" required></label>
          <label>Giờ<input name="gio" type="time" required></label>
        </div>
        <button class="btn btn-primary" type="submit">Xác nhận đặt lịch ✦</button>
        <div class="bk-msg" id="bkMsg">🎉 Đặt lịch thành công! Rosé Nails sẽ gọi xác nhận trong 5 phút.</div>
      </form>
    </div>
  </div>
</section>
<script>
document.getElementById('bkForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('bkMsg').style.display='block';
  e.target.reset();
};

(()=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*0.1+'s';io.observe(el)});
})();
