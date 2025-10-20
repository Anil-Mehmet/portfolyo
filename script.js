// Form submit olayını dinle
document.getElementById('iletisim-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    const isim = document.getElementById('isim').value.trim();
    const mesaj = document.getElementById('mesaj').value.trim();
    if(!isim || !mesaj) return;

    // LocalStorage'dan önceki mesajları al
    let mesajlar = JSON.parse(localStorage.getItem('mesajlar') || '[]');

    // Yeni mesajı ekle
    mesajlar.push({ isim, mesaj, tarih: new Date().toLocaleString() });

    // LocalStorage'a kaydet
    localStorage.setItem('mesajlar', JSON.stringify(mesajlar));

    gosterMesajlar();

    // Formu temizle
    this.reset();
});

// Mesajları listeleme fonksiyonu
function gosterMesajlar() {
    const ul = document.getElementById('mesaj-listesi');
    ul.innerHTML = ''; 
    const mesajlar = JSON.parse(localStorage.getItem('mesajlar') || '[]');

    mesajlar.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${m.isim}:</strong> ${m.mesaj} <span style="font-size:10px;color:#999;margin-left:6px;">${m.tarih}</span>`;
        li.style.padding = "12px 16px";
        li.style.marginBottom = "10px";
        li.style.background = "#111827";
        li.style.borderRadius = "8px";
        li.style.transition = "transform 0.15s, box-shadow 0.15s";
        li.style.color = "#e0e0e0";

        // Hover efekti
        li.addEventListener('mouseenter', () => {
            li.style.transform = "translateY(-3px)";
            li.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
        });
        li.addEventListener('mouseleave', () => {
            li.style.transform = "translateY(0)";
            li.style.boxShadow = "none";
        });

        ul.appendChild(li);
    });
}

// Sayfa yüklendiğinde hem mesajları göster hem de animasyonları ayarla
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mevcut mesajları göster (senin kodun)
    gosterMesajlar();

    // 2. Scroll animasyonu için gözlemciyi başlat (yeni eklenen kod)
    const sectionsToAnimate = document.querySelectorAll('.gorunme');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('goster');
                observer.unobserve(entry.target);
            }
        });
    };
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    sectionsToAnimate.forEach(section => {
        scrollObserver.observe(section);
    });
});

//localStorage.removeItem("mesajlar");