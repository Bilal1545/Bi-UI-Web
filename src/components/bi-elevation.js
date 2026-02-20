class BiElevation extends HTMLElement {

  static styleInjected = false;

  connectedCallback() {
    let parent = this.parentElement;
    if (!parent) return;

    parent.classList.add("bi-elevation-host");

    this.style.setProperty("display", "contents")

    this.injectStyle();

    this.update();
    this.startWatching();
  }

  injectStyle() {

  const parent = this.parentElement;
  if (!parent) return;

  if (parent.querySelector(":scope > style.bi-elevation-style")) return;

  const style = document.createElement("style");

  style.className = "bi-elevation-style";

  style.textContent = `
    :host, .bi-elevation-host {
      position: relative;
    }

    .bi-elevation-host::before,
    .bi-elevation-host::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
    }

    .bi-elevation-host::before {
      box-shadow: var(--bi-elevation-before-shadow);
      opacity: .3;
    }

    .bi-elevation-host::after {
      box-shadow: var(--bi-elevation-after-shadow);
      opacity: .15;
    }
  `;

  parent.appendChild(style);
}


  clamp(min, val, max) {
    return Math.max(min, Math.min(val, max));
  }

  startWatching() {

    let last = null;

    const tick = () => {

      const parent = this.parentElement;
      if (!parent) return;

      const level = getComputedStyle(parent)
        .getPropertyValue("--bi-elevation-shadow-level");

      if (level !== last) {
        last = level;
        this.update();
      }

      this._raf = requestAnimationFrame(tick);
    };

    tick();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
  }

  update() {

    const parent = this.parentElement;
    if (!parent) return;

    const computed = getComputedStyle(parent);

    const level =
      parseFloat(
        computed.getPropertyValue("--bi-elevation-shadow-level")
      ) || 0;

    const color =
      computed.getPropertyValue("--bi-shadow-color").trim()
      || "black";

    const y1 =
      this.clamp(0, level, 1) +
      this.clamp(0, level - 3, 1) +
      2 * this.clamp(0, level - 4, 1);

    const blur1 =
      2 * this.clamp(0, level, 1) +
      this.clamp(0, level - 2, 1) +
      this.clamp(0, level - 4, 1);

    const y2 =
      this.clamp(0, level, 1) +
      this.clamp(0, level - 1, 1) +
      2 * this.clamp(0, level - 2, 3);

    const blur2 =
      3 * this.clamp(0, level, 2) +
      2 * this.clamp(0, level - 2, 3);

    const spread2 =
      this.clamp(0, level, 4) +
      2 * this.clamp(0, level - 4, 1);

    parent.style.setProperty(
      "--bi-elevation-before-shadow",
      `0px ${y1}px ${blur1}px 0px ${color}`
    );

    parent.style.setProperty(
      "--bi-elevation-after-shadow",
      `0px ${y2}px ${blur2}px ${spread2}px ${color}`
    );
  }

}

customElements.define("bi-elevation", BiElevation);