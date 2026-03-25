class BiElevation extends HTMLElement {
  connectedCallback() {
    const parent = this.parentElement;
    if (!parent) return;

    // <bi-elevation> parent ile aynı boyutta ve koordinatta
    const rect = parent.getBoundingClientRect();
    this.style.position = "absolute";
    this.style.left = rect.left + window.scrollX + "px";
    this.style.top = rect.top + window.scrollY + "px";
    this.style.width = rect.width + "px";
    this.style.height = rect.height + "px";
    this.style.pointerEvents = "none";
    this.style.zIndex = "-1";
    this.style.borderRadius = "inherit";
    this.style.transitionDuration = "inherit";
    this.style.transitionProperty = "inherit";
    this.style.transitionTimingFunction = "inherit";

    this.injectShadowSpan();
    this.update();
    this.startWatching();

    window.addEventListener("scroll", () => this.update());
    window.addEventListener("resize", () => this.update());
  }

  injectShadowSpan() {
    if (!this._shadowSpan) {
      const span = document.createElement("span");
      span.className = "bi-elevation-shadow";
      span.style.position = "absolute";
      span.style.inset = "0"; // <bi-elevation>’u tamamen kaplasın
      span.style.borderRadius = "inherit";
      this.style.transitionDuration = "inherit";
      this.style.transitionProperty = "inherit";
      this.style.transitionTimingFunction = "inherit";
      span.style.pointerEvents = "none";
      this.appendChild(span);
      this._shadowSpan = span;

      if (!this.querySelector("style.bi-elevation-style")) {
        const style = document.createElement("style");
        style.className = "bi-elevation-style";
        style.textContent = `
          .bi-elevation-shadow::before,
          .bi-elevation-shadow::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
          }
          .bi-elevation-shadow::before {
            box-shadow: var(--bi-elevation-before-shadow);
            opacity: .3;
          }
          .bi-elevation-shadow::after {
            box-shadow: var(--bi-elevation-after-shadow);
            opacity: .15;
          }
        `;
        this.appendChild(style);
      }
    }
  }

  clamp(min, val, max) {
    return Math.max(min, Math.min(val, max));
  }

  startWatching() {
    const tick = () => {
      this.update();
      this._raf = requestAnimationFrame(tick);
    };
    tick();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    if (this._shadowSpan) this._shadowSpan.remove();
  }

  update() {
    const parent = this.parentElement;
    const span = this._shadowSpan;
    if (!parent || !span) return;

    const rect = parent.getBoundingClientRect();
    this.style.left = rect.left + window.scrollX + "px";
    this.style.top = rect.top + window.scrollY + "px";
    this.style.width = rect.width + "px";
    this.style.height = rect.height + "px";

    const computed = getComputedStyle(parent);
    const level = parseFloat(computed.getPropertyValue("--bi-elevation-shadow-level")) || 0;
    const color = computed.getPropertyValue("--bi-shadow-color").trim() || "black";

    const y1 = this.clamp(0, level, 1) + this.clamp(0, level - 3, 1) + 2 * this.clamp(0, level - 4, 1);
    const blur1 = 2 * this.clamp(0, level, 1) + this.clamp(0, level - 2, 1) + this.clamp(0, level - 4, 1);
    const y2 = this.clamp(0, level, 1) + this.clamp(0, level - 1, 1) + 2 * this.clamp(0, level - 2, 3);
    const blur2 = 3 * this.clamp(0, level, 2) + 2 * this.clamp(0, level - 2, 3);
    const spread2 = this.clamp(0, level, 4) + 2 * this.clamp(0, level - 4, 1);

    span.style.setProperty("--bi-elevation-before-shadow", `0px ${y1}px ${blur1}px 0px ${color}`);
    span.style.setProperty("--bi-elevation-after-shadow", `0px ${y2}px ${blur2}px ${spread2}px ${color}`);

    const surfaceMap = [
      "--bi-sys-color-surface-container-lowest",
      "--bi-sys-color-surface-container-low",
      "--bi-sys-color-surface-container",
      "--bi-sys-color-surface-container-high",
      "--bi-sys-color-surface",
      "--bi-sys-color-surface-container-highest"
    ];
    const idx = this.clamp(0, Math.round(level), surfaceMap.length - 1);
    parent.style.setProperty("--bi-surface-color", `var(${surfaceMap[idx]})`);
  }
}

customElements.define("bi-elevation", BiElevation);