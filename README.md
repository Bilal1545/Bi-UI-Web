# Bi-Design Kit Web

**A Material 3 inspired web design kit for lazy developers.**

Bi-Design Kit is a lightweight Web Components–based UI kit inspired by Google’s Material Design 3.  
It is designed for developers who want clean, modern UI components **without frameworks, build tools, or complexity**.

---

## ✨ Features

- 🧩 Native **Web Components**
- 🎨 **Material 3 inspired** design language
- ⚡ No framework required (no React, Vue, etc.)
- 🧠 Simple API, minimal configuration
- 🌗 Themeable with CSS variables
- 🧱 Modular & tree-shake–friendly
- 💤 Built for lazy people (less code, more UI)

---

## 📦 Components

Currently available components include:

- `bi-button`
- `bi-icon-button`
- `bi-text-field`
- `bi-slider`
- `bi-fab`
- `bi-card`
- `bi-split-button`
- `bi-switch`
- (More coming soon…)

---

## 🚀 Usage

### Include the library

```html
<script type="module" src="src/main.js"></script>
````

### Button example

```html
<bi-button variant="filled">
  Click me
</bi-button>
```

### Icon Button example

```html
<bi-icon-button variant="tonal">
  ✕
</bi-icon-button>
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

Bi-UI uses CSS variables compatible with Material 3 color tokens. If you don't specify them, it won't work.

For example look [this](example/tokens.css).

> For more information, check out the [wiki](https://bilal.affedilmez.com/design-kit/index.htm#docs). (Not usable now...)

---

## 🔐 Security & Customization

* Components use **Shadow DOM**
* Styles are encapsulated by default
* No tracking, no telemetry, no bullshit

---

## 📄 License

MIT License
Use it freely. Modify it. Ship it. Just don’t sue.

---

## 🧠 Philosophy

> UI libraries shouldn’t feel like a second job.

Bi-UI exists because sometimes you just want buttons and text fields
that **look good and work**, without pulling half of npm.

---

## 📌 Status

🚧 **Early development**
APIs may change. Components will grow.
