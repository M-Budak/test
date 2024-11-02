let featuresData = {};

// Sabit özellik isimleri listesi
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

// Sabit birimler listesi
const featureUnits = [
    "km/h", 
    "s", 
    "",         // Yakıt Türü için birim yok
    "hp", 
    "",         // Şanzıman için birim yok
    "nm", 
    "lt/100km", 
    "lt"
];

// İkonlar listesi
const icons = [
    'speed',                  // Max Hız
    'avg_pace',               // 0-100
    'local_gas_station',      // Yakıt
    'bolt',                   // Beygir
    'auto_transmission',      // Vites
    'settings',               // Tork
    'local_gas_station',      // Tüketim (örnek olarak health_and_safety yerine local_gas_station kullanılabilir)
    'luggage'                 // Bagaj
];

document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/ozellikler.json')
        .then(response => response.json())
        .then(fetchedData => {
            featuresData = fetchedData;
        })
        .catch(error => console.error('Error fetching features data:', error));
});

function showCategory(category) {
    showFeatures(category);
    showReviews(category);
    showScores(category);
}

function showFeatures(category) {
    const featuresContainer = document.getElementById('ozellikler');
    featuresContainer.innerHTML = '';

    if (featuresData[category]) {
        const features = featuresData[category];
        features.forEach((value, index) => {
            const featureElement = createFeatureElement(featureNames[index], value, featureUnits[index], icons[index]);
            featuresContainer.appendChild(featureElement);
        });
    }
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
            <span class="f_number">${value}</span>
            ${unit ? `<span class="f_unit">${unit}</span>` : ''}
        </p>
    `;
    return featureElement;
}
