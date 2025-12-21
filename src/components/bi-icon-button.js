class BiIconButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const btn = document.createElement('button');
    const slot = document.createElement('slot');
    btn.append(slot); 
    
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

      :host([variant="text"]) button { 
        color: var(--fg); 
      }

      :host([variant="text"]) button:hover {
        background: rgba(255,255,255,0.08); 
      }

      :host([variant="text"]) button:active {
        background: rgba(255,255,255,0.12);
      }

      :host([variant="outlined"]) button {
        background: transparent;
        color: var(--fg);
        border: 0.0625rem solid var(--outline); 
      }

      :host([variant="outlined"]) button:hover {
        background: rgba(255,255,255,0.08);
      }

      :host([variant="outlined"]) button:active {
        background: rgba(255,255,255,0.12);
      }

      :host([variant="tonal"]) button {
        background: var(--secondaryContainer);
        color: var(--onSecondaryContainer);
      }
      :host([variant="tonal"]) button:hover {
        background: color-mix(in srgb, var(--secondaryContainer) 90%, black);
      }

      :host([variant="tonal"]) button:active {
        background: color-mix(in srgb, var(--secondaryContainer) 80%, black); 
      }

      :host([variant="filled"]) button {
        background: var(--primary);
        color: var(--onPrimary); 
      }

      :host([variant="filled"]) button:hover {
        background: color-mix(in srgb, var(--primary) 90%, black);
      }

      :host([variant="filled"]) button:active {
        background: color-mix(in srgb, var(--primary) 80%, black);
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-icon-button", BiIconButton);
