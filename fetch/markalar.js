document.addEventListener("DOMContentLoaded", function() {
    // Sayfa adını elde et
    const path = window.location.pathname;
    const brand = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));

    if (!brand) {
        console.error("Brand parameter is missing");
        return;
    }

    // İlk harfi büyük yaparak başlığı güncelle
    const formattedBrand = `${brand.charAt(0).toUpperCase() + brand.slice(1)}`;
    document.querySelector('h1.genel-baslik-1').textContent = `${formattedBrand} Otomobil Modelleri`;
    // document.title = `${formattedBrand} | OtoVivo`;

    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const brandData = Object.values(data).filter(item => item.brand.toLowerCase() === brand.toLowerCase());

            if (brandData.length === 0) {
                console.error("Data for the brand not found");
                return;
            }

            const navbarNav = document.getElementById('navbar-nav');
            const categoriesContainer = document.getElementById('categories-container');
            const categories = [...new Set(brandData.map(item => item.body))];

            categories.forEach(category => {
                const navItem = document.createElement('li');
                navItem.className = 'nav-item';
                navItem.innerHTML = `<a class="nav-link" href="#${category.toLowerCase()}">${category}</a>`;
                navbarNav.appendChild(navItem);

                const categorySection = document.createElement('div');
                categorySection.id = category.toLowerCase();
                categorySection.innerHTML = `
                    <h2 class="genel-baslik-2">${formattedBrand} ${category} Modeller</h2>
                    <div class="row"></div>
                `;
                categoriesContainer.appendChild(categorySection);

                const categoryRow = categorySection.querySelector('.row');
                categoryRow.innerHTML = brandData
                    .filter(item => item.body.toLowerCase() === category.toLowerCase())
                    .map(item => {
                        const badgeInfo = getBadgeInfo(item.BadgeStatus);
                        return `
                            <div class="col-lg-6 col-12">
                                <div class="card car-card ${item.BadgeStatus === 'soon' ? 'coming-soon' : ''}">
                                    <a href="${item.link}" ${item.BadgeStatus === 'soon' ? 'class="disabled-link"' : ''}>
                                        <img src="${item.img}" class="card-img-top-brand ${item.BadgeStatus === 'soon' ? 'grayscale' : ''}" alt="${item.alt}">
                                        <div class="card-body">
                                            ${badgeInfo ? `<div class="badge" style="background-color:${badgeInfo.color}">${badgeInfo.text}</div>` : ''}
                                            <h3 class="card-title">${formattedBrand} ${item.model}</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        `;
                    }).join('');
            });

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

function getBadgeInfo(status) {
    switch (status) {
        case 'elk':
            return { text: 'Elektrikli', color: 'green' };
        case 'hyb':
            return { text: 'Hybrid', color: 'blue' };
        case 'soon':
            return { text: 'Çok Yakında', color: 'red' };
        case 'new':
            return { text: 'Yeni Eklendi', color: 'orange' };
        default:
            return null;
    }
}
