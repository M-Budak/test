document.addEventListener('DOMContentLoaded', function() {
    // URL'den model parametresini al
    const urlParams = new URLSearchParams(window.location.search);
    const slugParam = urlParams.get('model');

    // Verileri çekeceğimiz JSON dosyalarının yolları
    const dataUrl = '../data/testdata.json';
    const motorUrl = '../data/testmotor.json';

    // Verileri çek
    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Data JSON dosyası yüklenemedi');
            }
            return response.json();
        })
        .then(data => {
            let car = null;
            for (let key in data) {
                if (data[key].slug === slugParam) {
                    car = data[key];
                    break;
                }
            }

            if (car) {
                // Başlık ve görseli doldur
                document.querySelector('.genel-baslik-1').innerText = car.marka + ' ' + car.model;
                document.querySelector('img').src = car.img;

                const buttonContainer = document.querySelector('.button-container');

                // Motor verilerini çek
                fetch(motorUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Motor JSON dosyası yüklenemedi');
                        }
                        return response.json();
                    })
                    .then(motorData => {
                        // Engine değerlerine göre buton oluştur
                        car.engine.forEach((engineId, index) => {
                            const button = document.createElement('button');
                            button.className = 'btn btn-primary mr-2 mt-2';
                            button.innerText = car.enginename[index]; // Enginename buton metni olarak kullanılıyor
                            button.id = engineId; // Engine ID'sini buton ID'si olarak atıyoruz

                            // Butona tıklanınca performans ve konfor verisini göster
                            button.addEventListener('click', function() {
                                const motor = motorData[this.id];
                                if (motor) {
                                    document.getElementById('score').innerHTML = `
                                        <p><strong>Performans:</strong> ${motor.perf}</p>
                                        <p><strong>Konfor:</strong> ${motor.konfor}</p>
                                    `;
                                }
                            });

                            buttonContainer.appendChild(button);
                        });
                    })
                    .catch(error => console.error('Motor verileri yüklenirken hata oluştu:', error));
            } else {
                console.error('Model bulunamadı.');
            }
        })
        .catch(error => console.error('Veriler yüklenirken hata oluştu:', error));
});
