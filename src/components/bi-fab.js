class BiFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const btn = document.createElement('button');
    const slot = document.createElement('slot');
    const ripple = document.createElement("bi-ripple");
    btn.append(ripple);
    btn.append(slot);
    
    // Gölge rengi değişkeni
    const shadowColor = "rgba(0, 0, 0, 0.2)"; 
    
    const style = document.createElement("style");
    style.textContent = `
      button {
        padding: 0.625rem 1.5rem;
        font-size: 0.875rem;      
        font-family: sans-serif;
        border-radius: 1.25rem;   
        border: none;
        cursor: pointer;
        transition: 0.2s ease;
      }
      
      :host {
        display: inline-flex; 
      }
      
      :host([disabled]) button {
        pointer-events: none;
        opacity: 0.38;
        box-shadow: none !important;
      }

      :host([size="sm"]) button {
        font-size: 1.5rem;
        min-width: 2.5rem;
        min-height: 2.5rem;
        border-radius: 0.75rem;
      }

      :host([size="lg"]) button {
        font-size: 2.25rem;
        min-height: 6rem;
        min-width: 6rem;
        border-radius: 1.75rem;
      }

      button {
        background: var(--bg, var(--bi-sys-color-surface-container-high));
        --color: var(--bi-sys-color-primary);
        color: var(--color);
        --bg: var(--bi-sys-color-surface-container-high);
        backdrop-filter: blur(0.375rem);
        box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1); 
        padding: 0; 
        font-size: 1.75rem;
        min-height: 3.5rem;
        min-width: 3.5rem;
        border-radius: 1rem;
        display: grid; 
        place-items: center; 
        flex-shrink: 0; 
        --ripple-color: color-mix(
          in srgb,
          var(--color) 45%,
          var(--bg)
        );
      }

      :host([variant="primary"]) button {
        --bg: var(--bi-sys-color-primary);
        --color: var(--bi-sys-color-on-primary);
      }

      :host([variant="secondary"]) button {
        --bg: var(--bi-sys-color-secondary);
        --color: var(--bi-sys-color-on-secondary);
      }

      :host([variant="tertiary"]) button {
        --bg: var(--bi-sys-color-tertiary);
        --color: var(--bi-sys-color-on-tertiary);
      }


      :host([extended]) button {
        width: auto;
        padding: 1rem 1.5rem;
        border-radius: 1.25rem;
        min-height: 3.5rem;
        display: flex;
        gap: 0.5rem;
      }

      :host([extended][size="sm"]) button {
        min-height: 2.5rem; 
        padding: 0.5rem 1rem;
      }
      
      :host([extended][size="lg"]) button {
        min-height: 4rem; 
        padding: 1rem 2rem;
      }

      button:hover {
        background: color-mix(
          in srgb,
          var(--color) 25%,
          var(--bg)
        );
        box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.15);
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-fab", BiFab);
