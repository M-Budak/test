class Segments extends HTMLElement {
  connectedCallback() {
      this.render();
      this.applyResponsiveBehavior();
      window.addEventListener('resize', this.applyResponsiveBehavior.bind(this));
  }

  render() {
      this.innerHTML = `
      <div class="background-wrapper">
      <a href="arac-yorumu/segment.html">
        <h2 class="genel-baslik-2" style="margin-top:12px; padding:0px 0px 0px 12px; color: white;">Segmentler</h2>
          </a>
            <div class="row row-cols-3 g-4 mt-3" style="padding: 0px 12px 10px 12px; justify-content: flex-start;">
              <div class="brand">
                <a href="segment/a-segment.html" class="brand-link "> 
                    <div class="card">
                        <div class="home-card-body">
                            <h5 class="home-text-brand">A</h5>
                        </div>
                    </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/b-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">B</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/c-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">C</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/d-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">D</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/e-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">E</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/f-segment.html" class="brand-link"> 
                    <div class="card">
                        <div class="home-card-body">
                            <h5 class="home-text-brand">F</h5>
                        </div>
                    </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/m-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">M</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/j-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">J</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="segment/s-segment.html" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">S</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="brand">
                <a href="../segment" class="brand-link"> 
                  <div class="card">
                    <div class="home-card-body">
                      <h5 class="home-text-brand">Tümü</h5>
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
