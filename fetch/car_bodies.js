class CarBodies extends HTMLElement {
  connectedCallback() {
      this.render();
  }

  render() {
      this.innerHTML = `
      <div class="background-wrapper">
      <a href="arac-yorumu/kasa.html">
          <h2 class="genel-baslik-2" style="margin-top:12px; padding:0px 0px 0px 12px; color: white;">Kasa Tipleri</h2>
      </a>
      <div class="row row-cols-3 g-4 mt-3" style="padding: 0px 12px 10px 12px; justify-content: flex-start;">
          <div class="brand">
              <a href="kasa/sedan.html" class="brand-link">
                <div class="card">
                      <div class="home-card-body">
                          <h5 class="home-text-brand">Sedan</h5>
                      </div>
                </div>
              </a>
          </div>
          <div class="brand">
              <a href="kasa/hatchback.html" class="brand-link"> 
                  <div class="card">
                      <div class="home-card-body">
                          <h5 class="home-text-brand">Hatchback</h5>
                      </div>
                  </div>
              </a>
          </div>
          <div class="brand kasa-card">
              <a href="kasa/suv.html" class="brand-link"> 
                  <div class="card">
                      <div class="home-card-body">
                          <h5 class="home-text-brand">SUV</h5>
                      </div>
                  </div>
              </a>
          </div>
          <div class="brand kasa-card">
              <a href="kasa/pickup.html" class="brand-link"> 
                  <div class="card">
                      <div class="home-card-body">
                          <h5 class="home-text-brand">Pick-Up</h5>
                      </div>
                  </div>
              </a>
          </div>
          <div class="brand kasa-card">
              <a href="kasa/spor-otomobiller.html" class="brand-link"> 
                  <div class="card">
                      <div class="home-card-body">
                          <h5 class="home-text-brand">Spor</h5>
                      </div>
                  </div>
              </a>
          </div>
          <div class="brand kasa-card">
              <a href="kasa/ticari.html" class="brand-link"> 
                  <div class="card">
                      <div class="home-card-body">
                          <h5 class="home-text-brand">Ticari</h5>
                      </div>
                  </div>
              </a>
          </div>
      </div>
      </div>
      `;
  }
}

customElements.define('car-bodies', CarBodies);
