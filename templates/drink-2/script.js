document.addEventListener("DOMContentLoaded", function() {
            const bsData = [
                {
                    title: "COMBO TRÀ SỮA & BÁNH",
                    desc: "Combo hoàn hảo cho buổi chiều năng lượng. Trà sữa trân châu đường đen thơm béo kết hợp cùng bánh ngọt Pháp mềm mịn, tạo nên sự giao thoa hương vị tuyệt đỉnh. Không chỉ là thức uống, đây còn là trải nghiệm thư giãn trọn vẹn dành riêng cho bạn sau những giờ làm việc căng thẳng.",
                    watermark: "COMBO"
                },
                {
                    title: "COMBO CÀ PHÊ & CROISSANT",
                    desc: "Đánh thức ngày mới với bộ đôi cà phê nguyên bản và bánh sừng bò giòn rụm. Vị đắng đặc trưng của hạt cà phê Robusta rang mộc hoà quyện cùng lớp bơ thượng hạng từ chiếc bánh nướng nóng hổi tạo nên sự bùng nổ vị giác mạnh mẽ.",
                    watermark: "COFFEE"
                },
                {
                    title: "COMBO TRÀ TRÁI CÂY",
                    desc: "Sự thanh mát của trà trái cây nhiệt đới đi cùng vẻ ngọt ngào của những chiếc bánh Macaron đầy màu sắc. Phù hợp cho những ai yêu thích sự nhẹ nhàng, thanh tao và tìm kiếm một cảm giác tươi mới xua tan cái nóng oi ả.",
                    watermark: "TEA"
                }
            ];

            let currentIndex = 0;
            const cards = document.querySelectorAll('.bs-card');
            const container = document.getElementById('bs-cards-container');
            const titleEl = document.getElementById('bs-title');
            const descEl = document.getElementById('bs-desc');
            const watermarkEl = document.getElementById('bs-watermark');
            const progressBar = document.getElementById('bs-progress-bar');
            const totalCards = cards.length;

            function updateSlider(index) {
                if (index >= totalCards) index = 0;
                if (index < 0) index = totalCards - 1;
                currentIndex = index;

                cards.forEach((card, i) => {
                    card.classList.remove('active');
                    if (i === currentIndex) {
                        card.classList.add('active');
                    }
                });

                // Card offset + gap = 240 + 20 = 260
                const offset = currentIndex * 260;
                container.style.transform = `translateX(-${offset}px)`;

                titleEl.style.opacity = 0;
                descEl.style.opacity = 0;
                watermarkEl.style.opacity = 0;
                
                setTimeout(() => {
                    titleEl.innerText = bsData[currentIndex].title;
                    descEl.innerText = bsData[currentIndex].desc;
                    watermarkEl.innerText = bsData[currentIndex].watermark;
                    
                    titleEl.style.opacity = 1;
                    descEl.style.opacity = 1;
                    watermarkEl.style.opacity = 1;
                }, 300);

                progressBar.style.width = `${((currentIndex + 1) / totalCards) * 100}%`;
            }

            document.getElementById('bs-prev').addEventListener('click', () => updateSlider(currentIndex - 1));
            document.getElementById('bs-next').addEventListener('click', () => updateSlider(currentIndex + 1));

            cards.forEach((card, idx) => {
                card.addEventListener('click', () => updateSlider(idx));
            });
        });
