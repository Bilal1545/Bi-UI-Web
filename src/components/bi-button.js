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
    if (this.getAttribute("variant") === "outlined" || this.getAttribute("variant") === "text") {
      el.append(slot, ripple);
    } else {
      const elevation = document.createElement("bi-elevation");
      el.append(slot, ripple, elevation);
    }

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
      }

      button,
      a {
        position: relative;
        padding: 0 1rem;
        min-height: 2.5rem;

        font-size: 0.875rem;

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

        --color: var(--bi-sys-color-primary);
        --onColor: var(--bi-sys-color-on-primary);
        --colorContainer: var(--bi-sys-color-secondary-container);
        --onColorContainer: var(--bi-sys-color-on-secondary-container);

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
        --colorContainer: var(--bi-sys-color-primary-container);
        --onColorContainer: var(--bi-sys-color-on-primary-container);
      }

      :host([color="secondary"]) :is(button,a) {
        --color: var(--bi-sys-color-secondary);
        --onColor: var(--bi-sys-color-on-secondary);
      }

      :host([color="tertiary"]) :is(button,a) {
        --color: var(--bi-sys-color-tertiary);
        --onColor: var(--bi-sys-color-on-tertiary);
        --colorContainer: var(--bi-sys-color-tertiary-container);
        --onColorContainer: var(--bi-sys-color-on-tertiary-container);
      }

      :host([color="error"]) :is(button,a) {
        --color: var(--bi-sys-color-error);
        --onColor: var(--bi-sys-color-on-error);
        --colorContainer: var(--bi-sys-color-error-container);
        --onColorContainer: var(--bi-sys-color-on-error-container);
      }

      /* ============== VARIANTS ============== */

      /* ---- TEXT ---- */
      :host([variant="text"]) :is(button,a) {
        background: transparent;
        color: var(--color);
        border-radius: var(--bi-text-button-container-shape);
        font-family: var(--bi-text-button-label-text-font);
      }

      :host([variant="text"]) :is(button,a):hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      /* ---- GLASS ---- */
      :host([variant="glass"]) :is(button,a) {
        background: color-mix(in srgb, var(--bi-sys-color-primary) 8%, transparent);
        color: var(--color);
        border-radius: var(--bi-glass-button-container-shape);
        font-family: var(--bi-glass-button-label-text-font);
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="glass"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-sys-color-primary) 12%, transparent);
        --bi-elevation-shadow-level: 2;
      }

      :host([variant="glass"]) :is(button,a):active {
        --bi-elevation-shadow-level: 0 !important;
      }

      /* ---- OUTLINED ---- */
      :host([variant="outlined"]) :is(button,a) {
        background: transparent;
        color: var(--bi-sys-color-on-background);
        border: 1px solid var(--bi-sys-color-outline);
        border-radius: var(--bi-outlined-button-container-shape);
        font-family: var(--bi-outlined-button-label-text-font);
        --ripple-color: var(--bi-sys-color-primary)
      }

      :host([variant="outlined"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-sys-color-primary) 8%, transparent);
      }

      /* ---- FILLED ---- */
      :host([variant="filled"]) :is(button,a) {
        background: var(--color);
        color: var(--onColor);
        border-radius: var(--bi-filled-button-container-shape);
        font-family: var(--bi-filled-button-label-text-font);
        --ripple-color: rgba(0,0,0,0.35);
      }

      :host([variant="filled"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--color) 90%, black);
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="filled"]) :is(button,a):active {
        --bi-elevation-shadow-level: 0 !important;
      }

      /* ---- TONAL ---- */
      :host([variant="tonal"]) :is(button,a) {
        background: var(--colorContainer);
        color: var(--onColorContainer);
        border-radius: var(--bi-tonal-button-container-shape);
        font-family: var(--bi-tonal-button-label-text-font);
      }

      :host([variant="tonal"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--colorContainer) 95%, white);
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="tonal"]) :is(button,a):active {
        --bi-elevation-shadow-level: 0 !important;
      }

      /* ---- ELEVATED ---- */
      :host([variant="elevated"]) :is(button,a) {
        background: var(--bi-sys-color-surface-container-low);
        color: var(--bi-sys-color-primary);
        border-radius: var(--bi-elevated-button-container-shape);
        font-family: var(--bi-elevated-button-label-text-font);
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="elevated"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-sys-color-surface-container-low) 85%, var(--bi-sys-color-primary));
        --bi-elevation-shadow-level: 2;
      }

      :host([variant="elevated"]) :is(button,a):active {
        --bi-elevation-shadow-level: 1;
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
