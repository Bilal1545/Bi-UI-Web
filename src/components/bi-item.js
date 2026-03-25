class BiItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["href", "disabled", "active"];
  }

  connectedCallback() {
    this.syncTheme();
    this.render();
    this.observeThemeChanges();
  }

  attributeChangedCallback() {
    this.syncTheme();
    this.render();
  }

  // ================= THEME =================
  syncTheme() {
    const isDark = document.documentElement.classList.contains("dark");

    this.classList.toggle("theme-dark", isDark);
    this.classList.toggle("theme-light", !isDark);
  }

  observeThemeChanges() {
    if (this._observer) return;

    this._observer = new MutationObserver(() => {
      this.syncTheme();
    });

    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  // ================= RENDER =================
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
    const elevation = document.createElement("bi-elevation");

    el.append(slot, ripple, elevation);

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
        width: 100%;

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

        --ripple-color: currentColor;
      }

      /* ============== DISABLED ============== */
      :host([disabled]) button,
      :host([disabled]) a {
        pointer-events: none;
        opacity: 0.38;
        filter: grayscale(100%);
      }

      /* ============== DARK ============== */
      :host(.theme-dark) :is(button,a) {
        background: transparent;
        color: white;
        border-radius: var(--bi-item-container-shape);
        font-family: var(--bi-item-label-text-font);
      }

      :host(.theme-dark) :is(button,a):hover {
        background: rgba(255, 255, 255, 0.2);
      }

      :host(.theme-dark)[active] :is(button,a) {
        background: rgba(255, 255, 255, 0.4);
        color: white;
      }

      :host(.theme-dark)[active] :is(button,a):hover {
        background: rgba(255, 255, 255, 0.4);
      }

      /* ============== LIGHT ============== */
      :host(.theme-light) :is(button,a) {
        background: transparent;
        color: black;
        border-radius: var(--bi-item-container-shape);
        font-family: var(--bi-item-label-text-font);
      }

      :host(.theme-light) :is(button,a):hover {
        background: rgba(0, 0, 0, 0.2);
      }

      :host(.theme-light)[active] :is(button,a) {
        background: rgba(0, 0, 0, 0.2);
        color: black;
      }

      :host(.theme-light)[active] :is(button,a):hover {
        background: rgba(0, 0, 0, 0.4);
      }
    `;

    this.shadowRoot.append(style, el);
  }
}

customElements.define("bi-item", BiItem);