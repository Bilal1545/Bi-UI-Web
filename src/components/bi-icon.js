class BiIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  getMeta(name, fallback = "") {
    return (
      document.querySelector(`meta[name="${name}"]`)?.content ??
      fallback
    );
  }

  async render() {
    this.shadowRoot.innerHTML = "";

    // 1️⃣ INLINE SVG VAR MI?
    const inlineSvg = this.querySelector("svg");
    if (inlineSvg) {
      const svg = inlineSvg.cloneNode(true);
      this.applySVGBase(svg);
      this.applyBaseStyle();
      this.shadowRoot.append(svg);
      return;
    }

    // 2️⃣ DIŞARIDAN YÜKLE
    const iconName = this.textContent.trim();
    if (!iconName) return;

    const type = this.getMeta("bi-icon-type", "svg");

    if (type === "svg") {
      await this.renderSVG(iconName);
    } else {
      this.renderFont(iconName);
    }
  }

  async renderSVG(name) {
    const path = this.getMeta("bi-icon-path", "./icons");
    const ext = this.getMeta("bi-icon-ext", "svg");

    const base = new URL(path, document.baseURI).href;
    const url = `${base.replace(/\/$/, "")}/${name}.${ext}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch fail");

      const text = await res.text();
      const tpl = document.createElement("template");
      tpl.innerHTML = text.trim();

      const svg = tpl.content.querySelector("svg");
      if (!svg) throw new Error("svg yok");

      this.applySVGBase(svg);
      this.applyBaseStyle();
      this.shadowRoot.append(svg);
    } catch {
      console.warn("[bi-icon] SVG yüklenemedi:", name);
    }
  }

  renderFont(name) {
    const fontClass = this.getMeta("bi-icon-class", "");

    const i = document.createElement("i");
    i.className = fontClass;
    i.textContent = name;

    this.applyBaseStyle();
    this.shadowRoot.append(i);
  }

  applySVGBase(svg) {
    svg.setAttribute("part", "svg");
    svg.style.width = "1em";
    svg.style.height = "1em";
    svg.style.fill = "currentColor";
    svg.style.display = "block";
  }

  applyBaseStyle() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        color: inherit;
        line-height: 1;
      }

      i {
        font-size: inherit;
        line-height: 1;
      }
    `;
    this.shadowRoot.append(style);
  }
}

customElements.define("bi-icon", BiIcon);
