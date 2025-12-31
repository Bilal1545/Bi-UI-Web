class BiIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: inherit;
          color: inherit;
          line-height: 1;
        }

        svg {
          width: 1em;
          height: 1em;
          fill: currentColor;
        }

        i {
          font-style: normal;
          line-height: 1;
        }
      </style>
      <span id="icon"></span>
    `;
  }

  connectedCallback() {
    // Eğer kullanıcı kendi SVG'sini verdiyse → kullan
    const svg = this.querySelector('svg');
    if (svg) {
      this.shadowRoot.getElementById('icon').appendChild(svg);
      return;
    }

    this.loadIcon();
  }

  getMeta(name) {
    return document
      .querySelector(`meta[name="${name}"]`)
      ?.getAttribute('content');
  }

  async loadIcon() {
    const name = this.textContent.trim();
    if (!name) return;

    const type = this.getMeta('bi-icons-type') || 'svg';
    const path = this.getMeta('bi-icons-path') || '';

    this.textContent = '';
    const container = this.shadowRoot.getElementById('icon');
    container.innerHTML = '';

    if (type === 'font') {
      const i = document.createElement('i');
      i.className = name;
      container.appendChild(i);
      return;
    }

    if (type === 'svg') {
      try {
        const res = await fetch(`${path}/${name}.svg`);
        if (!res.ok) return;

        const text = await res.text();
        const tpl = document.createElement('template');
        tpl.innerHTML = text;

        const svg = tpl.content.querySelector('svg');
        if (!svg) return;

        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('fill', 'currentColor');

        container.appendChild(svg);
      } catch (_) {}
    }
  }
}

customElements.define('bi-icon', BiIcon);
