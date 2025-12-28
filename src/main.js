import "./components/index.js";

// Tarayıcı/OS tema tercihine göre class ekleme
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

// Sayfa yüklendiğinde uygula
applyThemeClass();

// Tema tercihi değişirse otomatik güncelle
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeClass);