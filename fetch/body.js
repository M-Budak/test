// JSON dosyasını çek
fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        // Her section'daki container'ları toplu olarak seç
        const containers = document.querySelectorAll('[data-model-ids]');
        
        // Her container için kartları oluştur
        containers.forEach(container => {
            const modelIds = container.getAttribute('data-model-ids').split(',');

            // Her model için kart oluştur
            modelIds.forEach(modelId => {
                const modelData = data[modelId];
                if (modelData) {
                    // Kartın dış yapısını oluştur
                    const card = document.createElement('div');
                    card.className = 'col-lg-6 col-12 mb-3 body-specific-card'; // Kart için yeni bir class ekliyoruz
                    
                    // Kartın içeriğini oluştur
                    card.innerHTML = `
                        <div class="card body-specific-car-card h-100">
                            <a href="${modelData.link}">
                                <img src="${modelData.img}" class="body-specific-card-img" alt="${modelData.alt}">
                            </a>
                            <div class="body-specific-card-body">
                                <h5 class="body-specific-card-title">${modelData.brand} ${modelData.model}</h5>
                            </div>
                        </div>
                    `;
                    // Kartı container'a ekle
                    container.appendChild(card);
                }
            });
        });

        // Select all accordion buttons
        const accordions = document.querySelectorAll('.accordion');

        accordions.forEach((accordion) => {
        accordion.addEventListener('click', function () {
            // Toggle "active" class on the clicked accordion
            this.classList.toggle('active');

            // Toggle the visibility of the associated panel
            const panel = this.nextElementSibling;
            if (panel.style.display === 'block') {
            panel.style.display = 'none';
            } else {
            panel.style.display = 'block';
            }
        });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
