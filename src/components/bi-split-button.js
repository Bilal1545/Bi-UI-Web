class BiSplitButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const container = document.createElement('div');
    container.classList.add('split-container');
    
    // 1. Ana Buton (Sol Kısım)
    const btnMain = document.createElement('button');
    btnMain.classList.add('btn-main');
    const slotMain = document.createElement('slot');
    btnMain.append(slotMain); 

    // 2. Ayrık Buton (Sağ Kısım - Dropdown Tetikleyici)
    const btnDropdown = document.createElement('button');
    btnDropdown.classList.add('btn-dropdown');
    
    // İkon için ayrı bir kapsayıcı ekliyoruz ki sadece ikonu döndürebilelim.
    const iconContainer = document.createElement('span');
    iconContainer.classList.add('dropdown-icon');
    iconContainer.innerHTML = '&#9660;'; // Unicode Aşağı Üçgen
    btnDropdown.append(iconContainer);

    const ripple = document.createElement("bi-ripple");
    const ripple2 = document.createElement("bi-ripple");
    btnDropdown.append(ripple);
    btnMain.append(ripple2); 
    
    // Olay Dinleyici GÜNCELLENDİ
    btnDropdown.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        // 1. is-open niteliğini toggle yap
        const isOpen = this.hasAttribute('is-open');
        if (isOpen) {
            this.removeAttribute('is-open');
        } else {
            this.setAttribute('is-open', '');
        }

        // 2. Custom Event'ı tetikle
        this.dispatchEvent(new CustomEvent('dropdown-clicked', { 
            bubbles: true, 
            composed: true,
            detail: { 
                source: 'dropdown',
                isOpen: !isOpen // Yeni durumu gönder
            }
        }));
    });

    container.append(btnMain, btnDropdown); 
    
    const style = document.createElement("style");
    style.textContent = `
      .split-container {
        display: inline-flex;
        border-radius: 1.25rem; 
        overflow: hidden; 
      }
      
      button {
        font-size: 0.875rem;
        font-family: sans-serif;
        border: none;
        cursor: pointer;
        transition: 0.2s ease;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap; 
        --color: var(--primary);
        --onColor: var(--onPrimary);
        --colorContainer: var(--secondaryContainer);
        --onColorContainer: var(--onSecondaryContainer);
      }
      
      /* DROPDOWN İKONU STİLİ VE ANİMASYONU */
      .dropdown-icon {
        display: block; /* Dönüşüm için blok elemente çevir */
        line-height: 1; /* İkonun kendi çizgi yüksekliğini sıfırla */
        transition: transform 0.3s ease; /* Yumuşak dönüşüm için transition ekle */
        transform: rotate(0deg);
      }
      
      /* is-open niteliği varsa, ikonu 180 derece döndür */
      :host([is-open]) .dropdown-icon {
        transform: rotate(180deg);
      }

      .btn-main {
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
        margin-right: .0625rem;
      }

      .btn-dropdown {
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem; 
        margin-left: .0625rem;
      }

      .btn-main:hover {
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
      }
        
      .btn-dropdown:hover {
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;
      }

      :host([is-open]) .btn-dropdown {
        border-radius: 50%;
      }

      :host([variant="outlined"]) .split-container {
        background: transparent;
      }

      :host([variant]) .btn-main,
      :host([variant]) .btn-dropdown {
        border: none;
      }

      :host([color="primary"]) button {
        --colorContainer: var(--primaryContainer);
        --onColorContainer: var(--onPrimaryContainer);
      }

      :host([color="secondary"]) button {
        --color: var(--secondary);
        --onColor: var(--onSecondary);
      }

      :host([color="tertiary"]) button {
        --color: var(--tertiary);
        --onColor: var(--onTertiary);
        --colorContainer: var(--tertiaryContainer);
        --onColorContainer: var(--onTertiaryContainer);
      }

      :host([color="error"]) button {
        --color: var(--error);
        --onColor: var(--onError);
        --colorContainer: var(--errorContainer);
        --onColorContainer: var(--onErrorContainer);
      }

      :host([color="success"]) button {
        --color: var(--success);
        --onColor: var(--onSuccess);
        --colorContainer: var(--successContainer);
        --onColorContainer: var(--onSuccessContainer);
      }

      :host([variant="glass"]) button {
        background: color-mix(
          in srgb,
          var(--primary) 8%,
          transparent 92%
        );
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.025);
        color: var(--color);
        --ripple-color: color-mix(
          in srgb,
          var(--primary) 100%,
          transparent
        );
      }

      :host([variant="glass"]) button:hover {
        background: color-mix(
          in srgb,
          var(--primary) 12%,
          transparent 88%
        );
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.075);
      }

      :host([variant="glass"][is-open]) .btn-dropdown {
        background: color-mix(
          in srgb,
          var(--primary) 12%,
          transparent 88%
        );
      }

      :host([variant="glass"][is-open]) .btn-dropdown:hover {
        background: color-mix(
          in srgb,
          var(--primary) 16%,
          transparent 84%
        );
      }
      
      :host([variant="outlined"]) .split-container {
        background: transparent;
      }

      :host([variant="outlined"]) .btn-main,
      :host([variant="outlined"]) .btn-dropdown {
        background: transparent;
        color: var(--onBackground);
        border: 0.0625rem solid var(--outline);
        --ripple-color: color-mix(
          in srgb,
          var(--primary) 100%,
          transparent
        );
      }

      :host([variant="outlined"]) .btn-main:hover,
      :host([variant="outlined"]) .btn-dropdown:hover {
        background: color-mix(
          in srgb,
          var(--primary) 8%,
          transparent 92%
        );
      }

      :host([variant="outlined"][is-open]) .btn-dropdown {
        background: color-mix(
          in srgb,
          var(--primary) 12%,
          transparent 88%
        );
      }

      :host([variant="outlined"][is-open]) .btn-dropdown:hover {
        background: color-mix(
          in srgb,
          var(--primary) 16%,
          transparent 84%
        );
      }

      :host([variant="tonal"]) .btn-main,
      :host([variant="tonal"]) .btn-dropdown {
        background: var(--colorContainer);
        color: var(--onColorContainer);
        box-shadow: none;
        --ripple-color: rgba(255,255,255,0.25);
      }

      :host([variant="tonal"]) .btn-main:hover,
      :host([variant="tonal"]) .btn-dropdown:hover {
        background: color-mix(in srgb, var(--colorContainer) 95%, white);
      }

      :host([variant="tonal"][is-open]) .btn-dropdown {
        background: color-mix(in srgb, var(--colorContainer) 95%, white);
      }

      :host([variant="tonal"][is-open]) .btn-dropdown:hover {
        background: color-mix(in srgb, var(--colorContainer) 90%, white);
      }

      :host([variant="elevated"]) .btn-main,
      :host([variant="elevated"]) .btn-dropdown {
        background: var(--surfaceContainerLow); 
        color: var(--primary);
        box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1); 
        --ripple-color: color-mix(
          in srgb,
          var(--primary) 45%,
          var(--surfaceContainerLow)
        );
      }

      :host([variant="elevated"]) .btn-main:hover,
      :host([variant="elevated"]) .btn-dropdown:hover {
        background: color-mix(
          in srgb,
          var(--surfaceContainerLow) 85%,
          var(--primary)
        );
      }

      :host([is-open][variant="elevated"]) .btn-dropdown {
        background: color-mix(
          in srgb,
          var(--surfaceContainerLow) 85%,
          var(--primary)
        );
      }

      :host([is-open][variant="elevated"]) .btn-dropdown:hover {
        background: color-mix(
          in srgb,
          var(--surfaceContainerLow) 80%,
          var(--primary)
        );
      }
      
      :host([variant="filled"]) .btn-main,
      :host([variant="filled"]) .btn-dropdown {
        background: var(--color);
        color: var(--onColor);
        box-shadow: none;
        --ripple-color: rgba(0,0,0,0.35);
      }

      :host([variant="filled"]) .btn-main:hover,
      :host([variant="filled"]) .btn-dropdown:hover {
        background: color-mix(in srgb, var(--color) 90%, black);
      }

      :host([is-open][variant="filled"]) .btn-dropdown {
        background: color-mix(in srgb, var(--color) 90%, black);
      }

      :host([is-open][variant="filled"]) .btn-dropdown:hover {
        background: color-mix(in srgb, var(--color) 80%, black);
      }

      :host([disabled]) .btn-main, 
      :host([disabled]) .btn-dropdown {
        pointer-events: none;
        opacity: 0.38;
      }
        
      :host([disabled]) .split-container {
        box-shadow: none !important;
        border: none !important;
      }

      :host([size="xs"]) button {
        height: 2rem;
        font-size: 0.75rem;
        padding-inline: 0.75rem;
      }

      :host([size="xs"]) .btn-dropdown {
        width: 2rem;
      }

      /* SM */
      :host([size="sm"]) button {
        height: 2.5rem;          /* 40px */
        font-size: 0.8125rem;
        padding-inline: 1rem;
      }

      :host([size="sm"]) .btn-dropdown {
        width: 2.5rem;
      }

      /* MD (DEFAULT) */
      :host([size="md"]),
      :host(:not([size])) {
        --_btn-height: 3rem;
      }

      :host([size="md"]) button {
        height: 3rem;            /* 48px */
        font-size: 0.875rem;
        padding-inline: 1.25rem;
      }

      :host([size="md"]) .btn-dropdown {
        width: 3rem;
      }

      /* LG */
      :host([size="lg"]) button {
        height: 3.5rem;          /* 56px */
        font-size: 1rem;
        padding-inline: 1.5rem;
      }

      :host([size="lg"]) .btn-dropdown {
        width: 3.5rem;
      }

      /* XL */
      :host([size="xl"]) button {
        height: 4rem;            /* 64px */
        font-size: 1.125rem;
        padding-inline: 1.75rem;
      }

      :host([size="xl"]) .btn-dropdown {
        width: 4rem;
      }
    `;

    this.shadowRoot.append(style, container);
  }
}

customElements.define("bi-split-button", BiSplitButton);