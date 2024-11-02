document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedback-form');
    const successPopup = document.getElementById('success-popup');
    const homeButton = document.getElementById('home-button');
    const reviewButton = document.getElementById('google-review-button');
    const tekrarButton = document.getElementById('tekrar-degerlendir');
    const ratings = {};

    // Cookie kontrolü
    function hasSubmitted() {
        return document.cookie.split('; ').some(item => item.startsWith('formSubmitted='));
    }

    // Eğer form daha önce gönderilmişse, butonları devre dışı bırak
    if (hasSubmitted()) {
        alert('Bugün zaten bir kez oy verdiniz.');
        document.querySelectorAll('.rating-btn').forEach(button => {
            button.disabled = true;
        });
        document.querySelector('.submit-btn').disabled = true; // Gönder butonunu devre dışı bırak
    }

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
        event.preventDefault();

        // Formun daha önce gönderilip gönderilmediğini kontrol et
        if (hasSubmitted()) {
            alert('Bugün zaten bir kez oy verdiniz.');
            return; // Form gönderimini engelle
        }

        const formData = new FormData(form);
        const urlParams = new URLSearchParams(window.location.search);
        const model = urlParams.get('page');

        formData.append('model', model); // Model parametresini form verilerine ekle

        for (const category in ratings) {
            formData.append(category, ratings[category]);
        }

        // Başarı popup'ını hemen göster
        successPopup.classList.remove('hidden');

        // Verileri asenkron olarak gönder
        fetch('https://script.google.com/macros/s/AKfycbzwoHYFIHiBmtZYjGqFKhQ9nc3vZxpwAGOwmoxNUZHIrQTxg9Tc7xNf11bSnW0Mc98A/exec', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                // Cookie ayarla
                const now = new Date();
                const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 gün sonra süresi dolacak
                document.cookie = `formSubmitted=true; expires=${expirationDate.toUTCString()}; path=/`;
            } else {
                alert('Form gönderimi başarısız: ' + result.error);
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Form gönderimi başarısız');
        });
    });

    // Buton tıklama olayları
    tekrarButton.addEventListener('click', function() {
        window.history.back(); // Önceki sayfaya dön
    });

    homeButton.addEventListener('click', function() {
        window.location.href = 'https://m-budak.github.io/cargurue'; // Ana sayfa URL'sini burada belirtin
    });

    reviewButton.addEventListener('click', function() {
        window.location.href = 'YOUR_GOOGLE_REVIEW_URL'; // Google İnceleme URL'sini burada belirtin
    });
});
