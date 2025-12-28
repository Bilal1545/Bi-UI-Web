class BiIconButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const btn = document.createElement('button');
    const slot = document.createElement('slot');
    btn.append(slot); 
    const ripple = document.createElement("bi-ripple");
    btn.append(ripple);
    
    // Gölge rengi değişkeni (Kullanılmıyor, çünkü ikon butonlar genellikle yükseltilmez)
    // const shadowColor = "rgba(0, 0, 0, 0.2)"; 
    
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex; 
      }
      
      button {
        --current-width: 2.5rem;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;             
        font-size: 1.5rem;      
        font-family: sans-serif;
        border-radius: 1.25rem;     
        border: none;
        cursor: pointer;
        transition: 0.2s ease;
        display: grid; 
        place-items: center; 
        color: var(--fg); 
        background: transparent; 

        --color: var(--primary);
        --onColor: var(--onPrimary);
        --colorContainer: var(--secondaryContainer);
        --onColorContainer: var(--onSecondaryContainer);
      }
      
      :host([disabled]) button {
        pointer-events: none;
        opacity: 0.38;
        box-shadow: none !important;
      }
      
      :host([shape="square"]) button {
        border-radius: 0.5rem; 
      }

      :host([size="xs"]) button {
        width: 2rem;
        height: 2rem;
        font-size: 1.25rem; 
      }

      :host([size="sm"]) button {
        --current-width: 2.25rem;
        width: 2.25rem;
        height: 2.25rem;
        font-size: 1.375rem; 
      }

      :host([size="lg"]) button {
        --current-width: 3rem;
        width: 3rem;
        height: 3rem;
        font-size: 1.75rem; 
      }
      
      :host([size="xl"]) button {
        --current-width: 3.5rem;
        width: 3.5rem;
        height: 3.5rem;
        font-size: 2rem; 
      }
      
      :host([width="narrow"]) button {
        width: calc(var(--current-width) / 1.25) !important;
      }
      
      :host([width="wide"]) button {
        width: calc(var(--current-width) * 1.25) !important;
      }

      /* =============== COLORS =============== */

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

      /* ---- TEXT ---- */
      :host([variant="text"]) button {
        background: transparent;
        color: var(--color);

        --ripple-color: color-mix(
          in srgb,
          currentColor 100%,
          transparent
        );
      }

      :host([variant="text"]) button:hover {
        background: color-mix(
          in srgb,
          currentColor 10%,
          transparent 90%
        );
      }

      /* ---- GLASS ---- */
      :host([variant="glass"]) button {
        background: color-mix(
          in srgb,
          var(--primary) 8%,
          transparent 92%
        );
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
      }

      /* ---- OUTLINED ---- */
      :host([variant="outlined"]) button {
        background: transparent;
        color: var(--onBackground);
        border: 1px solid var(--outline);

        --ripple-color: color-mix(
          in srgb,
          var(--primary) 100%,
          transparent
        );
      }

      :host([variant="outlined"]) button:hover {
        background: color-mix(
          in srgb,
          var(--primary) 8%,
          transparent 92%
        );
      }

      /* ---- FILLED ---- */
      :host([variant="filled"]) button {
        background: var(--color);
        color: var(--onColor);

        --ripple-color: rgba(0,0,0,0.35);
      }

      :host([variant="filled"]) button:hover {
        background: color-mix(
          in srgb,
          var(--color) 90%,
          black
        );
      }

      /* ---- TONAL ---- */
      :host([variant="tonal"]) button {
        background: var(--colorContainer);
        color: var(--onColorContainer);

        --ripple-color: rgba(255,255,255,0.25);
      }

      :host([variant="tonal"]) button:hover {
        background: color-mix(
          in srgb,
          var(--colorContainer) 95%,
          white
        );
      }

      /* ---- ELEVATED ---- */
      :host([variant="elevated"]) button {
        background: var(--surfaceContainerLow);
        color: var(--primary);

        box-shadow: 0 1px 3px rgba(0,0,0,0.15);

        --ripple-color: color-mix(
          in srgb,
          var(--primary) 45%,
          var(--surfaceContainerLow)
        );
      }

      :host([variant="elevated"]) button:hover {
        background: color-mix(
          in srgb,
          var(--surfaceContainerLow) 85%,
          var(--primary)
        );
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-icon-button", BiIconButton);
