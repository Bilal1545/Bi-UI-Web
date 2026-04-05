# Bi-UI Web

**A Material 3 inspired, but not limited, web design kit for lazy developers.**

Bi-UI is a lightweight Web Components–based UI kit designed for developers who want clean, modern UI components **without frameworks, build tools, or unnecessary complexity**.

Unlike traditional UI kits, Bi-UI is **not locked into a single design language**.
Material 3 is just the default aesthetic, not the prison.

---

## ✨ Features

* 🧩 Native **Web Components**
* 🎨 **Multi-style design system** (Material 3 by default, fully customizable)
* ⚡ No framework required (no React, Vue, etc.)
* 🧠 Simple API, minimal configuration
* 🌗 Themeable with CSS variables
* 🧱 Modular & tree-shake friendly
* 🎛️ Built-in **config system for global behavior & styling**
* 🧃 Can be **Material, Flat, or fully custom design system**
* 💤 Built for lazy people (less code, more UI)

---

## 🎛️ Configuration System

Bi-UI is not just “drop components and pray”.

You can control global behavior via a config object:

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
            active: .98,
            duration: 0.08
        }
    },
    styles: {
        elevation: true
    }
}
```

## 📦 Components

Currently available components include:

* `bi-button`
* `bi-text-field`
* `bi-slider`
* `bi-fab`
* `bi-card`
* `bi-switch`
* `bi-radio`
* `bi-shape`
* (More coming soon… because apparently UI is infinite)

---

## 🚀 Usage

### Include the library

```html
<script type="module" src="src/main.js"></script>
```

### Button example

```html
<bi-button variant="filled">
  Click me
</bi-button>
```

### Text Field example

```html
<bi-text-field
  label="Username"
  placeholder="Enter your username"
  variant="outlined">
</bi-text-field>
```

---

## 🎨 Theming

Bi-UI uses CSS variables inspired by Material 3 tokens, but not spiritually obligated to them.

If you don’t define them, it will still try its best — but don’t blame it.

* Default tokens: `example/tokens.css`
* Theme generator: [https://bilal.affedilmez.com/Bi-UI/index.htm#generator](https://bilal.affedilmez.com/Bi-UI/index.htm#generator)
* Docs: [https://bilal.affedilmez.com/Bi-UI/index.htm#docs](https://bilal.affedilmez.com/Bi-UI/index.htm#docs)

---

## 🔐 Security & Customization

* Components use **Shadow DOM**
* Styles are encapsulated by default
* No tracking, no telemetry, no nonsense
* Fully configurable behavior layer
* You can disable most “smart” features if you prefer suffering manually

---

## 📄 License

MIT License
Use it freely. Modify it. Ship it. Don’t complain when you override everything and it breaks.

---

## 🧠 Philosophy

UI libraries shouldn’t feel like a second job.

Bi-UI exists because sometimes you just want buttons and text fields that **look good and work**, without pulling half of npm into your life decisions.

Also: it doesn’t assume Material Design is the only acceptable aesthetic reality. That’s a refreshing change.

---

## 📌 Status

🚧 **Early development**

APIs may change. Components will grow.
Design system flexibility will expand.
And yes, at some point someone will try to use it in a way you didn’t expect.