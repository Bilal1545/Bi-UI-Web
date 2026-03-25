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
        outline: none;
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

      /* ============== VARIANTS ============== */

      /* ---- TEXT ---- */
      :host([variant="text"]) :is(button,a) {
        background: var(--bi-text-button-container-color);
        color: var(--bi-text-button-label-text-color);
        border-radius: var(--bi-text-button-container-shape);
        font-family: var(--bi-text-button-label-text-font);
      }

      :host([variant="text"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-text-button-label-text-color) 10%, var(--bi-text-button-container-color));
      }

      /* ---- OUTLINED ---- */
      :host([variant="outlined"]) :is(button,a) {
        background: var(--bi-outlined-button-container-color);
        color: var(--bi-outlined-button-label-text-color);
        border: .0625rem solid var(--bi-sys-color-outline);
        border-radius: var(--bi-outlined-button-container-shape);
        font-family: var(--bi-outlined-button-label-text-font);
        --ripple-color: var(--bi-sys-color-primary)
      }

      :host([variant="outlined"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-outlined-button-label-text-color) 8%, var(--bi-outlined-button-container-color));
      }

      /* ---- FILLED ---- */
      :host([variant="filled"]) :is(button,a) {
        background: var(--bi-filled-button-container-color);
        color: var(--bi-filled-button-label-text-color);
        border-radius: var(--bi-filled-button-container-shape);
        font-family: var(--bi-filled-button-label-text-font);
        --ripple-color: var(--bi-filled-button-label-text-color);
      }

      :host([variant="filled"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-filled-button-container-color) 90%, var(--bi-filled-button-label-text-color));
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="filled"]) :is(button,a):active {
        --bi-elevation-shadow-level: 0 !important;
      }

      /* ---- TONAL ---- */
      :host([variant="tonal"]) :is(button,a) {
        background: var(--bi-tonal-button-container-color);
        color: var(--bi-tonal-button-label-text-color);
        border-radius: var(--bi-tonal-button-container-shape);
        font-family: var(--bi-tonal-button-label-text-font);
      }

      :host([variant="tonal"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-tonal-button-container-color) 95%, var(--bi-tonal-button-label-text-color));
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="tonal"]) :is(button,a):active {
        --bi-elevation-shadow-level: 0 !important;
      }

      /* ---- ELEVATED ---- */
      :host([variant="elevated"]) :is(button,a) {
        background: var(--bi-elevated-button-container-color);
        color: var(--bi-elevated-button-label-text-color);
        border-radius: var(--bi-elevated-button-container-shape);
        font-family: var(--bi-elevated-button-label-text-font);
        --bi-elevation-shadow-level: 1;
      }

      :host([variant="elevated"]) :is(button,a):hover {
        background: color-mix(in srgb, var(--bi-elevated-button-container-color) 85%, var(--bi-elevated-button-label-text-color));
        --bi-elevation-shadow-level: 2;
      }

      :host([variant="elevated"]) :is(button,a):active {
        --bi-elevation-shadow-level: 1;
      }
    `;

    this.shadowRoot.append(style, el);
  }
}

customElements.define("bi-button", BiButton);
