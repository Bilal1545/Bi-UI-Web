class BiButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["href", "disabled"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";

    const isLink = this.hasAttribute("href");
    const disabled = this.hasAttribute("disabled");

    const el = document.createElement(isLink ? "a" : "button");

    if (isLink && !disabled) {
      el.href = this.getAttribute("href");
      if (this.hasAttribute("target"))
        el.target = this.getAttribute("target");
      if (this.hasAttribute("rel"))
        el.rel = this.getAttribute("rel");
    }

    const slot = document.createElement("slot");
    const ripple = document.createElement("bi-ripple");

    el.append(slot, ripple);

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
      }

      button,
      a {
        position: relative;
        overflow: hidden;

        padding: 0 1rem;
        min-height: 2.5rem;

        font-size: 0.875rem;
        font-family: sans-serif;

        border-radius: 1.25rem;
        border: none;
        cursor: pointer;

        text-decoration: none;
        user-select: none;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        transition:
          background 0.2s ease,
          box-shadow 0.2s ease;

        --color: var(--primary);
        --onColor: var(--onPrimary);
        --colorContainer: var(--secondaryContainer);
        --onColorContainer: var(--onSecondaryContainer);

        --ripple-color: currentColor;
      }

      /* ============== DISABLED ============== */

      :host([disabled]) button,
      :host([disabled]) a {
        pointer-events: none;
        opacity: 0.38;
        filter: grayscale(100%);
      }

      /* =============== COLORS =============== */

      :host([color="primary"]) :is(button,a) {
        --colorContainer: var(--primaryContainer);
        --onColorContainer: var(--onPrimaryContainer);
      }

      :host([color="secondary"]) :is(button,a) {
        --color: var(--secondary);
        --onColor: var(--onSecondary);
      }

      :host([color="tertiary"]) :is(button,a) {
        --color: var(--tertiary);
        --onColor: var(--onTertiary);
        --colorContainer: var(--tertiaryContainer);
        --onColorContainer: var(--onTertiaryContainer);
      }

      :host([color="error"]) :is(button,a) {
        --color: var(--error);
        --onColor: var(--onError);
        --colorContainer: var(--errorContainer);
        --onColorContainer: var(--onErrorContainer);
      }

      :host([color="success"]) :is(button,a) {
        --color: var(--success);
        --onColor: var(--onSuccess);
        --colorContainer: var(--successContainer);
        --onColorContainer: var(--onSuccessContainer);
      }

      /* ============== VARIANTS ============== */

      /* ---- TEXT ---- */
      :host([variant="text"]) :is(button,a) {
        background: transparent;
        color: var(--color);
      }

      :host([variant="text"]) :is(button,a):hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      /* ---- GLASS ---- */
      :host([variant="glass"]) :is(button,a) {
        background: color-mix(in srgb, var(--primary) 8%, transparent);
        color: var(--color);
      }

      :host([variant="glass"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--primary) 12%, transparent);
      }

      /* ---- OUTLINED ---- */
      :host([variant="outlined"]) :is(button,a) {
        background: transparent;
        color: var(--onBackground);
        border: 1px solid var(--outline);
      }

      :host([variant="outlined"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--primary) 8%, transparent);
      }

      /* ---- FILLED ---- */
      :host([variant="filled"]) :is(button,a) {
        background: var(--color);
        color: var(--onColor);
        --ripple-color: rgba(0,0,0,0.35);
      }

      :host([variant="filled"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--color) 90%, black);
      }

      /* ---- TONAL ---- */
      :host([variant="tonal"]) :is(button,a) {
        background: var(--colorContainer);
        color: var(--onColorContainer);
      }

      :host([variant="tonal"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--colorContainer) 95%, white);
      }

      /* ---- ELEVATED ---- */
      :host([variant="elevated"]) :is(button,a) {
        background: var(--surfaceContainerLow);
        color: var(--primary);
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      }

      :host([variant="elevated"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--surfaceContainerLow) 85%, var(--primary));
      }

      :host([shape="square"]) button {
        border-radius: 0.75rem; 
      }

      :host([size="xs"]) button {
        padding: 0.375rem 0.75rem; 
        font-size: 0.75rem;
        min-height: 1.75rem;
        border-radius: 1rem;
      }

      :host([size="sm"]) button {
        padding: 0.5rem 1rem;
        font-size: 0.8125rem;
        min-height: 2rem;
        border-radius: 1.25rem;
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
    `;

    this.shadowRoot.append(style, el);
  }
}

customElements.define("bi-button", BiButton);
