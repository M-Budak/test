// JSON verinizi fetch işlemiyle çekin
fetch('../data/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Her kategori için işlem yap
    document.querySelectorAll('.row[data-model-ids]').forEach(container => {
      const modelIds = container.getAttribute('data-model-ids').split(',');

      // İlgili modelleri filtrele
      const modelsToShow = modelIds.map(id => data[id]).filter(model => model);

      // Filtrelenen modelleri ekrana bas
      displayModels(container, modelsToShow);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function displayModels(container, models) {
  container.innerHTML = ''; // Boşalt

  models.forEach(model => {
    const modelDiv = document.createElement('div');
    modelDiv.classList.add('kasa-list', 'col-lg-3', 'col-6');

    modelDiv.innerHTML = `
      <div class="card car-card">
        <a href="${model.link}" class="card-link">
          <img src="${model.img}" class="card-img-top" alt="Araç Resmi">
          <div class="card-body">
            <h5 class="card-title">${model.model}</h5>
          </div>
        </a>
      </div>
    `;

    container.appendChild(modelDiv);
  });
}
