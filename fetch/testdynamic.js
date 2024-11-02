document.addEventListener("DOMContentLoaded", function() {
    // Model verilerini yükle
    fetch('../data/testdata.json')
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('model');

            const modelData = Object.values(data).find(model => model.slug === slug);

            if (modelData) {
                document.querySelector('.genel-baslik-1').textContent = `${modelData.brand} ${modelData.model}`;
                document.querySelector('.description').textContent = modelData.desc;

                const imgElement = document.querySelector('.img-fluid');
                imgElement.src = modelData.img;
                imgElement.alt = modelData.alt;

                const buttonContainer = document.querySelector('.button-container');
                modelData.engine.forEach((engineCode, index) => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'btn btn-custom';
                    button.textContent = modelData.engineName[index];
                    button.dataset.engineId = engineCode;
                    button.addEventListener('click', () => {
                        document.querySelectorAll('.btn-custom').forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        
                        showScores(engineCode);
                        showFeatures(engineCode);
                        showComments(engineCode);
                    });
                    buttonContainer.appendChild(button);
                });

                activateFirstButton(); // İlk butona tıklamayı buradan çağırın

                showSimilarModels(modelData.similar);

                AOS.init();
            } else {
                console.error("Model kodu bulunamadı veya geçersiz.");
            }
        })
        .catch(error => console.error("Veri yüklenirken bir hata oluştu: ", error));

    function activateFirstButton() {
        const firstButton = document.querySelector('.btn-custom');
        if (firstButton) {
            document.querySelectorAll('.btn-custom').forEach(btn => btn.classList.remove('active'));
            firstButton.classList.add('active');
            firstButton.click();
        }
    }

    function showSimilarModels(similarIds) {
        const scrollableCards = document.querySelector('.scrollable-cards');
        scrollableCards.innerHTML = '';

        fetch('../data/testdata.json')
            .then(response => response.json())
            .then(data => {
                similarIds.forEach(id => {
                    const model = data[id];
                    if (model) {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.style.width = '225px';

                        const link = document.createElement('a');
                        link.href = model.link;

                        const img = document.createElement('img');
                        img.src = model.img;
                        img.classList.add('card-img-top');
                        img.alt = model.alt;

                        const title = document.createElement('h5');
                        title.classList.add('yeni-eklenen-title');
                        title.textContent = `${model.brand} ${model.model}`;

                        link.appendChild(img);
                        link.appendChild(title);
                        card.appendChild(link);
                        scrollableCards.appendChild(card);
                    }
                });
            })
            .catch(error => console.error("Benzer modeller yüklenirken bir hata oluştu: ", error));
    }

    function showScores(engineId) {
        fetch('../data/testskor.json')
            .then(response => response.json())
            .then(scoreData => {
                const categoryData = scoreData[engineId];
                if (!categoryData) {
                    console.error('Skorlar yüklenemedi.');
                    return;
                }

                const uniqueData = categoryData.name || engineId; // Eğer name yoksa engineId kullanılır

                const scoreContainer = document.getElementById('score');
                scoreContainer.innerHTML = '';

                const scoreElement = document.createElement('div');
                scoreElement.className = 'col-md-6';
                scoreElement.innerHTML = `
                <div class="row">
                    <div class="col-6">
                        <h2 class="skor-baslik">Skor</h2>
                        <p class="skor-bilgi" style="margin-bottom: 0.5rem;">Bu sonuçlar kullanıcılar tarafından verilen puanların ortalamasıdır.</p>
                        <!-- Burada engineId yerine uniqueData kullanılıyor -->
                        <a href="../puan_ver.html?page=${encodeURIComponent(uniqueData)}" class="btn btn-custom oy-ver-btn" style="margin-bottom: 1rem; padding: 0rem; width: 8rem;">Puan Ver ⭐️</a>
                    </div>
                    <div class="skor col-6">
                        <p>
                            <span class="skor_number">${categoryData.average}</span>
                            <span class="skor_unit">/ 5</span>
                        </p>
                        <p class="skor-oy">${categoryData.votes} Oy</p>
                    </div>
                </div>
                `;
                scoreContainer.appendChild(scoreElement);

                const scoresElement = document.createElement('div');
                scoresElement.className = 'skor-puan col-md-6';
                let categoriesHtml = '';
                for (const [key, value] of Object.entries(categoryData.categories)) {
                    categoriesHtml += `
                        <div class="col-4">
                            <h4>${key}</h4>
                            <p>
                                <span class="s_number">${value}</span>
                                <span class="s_unit">/ 5</span>
                            </p>
                        </div>
                    `;
                }
                scoresElement.innerHTML = `<div class="row">${categoriesHtml}</div>`;
                scoreContainer.appendChild(scoresElement);
            })
            .catch(error => console.error("Skor verileri yüklenirken bir hata oluştu: ", error));
    }

    function showFeatures(category) {
        fetch('../data/testfeatures.json')
            .then(response => response.json())
            .then(featuresData => {
                const featuresContainer = document.getElementById('ozellikler');
                featuresContainer.innerHTML = '';

                if (featuresData[category]) {
                    const features = featuresData[category];
                    const featureNames = [
                        "Max Hız", 
                        "0-100", 
                        "Yakıt", 
                        "Beygir", 
                        "Vites", 
                        "Tork", 
                        "Tüketim", 
                        "Bagaj"
                    ];

                    const featureUnits = [
                        "km/h", 
                        "s", 
                        "",         
                        "hp", 
                        "",         
                        "nm", 
                        "lt/100km", 
                        "lt"
                    ];

                    const icons = [
                        'speed',                  
                        'avg_pace',               
                        'local_gas_station',      
                        'bolt',                   
                        'auto_transmission',      
                        'settings',               
                        'local_gas_station',      
                        'luggage'                 
                    ];

                    features.forEach((value, index) => {
                        const featureElement = createFeatureElement(featureNames[index], value, featureUnits[index], icons[index]);
                        featuresContainer.appendChild(featureElement);
                    });
                }
            })
            .catch(error => console.error('Özellikler verileri yüklenirken bir hata oluştu: ', error));
    }

    function createFeatureElement(name, value, unit, icon) {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature col-3';
        featureElement.innerHTML = `
            <h4>${name}</h4>
            <span class="material-symbols-outlined">
                ${icon}
            </span>
            <p>
                <span class="feature_value">${value}</span>
                <span class="feature_unit">${unit}</span>
            </p>
        `;
        return featureElement;
    }

