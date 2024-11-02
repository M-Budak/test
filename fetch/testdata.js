document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand');

    fetch('./data/testdata.json') // Yolun doğruluğundan emin olun
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (brand) {
                handleBrandFiltering(data, brand);
            } else {
                handleIdBasedFiltering(data);
            }

            // Scrollspy ve scroll event listener eklemeleri
            const scrollSpyElement = document.querySelector('[data-bs-spy="scroll"]');
            new bootstrap.ScrollSpy(document.body, {
                target: '#navbar-example2',
                offset: 0
            });

            document.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('#categories-container > div');
                const navLinks = document.querySelectorAll('#navbar-nav .nav-link');
        
                let current = '';
        
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    const sectionBottom = sectionTop + sectionHeight;
        
                    if (window.pageYOffset >= sectionTop - (sectionHeight / 3) && window.pageYOffset < sectionBottom) {
                        current = section.getAttribute('id');
                    }
                });
        
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            });

            const event = new Event('scroll');
            document.dispatchEvent(event);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function handleBrandFiltering(data, brand) {
    const filteredData = Object.values(data).filter(item => item.brand === brand);

    document.querySelectorAll('.row[data-model-ids]').forEach(container => {
        const modelIds = container.getAttribute('data-model-ids').split(',');
        const modelsToShow = modelIds.map(id => filteredData.find(model => model.id === id)).filter(model => model);

        if (modelsToShow.length > 0) {
            displayModels(container, modelsToShow);
        } else {
            console.error("No models found for the given IDs and brand:", modelIds);
        }
    });
}

function handleIdBasedFiltering(data) {
    document.querySelectorAll('.row[data-model-ids]').forEach(container => {
        const modelIds = container.getAttribute('data-model-ids').split(',');
        const modelsToShow = modelIds.map(id => data[id]).filter(model => model);

        if (modelsToShow.length > 0) {
            displayModels(container, modelsToShow);
        } else {
            console.error("No models found for the given IDs:", modelIds);
        }
    });
}

function displayModels(container, models) {
    container.innerHTML = '';

    models.forEach(model => {
        const modelDiv = document.createElement('div');
        modelDiv.classList.add('kasa-list', 'col-lg-3', 'col-6');

        modelDiv.innerHTML = `
            <div class="card car-card">
                <a href="${model.link}" class="card-link">
                    <img src="${model.img}" class="card-img-top" alt="${model.alt}">
                    <div class="card-body">
                        <h5 class="card-title">${model.model}</h5>
                    </div>
                </a>
            </div>
        `;""

        container.appendChild(modelDiv);
    });
}
