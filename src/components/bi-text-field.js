class BiTextField extends HTMLElement {
  static get observedAttributes() {
    return [
      'value', 'label', 'placeholder', 'disabled', 'required',
      'error', 'helper-text', 'char-counter', 'max-length',
      'prefix-text', 'suffix-text', 'type', 'variant'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._value = '';
    this._variant = 'filled';
    this.render();
  }

  attributeChangedCallback(name, _, value) {
    if (name === 'variant') {
      this._variant = value || 'filled';
    }
    this.render();
  }

  connectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    const label = this.shadowRoot.querySelector('.label');
    label.classList.add('bi-typescale-label');

    input.addEventListener('input', e => {
      this._value = e.target.value;
      this.updateLabel(label);
    });

    input.addEventListener('focus', () => label.classList.add('focused'));
    input.addEventListener('blur', () => {
      label.classList.remove('focused');
      this.updateLabel(label);
    });

    this.updateLabel(label);
  }

  updateLabel(label) {
    if (this._value || this.getAttribute('placeholder')) {
      label.classList.add('floated');
    } else {
      label.classList.remove('floated');
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 100%;
          max-width: 280px;
          font-family: sans-serif;
        }

        .container {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* ===== SHARED ===== */

        .field {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 56px;
        }

        input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          padding: 16px;
          font-size: 1rem;
          color: var(--bi-sys-color-on-surface);
        }

        .label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--bi-sys-color-on-surface-variant);
          pointer-events: none;
          transition: 0.2s cubic-bezier(.2,0,0,1);
          background: transparent;
        }

        .label.floated,
        .label.focused {
          transform: translateY(-130%) scale(0.75);
          color: var(--bi-sys-color-primary);
        }

        :host([error]) .label {
          color: var(--bi-sys-color-error);
        }

        /* ===== FILLED ===== */

        :host([variant="filled"]) .field {
          background: var(--bi-sys-color-surface);
          border-bottom: .0625rem solid var(--bi-sys-color-on-surface-variant);
          border-radius: .25rem .25rem 0 0;
        }

        :host([variant="filled"]) .field:focus-within {
          border-bottom: 0.125rem solid var(--bi-sys-color-primary);
        }

        /* ===== OUTLINED ===== */

        :host([variant="outlined"]) .field {
          border: 1px solid var(--bi-sys-color-outline);
          border-radius: 4px;
        }

        :host([variant="outlined"]) .field:focus-within {
          border-color: var(--bi-sys-color-primary);
        }

        :host([variant="outlined"]) .label {
          padding: 0 4px;
        }

        /* ===== ERROR ===== */

        :host([error]) .field {
          border-color: var(--bi-sys-color-error);
        }
      </style>

      <div class="container">
        <div class="field">
          <label class="label">${this.getAttribute('label') || ''}</label>
          <input
            type="${this.getAttribute('type') || 'text'}"
            value="${this._value}"
            placeholder="${this.getAttribute('placeholder') || ''}"
          />
        </div>
      </div>
    `;
  }
}

customElements.define('bi-text-field', BiTextField);