// Maksimum görünen yorum sayısını belirleyen parametre
const maxVisibleComments = 10; 

// Yorum ekleme düğmesini ayarlayan işlev
function setAddCommentButton(addCommentButton, engineCode) {
    fetch('../data/name-id.json')
        .then(response => response.json())
        .then(nameIdData => {
            const name = nameIdData[engineCode];
            if (name) {
                addCommentButton.href = `../yorum_ekle.html?page=${encodeURIComponent(name)}`;
            } else {
                console.error('ID için bir name bulunamadı.');
            }
        })
        .catch(error => {
            console.error('JSON dosyası yüklenirken bir hata oluştu:', error);
        });
}

// Yorum elemanını oluşturan işlev
function createCommentElement(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'card yorum-card';
    commentElement.innerHTML = `
        <div class="card-header">
            <h4 class="card-title"><strong>${comment.author}</strong></h4>
            <p class="card-text">${comment.date} ${comment.duration}</p>
        </div>
        <div class="card-body">
            <p class="card-text">${comment.content}</p>
        </div>
    `;
    return commentElement;
}

// Yorumları yükleyen ve gösteren işlev
function showComments(engineCode) {
    fetch('../data/testyorum.json')
        .then(response => response.json())
        .then(commentsData => {
            const commentsContainer = document.getElementById('yorumlar');
            commentsContainer.innerHTML = '';

            // engineCode'a göre filtrelenen yorumlar
            const engineComments = Object.values(commentsData).filter(comment => comment.engine === engineCode);

            // Butonlar için container oluşturma
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons-container d-flex justify-content-between mt-1';
            buttonsContainer.style.marginLeft = '0.75rem';  // margin-left ekleme

            // Yorum Ekle butonunu oluştur
            const addCommentButton = document.createElement('a');
            addCommentButton.className = 'btn btn-custom';
            addCommentButton.textContent = 'Yorum Ekle';

            // addCommentButton için href'i ayarla
            setAddCommentButton(addCommentButton, engineCode);

            // Yorum ekleme butonunu her durumda ekle
            buttonsContainer.appendChild(addCommentButton);

            // Yorumlar varsa
            if (engineComments.length > 0) {
                let visibleCount = 0;

                // Yorumları yükleme fonksiyonu
                const loadMoreComments = () => {
                    const nextBatch = engineComments.slice(visibleCount, visibleCount + maxVisibleComments);
                    nextBatch.forEach(comment => {
                        const commentElement = createCommentElement(comment);
                        commentsContainer.insertBefore(commentElement, buttonsContainer);
                    });
                    visibleCount += nextBatch.length;

                    // Eğer tüm yorumlar yüklendiyse, "Daha Fazla" butonunu gizle
                    if (visibleCount >= engineComments.length) {
                        loadMoreButton.style.display = 'none';
                    }
                };

                // "Daha Fazla" butonunu oluştur
                const loadMoreButton = document.createElement('button');
                loadMoreButton.className = 'btn btn-custom';
                loadMoreButton.textContent = 'Daha Fazla';
                loadMoreButton.style.display = 'none'; // Başlangıçta gizli
                loadMoreButton.addEventListener('click', loadMoreComments);

                // Butonları container'a ekle
                buttonsContainer.appendChild(loadMoreButton);
                commentsContainer.appendChild(buttonsContainer);

                // İlk yorum kümesini yükle
                loadMoreComments();

                // Eğer fazla yorum varsa "Daha Fazla" butonunu göster
                if (engineComments.length > maxVisibleComments) {
                    loadMoreButton.style.display = 'block';
                }
            } else {
// Eğer yorum yoksa
commentsContainer.innerHTML = '<p style="margin-left: 1rem; margin-top: 1rem;">Henüz yorum yapılmadı. İlk yorumu sen yap!</p>';
// Yorumlar yoksa da butonları ekle
commentsContainer.appendChild(buttonsContainer);

            }
        })
        .catch(error => {
            console.error('Yorum verileri yüklenirken bir hata oluştu: ', error);
            const commentsContainer = document.getElementById('yorumlar');
            commentsContainer.innerHTML = '<p>Yorumlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>';
        });
}

});
