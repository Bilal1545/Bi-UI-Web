class BiCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const btn = document.createElement("button");

    const box = document.createElement("span");
    box.className = "box";

    const iconCheck = document.createElement("span");
    iconCheck.className = "icon check";
    iconCheck.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path
          d="M2 9l3 3 9-9"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;

    const iconIndeterminate = document.createElement("span");
    iconIndeterminate.className = "icon indeterminate";
    iconIndeterminate.innerHTML = `
      <svg viewBox="0 0 16 16">
        <line
          x1="3"
          y1="8"
          x2="13"
          y2="8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    `;

    const ripple = document.createElement("bi-ripple");
    const slot = document.createElement("slot");

    box.append(iconCheck, iconIndeterminate);
    btn.append(ripple, box, slot);

    btn.addEventListener("click", () => {
      if (this.hasAttribute("disabled")) return;

      if (this.hasAttribute("indeterminate")) {
        this.removeAttribute("indeterminate");
        this.setAttribute("checked", "");
      } else {
        this.toggleAttribute("checked");
      }
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
        gap: 0.75rem;

        padding: 0.75rem;

        border-radius: 50%;
        border: none;
        cursor: pointer;

        background: transparent;
        color: var(--primary);

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
        width: 1.25rem;
        height: 1.25rem;

        border-radius: 4px;
        border: 2px solid var(--outline);

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background 0.2s ease, border-color 0.2s ease;
      }

      .icon {
        width: 0.875rem;
        height: 0.875rem;
        display: none;
        color: var(--onPrimary, white);
      }

      .icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* ===== CHECKED ===== */

      :host([checked]) .box {
        background: var(--primary);
        border-color: var(--primary);
      }

      :host([checked]) .icon.check {
        display: block;
      }

      /* ===== INDETERMINATE ===== */

      :host([indeterminate]) .box {
        background: var(--primary);
        border-color: var(--primary);
      }

      :host([indeterminate]) .icon.indeterminate {
        display: block;
      }
    `;

    this.shadowRoot.append(style, btn);
  }
}

customElements.define("bi-checkbox", BiCheckbox);
