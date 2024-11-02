class Fuels extends HTMLElement {
  connectedCallback() {
      this.render();
  }

  render() {
      this.innerHTML = `
          <h2 id="yakıt-turleri" class="genel-baslik-2">Yakıt Türleri</h2>
          <div class="fuels-container">
              <div class="fuel-card">
                <a href="segments/a-segment.html" class="fuel-link"> 
                    <div class="fuel-card-inner">
                        <div class="fuel-card-body">
                            <h5 class="fuel-card-title">Dizel</h5>
                        </div>
                    </div>
                </a>
              </div>
              <div class="fuel-card">
                <a href="segments/b-segment.html" class="fuel-link"> 
                  <div class="fuel-card-inner">
                    <div class="fuel-card-body">
                      <h5 class="fuel-card-title">Benzinli</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="fuel-card">
                <a href="segments/c-segment.html" class="fuel-link"> 
                  <div class="fuel-card-inner">
                    <div class="fuel-card-body">
                      <h5 class="fuel-card-title">LPG</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="fuel-card">
                <a href="segments/d-segment.html" class="fuel-link"> 
                  <div class="fuel-card-inner">
                    <div class="fuel-card-body">
                      <h5 class="fuel-card-title">Hibrit</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="fuel-card">
                <a href="segments/e-segment.html" class="fuel-link"> 
                  <div class="fuel-card-inner">
                    <div class="fuel-card-body">
                      <h5 class="fuel-card-title">Elektrikli</h5>
                    </div>
                  </div>
                </a>
              </div>
          </div>
      `;
  }
}

customElements.define('car-fuel', Fuels);
