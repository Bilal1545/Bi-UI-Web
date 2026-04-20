class BiMenuItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["disabled"];
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
    this.setAttribute("data-theme", isDark ? "dark" : "light");
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

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  // ================= RENDER =================
  render() {
    this.shadowRoot.innerHTML = "";

    const el = document.createElement("button");
    el.setAttribute("role", "menuitem");

    if (this.hasAttribute("disabled")) {
      el.disabled = true;
    }

    const startSlot = document.createElement("slot");
    startSlot.name = "start";

    const labelSlot = document.createElement("slot");

    const endSlot = document.createElement("slot");
    endSlot.name = "end";

    const ripple = document.createElement("bi-ripple");

    if (window.BiUI.interaction.ripple.enabled) {
      el.append(ripple);
    }

    el.append(startSlot, labelSlot, endSlot);

    // click event
    el.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;
      this.dispatchEvent(new CustomEvent("menu-select", {
        bubbles: true,
        composed: true
      }));
    });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: flex;
      }

      button {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        width: 100%;
        min-height: 3rem;
        padding: 0 0.75rem;

        border: none;
        outline: none;
        cursor: pointer;

        font-size: 0.875rem;
        font-family: var(--bi-menu-item-label-text-font, inherit);
        text-align: start;
        user-select: none;

        transition:
          background 0.15s ease;

        --ripple-color: currentColor;
      }

      /* ================= SLOTS ================= */
      ::slotted([slot="start"]),
      ::slotted([slot="end"]) {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        font-size: 1.25rem;
      }

      ::slotted([slot="end"]) {
        margin-inline-start: auto;
      }

      /* ================= DISABLED ================= */
      :host([disabled]) button {
        pointer-events: none;
        opacity: 0.38;
        filter: grayscale(100%);
      }

      /* ================= DARK ================= */
      :host([data-theme="dark"]) button {
        background: transparent;
        color: var(--bi-sys-color-on-surface, white);
      }

      :host([data-theme="dark"]) button:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      /* ================= LIGHT ================= */
      :host([data-theme="light"]) button {
        background: transparent;
        color: var(--bi-sys-color-on-surface, black);
      }

      :host([data-theme="light"]) button:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    `;

    this.shadowRoot.append(style, el);
  }
}

customElements.define("bi-menu-item", BiMenuItem);
