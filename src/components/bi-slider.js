class BiSlider extends HTMLElement {
    static get observedAttributes() {
        return ['min', 'max', 'value', 'step', 'orientation', 'size'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.min = parseFloat(this.getAttribute('min')) || 0;
        this.max = parseFloat(this.getAttribute('max')) || 100;
        this.step = parseFloat(this.getAttribute('step')) || 0;
        this._value = parseFloat(this.getAttribute('value')) || this.min;

        const container = document.createElement('div');
        container.classList.add('slider-container');

        this.input = document.createElement('input');
        this.input.type = 'range';
        this.input.min = this.min;
        this.input.max = this.max;
        this.input.step = this.step > 0 ? this.step : 'any';
        this.input.value = this._value;
        this.input.setAttribute('aria-label', this.getAttribute('label') || 'Kaydırıcı değeri');

        this.thumbLabel = document.createElement('span');
        this.thumbLabel.classList.add('thumb-label');
        
        container.append(this.input, this.thumbLabel);

        this.input.addEventListener('input', this.handleInput.bind(this));
        
        const style = document.createElement("style");
        style.textContent = `
            :host {
                display: block;
                padding: 1rem 0;
                --track-color: var(--primary, #ffb786);
                --inactive-color: var(--surfaceContainerHighest, #3d332d);
                --thumb-color: var(--primary, #ffb786);
                --thumb-state-layer: var(--onPrimary, #502400);
                
                /* Material3 Boyutları */
                --thumb-width: 4px;
                --thumb-height: 24px;
                --thumb-hover-width: 4px;
                --thumb-active-width: 1px;
                --track-height: 4px;
                --track-gap: 8px;
                --state-layer-opacity: 0.08;
                --state-layer-pressed-opacity: 0.12;
            }

            /* --- M3 BOYUT TANIMLARI --- */
            :host([size="xs"]) { 
                --thumb-height: 2.75rem;
                --track-height: 1rem;
                --track-gap: 8px;
            }
            :host([size="sm"]) { 
                --thumb-height: 2.75rem;
                --track-height: 1.5rem;
                --track-gap: 8px;
            }
            :host([size="md"]) { 
                --thumb-height: 2.75rem;
                --track-height: 2.5rem;
                --track-gap: 10px;
            }
            :host([size="lg"]) { 
                --thumb-height: 4.25rem;
                --track-height: 3.5rem;
                --track-gap: 10px;
            }
            :host([size="xl"]) { 
                --thumb-height: 6.75rem;
                --track-height: 6rem;
                --track-gap: 12px;
            }

            .slider-container {
                position: relative;
                width: 100%;
                height: var(--thumb-height);
                display: flex;
                align-items: center;
            }

            /* --- ORTAK SIFIRLAMA --- */
            input[type="range"] {
                -webkit-appearance: none;
                -moz-appearance: none;
                width: 100%;
                height: var(--track-height);
                background: transparent;
                cursor: pointer;
                margin: 0;
                position: absolute;
                z-index: 2;
                transform: none;
            }

            /* ================================================= */
            /* --- YATAY SLIDER STİLLERİ --- */
            /* ================================================= */

            /* --- TRACK: WEBKIT --- */
            input[type="range"]::-webkit-slider-runnable-track {
                width: 100%;
                height: var(--track-height);
                background: transparent;
                border: none;
            }
            
            /* --- TRACK: MOZILLA (Firefox) --- */
            input[type="range"]::-moz-range-track {
                width: 100%;
                height: var(--track-height);
                background: transparent;
                border: none;
            }
            
            /* --- DOLU KISIM (Active Track) --- */
            .slider-container::before {
                content: '';
                position: absolute;
                top: 50%;
                left: calc(var(--thumb-width) / 2);
                height: var(--track-height);
                background: var(--track-color);
                border-top-left-radius: 9999px;
                border-bottom-left-radius: 9999px;
                border-top-right-radius: .125rem;
                border-bottom-right-radius: .125rem;
                transform: translateY(-50%);
                width: calc(var(--slider-progress, 50%) - var(--track-gap));
                pointer-events: none;
                z-index: 1;
            }

            /* --- DOLU OLMAYAN KISIM (Inactive Track) --- */
            .slider-container::after {
                content: '';
                position: absolute;
                top: 50%;
                right: calc(var(--thumb-width) / 2);
                height: var(--track-height);
                background: var(--inactive-color);
                border-top-left-radius: .125rem;
                border-bottom-left-radius: .125rem;
                border-top-right-radius: 9999px;
                border-bottom-right-radius: 9999px;
                transform: translateY(-50%);
                width: calc(100% - var(--slider-progress, 50%) - var(--track-gap));
                pointer-events: none;
                z-index: 1;
            }

            /* --- THUMB: WEBKIT --- */
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: var(--thumb-width);
                height: var(--thumb-height);
                background: var(--thumb-color);
                border-radius: calc(var(--thumb-width) / 2);
                border: none;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                cursor: pointer;
                margin-top: calc((var(--thumb-height) - var(--track-height)) / -2);
                margin-left: 0;
                transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
            }

            /* --- THUMB: MOZILLA --- */
            input[type="range"]::-moz-range-thumb {
                appearance: none;
                width: var(--thumb-width);
                height: var(--thumb-height);
                background: var(--thumb-color);
                border-radius: calc(var(--thumb-width) / 2);
                border: none;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
            }

            /* --- THUMB HOVER STATE --- */
            input[type="range"]:hover::-webkit-slider-thumb {
                width: var(--thumb-width);
                margin-top: calc((var(--thumb-height) - var(--track-height)) / -2);
                box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            }

            input[type="range"]:hover::-moz-range-thumb {
                box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            }

            /* --- THUMB ACTIVE/PRESSED STATE --- */
            input[type="range"]:active::-webkit-slider-thumb {
                margin-top: calc((var(--thumb-height) - var(--track-height)) / -2);
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }

            input[type="range"]:active::-moz-range-thumb {
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }

            /* --- STATE LAYER (Material3 etkileşim katmanı) --- */
            input[type="range"]:hover::-webkit-slider-thumb::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                background: var(--thumb-state-layer);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                opacity: var(--state-layer-opacity);
                pointer-events: none;
            }

            input[type="range"]:active::-webkit-slider-thumb::after {
                opacity: var(--state-layer-pressed-opacity);
            }

            /* ================================================= */
            /* --- DİKEY MOD (orientation="vertical") --- */
            /* ================================================= */
            
            :host([vertical]) {
                height: 200px; 
                width: var(--thumb-height);
                padding: 0 1rem;
            }

            :host([vertical]) .slider-container {
                height: 100%;
                width: var(--thumb-height);
                flex-direction: column; 
            }

            :host([vertical]) input[type="range"] {
                transform-origin: top left; 
                transform: rotate(-90deg);
                width: 100%; 
                height: var(--thumb-height);
                top: 100%; 
                left: 0; 
            }

            :host([vertical]) .slider-container::before {
                top: auto;
                bottom: 0;
                left: 50%;
                width: var(--track-height);
                height: calc(var(--slider-progress, 50%) - var(--track-gap));
                transform: translateX(-50%);
                border-top-left-radius: .125rem;
                border-bottom-left-radius: 9999px;
                border-top-right-radius: .125rem;
                border-bottom-right-radius: 9999px;
            }

            :host([vertical]) .slider-container::after {
                top: 0;
                bottom: auto;
                left: 50%;
                width: var(--track-height);
                height: calc(100% - var(--slider-progress, 50%) - var(--track-gap));
                transform: translateX(-50%);
                border-bottom-left-radius: .125rem;
                border-top-left-radius: 9999px;
                border-bottom-right-radius: .125rem;
                border-top-right-radius: 9999px;
            }

            /* --- DEĞER GÖSTERGESİ (Thumb Label) --- */
            .thumb-label {
                position: absolute;
                background: var(--primaryContainer, #6e390d);
                color: var(--onPrimaryContainer, #ffdcc6);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1);
                z-index: 10;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
            
            /* Yatay Label Konumu */
            :host(:not([orientation="vertical"])) .thumb-label {
                left: var(--thumb-offset, 50%);
                top: -8px;
                transform: translateX(-50%) translateY(-100%);
            }

            /* Dikey Label Konumu */
            :host([orientation="vertical"]) .thumb-label {
                top: var(--thumb-position-y, 50%);
                left: calc(var(--thumb-height) + 8px);
                transform: translateY(-50%);
            }

            input[type="range"]:active ~ .thumb-label,
            input[type="range"]:focus ~ .thumb-label {
                opacity: 1; 
            }

            /* --- FOCUS STATE --- */
            input[type="range"]:focus {
                outline: none;
            }

            input[type="range"]:focus::-webkit-slider-thumb {
                box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 0 0 2px var(--primary, #ffb786);
            }

            input[type="range"]:focus::-moz-range-thumb {
                box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 0 0 2px var(--primary, #ffb786);
            }

            /* --- DISABLED STATE --- */
            :host([disabled]) {
                opacity: 0.38;
                pointer-events: none;
            }

            :host([disabled]) input[type="range"] {
                cursor: not-allowed;
            }

            :host([disabled]) input[type="range"]::-webkit-slider-thumb {
                background: var(--onSurface, #f0dfd7);
                box-shadow: none;
            }

            :host([disabled]) input[type="range"]::-moz-range-thumb {
                background: var(--onSurface, #f0dfd7);
                box-shadow: none;
            }

            :host([disabled]) .slider-container::before {
                background: var(--onSurface, #f0dfd7);
            }

            :host([disabled]) .slider-container::after {
                background: var(--onSurface, #f0dfd7);
            }
        `;

        this.shadowRoot.append(style, container);

        this.updateSliderState(this._value);
    }
    
    handleInput(e) {
        this._value = parseFloat(e.target.value);
        this.updateSliderState(this._value);
        this.dispatchEvent(new CustomEvent('value-change', { detail: { value: this._value }}));
    }

    updateSliderState(value) {
        const percentage = ((value - this.min) / (this.max - this.min)) * 100;
        
        const isVertical = this.getAttribute('orientation') === 'vertical';
        const hostLength = isVertical ? this.offsetHeight : this.offsetWidth;
        
        this.style.setProperty('--host-length', `${hostLength}px`);

        this.style.setProperty('--slider-progress', `${percentage}%`);
        
        const thumbOffset = percentage; 
        this.style.setProperty('--thumb-offset', `${thumbOffset}%`);
        
        const verticalPercentage = 100 - percentage; // Dikeyde alttan başlar
        this.style.setProperty('--thumb-position-y', `${verticalPercentage}%`);

        this.thumbLabel.textContent = value.toFixed(this.step > 0 ? 0 : 1);
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = isNaN(parseFloat(newValue)) ? newValue : parseFloat(newValue);
            if (this.input) {
                this.input[name] = this[name];
            }
            if (name === 'value' || name === 'min' || name === 'max' || name === 'orientation' || name === 'size') {
                this.updateSliderState(this._value);
            }
        }
    }
    
    connectedCallback() {
        requestAnimationFrame(() => this.updateSliderState(this._value));
    }
}

customElements.define("bi-slider", BiSlider);
