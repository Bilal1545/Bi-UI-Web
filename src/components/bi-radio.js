class BiRadio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const btn = document.createElement("button");
    const box = document.createElement("span");
    box.className = "box";

    const ripple = document.createElement("bi-ripple");
    const slot = document.createElement("slot");

    btn.append(ripple, box);

    btn.addEventListener("click", () => {
      if (this.disabled) return;

      this.dispatchEvent(new CustomEvent("radio-select", {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          radio: this
        }
      }));
    });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      button {
        position: relative;
        overflow: hidden;

        display: inline-flex;
        align-items: center;
        padding: 0.75rem;

        border-radius: 50%;
        border: none;
        cursor: pointer;

        background: transparent;
        color: var(--bi-sys-color-primary);

        transition: background 0.2s ease;
        --ripple-color: currentColor;
      }

      button:hover {
        background: color-mix(
          in srgb,
          currentColor 10%,
          transparent
        );
      }

      :host([disabled]) button {
        pointer-events: none;
        opacity: 0.38;
      }

      .box {
        width: .8rem;
        height: .8rem;

        border-radius: 50%;
        outline-offset: 0.3rem;
        outline: 2px solid var(--bi-sys-color-outline);

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background 0.2s ease, outline-color 0.2s ease;
      }

      /* ===== CHECKED ===== */

      :host([checked]) .box {
        background: var(--bi-sys-color-primary);
        outline-color: var(--bi-sys-color-primary);
      }
    `;

    this.shadowRoot.append(style, btn, slot);
  }

  // value property
  get value() {
    return this.getAttribute("value");
  }

  set value(v) {
    this.setAttribute("value", v);
  }

  // checked property
  get checked() {
    return this.hasAttribute("checked");
  }

  set checked(v) {
    this.toggleAttribute("checked", Boolean(v));
  }

  // disabled property
  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(v) {
    this.toggleAttribute("disabled", Boolean(v));
  }
}

customElements.define("bi-radio", BiRadio);
