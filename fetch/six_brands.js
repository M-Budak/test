class BrandsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
        @import url('style.css'); /* Import your existing CSS */

        .scrollable-cards {
          overflow-x: auto;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
          padding: 0;
        }

        .scrollable-cards .card {
          flex: 0 0 auto;
          width: calc(100% / 6 - 10px); /* 6 cards in a row */
          margin-right: 10px; /* Space between cards */
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .scrollable-cards .card img {
          max-height: 150px; /* Adjust as needed */
          width: 100%;
        }

        .scrollable-cards .card .card-body {
          white-space: normal;
          word-wrap: break-word;
        }

        @media (max-width: 769px) {
          .scrollable-cards .card {
            width: calc(100% / 3 - 10px); /* 3 cards in a row on mobile */
          }
        }

        @media (max-width: 480px) {
          .scrollable-cards .card {
            width: calc(100% - 10px); /* 1 card per row on very small screens */
          }
        }
      </style>
      <h2 class="genel-baslik-2">Otomobil Markaları</h2>
      <div class="scrollable-cards">
        <div class="card h-100">
          <a href="#" class="brand-link"> 
            <img src="logo/bmw.svg" class="six-brand-img" alt="BMW">
            <div class="card-body">
              <h5 class="home-text-brand">BMW</h5>
            </div>
          </a>
        </div>
        <div class="card h-100">
          <a href="#" class="brand-link"> 
            <img src="logo/audi.svg" class="six-brand-img" alt="Audi">
            <div class="card-body">
              <h5 class="home-text-brand">Audi</h5>
            </div>
          </a>
        </div>
        <div class="card h-100">
          <a href="#" class="brand-link"> 
            <img src="logo/volvo.svg" class="six-brand-img" alt="Volvo">
            <div class="card-body">
              <h5 class="home-text-brand">Volvo</h5>
            </div>
          </a>
        </div>
        <div class="card h-100">
          <a href="#" class="brand-link"> 
            <img src="logo/opel.svg" class="six-brand-img" alt="Opel">
            <div class="card-body">
              <h5 class="home-text-brand">Opel</h5>
            </div>
          </a>
        </div>
        <div class="card h-100">
          <a href="#" class="brand-link"> 
            <img src="logo/citroen.svg" class="six-brand-img" alt="Citroen">
            <div class="card-body">
              <h5 class="home-text-brand">Citroen</h5>
            </div>
          </a>
        </div>
        <div class="card h-100">
          <a href="/markalar/renault.html" class="brand-link"> 
            <img src="logo/renault.svg" class="six-brand-img" alt="Renault">
            <div class="card-body">
              <h5 class="home-text-brand">Renault</h5>
            </div>
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('brands-section', BrandsSection);
