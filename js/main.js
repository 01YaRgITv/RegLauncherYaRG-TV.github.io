// Versiyon kontrolü ve güncelleme sistemi
const currentVersion = '1.13.0';
const downloadUrl = 'https://github.com/YaRGiTV/RegLauncher/releases/latest';

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    // Sağ tıklamayı engelle
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Versiyon numarasını güncelle
    document.getElementById('version').textContent = `v${currentVersion}`;
    
    // İndirme butonuna tıklama olayı ekle
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = downloadUrl;
        });
    }

    // Smooth scroll için tüm iç linklere event listener ekle
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll efekti
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Medya modal işlemleri
    const mediaItems = document.querySelectorAll('.media-item img, .media-item video');
    const modal = document.getElementById('mediaModal');
    const modalContent = modal.querySelector('.modal-content');

    mediaItems.forEach(item => {
        item.style.cursor = 'pointer'; // İmleci işaretçiye çevir
        item.addEventListener('click', () => {
            if (item.tagName === 'IMG') { // Sadece resimler için modalı aç
                modalContent.innerHTML = ''; // Modal içeriğini temizle
                const mediaElement = document.createElement('img');
                mediaElement.src = item.src;
                mediaElement.alt = item.alt;
                modalContent.appendChild(mediaElement);
                modal.classList.add('open'); // Modalı aç
            } else if (item.tagName === 'VIDEO') {
                // Video tıklanırsa modal açma, varsayılan oynatma davranışını kullan
                // 'controls' attribute already allows play/pause
            }
        });
    });

    // Modalı kapatma (arka plana tıklayarak)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Sadece arka plana tıklanırsa kapat
            modal.classList.remove('open'); // Modalı kapat
            modalContent.innerHTML = ''; // İçeriği temizle
        }
    });

});

// Otomatik güncelleme kontrolü
async function checkForUpdates() {
    try {
        const response = await fetch('https://api.github.com/repos/yourusername/RegLauncher/releases/latest');
        const data = await response.json();
        const latestVersion = data.tag_name.replace('v', '');
        
        if (latestVersion > currentVersion) {
            // Yeni sürüm varsa bildirim göster
            showUpdateNotification(latestVersion);
        } else if (latestVersion === currentVersion) {
             // Mevcut sürüm en son sürümse, versiyon elementini güncelle
            document.getElementById('version').textContent = `En Son Versiyon ${currentVersion}`;
        }

    } catch (error) {
        console.error('Güncelleme kontrolü sırasında hata:', error);
    }
}

// Güncelleme bildirimi
function showUpdateNotification(newVersion) {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <p>Yeni sürüm mevcut! (v${newVersion})</p>
        <button onclick="window.location.href='${downloadUrl}'">Güncelle</button>
    `;
    document.body.appendChild(notification);
    
    // 5 saniye sonra bildirimi kaldır
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Her 6 saatte bir güncelleme kontrolü yap
setInterval(checkForUpdates, 6 * 60 * 60 * 1000);

// Add animation to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 