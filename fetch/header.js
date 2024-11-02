class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="text-light py-2">
                <a href="../index.html" class="logo-link">
                    <h1 class="logo m-2">aracyorumu.com</h1>
                </a>
                <div class="hamburger" id="hamburgerMenu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <nav class="menu" id="sideMenu">
                    <ul id="menuList">
                        <li><a href="../arac-yorumu/markalar.html">Marka</a></li>
                        <li><a href="../arac-yorumu/kasa.html">Kasa</a></li>
                        <li><a href="../arac-yorumu/yakit.html">Yakıt</a></li>
                        <li><a href="../arac-yorumu/segment.html">Segment</a></li>
                        <li><a href="../arac-yorumu/modeller.html">Model</a></li>
                    </ul>
                </nav>
                <div class="overlay" id="menuOverlay"></div>
            </header>
        `;


        // bunu ekle <li class="highlight"><a href="arac-yorumu/bizbize.html">Biz Bize</a></li>
        
        const hamburger = document.getElementById('hamburgerMenu');
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('menuOverlay');
        
        // Hamburger menü tıklama işlevi (Mobil için)
        hamburger.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // Overlay tıklama işlevi (Menü dışına tıklayınca menüyü kapat)
        overlay.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

customElements.define('my-header', MyHeader);
