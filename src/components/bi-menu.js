class BiMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._open = false;
  }

  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback() {
    // host'u gorunmez yap - buton boyutunu etkilemesin
    this.style.position = "absolute";
    this.style.bottom = "0";
    this.style.left = "0";
    this.style.width = "0";
    this.style.height = "0";
    this.style.overflow = "visible";
    this.style.pointerEvents = "none";

    this.syncTheme();
    this.render();
    this.observeThemeChanges();

    // parent butona click listener
    this._parentEl = this.parentElement;
    this._onParentClick = (e) => {
      if (this.contains(e.target)) return;
      this.toggle();
    };
    if (this._parentEl) {
      this._parentEl.addEventListener("click", this._onParentClick);
    }

    // disariya tiklayinca kapat
    this._onDocClick = (e) => {
      if (this._open && this._parentEl && !this._parentEl.contains(e.target)) {
        this.close();
      }
    };

    // Escape ile kapat
    this._onKeyDown = (e) => {
      if (e.key === "Escape" && this._open) this.close();
    };

    document.addEventListener("click", this._onDocClick);
    document.addEventListener("keydown", this._onKeyDown);

    // item secilince kapat
    this.addEventListener("menu-select", () => this.close());
  }

  disconnectedCallback() {
    if (this._parentEl) {
      this._parentEl.removeEventListener("click", this._onParentClick);
    }
    document.removeEventListener("click", this._onDocClick);
    document.removeEventListener("keydown", this._onKeyDown);

    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }
  }

  attributeChangedCallback(name) {
    if (name === "open") {
      this._open = this.hasAttribute("open");
      this._updateVisibility();
    }
  }

  // ================= THEME =================
  syncTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    this.setAttribute("data-theme", isDark ? "dark" : "light");
  }

  observeThemeChanges() {
    if (this._themeObserver) return;

    this._themeObserver = new MutationObserver(() => {
      this.syncTheme();
      this.render();
      this._updateVisibility();
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  // ================= API =================
  open() {
    if (this._open) return;
    this._open = true;
    this.setAttribute("open", "");
    this._updateVisibility();
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this.removeAttribute("open");
    this._updateVisibility();
  }

  toggle() {
    this._open ? this.close() : this.open();
  }

  // ================= VISIBILITY =================
  _updateVisibility() {
    const surface = this.shadowRoot.querySelector(".menu-surface");
    if (!surface) return;

    if (this._open) {
      surface.classList.add("open");
      surface.classList.remove("closed");
    } else {
      surface.classList.remove("open");
      surface.classList.add("closed");
    }
  }

  // ================= RENDER =================
  render() {
    this.shadowRoot.innerHTML = "";

    const surface = document.createElement("div");
    surface.className = "menu-surface closed";
    surface.setAttribute("role", "menu");

    // menu surface'a tiklama parent'a yayilmasin
    surface.addEventListener("click", (e) => e.stopPropagation());

    const itemSlot = document.createElement("slot");
    surface.append(itemSlot);

    if (window.BiUI.styles.elevation === true) {
      const elevation = document.createElement("bi-elevation");
      surface.append(elevation);
    }

    const style = document.createElement("style");
    style.textContent = `
      .menu-surface {
        position: absolute;
        top: 0.25rem;
        inset-inline-start: 0;
        z-index: 100;

        min-width: 7rem;
        max-width: 17.5rem;
        width: max-content;

        padding: 0.25rem 0;

        border-radius: var(--bi-menu-container-shape, 0.25rem);
        overflow: hidden;
        pointer-events: auto;

        display: flex;
        flex-direction: column;

        --bi-elevation-shadow-level: 2;

        transform-origin: top center;
        transition:
          opacity 0.2s ease,
          transform 0.2s cubic-bezier(0.2, 0, 0, 1);
      }

      .menu-surface.closed {
        opacity: 0;
        transform: scaleY(0);
        pointer-events: none;
      }

      .menu-surface.open {
        opacity: 1;
        transform: scaleY(1);
        pointer-events: auto;
      }

      /* ================= DARK ================= */
      :host([data-theme="dark"]) .menu-surface {
        background: var(--bi-sys-color-surface-container, #2b2b2b);
        color: var(--bi-sys-color-on-surface, white);
      }

      /* ================= LIGHT ================= */
      :host([data-theme="light"]) .menu-surface {
        background: var(--bi-sys-color-surface-container, #f3f3f3);
        color: var(--bi-sys-color-on-surface, black);
      }
    `;

    this.shadowRoot.append(style, surface);
  }
}

customElements.define("bi-menu", BiMenu);
