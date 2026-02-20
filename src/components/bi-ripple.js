class BiRipple extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.activeRipple = null;

    const style = document.createElement("style");
    style.textContent = `
      :host {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        border-radius: inherit;
      }

      .ripple {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;

        background: var(--bi-sys-color-ripple-color, var(--ripple-color));
        opacity: 0.18;
        filter: blur(8px);

        transform: scale(0);
        transition:
          transform 520ms cubic-bezier(0.2, 0, 0, 1),
          opacity 260ms ease;
      }

      .ripple.expand {
        transform: scale(1);
      }

      .ripple.fade {
        opacity: 0;
      }
    `;

    this.shadowRoot.append(style);
  }

  connectedCallback() {
    const host = this.parentElement;
    if (!host) return;

    /* parent hazırlığı */
    const computed = getComputedStyle(host);
    if (computed.position === "static") {
      host.style.position = "relative";
    }

    host.addEventListener("pointerdown", this._down);
    host.addEventListener("pointerup", this._up);
    host.addEventListener("pointerleave", this._up);
    host.addEventListener("pointercancel", this._up);
  }

  disconnectedCallback() {
    const host = this.parentElement;
    if (!host) return;

    host.removeEventListener("pointerdown", this._down);
    host.removeEventListener("pointerup", this._up);
    host.removeEventListener("pointerleave", this._up);
    host.removeEventListener("pointercancel", this._up);
  }

  _down = (e) => {
    const host = this.parentElement;
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const size = Math.hypot(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.shadowRoot.appendChild(ripple);
    this.activeRipple = ripple;

    requestAnimationFrame(() => {
      ripple.classList.add("expand");
    });
  };

  _up = () => {
    if (!this.activeRipple) return;

    this.activeRipple.classList.add("fade");
    this.activeRipple.addEventListener(
      "transitionend",
      () => {
        this.activeRipple?.remove();
        this.activeRipple = null;
      },
      { once: true }
    );
  };
}

customElements.define("bi-ripple", BiRipple);
