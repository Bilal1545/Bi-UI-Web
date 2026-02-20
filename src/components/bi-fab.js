class BiFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const btn = document.createElement('button');
    const slot = document.createElement('slot');
    const ripple = document.createElement("bi-ripple");
    const elevation = document.createElement("bi-elevation");
    btn.append(ripple, elevation, slot);
    
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex; 
      }

      :host([lovered]) button {
        --bi-elevation-shadow-level: 1;
      }
      
      :host([disabled]) button {
        pointer-events: none;
        opacity: 0.38;
        --bi-elevation-shadow-level: 0 !important;
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
        --bg: var(--bi-sys-color-surface);
        background: var(--bg);
        --color: var(--bi-sys-color-primary);
        color: var(--color);
        font-size: 1.75rem;
        min-height: 3.5rem;
        min-width: 3.5rem;
        display: grid; 
        place-items: center;
        flex-shrink: 0;
        --ripple-color: currentColor;
        padding: 0.625rem 1.5rem;
        font-size: 0.875rem;
        font-family: sans-serif;
        border-radius: 1.25rem;
        border: none;
        cursor: pointer;
        transition: 0.2s ease;
        --bi-elevation-shadow-level: 3;
      }

      :host([variant="primary"]) button {
        --bg: var(--bi-sys-color-primary);
        --color: var(--bi-sys-color-on-primary);
        --ripple-color: rgba(0,0,0,0.35);
      }

      :host([variant="secondary"]) button {
        --bg: var(--bi-sys-color-secondary);
        --color: var(--bi-sys-color-on-secondary);
        --ripple-color: rgba(0,0,0,0.35);
      }

      :host([variant="tertiary"]) button {
        --bg: var(--bi-sys-color-tertiary);
        --color: var(--bi-sys-color-on-tertiary);
        --ripple-color: rgba(0,0,0,0.35);
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
        ) !important;
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-fab", BiFab);
