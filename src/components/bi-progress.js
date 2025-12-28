class BiProgress extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'max', 'size', 'disabled', 'wavy'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.value = parseFloat(this.getAttribute('value')) || 0;
        this.max = parseFloat(this.getAttribute('max')) || 100;

        const container = document.createElement('div');
        container.classList.add('progress-container');

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                padding: 0.5rem 0;

                --active-color: var(--bi-sys-color-primary, #ffb786);
                --active-color-soft: color-mix(in srgb, var(--bi-sys-color-primary) 70%, white);
                --inactive-color: var(--bi-sys-color-surface-container-highest, #3d332d);

                --track-height: 4px;
                --track-gap: 6px;

                --wave-size: 200%;
                --wave-speed: 2.2s;
            }

            /* --- SIZE VARIANTS --- */
            :host([size="xs"]) { --track-height: 2px; }
            :host([size="sm"]) { --track-height: 4px; }
            :host([size="md"]) { --track-height: 6px; }
            :host([size="lg"]) { --track-height: 8px; }
            :host([size="xl"]) { --track-height: 12px; }

            .progress-container {
                position: relative;
                width: 100%;
                height: var(--track-height);
            }

            /* ================================================= */
            /* ACTIVE (SOL)                                     */
            /* ================================================= */
            .progress-container::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                height: var(--track-height);
                width: calc(var(--progress, 0%) - var(--track-gap) / 2);
                transform: translateY(-50%);
                border-radius: 9999px;
                transition: width 0.2s cubic-bezier(0.2, 0, 0, 1);
                background: var(--active-color);
            }

            /* --- WAVY EFFECT --- */
            :host([wavy]) .progress-container::before {
                background-image: linear-gradient(
                    110deg,
                    var(--active-color) 25%,
                    var(--active-color-soft) 37%,
                    var(--active-color) 55%
                );
                background-size: var(--wave-size) 100%;
                animation: wave-move var(--wave-speed) linear infinite;
            }

            @keyframes wave-move {
                from {
                    background-position-x: 0%;
                }
                to {
                    background-position-x: 200%;
                }
            }

            /* ================================================= */
            /* INACTIVE (SAĞ)                                   */
            /* ================================================= */
            .progress-container::after {
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                height: var(--track-height);
                width: calc(100% - var(--progress, 0%) - var(--track-gap) / 2);
                background: var(--inactive-color);
                transform: translateY(-50%);
                border-radius: 9999px;
                transition: width 0.2s cubic-bezier(0.2, 0, 0, 1);
            }

            /* ================================================= */
            /* DISABLED                                         */
            /* ================================================= */
            :host([disabled]) {
                opacity: 0.38;
                pointer-events: none;
            }
        `;

        this.shadowRoot.append(style, container);
        this.update();
    }

    update() {
        const percent = Math.max(
            0,
            Math.min(100, (this.value / this.max) * 100)
        );

        this.style.setProperty('--progress', `${percent}%`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (name === 'value') this.value = parseFloat(newValue) || 0;
        if (name === 'max') this.max = parseFloat(newValue) || 100;

        this.update();
    }

    connectedCallback() {
        requestAnimationFrame(() => this.update());
    }
}

customElements.define('bi-progress', BiProgress);
