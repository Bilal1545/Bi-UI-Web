class BiSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Default değerler
    this.checked = false;
    this.disabled = false;
    
    // Ana container oluştur
    const container = document.createElement('label');
    container.className = 'switch-container';
    
    // Input elementi
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'switch-input';
    
    // Track (switch gövdesi)
    const track = document.createElement('div');
    track.className = 'switch-track';
    
    // Thumb (switch topu)
    const thumb = document.createElement('div');
    thumb.className = 'switch-thumb';
    
    // Ripple efekti için element
    const ripple = document.createElement('div');
    ripple.className = 'switch-ripple';
    
    track.appendChild(thumb);
    track.appendChild(ripple);
    container.appendChild(input);
    container.appendChild(track);
    
    // Stil
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: inline-block;
        --switch-size: 2.5rem;
        --switch-track-width: 3rem;
        --switch-track-height: 1.5rem;
        --switch-thumb-size: 1.25rem;
        --track-color: var(--bi-sys-color-surface-variant);
        --track-checked-color: var(--bi-sys-color-primary);
        --thumb-color: var(--bi-sys-color-surface);
        --thumb-checked-color: var(--bi-sys-color-on-primary);
        --disabled-opacity: 0.38;
      }

      .switch-container {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
      }

      .switch-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }

      .switch-track {
        position: relative;
        width: var(--switch-track-width);
        height: var(--switch-track-height);
        background-color: var(--track-color);
        border-radius: calc(var(--switch-track-height) / 2);
        transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
        box-shadow: inset 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
      }

      .switch-thumb {
        position: absolute;
        top: 50%;
        left: 0.125rem;
        width: var(--switch-thumb-size);
        height: var(--switch-thumb-size);
        background-color: var(--thumb-color);
        border-radius: 50%;
        transform: translateY(-50%);
        transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.14);
        z-index: 1;
      }

      .switch-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: transparent;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
      }

      /* Checked state */
      .switch-input:checked ~ .switch-track {
        background-color: var(--track-checked-color);
        box-shadow: inset 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
      }

      .switch-input:checked ~ .switch-track .switch-thumb {
        left: calc(var(--switch-track-width) - var(--switch-thumb-size) - 0.125rem);
        background-color: var(--thumb-checked-color);
      }

      /* Active states */
      :host(:not([disabled])) .switch-container:active .switch-track {
        box-shadow: inset 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
      }

      :host(:not([disabled])) .switch-container:active .switch-input:checked ~ .switch-track {
        box-shadow: inset 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
      }

      :host(:not([disabled])) .switch-container:active .switch-thumb {
        width: calc(var(--switch-thumb-size) - 0.125rem);
        height: calc(var(--switch-thumb-size) - 0.125rem);
      }

      /* Focus state */
      .switch-input:focus-visible ~ .switch-track .switch-ripple {
        background-color: color-mix(in srgb, var(--bi-sys-color-primary) 20%, transparent);
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }

      .switch-input:focus-visible ~ .switch-track {
        outline: 0.125rem solid var(--bi-sys-color-primary);
        outline-offset: 0.125rem;
      }

      /* Disabled state */
      :host([disabled]) .switch-container {
        cursor: default;
        pointer-events: none;
        opacity: var(--disabled-opacity);
      }

      :host([disabled]) .switch-track {
        background-color: color-mix(in srgb, var(--track-color) 60%, transparent);
      }

      :host([disabled]) .switch-input:checked ~ .switch-track {
        background-color: color-mix(in srgb, var(--track-checked-color) 60%, transparent);
      }

      :host([disabled]) .switch-thumb {
        background-color: color-mix(in srgb, var(--thumb-color) 60%, transparent);
      }

      :host([disabled]) .switch-input:checked ~ .switch-track .switch-thumb {
        background-color: color-mix(in srgb, var(--thumb-checked-color) 60%, transparent);
      }

      /* Size variations */
      :host([size="sm"]) {
        --switch-size: 2rem;
        --switch-track-width: 2.5rem;
        --switch-track-height: 1.25rem;
        --switch-thumb-size: 1rem;
      }

      :host([size="lg"]) {
        --switch-size: 3rem;
        --switch-track-width: 3.5rem;
        --switch-track-height: 1.75rem;
        --switch-thumb-size: 1.5rem;
      }

      /* Color variations */
      :host([color="secondary"]) {
        --track-checked-color: var(--bi-sys-color-secondary);
        --thumb-checked-color: var(--bi-sys-color-on-secondary);
      }

      :host([color="tertiary"]) {
        --track-checked-color: var(--bi-sys-color-tertiary);
        --thumb-checked-color: var(--bi-sys-color-on-tertiary);
      }

      :host([color="error"]) {
        --track-checked-color: var(--bi-sys-color-error);
        --thumb-checked-color: var(--bi-sys-color-on-error);
      }

      /* Animation for ripple effect */
      @keyframes ripple {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }

      .switch-ripple.animate {
        animation: ripple 0.6s ease-out;
      }
    `;

    this.shadowRoot.append(style, container);
    
    // Event listener'ları ekle
    this.setupEventListeners(container, input, ripple);
  }

  setupEventListeners(container, input, ripple) {
    // Input change eventi
    input.addEventListener('change', (e) => {
      this.checked = e.target.checked;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      }));
    });

    // Ripple efekti için click eventi
    container.addEventListener('click', (e) => {
      if (!this.disabled) {
        ripple.classList.add('animate');
        setTimeout(() => {
          ripple.classList.remove('animate');
        }, 600);
      }
    });

    // Keyboard desteği
    container.addEventListener('keydown', (e) => {
      if (!this.disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change'));
      }
    });
  }

  static get observedAttributes() {
    return ['checked', 'disabled', 'size', 'color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const input = this.shadowRoot.querySelector('.switch-input');
    
    switch (name) {
      case 'checked':
        this.checked = newValue !== null;
        input.checked = this.checked;
        break;
      case 'disabled':
        this.disabled = newValue !== null;
        if (this.disabled) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
        break;
    }
  }

  connectedCallback() {
    // Başlangıç değerlerini attribute'lardan al
    if (this.hasAttribute('checked')) {
      this.checked = true;
      this.shadowRoot.querySelector('.switch-input').checked = true;
    }
    
    if (this.hasAttribute('disabled')) {
      this.disabled = true;
    }
  }

  // Public methods
  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.shadowRoot.querySelector('.switch-input').checked = this.checked;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      }));
    }
  }

  setChecked(value) {
    if (!this.disabled) {
      this.checked = Boolean(value);
      this.shadowRoot.querySelector('.switch-input').checked = this.checked;
      if (this.checked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }
  }

  isChecked() {
    return this.checked;
  }

  setDisabled(value) {
    this.disabled = Boolean(value);
    if (this.disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  isDisabled() {
    return this.disabled;
  }
}

customElements.define("bi-switch", BiSwitch);
