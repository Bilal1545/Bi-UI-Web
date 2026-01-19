import "./components/index.js";

function applyThemeClass() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const html = document.documentElement;

    if (prefersDark) {
        html.classList.add('dark');
        html.classList.remove('light');
    } else {
        html.classList.add('light');
        html.classList.remove('dark');
    }
}

applyThemeClass();

fetch("src/typography.css")
  .then(r => r.text())
  .then(css => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  });

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeClass);