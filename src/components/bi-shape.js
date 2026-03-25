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
      pill: () => this.drawPill(cx, cy, radius),
      bun: () => this.drawBun(cx, cy, radius),
      oval: () => this.drawOval(cx, cy, radius),
      semicircle: () => this.drawSemiCircle(cx, cy, radius),

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
    return 0
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

  drawSemiCircle(cx, cy, r) {
    const ctx = this.ctx;

    const w = r * 2;
    const h = r;

    const left = cx - r;
    const right = cx + r;
    const top = cy - r;
    const bottom = cy;

    const corner = this.getCornerRadius("semicircle", r);

    const cr = Math.min(corner, r);

    ctx.beginPath();

    // üst yarım daire
    ctx.arc(cx, bottom, r, Math.PI, 0, false);

    // sağ alt köşe
    if (cr > 0) {
      ctx.lineTo(right, bottom - cr);
      ctx.quadraticCurveTo(right, bottom, right - cr, bottom);
    } else {
      ctx.lineTo(right, bottom);
    }

    // alt düz çizgi
    if (cr > 0) {
      ctx.lineTo(left + cr, bottom);
      ctx.quadraticCurveTo(left, bottom, left, bottom - cr);
    } else {
      ctx.lineTo(left, bottom);
    }

    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  }

  drawFan(cx, cy, r, cornerRadius = 20) {

    const ctx = this.ctx;

    const angle = Math.PI / 2;
    const start = -Math.PI / 2;
    const end = start + angle;

    const sx = cx + Math.cos(start) * r;
    const sy = cy + Math.sin(start) * r;

    const ex = cx + Math.cos(end) * r;
    const ey = cy + Math.sin(end) * r;

    ctx.beginPath();

    // başlangıç kenarı
    ctx.moveTo(
      cx + Math.cos(start) * cornerRadius,
      cy + Math.sin(start) * cornerRadius
    );

    // dış kenar başlangıç yuvarlatma
    ctx.arcTo(cx, cy, sx, sy, cornerRadius);

    // dış yay
    ctx.arc(cx, cy, r, start, end);

    // dış kenar bitiş yuvarlatma
    ctx.arcTo(cx, cy, ex, ey, cornerRadius);

    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawPill() {
    const ctx = this.ctx;

    const w = this.canvas.width;

    // istediğin oran
    const h = w * 0.65;
    const r = h / 2;

    const cx = w / 2;
    const cy = this.canvas.height / 2;

    ctx.save();

    // 45° rotate
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 1.35);
    ctx.translate(-cx, -cy);

    const left = cx - w / 2;
    const right = cx + w / 2;
    const top = cy - h / 2;
    const bottom = cy + h / 2;

    ctx.beginPath();

    // sol yarım daire
    ctx.arc(left + r, cy, r, Math.PI / 2, Math.PI * 1.5);

    // üst çizgi
    ctx.lineTo(right - r, top);

    // sağ yarım daire
    ctx.arc(right - r, cy, r, Math.PI * 1.5, Math.PI / 2);

    // alt çizgi
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.fill();

    ctx.restore();
  }

  drawBun() {
    const ctx = this.ctx;

    const w = this.canvas.width;
    const totalH = this.canvas.height;

    const h = totalH / 2;
    const r = h / 2;

    const cx = w / 2;

    ctx.beginPath();

    // --- ÜST PILL ---
    const topCy = h / 2;

    ctx.moveTo(r, topCy - r);

    ctx.arc(r, topCy, r, Math.PI * 1.5, Math.PI / 2, true);
    ctx.lineTo(w - r, topCy + r);
    ctx.arc(w - r, topCy, r, Math.PI / 2, Math.PI * 1.5, true);
    ctx.closePath();

    // --- ALT PILL ---
    const bottomCy = h + h / 2;

    ctx.moveTo(r, bottomCy - r);

    ctx.arc(r, bottomCy, r, Math.PI * 1.5, Math.PI / 2, true);
    ctx.lineTo(w - r, bottomCy + r);
    ctx.arc(w - r, bottomCy, r, Math.PI / 2, Math.PI * 1.5, true);
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawOval() {
    const ctx = this.ctx;

    const w = this.canvas.width;
    const h = w * 0.5;

    const rx = w / 2;
    const ry = h / 2;

    const cx = w / 2;
    const cy = this.canvas.height / 2;

    ctx.save();

    // senin dramatik rotate açın
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 1.4);
    ctx.translate(-cx, -cy);

    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

    ctx.fillStyle = "black";
    ctx.fill();

    ctx.restore();
  }

  drawArrow(cx, cy, r) {
    const corner = this.getCornerRadius("arrow", r);

    const w = r * 2;
    const h = r * 2;

    const left = cx - w / 2;
    const right = cx + w / 2;
    const top = cy - h / 2;
    const bottom = cy + h / 2;

    const notchWidth = w * 0.5;
    const notchDepth = h * 0.1; // yukarı doğru oyulma

    const points = [
      { x: cx, y: top },                               // tepe
      { x: right, y: bottom },                         // sağ alt dış
      { x: cx + notchWidth / 2, y: bottom },           // notch sağ dış
      { x: cx, y: bottom - notchDepth },               // notch iç (yukarı)
      { x: cx - notchWidth / 2, y: bottom },           // notch sol dış
      { x: left, y: bottom }                           // sol alt dış
    ];

    this.drawRoundedPath(points, corner);
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
      { x: cx + (r * .75), y: cy     },
      { x: cx,     y: cy + r },
      { x: cx - (r * .75), y: cy     }
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
