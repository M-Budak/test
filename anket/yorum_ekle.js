document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedback-form');
    const successPopup = document.getElementById('success-popup');
    const homeButton = document.getElementById('home-button');
    const reviewButton = document.getElementById('google-review-button');
    const tekrarButton = document.getElementById('tekrar-degerlendir');
    const ratings = {}; // Kategorilere göre oyları saklayacağız
  
    // URL'den model parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get('page');
    const modelTitle = decodeURIComponent(model); // URL encode edilmiş modeli çöz
  
    // Form başlığını model parametresine göre ayarla
    document.title = `Geri Bildirim Formu - ${modelTitle}`;
    document.getElementById('page-title').textContent = `Hakkında Düşüncelerini Paylaş - ${modelTitle}`;
  
    // Form'a gizli input olarak model bilgisi ekle
    const modelInput = document.createElement('input');
    modelInput.type = 'hidden';
    modelInput.name = 'model';
    modelInput.value = modelTitle;
    form.appendChild(modelInput);
  
    // Oy verme butonlarına tıklama işlemi
    document.querySelectorAll('.rating-btn').forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;
        const value = this.dataset.value;
        // Seçilen oyu güncelle
        ratings[category] = value;
  
        // Buton stillerini güncelle
        document.querySelectorAll(`[data-category="${category}"]`).forEach(btn => {
          btn.classList.remove('selected');
        });
        this.classList.add('selected');
      });
    });
  
    // Form gönderme işlemi
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Geleneksel form gönderimini engelle
  
      const formData = new FormData(form);
  
      // Kullanıcının seçtiği oyları form verisine ekle
      for (const category in ratings) {
        formData.append(category, ratings[category]);
      }
  
      // Başarı popup'ını hemen göster
      successPopup.classList.remove('hidden');
  
      // Verileri asenkron olarak gönder
      fetch('https://script.google.com/macros/s/AKfycbzS4_Xy4l_cO49li7cdHjqczVW6UVgBUaEVUw5TvlV9OTBnquG2Zs05v2fG30V7S0yp/exec', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          form.reset(); // Formu sıfırla
        } else {
          console.error('Form gönderimi başarısız:', data.error);
        }
      })
      .catch(error => {
        console.error('Hata:', error);
      });
    });
  
    // Buton tıklama olayları
    tekrarButton.addEventListener('click', function() {
      window.history.back(); // Önceki sayfaya geri dön
    });
  
    homeButton.addEventListener('click', function() {
      window.location.href = 'https://m-budak.github.io/cargurue'; // Ana sayfa URL'si
    });
  
    reviewButton.addEventListener('click', function() {
      window.location.href = 'YOUR_GOOGLE_REVIEW_URL'; // Google İnceleme URL'sini burada belirtin
    });
  });
  