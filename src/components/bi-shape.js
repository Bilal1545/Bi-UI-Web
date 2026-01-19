const SHAPES = {
  cookie: {
    3: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.433) calc(var(--s)*0.433) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.219) calc(50% + var(--s)*0.12) var(--g),calc(50% + var(--s)*-0.214) calc(50% + var(--s)*0.13) var(--g),calc(50% + var(--s)*-0.005) calc(50% + var(--s)*-0.25) var(--g),radial-gradient(calc(var(--s)*0.331),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.01) calc(50% + var(--s)*0.5) var(--g),calc(50% + var(--s)*-0.438) calc(50% + var(--s)*-0.241) var(--g),calc(50% + var(--s)*0.428) calc(50% + var(--s)*-0.259) var(--g);
    `,
    4: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.388) calc(var(--s)*0.388) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.197) calc(50% + var(--s)*0.191) var(--g), calc(50% + var(--s)*-0.191) calc(50% + var(--s)*0.197) var(--g), calc(50% + var(--s)*-0.197) calc(50% + var(--s)*-0.191) var(--g), calc(50% + var(--s)*0.191) calc(50% + var(--s)*-0.197) var(--g), radial-gradient(calc(var(--s)*0.375),#000 99%,#0000 101%) subtract, calc(50% + var(--s)*0.008) calc(50% + var(--s)*0.53) var(--g), calc(50% + var(--s)*-0.53) calc(50% + var(--s)*0.008) var(--g), calc(50% + var(--s)*-0.008) calc(50% + var(--s)*-0.53) var(--g), calc(50% + var(--s)*0.53) calc(50% + var(--s)*-0.008) var(--g);
    `,
    5: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.347) calc(var(--s)*0.347) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.177) calc(50% + var(--s)*0.237) var(--g),calc(50% + var(--s)*-0.171) calc(50% + var(--s)*0.241) var(--g),calc(50% + var(--s)*-0.282) calc(50% + var(--s)*-0.088) var(--g),calc(50% + var(--s)*-0.004) calc(50% + var(--s)*-0.295) var(--g),calc(50% + var(--s)*0.28) calc(50% + var(--s)*-0.095) var(--g),radial-gradient(calc(var(--s)*0.399),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.007) calc(50% + var(--s)*0.54) var(--g),calc(50% + var(--s)*-0.511) calc(50% + var(--s)*0.173) var(--g),calc(50% + var(--s)*-0.323) calc(50% + var(--s)*-0.433) var(--g),calc(50% + var(--s)*0.312) calc(50% + var(--s)*-0.441) var(--g),calc(50% + var(--s)*0.516) calc(50% + var(--s)*0.16) var(--g);
    `,
    6: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.313) calc(var(--s)*0.313) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.273) calc(50% + var(--s)*0.154) var(--g), calc(50% + var(--s)*0.003) calc(50% + var(--s)*0.313) var(--g), calc(50% + var(--s)*-0.27) calc(50% + var(--s)*0.159) var(--g), calc(50% + var(--s)*-0.273) calc(50% + var(--s)*-0.154) var(--g), calc(50% + var(--s)*-0.003) calc(50% + var(--s)*-0.313) var(--g), calc(50% + var(--s)*0.27) calc(50% + var(--s)*-0.159) var(--g), radial-gradient(calc(var(--s)*0.414),#000 99%,#0000 101%) subtract, calc(50% + var(--s)*0.276) calc(50% + var(--s)*0.467) var(--g), calc(50% + var(--s)*-0.266) calc(50% + var(--s)*0.473) var(--g), calc(50% + var(--s)*-0.543) calc(50% + var(--s)*0.006) var(--g), calc(50% + var(--s)*-0.276) calc(50% + var(--s)*-0.467) var(--g), calc(50% + var(--s)*0.266) calc(50% + var(--s)*-0.473) var(--g), calc(50% + var(--s)*0.543) calc(50% + var(--s)*-0.006) var(--g);
    `,
    7: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.285) calc(var(--s)*0.285) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.321) calc(50% + var(--s)*0.07) var(--g),calc(50% + var(--s)*0.145) calc(50% + var(--s)*0.294) var(--g),calc(50% + var(--s)*-0.14) calc(50% + var(--s)*0.297) var(--g),calc(50% + var(--s)*-0.319) calc(50% + var(--s)*0.076) var(--g),calc(50% + var(--s)*-0.258) calc(50% + var(--s)*-0.202) var(--g),calc(50% + var(--s)*-0.003) calc(50% + var(--s)*-0.328) var(--g),calc(50% + var(--s)*0.255) calc(50% + var(--s)*-0.207) var(--g),radial-gradient(calc(var(--s)*0.425),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.427) calc(50% + var(--s)*0.334) var(--g),calc(50% + var(--s)*0.005) calc(50% + var(--s)*0.542) var(--g),calc(50% + var(--s)*-0.421) calc(50% + var(--s)*0.342) var(--g),calc(50% + var(--s)*-0.53) calc(50% + var(--s)*-0.116) var(--g),calc(50% + var(--s)*-0.24) calc(50% + var(--s)*-0.487) var(--g),calc(50% + var(--s)*0.231) calc(50% + var(--s)*-0.491) var(--g),calc(50% + var(--s)*0.528) calc(50% + var(--s)*-0.125) var(--g);
    `,
    8: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.261) calc(var(--s)*0.261) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.245) calc(50% + var(--s)*0.237) var(--g),calc(50% + var(--s)*0.005) calc(50% + var(--s)*0.341) var(--g),calc(50% + var(--s)*-0.237) calc(50% + var(--s)*0.245) var(--g),calc(50% + var(--s)*-0.341) calc(50% + var(--s)*0.005) var(--g),calc(50% + var(--s)*-0.245) calc(50% + var(--s)*-0.237) var(--g),calc(50% + var(--s)*-0.005) calc(50% + var(--s)*-0.341) var(--g),calc(50% + var(--s)*0.237) calc(50% + var(--s)*-0.245) var(--g),calc(50% + var(--s)*0.341) calc(50% + var(--s)*-0.005) var(--g),radial-gradient(calc(var(--s)*0.433),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.215) calc(50% + var(--s)*0.497) var(--g),calc(50% + var(--s)*-0.199) calc(50% + var(--s)*0.503) var(--g),calc(50% + var(--s)*-0.497) calc(50% + var(--s)*0.215) var(--g),calc(50% + var(--s)*-0.503) calc(50% + var(--s)*-0.199) var(--g),calc(50% + var(--s)*-0.215) calc(50% + var(--s)*-0.497) var(--g),calc(50% + var(--s)*0.199) calc(50% + var(--s)*-0.503) var(--g),calc(50% + var(--s)*0.497) calc(50% + var(--s)*-0.215) var(--g),calc(50% + var(--s)*0.503) calc(50% + var(--s)*0.199) var(--g);
    `,
    9: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.241) calc(var(--s)*0.241) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.306) calc(50% + var(--s)*0.174) var(--g),calc(50% + var(--s)*0.123) calc(50% + var(--s)*0.33) var(--g),calc(50% + var(--s)*-0.118) calc(50% + var(--s)*0.332) var(--g),calc(50% + var(--s)*-0.304) calc(50% + var(--s)*0.178) var(--g),calc(50% + var(--s)*-0.347) calc(50% + var(--s)*-0.059) var(--g),calc(50% + var(--s)*-0.228) calc(50% + var(--s)*-0.268) var(--g),calc(50% + var(--s)*-0.002) calc(50% + var(--s)*-0.352) var(--g),calc(50% + var(--s)*0.224) calc(50% + var(--s)*-0.271) var(--g),calc(50% + var(--s)*0.346) calc(50% + var(--s)*-0.064) var(--g),radial-gradient(calc(var(--s)*0.439),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.35) calc(50% + var(--s)*0.411) var(--g),calc(50% + var(--s)*0.004) calc(50% + var(--s)*0.539) var(--g),calc(50% + var(--s)*-0.344) calc(50% + var(--s)*0.416) var(--g),calc(50% + var(--s)*-0.531) calc(50% + var(--s)*0.097) var(--g),calc(50% + var(--s)*-0.469) calc(50% + var(--s)*-0.266) var(--g),calc(50% + var(--s)*-0.188) calc(50% + var(--s)*-0.506) var(--g),calc(50% + var(--s)*0.181) calc(50% + var(--s)*-0.508) var(--g),calc(50% + var(--s)*0.465) calc(50% + var(--s)*-0.273) var(--g),calc(50% + var(--s)*0.532) calc(50% + var(--s)*0.09) var(--g);
    `,
    10: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.224) calc(var(--s)*0.224) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.349) calc(50% + var(--s)*0.097) var(--g),calc(50% + var(--s)*0.225) calc(50% + var(--s)*0.283) var(--g),calc(50% + var(--s)*0.016) calc(50% + var(--s)*0.361) var(--g),calc(50% + var(--s)*-0.199) calc(50% + var(--s)*0.302) var(--g),calc(50% + var(--s)*-0.339) calc(50% + var(--s)*0.127) var(--g),calc(50% + var(--s)*-0.349) calc(50% + var(--s)*-0.097) var(--g),calc(50% + var(--s)*-0.225) calc(50% + var(--s)*-0.283) var(--g),calc(50% + var(--s)*-0.016) calc(50% + var(--s)*-0.361) var(--g),calc(50% + var(--s)*0.199) calc(50% + var(--s)*-0.302) var(--g),calc(50% + var(--s)*0.339) calc(50% + var(--s)*-0.127) var(--g),radial-gradient(calc(var(--s)*0.444),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.448) calc(50% + var(--s)*0.297) var(--g),calc(50% + var(--s)*0.188) calc(50% + var(--s)*0.503) var(--g),calc(50% + var(--s)*-0.143) calc(50% + var(--s)*0.518) var(--g),calc(50% + var(--s)*-0.421) calc(50% + var(--s)*0.335) var(--g),calc(50% + var(--s)*-0.537) calc(50% + var(--s)*0.024) var(--g),calc(50% + var(--s)*-0.448) calc(50% + var(--s)*-0.297) var(--g),calc(50% + var(--s)*-0.188) calc(50% + var(--s)*-0.503) var(--g),calc(50% + var(--s)*0.143) calc(50% + var(--s)*-0.518) var(--g),calc(50% + var(--s)*0.421) calc(50% + var(--s)*-0.335) var(--g),calc(50% + var(--s)*0.537) calc(50% + var(--s)*-0.024) var(--g);
    `,
    11: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.209) calc(var(--s)*0.209) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.368) calc(50% + var(--s)*0.042) var(--g),calc(50% + var(--s)*0.286) calc(50% + var(--s)*0.234) var(--g),calc(50% + var(--s)*0.114) calc(50% + var(--s)*0.352) var(--g),calc(50% + var(--s)*-0.094) calc(50% + var(--s)*0.358) var(--g),calc(50% + var(--s)*-0.273) calc(50% + var(--s)*0.25) var(--g),calc(50% + var(--s)*-0.365) calc(50% + var(--s)*0.063) var(--g),calc(50% + var(--s)*-0.341) calc(50% + var(--s)*-0.144) var(--g),calc(50% + var(--s)*-0.209) calc(50% + var(--s)*-0.305) var(--g),calc(50% + var(--s)*-0.011) calc(50% + var(--s)*-0.37) var(--g),calc(50% + var(--s)*0.191) calc(50% + var(--s)*-0.317) var(--g),calc(50% + var(--s)*0.332) calc(50% + var(--s)*-0.163) var(--g),radial-gradient(calc(var(--s)*0.448),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.493) calc(50% + var(--s)*0.209) var(--g),calc(50% + var(--s)*0.302) calc(50% + var(--s)*0.442) var(--g),calc(50% + var(--s)*0.015) calc(50% + var(--s)*0.535) var(--g),calc(50% + var(--s)*-0.277) calc(50% + var(--s)*0.459) var(--g),calc(50% + var(--s)*-0.481) calc(50% + var(--s)*0.236) var(--g),calc(50% + var(--s)*-0.532) calc(50% + var(--s)*-0.061) var(--g),calc(50% + var(--s)*-0.415) calc(50% + var(--s)*-0.339) var(--g),calc(50% + var(--s)*-0.166) calc(50% + var(--s)*-0.509) var(--g),calc(50% + var(--s)*0.136) calc(50% + var(--s)*-0.518) var(--g),calc(50% + var(--s)*0.395) calc(50% + var(--s)*-0.362) var(--g),calc(50% + var(--s)*0.528) calc(50% + var(--s)*-0.091) var(--g);
    `,
    12: `
      aspect-ratio: 1;
      --g:/calc(var(--s)*0.195) calc(var(--s)*0.195) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
      mask: calc(50% + var(--s)*0.332) calc(50% + var(--s)*0.18) var(--g),calc(50% + var(--s)*0.197) calc(50% + var(--s)*0.322) var(--g),calc(50% + var(--s)*0.01) calc(50% + var(--s)*0.377) var(--g),calc(50% + var(--s)*-0.18) calc(50% + var(--s)*0.332) var(--g),calc(50% + var(--s)*-0.322) calc(50% + var(--s)*0.197) var(--g),calc(50% + var(--s)*-0.377) calc(50% + var(--s)*0.01) var(--g),calc(50% + var(--s)*-0.332) calc(50% + var(--s)*-0.18) var(--g),calc(50% + var(--s)*-0.197) calc(50% + var(--s)*-0.322) var(--g),calc(50% + var(--s)*-0.01) calc(50% + var(--s)*-0.377) var(--g),calc(50% + var(--s)*0.18) calc(50% + var(--s)*-0.332) var(--g),calc(50% + var(--s)*0.322) calc(50% + var(--s)*-0.197) var(--g),calc(50% + var(--s)*0.377) calc(50% + var(--s)*-0.01) var(--g),radial-gradient(calc(var(--s)*0.452),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.387) calc(50% + var(--s)*0.367) var(--g),calc(50% + var(--s)*0.152) calc(50% + var(--s)*0.512) var(--g),calc(50% + var(--s)*-0.125) calc(50% + var(--s)*0.519) var(--g),calc(50% + var(--s)*-0.367) calc(50% + var(--s)*0.387) var(--g),calc(50% + var(--s)*-0.512) calc(50% + var(--s)*0.152) var(--g),calc(50% + var(--s)*-0.519) calc(50% + var(--s)*-0.125) var(--g),calc(50% + var(--s)*-0.387) calc(50% + var(--s)*-0.367) var(--g),calc(50% + var(--s)*-0.152) calc(50% + var(--s)*-0.512) var(--g),calc(50% + var(--s)*0.125) calc(50% + var(--s)*-0.519) var(--g),calc(50% + var(--s)*0.367) calc(50% + var(--s)*-0.387) var(--g),calc(50% + var(--s)*0.512) calc(50% + var(--s)*-0.152) var(--g),calc(50% + var(--s)*0.519) calc(50% + var(--s)*0.125) var(--g);
    `
  },
  triangle: `
    aspect-ratio: 1/cos(30deg) !important;
    --g:calc(tan(60deg)*var(--r)) bottom var(--r),#000 98%,#0000 101%;
    -webkit-mask:
      conic-gradient(from -30deg at 50% calc(200% - 3*var(--r)/2),#000 60deg,#0000 0)
      0 100%/100% calc(100% - 3*var(--r)/2) no-repeat,
      radial-gradient(var(--r) at 50% calc(2*var(--r)),#000 98%,#0000 101%),
      radial-gradient(var(--r) at left  var(--g)),
      radial-gradient(var(--r) at right var(--g));
    clip-path: polygon(50% 0,100% 100%,0 100%);
  `,
  burst: `
    aspect-ratio: 1;
    clip-path: polygon(100% 50%,78.98% 57.76%,93.3% 75%,71.21% 71.21%,75% 93.3%,57.76% 78.98%,50% 100%,42.24% 78.98%,25% 93.3%,28.79% 71.21%,6.7% 75%,21.02% 57.76%,0% 50%,21.02% 42.24%,6.7% 25%,28.79% 28.79%,25% 6.7%,42.24% 21.02%,50% 0%,57.76% 21.02%,75% 6.7%,71.21% 28.79%,93.3% 25%,78.98% 42.24%);
  `
};
class BiShape extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "side", "radius"];
  }

  connectedCallback() {
    this.parent = this.parentElement;
    if (!this.parent) return;

    this.observeSize();
    this.apply();
  }

  attributeChangedCallback() {
    this.apply();
  }

  observeSize() {
    this.ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const s = Math.min(width, height);
      const r = this.getAttribute("radius") || 20;
      this.parent.style.setProperty("--s", `${s}px`);
      this.parent.style.setProperty("--r", `${r}px`);
    });
    this.ro.observe(this.parent);
  }

  apply() {
    if (!this.parent) return;

    const variant = this.getAttribute("variant") || "cookie";
    const side = this.getAttribute("side") || "4";

    let shapeCSS = "";

    if (variant === "cookie") {
      shapeCSS = SHAPES.cookie?.[side];
    } else {
      shapeCSS = SHAPES[variant];
    }

    if (!shapeCSS) return;

    this.parent.style.removeProperty("mask");
    this.parent.style.removeProperty("-webkit-mask");
    this.parent.style.removeProperty("clip-path");

    this.parent.style.cssText += shapeCSS;
  }
}

customElements.define("bi-shape", BiShape);
