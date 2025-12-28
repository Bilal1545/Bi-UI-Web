class BiCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const card = document.createElement('div');
    card.className = 'card';
    
    // Create header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'card-header';
    
    // Create title element
    const titleElement = document.createElement('div');
    titleElement.className = 'card-title';
    
    // Create subtitle element
    const subtitleElement = document.createElement('div');
    subtitleElement.className = 'card-subtitle';
    
    // Create header slot for custom content
    const headerSlot = document.createElement('slot');
    headerSlot.name = 'header';
    
    // Create content slot
    const contentSlot = document.createElement('slot');
    
    // Create actions slot
    const actionsSlot = document.createElement('slot');
    actionsSlot.name = 'actions';
    
    // Create actions container
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'card-actions';
    actionsContainer.appendChild(actionsSlot);
    
    headerContainer.appendChild(titleElement);
    headerContainer.appendChild(subtitleElement);
    headerContainer.appendChild(headerSlot);
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'card-content';
    contentContainer.appendChild(contentSlot);
    
    card.appendChild(headerContainer);
    card.appendChild(contentContainer);
    card.appendChild(actionsContainer);

    // Store references for later updates
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
    this._contentElement = contentContainer;

    const style = document.createElement("style");
    style.textContent = `
      .card {
        background: var(--bi-sys-color-surface-container-low);
        color: var(--bi-sys-color-on-surface);
        border-radius: 1rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 3px 1px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
      }

      .card:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
      }

      .card:active {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 3px 1px rgba(0, 0, 0, 0.05);
      }

      .card-header {
        padding: 1rem 1rem 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .card-header:empty {
        display: none;
      }

      .card-content {
        padding: 0 1rem 1rem 1rem;
        flex: 1;
      }

      .card-content:empty + .card-actions {
        padding-top: 1rem;
      }

      .card-actions {
        padding: 0.5rem 1rem 1rem 1rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: flex-end;
      }

      .card-title {
        font-weight: 500;
        font-size: 1.125rem;
        line-height: 1.5;
        color: inherit;
      }

      .card-subtitle {
        font-size: 0.875rem;
        line-height: 1.4;
        opacity: 0.8;
        color: inherit;
      }

      .card-title:empty,
      .card-subtitle:empty {
        display: none;
      }

      .card-actions:empty {
        display: none;
      }

      /* Size variants */
      :host([size="xs"]) .card {
        border-radius: 0.5rem;
      }

      :host([size="xs"]) .card-header {
        padding: 0.5rem 0.5rem 0.25rem 0.5rem;
        gap: 0.5rem;
      }

      :host([size="xs"]) .card-content {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.75rem;
      }

      :host([size="xs"]) .card-actions {
        padding: 0.25rem 0.5rem 0.5rem 0.5rem;
        gap: 0.25rem;
      }

      :host([size="sm"]) .card {
        border-radius: 0.75rem;
      }

      :host([size="sm"]) .card-header {
        padding: 0.75rem 0.75rem 0.375rem 0.75rem;
        gap: 0.625rem;
      }

      :host([size="sm"]) .card-content {
        padding: 0 0.75rem 0.75rem 0.75rem;
        font-size: 0.8125rem;
      }

      :host([size="sm"]) .card-actions {
        padding: 0.375rem 0.75rem 0.75rem 0.75rem;
        gap: 0.375rem;
      }

      :host([size="lg"]) .card {
        border-radius: 1.25rem;
      }

      :host([size="lg"]) .card-header {
        padding: 1.25rem 1.25rem 0.625rem 1.25rem;
        gap: 0.875rem;
      }

      :host([size="lg"]) .card-content {
        padding: 0 1.25rem 1.25rem 1.25rem;
        font-size: 1rem;
      }

      :host([size="lg"]) .card-actions {
        padding: 0.625rem 1.25rem 1.25rem 1.25rem;
        gap: 0.625rem;
      }

      :host([size="xl"]) .card {
        border-radius: 1.5rem;
      }

      :host([size="xl"]) .card-header {
        padding: 1.5rem 1.5rem 0.75rem 1.5rem;
        gap: 1rem;
      }

      :host([size="xl"]) .card-content {
        padding: 0 1.5rem 1.5rem 1.5rem;
        font-size: 1.125rem;
      }

      :host([size="xl"]) .card-actions {
        padding: 0.75rem 1.5rem 1.5rem 1.5rem;
        gap: 0.75rem;
      }

      /* Variant styles */
      :host([variant="outlined"]) .card {
        background: var(--bi-sys-color-surface);
        border: 1px solid var(--bi-sys-color-outline);
        box-shadow: none;
      }

      :host([variant="outlined"]) .card:hover {
        box-shadow: none;
        border-color: var(--bi-sys-color-on-surface);
      }

      :host([variant="filled"]) .card {
        background: var(--bi-sys-color-surface-container);
        box-shadow: none;
      }

      :host([variant="filled"]) .card:hover {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 3px 1px rgba(0, 0, 0, 0.08);
      }

      :host([variant="elevated"]) .card {
        background: var(--bi-sys-color-surface-container-low);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
      }

      :host([variant="elevated"]) .card:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.12);
      }

      /* Color variants */
      :host([color="primary"]) .card {
        background: var(--bi-sys-color-primary-container);
        color: var(--bi-sys-color-on-primary-container);
      }

      :host([color="secondary"]) .card {
        background: var(--bi-sys-color-secondary-container);
        color: var(--bi-sys-color-on-secondary-container);
      }

      :host([color="tertiary"]) .card {
        background: var(--bi-sys-color-tertiary-container);
        color: var(--bi-sys-color-on-tertiary-container);
      }

      :host([color="surface"]) .card {
        background: var(--bi-sys-color-surface);
        color: var(--bi-sys-color-on-surface);
      }

      :host([color="surface-variant"]) .card {
        background: var(--bi-sys-color-surface-variant);
        color: var(--bi-sys-color-on-surface-variant);
      }

      /* Clickable card */
      :host([clickable]) .card {
        cursor: pointer;
        user-select: none;
      }

      :host([clickable]) .card:hover {
        transform: translateY(-1px);
      }

      :host([clickable]) .card:active {
        transform: translateY(0);
      }

      /* Disabled state */
      :host([disabled]) .card {
        opacity: 0.38;
        pointer-events: none;
        cursor: not-allowed;
      }
    `;

    this.shadowRoot.append(style, card);
  }

  connectedCallback() {
    this._updateContent();
  }

  static get observedAttributes() {
    return ['title', 'subtitle', 'text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateContent();
    }
  }

  _updateContent() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const text = this.getAttribute('text') || '';

    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
    
    // Only update text content if there are no slotted elements
    if (!this.querySelector(':not([slot])')) {
      this._contentElement.textContent = text;
    }
  }
}

customElements.define("bi-card", BiCard);
