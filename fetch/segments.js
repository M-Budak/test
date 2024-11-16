class Segments extends HTMLElement {
  connectedCallback() {
      this.render();
      this.applyResponsiveBehavior();
      window.addEventListener('resize', this.applyResponsiveBehavior.bind(this));
  }

  render() {
      this.innerHTML = `
      <div class="background-wrapper">
      <a href="/segment/">
        <h2 class="genel-baslik-2" style="margin-top:12px; padding:0px 0px 0px 12px; color: white;">Otomobil Segmentleri</h2>
          </a>
            <div class="row row-cols-2 g-4 mt-3" style="padding: 0px 12px 10px 12px; justify-content: flex-start;">
              <div class="brand">
                <a href="segment/a-segment.html" class="brand-link "> 
                    <div class="card">
                        <div class="home-card-body">
                            <h5 class="home-text-brand">Kompakt Araçlar</h5>
                        </div>
                    </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/b-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">Küçük Araçlar</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/c-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">Orta Sınıf Araçlar</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/d-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">Orta-Üst Araçlar</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/e-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">E Segment</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/f-segment.html" class="brand-link"> 
                    <div class="card">
                        <div class="home-card-body">
                            <h5 class="home-text-brand">F Segment</h5>
                        </div>
                    </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/m-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">M Segment</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/j-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">J Segment</h5>
                    </div>
                  </div>
                </a>
              </div>
          </div>
        </div>  
      `;
  }

  applyResponsiveBehavior() {
      const screenWidth = window.innerWidth;
  }
}

customElements.define('car-segments', Segments);
