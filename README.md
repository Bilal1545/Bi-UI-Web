# Bi-UI Web

A lightweight Web Components UI kit with a configurable design system.

Bi-UI provides modern UI components without requiring frameworks, build tools, or large dependencies. It uses native Web Components and CSS variables to keep the stack simple, modular, and customizable.

Material 3 is the default style, but the system is not tied to a single design language.

---

## Features

* Native Web Components
* No framework dependency
* Configurable global interaction system
* Themeable with CSS variables
* Shadow DOM encapsulation
* Modular architecture
* Multiple visual styles support
* Minimal setup

---

## Configuration

Bi-UI includes a global configuration layer for interaction behavior and styling.

```js
window.BiUI = {
    interaction: {
        ripple: {
            enabled: true,
            duration: 520
        },
        scale: {
            enabled: false,
            hover: 1.04,
            active: 0.98,
            duration: 0.08
        }
    },
    styles: {
        elevation: true
    }
}
```

---

## Components

Current components:

* `bi-button`
* `bi-text-field`
* `bi-slider`
* `bi-fab`
* `bi-card`
* `bi-switch`
* `bi-radio`
* `bi-radio-group`
* `bi-shape`
* `bi-checkbox`
* `bi-icon`
* `bi-menu`
* `bi-menu-item`

More components are planned.

## Usage & Theming

Bi-UI uses CSS variables for theming. You can generate themes from the [Theme Generator](https://bilal.affedilmez.com/Bi-UI/index.htm#generator).

To learn how to use the library, check the [documentation](https://bilal.affedilmez.com/Bi-UI/index.htm#docs).

---

## Security & Encapsulation

* Shadow DOM-based component encapsulation
* No telemetry or tracking
* Configurable interaction layer
* Optional visual effects and behaviors

---

## License

MIT License

---

## Project Status

Bi-UI is currently in early development.

APIs and component behavior may evolve as the design system expands.

---

## Philosophy

Bi-UI is built around a simple idea:

UI libraries should reduce complexity, not introduce more of it.

The goal is to provide reusable, modern components that work with minimal setup while still allowing full control over styling and behavior.
