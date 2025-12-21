class BiButton extends HTMLElement {
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
        padding: 0 1rem;
        font-size: 0.875rem;      
        font-family: sans-serif;
        border-radius: 1.25rem;   
        border: none;
        cursor: pointer;
        transition: 0.2s ease;
        min-height: 2.5rem;       
        box-shadow: none; 
        --color: var(--primary);
        --onColor: var(--onPrimary);
        --colorContainer: var(--secondaryContainer);
        --onColorContainer: var(--onSecondaryContainer);
      }
      
      :host([disabled]) button {
        pointer-events: none;
        opacity: 0.38;
        filter: grayscale(100%);
        box-shadow: none !important;
      }

      :host([shape="square"]) button {
        border-radius: 0.75rem; 
      }

      :host([size="xs"]) button {
        padding: 0.375rem 0.75rem; 
        font-size: 0.75rem;
        min-height: 1.75rem;
        border-radius: 0.75rem;
      }

      :host([size="sm"]) button {
        padding: 0.5rem 1rem;
        font-size: 0.8125rem;
        min-height: 2rem;
        border-radius: 1rem;
      }

      :host([size="lg"]) button {
        padding: 0.75rem 1.75rem;
        font-size: 1rem;
        min-height: 3rem;
        border-radius: 1.5rem;
      }

      :host([size="xl"]) button {
        padding: 1rem 2rem;
        font-size: 1.125rem;
        min-height: 3.5rem;
        border-radius: 1.75rem;
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

      :host([variant="text"]) button {
        background: transparent;
        color: var(--color);
      }

      :host([variant="text"]) button:hover {
        background: rgba(255,255,255,0.08);
      }

      :host([variant="text"]) button:active {
        background: rgba(255,255,255,0.12);
      }

      :host([variant="glass"]) button {
        background: rgba(255,255,255,0.08);
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.025);
        color: var(--color);
      }

      :host([variant="glass"]) button:hover {
        background: rgba(255,255,255,0.12);
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.075);
      }

      :host([variant="glass"]) button:active {
        background: rgba(255,255,255,0.18);
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.025);
      }
      
      :host([variant="outlined"]) button {
        background: transparent;
        color: var(--onBackground);
        border: 0.0625rem solid var(--outline); 
      }

      :host([variant="outlined"]) button:hover {
        background: rgba(255,255,255,0.08);
      }

      :host([variant="outlined"]) button:active {
        background: rgba(255,255,255,0.12);
      }

      :host([variant="tonal"]) button {
        background: var(--colorContainer);
        color: var(--onColorContainer);
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05);
      }

      :host([variant="tonal"]) button:hover {
        background: color-mix(in srgb, var(--colorContainer) 90%, black);
        box-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.08);
      }

      :host([variant="tonal"]) button:active {
        background: color-mix(in srgb, var(--colorContainer) 80%, black); 
        box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.05);
      }
      
      :host([variant="elevated"]) button {
        background: var(--surfaceContainerLow); 
        color: var(--primary);
        box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1); 
      }

      :host([variant="elevated"]) button:hover {
        background: color-mix(in srgb, var(--surfaceContainerLow) 90%, black);
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
      }

      :host([variant="elevated"]) button:active {
        background: color-mix(in srgb, var(--surfaceContainerLow) 80%, black);
        box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1);
      }

      :host([variant="filled"]) button {
        background: var(--color);
        color: var(--onColor);
        box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1);
      }

      :host([variant="filled"]) button:hover {
        background: color-mix(in srgb, var(--color) 90%, black);
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
      }

      :host([variant="filled"]) button:active {
        background: color-mix(in srgb, var(--color) 80%, black);
        box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1);
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-button", BiButton);
