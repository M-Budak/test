class BrandModal extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <!-- Button trigger modal -->
        <div class="seen" data-bs-toggle="modal" data-bs-target="#exampleModal" style="display: flex; align-items: center; justify-content: center; margin: 0.7rem;">Tümünü Göster ></div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLabel">Aradığın Markayı Seç</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row row-cols-2 row-cols-md-4 g-5 mt-1 justify-content-center align-items-center">
                  ${this.createBrandCards()}
                </div>
              </div>
<div class="modal-footer">
  <a href="../arac-yorumu/kasa.html" class="btn btn-custom brand-link">Kasa Tipleri</a>
</div>

            </div>
          </div>
        </div>
      `;
    }
  
    createBrandCards() {
      const brands = [
        { name: "Audi", img: "logo/audi.svg" },
        { name: "BMW", img: "logo/bmw.svg" },
        { name: "Chevrolet", img: "logo/chevrolet.svg" },
        { name: "Citroen", img: "logo/citroen.svg" },
        { name: "Cupra", img: "logo/cupra.svg" },
        { name: "Dacia", img: "logo/dacia.svg" },
        { name: "Fiat", img: "logo/fiat.svg" },
        { name: "Ford", img: "logo/ford.svg" },
        { name: "Honda", img: "logo/honda.svg" },
        { name: "Hyundai", img: "logo/hyundai.svg" },
        { name: "Kia", img: "logo/kia.svg" },
        { name: "Mercedes-Benz", img: "logo/mercedes-benz.svg" },
        { name: "Mitsubishi", img: "logo/mitsubishi.svg" },
        { name: "Nissan", img: "logo/nissan.svg" },
        { name: "Opel", img: "logo/opel.svg" },
        { name: "Peugeot", img: "logo/peugeot.svg" },
        { name: "Renault", img: "logo/renault.svg" },
        { name: "Seat", img: "logo/seat.svg" },
        { name: "Skoda", img: "logo/skoda.svg" },
        { name: "Tesla", img: "logo/tesla.png" },
        { name: "Togg", img: "logo/togg.png" },
        { name: "Toyota", img: "logo/toyota.svg" },
        { name: "Volkswagen", img: "logo/volkswagen.svg" },
        { name: "Volvo", img: "logo/volvo.svg" }
      ];
    
      return brands.map(brand => `
        <div class="brand modal-card">
          <a href="../markalar/${brand.name.toLowerCase()}.html?brand=${brand.name.toLowerCase()}" class="brand-link">
            <div class="card h-100 d-flex flex-column align-items-center">
              <img src="${brand.img}" class="modal-img-brand" alt="${brand.name}">
              <div class="home-card-body">
                <h5 class="home-text-brand">${brand.name}</h5>
              </div>
            </div>
          </a>
        </div>
      `).join('');
    }    
  }
  
  customElements.define('brand-modal', BrandModal);
  