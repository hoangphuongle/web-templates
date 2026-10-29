# 📘 SỔ TAY GIT + GITHUB + NETLIFY (Tiếng Việt)

> Mở Terminal trên Mac: `Cmd + Space` → gõ **Terminal** → Enter.
> Mọi lệnh bên dưới gõ trong Terminal, xong bấm **Enter**.
> Dòng bắt đầu bằng `#` là **chú thích**, không cần gõ.

---

## 0. CÀI ĐẶT (chỉ làm 1 lần)

```bash
# Kiểm tra máy đã có git chưa (hiện số phiên bản là có rồi)
git --version

# Nếu chưa có, Mac sẽ tự hỏi cài "Command Line Tools" → bấm Install
xcode-select --install
```

### Khai báo tên & email (trùng email tài khoản GitHub)
```bash
git config --global user.name "Ten Cua Ban"
git config --global user.email "email@cuaban.com"

# Đặt nhánh mặc định tên là main
git config --global init.defaultBranch main

# Xem lại cấu hình
git config --list
```

---

## 1. DI CHUYỂN VÀO THƯ MỤC DỰ ÁN

```bash
# Vào thư mục dự án
cd /Users/viralworks/Documents/code/zzzzz

# Xem đang ở thư mục nào
pwd

# Liệt kê file trong thư mục
ls
```

---

## 2. TẠO KHO GIT & ĐẨY LÊN GITHUB (làm 1 lần đầu)

**Bước A – Trên web GitHub:**
1. Vào https://github.com/new
2. Đặt tên repo, ví dụ `mau-web`
3. Chọn **Public** (hoặc Private), **KHÔNG** tick "Add README"
4. Bấm **Create repository** → copy link dạng `https://github.com/TEN-BAN/mau-web.git`

**Bước B – Trong Terminal:**
```bash
cd /Users/viralworks/Documents/code/zzzzz

# Khởi tạo git trong thư mục
git init

# Thêm TẤT CẢ file vào danh sách chuẩn bị lưu
git add .

# Lưu lại một "phiên bản" kèm ghi chú
git commit -m "Khoi tao du an"

# Kết nối với repo GitHub (thay link của bạn)
git remote add origin https://github.com/TEN-BAN/mau-web.git

# Đẩy code lên GitHub
git push -u origin main
```

### 🔑 Nếu bị hỏi mật khẩu khi push
GitHub **không nhận mật khẩu thường**, phải dùng **Token**:
1. Vào https://github.com/settings/tokens → **Generate new token (classic)**
2. Tick ô **repo** → Generate → **copy token** (chỉ hiện 1 lần, nên lưu lại)
3. Khi Terminal hỏi:
   - `Username`: tên GitHub của bạn
   - `Password`: **dán token** (khi dán sẽ không hiện ký tự, cứ Enter)

Mac sẽ tự nhớ token cho lần sau.

---

## 3. CÔNG VIỆC HẰNG NGÀY (dùng nhiều nhất ⭐)

Mỗi lần sửa/thêm mẫu web xong, chạy 3 lệnh:

```bash
git add .
git commit -m "Them mau nha hang"
git push
```

→ Netlify sẽ tự cập nhật link sau ~30 giây.

---

## 4. LỆNH XEM THÔNG TIN

```bash
# Xem file nào đã thay đổi, chưa lưu
git status

# Xem lịch sử các lần lưu (bấm q để thoát)
git log --oneline

# Xem chi tiết đã sửa gì
git diff

# Xem repo đang kết nối với link GitHub nào
git remote -v
```

---

## 5. LẤY CODE VỀ

```bash
# Tải code mới nhất từ GitHub về (khi sửa trên máy khác / trên web)
git pull

# Tải một repo về máy lần đầu (sang máy mới)
git clone https://github.com/TEN-BAN/mau-web.git
```

---

## 6. SỬA LỖI / HOÀN TÁC

```bash
# Bỏ thay đổi của 1 file, quay về bản đã lưu gần nhất
git restore ten-file.html

# Bỏ TẤT CẢ thay đổi chưa commit (⚠️ mất luôn, cẩn thận)
git restore .

# Lỡ "git add" nhầm file → bỏ ra
git restore --staged ten-file.html

# Sửa lại ghi chú commit vừa rồi (chưa push)
git commit --amend -m "Ghi chu moi"

# Quay về 1 phiên bản cũ nhưng vẫn giữ lịch sử (an toàn)
git log --oneline          # copy mã, ví dụ a1b2c3d
git revert a1b2c3d
git push
```

### Lỗi hay gặp

| Thông báo lỗi | Cách xử lý |
|---|---|
| `fatal: not a git repository` | Chưa `cd` vào đúng thư mục, hoặc chưa `git init` |
| `remote origin already exists` | `git remote set-url origin LINK-MOI` |
| `rejected ... fetch first` | Chạy `git pull` rồi `git push` lại |
| `Authentication failed` | Dùng **Token** thay mật khẩu (xem mục 2) |
| `src refspec main does not match` | Chưa commit lần nào → `git add .` rồi `git commit -m "..."` |
| Màn hình lạ toàn dấu `~` (Vim) | Gõ `:q` rồi Enter để thoát |

---

## 7. BỎ QUA FILE KHÔNG MUỐN ĐẨY LÊN

Tạo file tên `.gitignore` trong thư mục dự án, nội dung:
```
.DS_Store
node_modules/
.env
```

---

## 8. KẾT NỐI NETLIFY VỚI GITHUB (làm 1 lần)

1. Vào https://app.netlify.com → đăng nhập bằng **GitHub**
2. **Add new site** → **Import an existing project** → chọn **GitHub**
3. Chọn repo `mau-web`
4. Cấu hình:
   - **Build command**: để trống (vì là HTML thuần)
   - **Publish directory**: `.` (hoặc để trống)
5. Bấm **Deploy** → nhận link `xxx.netlify.app`
6. Đổi tên link: **Site configuration → Change site name** → ví dụ `mauweb-cuaban`

👉 Từ giờ mỗi lần `git push` là link tự cập nhật.

### Cách không dùng git (dự phòng)
Vào https://app.netlify.com/drop → **kéo thả thư mục** `zzzzz` → có link ngay.

---

## 9. NHÁNH (BRANCH) – khi muốn thử nghiệm mà không ảnh hưởng bản chính

```bash
git branch                    # xem các nhánh
git checkout -b thu-nghiem    # tạo & chuyển sang nhánh mới
git checkout main             # quay về nhánh chính
git merge thu-nghiem          # gộp nhánh thử nghiệm vào main
git branch -d thu-nghiem      # xoá nhánh
```

---

## ⚡ TÓM TẮT SIÊU NGẮN

```bash
cd /Users/viralworks/Documents/code/zzzzz   # vào thư mục
git status                                   # xem thay đổi
git add .                                    # chọn tất cả
git commit -m "ghi chu"                      # lưu phiên bản
git push                                     # đẩy lên → Netlify tự cập nhật
git pull                                     # lấy bản mới nhất về
```
