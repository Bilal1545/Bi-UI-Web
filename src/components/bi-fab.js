class BiFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const btn = document.createElement('button');
    const slot = document.createElement('slot');
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

      :host([shape="square"]) button {
        border-radius: 0.75rem; 
      }

      :host([size="sm"]) button {
        font-size: 0.75rem;
        min-height: 2rem;
        min-width: 2rem;
        border-radius: 0.75rem;
      }

      :host([size="nm"]) button {
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        min-height: 3.5rem;
        min-width: 3.5rem;
        border-radius: 1rem;
      }

      :host([size="md"]) button {
        padding: 0.75rem 1.75rem;
        font-size: 1.75rem;
        min-height: 5rem;
        min-width: 5rem;
        border-radius: 1.5rem;
      }

      :host([size="lg"]) button {
        padding: 1rem 2rem;
        font-size: 2.25rem;
        min-height: 6rem;
        min-width: 6rem;
        border-radius: 1.75rem;
      }

      :host([color="primary"]) button {
        --bg: var(--primary);
        --color: var(--onPrimary);
      }

      :host([color="secondary"]) button {
        --bg: var(--secondary);
        --color: var(--onSecondary);
      }

      :host([color="tertiary"]) button {
        --bg: var(--tertiary);
        --color: var(--ontertiary);
      }

      :host([color="secondaryContainer"]) button {
        --bg: var(--secondaryContainer);
        --color: var(--onSecondaryContainer);
      }

      :host([color="tertiaryContainer"]) button {
        --bg: var(--tertiaryContainer);
        --color: var(--onTertiaryContainer);
      }

      button {
        background: var(--bg, var(--primaryContainer));
        color: var(--color, var(--onPrimaryContainer));
        backdrop-filter: blur(0.375rem);
        box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1); 
        padding: 0; 
        border-radius: 50%; 
        display: grid; 
        place-items: center; 
        flex-shrink: 0; 
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
        background: color-mix(in srgb, var(--bg, var(--primaryContainer)) 90%, black);
        box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.15);
      }

      button:active {
        background: color-mix(in srgb, var(--bg, var(--primaryContainer)) 80%, black);
        box-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.1);
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-fab", BiFab);
