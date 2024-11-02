document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedModel = urlParams.get('model');

    if (!selectedModel) {
        console.error('Model parametresi bulunamadı.');
        return;
    }

    // motorlar.json ve score.json dosyalarını aynı anda yükle
    Promise.all([
        fetch('../data/motorlar.json').then(response => response.json()),
        fetch('../data/score.json').then(response => response.json())
    ])
    .then(([motorlarData, scoreData]) => {
        const motorContainer = document.querySelector('.button-container');
        motorContainer.innerHTML = '';  // Butonları temizle

        const motorlar = motorlarData[selectedModel];
        if (!motorlar) {
            console.error(`Model "${selectedModel}" bulunamadı.`);
            return;
        }

        motorlar.forEach((motor) => {
            const motorInfo = scoreData[motor];
            if (!motorInfo || !motorInfo.button_name) {
                console.error(`Motor "${motor}" için button_name bulunamadı.`);
                return;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn btn-motor';
            button.setAttribute('data-motor', motor);
            button.textContent = motorInfo.button_name; // score.json'dan button_name kullanılıyor

            button.addEventListener('click', function() {
                // Diğer butonların 'active' sınıfını kaldır
                document.querySelectorAll('.btn-motor').forEach(btn => btn.classList.remove('active'));
                // Tıklanan butonu 'active' yap
                button.classList.add('active');
                showCategory(motor);  // Motor parametresini geçiriyoruz
            });

            motorContainer.appendChild(button);
        });

        // İlk butona tıklama işlevini ekleyin
        function activateFirstButton() {
            const firstButton = document.querySelector('.btn-motor');
            if (firstButton) {
                // Diğer butonların 'active' sınıfını kaldır
                document.querySelectorAll('.btn-motor').forEach(btn => btn.classList.remove('active'));
                // İlk butonu 'active' yap
                firstButton.classList.add('active');
                // İlk butona tıklayın
                firstButton.click();
            }
        }

        // İlk butona tıklamayı sayfa tamamen yüklendiğinde yapın
        setTimeout(activateFirstButton, 100);  // Küçük bir gecikme ile çalıştır
    })
    .catch(error => console.error('Veriler yüklenirken hata oluştu:', error));
});
