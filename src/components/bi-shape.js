class BiShape extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "side", "radius"];
  }

  constructor() {
    super();

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ro = new ResizeObserver(() => this.resize());
  }

  connectedCallback() {
    this.ro.observe(this);

    this.style.display = "inline-block";
    this.style.maskMode = "alpha";

    // kritik fix
    if (!this.style.width)
      this.style.width = "200px";

    if (!this.style.height)
      this.style.height = "200px";

    this.resize();
  }

  attributeChangedCallback() {
    this.draw();
  }

  resize() {
    const rect = this.getBoundingClientRect();

    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    this.draw();
    this.applyMask();
  }

  draw() {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    const variant = this.getAttribute("variant") || "circle";
    const sides = Number(this.getAttribute("side") || 6);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2;

    const shapes = {

      // basic
      circle: () => this.drawCircle(cx, cy, radius),
      square: () => this.drawPolygon(cx, cy, radius, 4),
      triangle: () => this.drawPolygon(cx, cy, radius, 3),

      // polygons
      pentagon: () => this.drawPolygon(cx, cy, radius, 5),
      hexagon: () => this.drawPolygon(cx, cy, radius, 6),
      heptagon: () => this.drawPolygon(cx, cy, radius, 7),
      octagon: () => this.drawPolygon(cx, cy, radius, 8),
      nonagon: () => this.drawPolygon(cx, cy, radius, 9),
      decagon: () => this.drawPolygon(cx, cy, radius, 10),

      // stars
      star: () => this.drawStar(cx, cy, radius, 5),
      star6: () => this.drawStar(cx, cy, radius, 6),
      star7: () => this.drawStar(cx, cy, radius, 7),
      star8: () => this.drawStar(cx, cy, radius, 8),
      star10: () => this.drawStar(cx, cy, radius, 10),

      // md3 expressive
      squircle: () => this.drawSquircle(cx, cy, radius),
      diamond: () => this.drawDiamond(cx, cy, radius),
      pill: () => this.drawPill(cx, cy, radius),
      blob: () => this.drawBlob(cx, cy, radius, 6),
      blob2: () => this.drawBlob(cx, cy, radius, 8),
      blob3: () => this.drawBlob(cx, cy, radius, 10),

      cookie: () => this.drawCookie(cx, cy, radius, sides),
      burst: () => this.drawBurst(cx, cy, radius, sides),

      flower: () => this.drawFlower(cx, cy, radius, 6),
      flower8: () => this.drawFlower(cx, cy, radius, 8),

      clover: () => this.drawClover(cx, cy, radius),

      cross: () => this.drawCross(cx, cy, radius),

      arrow: () => this.drawArrow(cx, cy, radius),

      chevron: () => this.drawChevron(cx, cy, radius),

      shield: () => this.drawShield(cx, cy, radius),

      egg: () => this.drawEgg(cx, cy, radius),

      arch: () => this.drawArch(cx, cy, radius),

      fan: () => this.drawFan(cx, cy, radius),

      drop: () => this.drawDrop(cx, cy, radius),

      moon: () => this.drawMoon(cx, cy, radius),

      heart: () => this.drawHeart(cx, cy, radius)
    };

    if (shapes[variant]) {
      shapes[variant]();
    } else {
      this.drawCircle(cx, cy, radius);
    }

    this.applyMask();
  }

  getCornerRadius(variant, shapeRadius) {
    const attr = this.getAttribute("radius");

    // user override
    if (attr) {

      if (attr.endsWith("%")) {

        const percent = Number(attr.slice(0, -1));
        return shapeRadius * percent / 100;

      }

      return Number(attr);
    }

    // shape default
    return this.getDefaultCornerRadius(variant, shapeRadius);
  }

  getDefaultCornerRadius(variant, shapeRadius) {
    const defaults = {

      circle: shapeRadius,
      square: shapeRadius * 0.12,
      triangle: shapeRadius * 0.08,

      pentagon: shapeRadius * 0.10,
      hexagon: shapeRadius * 0.12,
      heptagon: shapeRadius * 0.14,
      octagon: shapeRadius * 0.16,
      nonagon: shapeRadius * 0.18,
      decagon: shapeRadius * 0.20,

      star: shapeRadius * 0.08,
      star6: shapeRadius * 0.08,
      star7: shapeRadius * 0.08,
      star8: shapeRadius * 0.08,
      star10: shapeRadius * 0.08,

      squircle: shapeRadius * 0.45,

      diamond: shapeRadius * 0.15,

      cookie: shapeRadius * 0.25,

      burst: shapeRadius * 0.10,

      flower: shapeRadius * 0.22,
      flower8: shapeRadius * 0.22,

      blob: shapeRadius * 0.35,
      blob2: shapeRadius * 0.35,
      blob3: shapeRadius * 0.35,

      pill: shapeRadius * 0.5,

      clover: shapeRadius * 0.4,

      shield: shapeRadius * 0.2,

      drop: shapeRadius * 0.35,

      egg: shapeRadius * 0.3,

      heart: shapeRadius * 0.25

    };

    return defaults[variant] ?? 0;
  }

  applyMask() {
    const url = this.canvas.toDataURL();

    this.style.maskImage = `url(${url})`;
    this.style.webkitMaskImage = `url(${url})`;

    this.style.maskSize = "100% 100%";
    this.style.webkitMaskSize = "100% 100%";

    this.style.maskRepeat = "no-repeat";
    this.style.webkitMaskRepeat = "no-repeat";
  }

  drawPolygon(cx, cy, radius, sides) {

    const ctx = this.ctx;
    const cornerRadius = this.getCornerRadius();

    const points = [];

    for (let i = 0; i < sides; i++) {

      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;

      points.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius
      });

    }

    this.drawRoundedPath(points, cornerRadius);
  }

  drawRoundedPath(points, radius) {
    const ctx = this.ctx;

    if (radius <= 0) {

      ctx.beginPath();

      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++)
        ctx.lineTo(points[i].x, points[i].y);

      ctx.closePath();
      ctx.fillStyle = "black";
      ctx.fill();
      return;
    }

    ctx.beginPath();

    const len = points.length;

    for (let i = 0; i < len; i++) {

      const prev = points[(i - 1 + len) % len];
      const curr = points[i];
      const next = points[(i + 1) % len];

      const dx1 = curr.x - prev.x;
      const dy1 = curr.y - prev.y;

      const dx2 = next.x - curr.x;
      const dy2 = next.y - curr.y;

      const len1 = Math.hypot(dx1, dy1);
      const len2 = Math.hypot(dx2, dy2);

      const r = Math.min(radius, len1 / 2, len2 / 2);

      const p1x = curr.x - dx1 / len1 * r;
      const p1y = curr.y - dy1 / len1 * r;

      const p2x = curr.x + dx2 / len2 * r;
      const p2y = curr.y + dy2 / len2 * r;

      if (i === 0)
        ctx.moveTo(p1x, p1y);
      else
        ctx.lineTo(p1x, p1y);

      ctx.quadraticCurveTo(curr.x, curr.y, p2x, p2y);
    }

    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawCookie(cx, cy, radius, bumps) {

    const ctx = this.ctx;

    const base = radius * 0.82;
    const amp  = radius * 0.18;

    const samples = bumps * 40; // ne kadar yüksek, o kadar smooth

    ctx.beginPath();

    for (let i = 0; i <= samples; i++) {

      const t = i / samples;
      const angle = t * Math.PI * 2;

      const r = base + amp * Math.cos(bumps * angle);

      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      if (i === 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawTriangle(cx, cy, radius) {
    this.drawPolygon(cx, cy, radius, 3);
  }

  drawBurst(cx, cy, radius, spikes) {
    const cornerRadius = this.getCornerRadius("burst", radius);

    const outer = radius;
    const inner = radius * 0.5;

    const points = [];

    for (let i = 0; i < spikes * 2; i++) {

      const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;

      const r = i % 2 === 0 ? outer : inner;

      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
      });

    }

    this.drawRoundedPath(points, cornerRadius);
  }

  drawCircle(cx, cy, r) {
    const corner = this.getCornerRadius();

    if (corner <= 0) {

      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.fill();

    } else {

      this.drawSquircle(cx, cy, r);

    }
  }

  drawStar(cx, cy, radius, spikes) {
    const outer = radius;
    const inner = radius * 0.5;

    const cornerRadius = this.getCornerRadius();

    const points = [];

    for (let i = 0; i < spikes * 2; i++) {

      const angle = i * Math.PI / spikes;

      const r = i % 2 === 0 ? outer : inner;

      points.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
      });
    }

    this.drawRoundedPath(points, cornerRadius);
  }

  drawDiamond(cx, cy, r) {
    const cornerRadius = this.getCornerRadius("diamond", r);

    const points = [
      { x: cx,     y: cy - r },
      { x: cx + r, y: cy     },
      { x: cx,     y: cy + r },
      { x: cx - r, y: cy     }
    ];

    this.drawRoundedPath(points, cornerRadius);
  }

  drawSquircle(cx, cy, r) {
    const ctx = this.ctx;
    const steps = 200;

    ctx.beginPath();

    for (let i = 0; i <= steps; i++) {

      const t = (i / steps) * Math.PI * 2;

      const x = cx + r * Math.sign(Math.cos(t)) * Math.pow(Math.abs(Math.cos(t)), 0.5);
      const y = cy + r * Math.sign(Math.sin(t)) * Math.pow(Math.abs(Math.sin(t)), 0.5);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

customElements.define("bi-shape", BiShape);
