class BiRadioGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const slot = document.createElement("slot");

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    `;

    this.shadowRoot.append(style, slot);

    this.addEventListener("radio-select", e => {
      this.value = e.detail.value;
    });
  }

  connectedCallback() {
    this.update();
  }

  get radios() {
    return [...this.querySelectorAll("bi-radio")];
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(v) {
    this.setAttribute("value", v);
    this.update();

    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }

  update() {
    const value = this.value;

    this.radios.forEach(radio => {
      radio.checked = radio.value === value;
    });
  }

  static observedAttributes = ["value"];

  attributeChangedCallback() {
    this.update();
  }
}

customElements.define("bi-radio-group", BiRadioGroup);
