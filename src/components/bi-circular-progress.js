class BiCircularProgress extends HTMLElement {
  static get observedAttributes() {
    return ["value", "size", "thickness", "indeterminate", "mode"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        width: var(--size, 40px);
        height: var(--size, 40px);
      }
      svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      circle {
        fill: none;
        stroke-width: var(--thickness, 4);
        stroke-linecap: round;
        transition: stroke-dashoffset 0.35s ease;
      }
      .indeterminate circle {
        animation: dash 1.5s ease-in-out infinite;
      }
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 282.743;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 141.371, 282.743;
          stroke-dashoffset: -35.343;
        }
        100% {
          stroke-dasharray: 1, 282.743;
          stroke-dashoffset: -282.743;
        }
      }
    `;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", "45%");
    circle.setAttribute("stroke-dasharray", "282.743");
    circle.setAttribute("stroke-dashoffset", "282.743");
    svg.appendChild(circle);

    this.shadowRoot.append(style, svg);

    this._svg = svg;
    this._circle = circle;
    this._colors = [
      "var(--bi-sys-color-primary, #6200ee)"
    ];
    this._colorIndex = 0;
    this._colorInterval = null;
  }

  connectedCallback() {
    this._update();
    this._startColorLoop();
  }

  disconnectedCallback() {
    clearInterval(this._colorInterval);
  }

  attributeChangedCallback() {
    this._update();
    this._startColorLoop();
  }

  _update() {
    const size = this.getAttribute("size") || 40;
    const thickness = this.getAttribute("thickness") || 4;
    const value = parseFloat(this.getAttribute("value") || 0);
    const indeterminate = this.hasAttribute("indeterminate");
    const mode = this.getAttribute("mode") || "default";

    this.style.setProperty("--size", `${size}px`);
    this.style.setProperty("--thickness", thickness);

    // Renkleri seç
    if (mode === "4colours") {
      this._colors = [
        "var(--bi-sys-color-primary)",
        "var(--bi-sys-color-primary-container)",
        "var(--bi-sys-color-secondary)",
        "var(--bi-sys-color-tertiary)"
      ];
    } else {
      this._colors = ["var(--bi-sys-color-primary)"];
    }

    // Indeterminate / determinate
    if (indeterminate) {
      this._svg.classList.add("indeterminate");
      this._circle.setAttribute("stroke-dasharray", "282.743");
      this._circle.setAttribute("stroke-dashoffset", "70");
    } else {
      this._svg.classList.remove("indeterminate");
      const dashoffset = 282.743 * (1 - value / 100);
      this._circle.setAttribute("stroke-dasharray", "282.743");
      this._circle.setAttribute("stroke-dashoffset", dashoffset);
    }
  }

  _startColorLoop() {
    clearInterval(this._colorInterval);
    if (this._colors.length <= 1) {
      this._circle.style.stroke = this._colors[0];
      return;
    }

    // 1s aralıklarla renk değişimi
    this._circle.style.stroke = this._colors[this._colorIndex];
    this._colorInterval = setInterval(() => {
      this._colorIndex = (this._colorIndex + 1) % this._colors.length;
      this._circle.style.stroke = this._colors[this._colorIndex];
    }, 1000);
  }
}

customElements.define("bi-circular-progress", BiCircularProgress);