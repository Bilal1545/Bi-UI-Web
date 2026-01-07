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

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeClass);