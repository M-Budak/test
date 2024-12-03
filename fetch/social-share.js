class SocialShare extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Shadow DOM kullanımı
    }

    connectedCallback() {
        // FontAwesome CSS ekleme
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        fontAwesomeLink.crossOrigin = 'anonymous';
        this.shadowRoot.appendChild(fontAwesomeLink);

        // Shadow DOM'a HTML yapısını ekleme
        this.shadowRoot.innerHTML += `
            <style>
                /* Genel Paylaşım Kutuları */

                

                .share-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                }

                .share-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    text-decoration: none;
                    color: white;
                    border-radius: 5px;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    transition: transform 0.3s ease, background-color 0.3s ease;
                    text-align: center;
                }

                .share-btn:hover {
                    transform: translateY(-4px);
                }

                .whatsapp {
                    background-color: #25D366;
                }
                .whatsapp:hover {
                    background-color: #1da855;
                }

                .messenger {
                    background-color: #448aff;
                }
                .messenger:hover {
                    background-color: #3578e5;
                }

                .twitter {
                    background-color: #1DA1F2;
                }
                .twitter:hover {
                    background-color: #0d95e8;
                }

                .facebook {
                    background-color: #4267b2;
                }
                .facebook:hover {
                    background-color: #365899;
                }

                .telegram {
                    background-color: #0088cc;
                }
                .telegram:hover {
                    background-color: #0077b3;
                }

                @media (max-width: 768px) {
                    .share-btn {
                        width: 50px;
                        height: 40px;
                        padding: 0;
                    }
                    .share-text {
                        display: none;
                    }
                    .share-btn i {
                        font-size: 20px;
                    }
                }
                @media (min-width: 769px) {
                    .share-btn {
                        width: 195px;
                        height: 40px;
                        padding: 10px;
                    }
                    .share-btn i {
                        font-size: 16px;
                    }
                }
            </style>
            <h3 class="genel-baslik-3">Sevdiklerinize Paylaşın, Fikirlerini Alın!</h3>
         <div class="share-buttons">
                <!-- WhatsApp -->
                <a id="whatsapp-share" href="#" target="_blank" class="share-btn whatsapp" aria-label="WhatsApp'ta Gönder">
                    <i class="fab fa-whatsapp"></i>
                    <span class="share-text">WhatsApp'tan Gönder</span>
                </a>

                <!-- Messenger -->
                <a id="messenger-share" href="#" target="_blank" class="share-btn messenger" aria-label="Messenger'da Paylaş">
                    <i class="fab fa-facebook-messenger"></i>
                    <span class="share-text">Messenger'la Paylaş</span>
                </a>

                <!-- Twitter -->
                <a id="twitter-share" href="#" target="_blank" class="share-btn twitter" aria-label="Twitter'da Paylaş">
                    <i class="fab fa-twitter"></i>
                    <span class="share-text">Twitter'da Paylaş</span>
                </a>

                <!-- Facebook -->
                <a id="facebook-share" href="#" target="_blank" class="share-btn facebook" aria-label="Facebook'ta Paylaş">
                    <i class="fab fa-facebook-f"></i>
                    <span class="share-text">Facebook'ta Paylaş</span>
                </a>

                <!-- Telegram -->
                <a id="telegram-share" href="#" target="_blank" class="share-btn telegram" aria-label="Telegram'da Paylaş">
                    <i class="fab fa-telegram"></i>
                    <span class="share-text">Telegram'la Gönder</span>
                </a>
            </div>
        `;

        // Sayfa URL'sini alıp, paylaşım linklerini güncelleme
        const currentUrl = window.location.href;
        this.shadowRoot.querySelector('#whatsapp-share').href = `https://wa.me/?text=${encodeURIComponent(currentUrl)}%20Bu%20arabayı%20incelemelisin!`;
        this.shadowRoot.querySelector('#messenger-share').href = `fb-messenger://share?link=${encodeURIComponent(currentUrl)}`;
        this.shadowRoot.querySelector('#twitter-share').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Bu%20arabayı%20incelemelisin!`;
        this.shadowRoot.querySelector('#facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        this.shadowRoot.querySelector('#telegram-share').href = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=Bu%20arabayı%20incelemelisin!`;
    }
}

// Web Component olarak tanımlama
customElements.define('social-share', SocialShare);
