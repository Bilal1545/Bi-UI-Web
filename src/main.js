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

const style = document.createElement("style");
style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,XOPQ,XTRA,YOPQ,YTDE,YTFI,YTLC,YTUC@8..144,100..1000,96,468,79,-203,738,514,712&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

:root {
    --bi-ref-typeface-brand: 'Roboto Flex', sans-serif;
    --bi-ref-typeface-plain: system-ui, -apple-system, sans-serif;
    --bi-sys-typescale-display-large-size: clamp(2.5rem, 7vw + 1rem, 3.5625rem);
    --bi-sys-typescale-display-medium-size: clamp(2.25rem, 5vw + 1rem, 2.8125rem);
    --bi-sys-typescale-display-small-size: clamp(2rem, 4vw + 1rem, 2.25rem);
    --bi-sys-typescale-headline-large-size: clamp(1.75rem, 3vw + 1rem, 2rem);
    --bi-sys-typescale-headline-medium-size: clamp(1.5rem, 2vw + 1rem, 1.75rem);
    --bi-sys-typescale-headline-small-size: clamp(1.25rem, 1.5vw + 1rem, 1.5rem);
    --bi-sys-typescale-title-large-size: clamp(1.25rem, 0.5vw + 1rem, 1.375rem);
    --bi-sys-typescale-title-medium-size: 1rem;
    --bi-sys-typescale-title-small-size: 0.875rem;
    --bi-sys-typescale-body-large-size: 1rem;
    --bi-sys-typescale-body-medium-size: 0.875rem;
    --bi-sys-typescale-body-small-size: 0.75rem;
    --bi-sys-typescale-label-large-size: 0.875rem;
    --bi-sys-typescale-label-medium-size: 0.75rem;
    --bi-sys-typescale-label-small-size: 0.6875rem;

    --bi-sys-typescale-display-large-line-height: 1.12;
    --bi-sys-typescale-display-medium-line-height: 1.15;
    --bi-sys-typescale-display-small-line-height: 1.22;
    --bi-sys-typescale-headline-large-line-height: 1.25;
    --bi-sys-typescale-headline-medium-line-height: 1.28;
    --bi-sys-typescale-headline-small-line-height: 1.33;
    --bi-sys-typescale-title-large-line-height: 1.27;
    --bi-sys-typescale-title-medium-line-height: 1.5;
    --bi-sys-typescale-title-small-sizline-heighte: 1.42;
    --bi-sys-typescale-body-large-line-height: 1.5;
    --bi-sys-typescale-body-medium-line-height: 1.42;
    --bi-sys-typescale-body-small-line-height: 1.33;
    --bi-sys-typescale-label-large-line-height: 1.42;
    --bi-sys-typescale-label-medium-line-height: 1.33;
    --bi-sys-typescale-label-small-line-height: 1.45;

    --bi-sys-typescale-display-large-letter-spacing: -0.01em;
    --bi-sys-typescale-display-medium-letter-spacing: 0;
    --bi-sys-typescale-display-small-letter-spacing: 0;
    --bi-sys-typescale-headline-large-letter-spacing: 0;
    --bi-sys-typescale-headline-medium-letter-spacing: 0;
    --bi-sys-typescale-headline-small-letter-spacing: 0;
    --bi-sys-typescale-title-large-letter-spacing: 0.01em;
    --bi-sys-typescale-title-medium-letter-spacing: 0.01em;
    --bi-sys-typescale-title-small-letter-spacing: 0.01em;
    --bi-sys-typescale-body-large-letter-spacing: 0.03em;
    --bi-sys-typescale-body-medium-letter-spacing: 0.02em;
    --bi-sys-typescale-body-small-letter-spacing: 0.03em;
    --bi-sys-typescale-label-large-letter-spacing: 0.01em;
    --bi-sys-typescale-label-medium-letter-spacing: 0.04em;
    --bi-sys-typescale-label-small-letter-spacing: 0.04em;

    --bi-sys-typescale-display-large-weight: 400;
    --bi-sys-typescale-display-medium-weight: 400;
    --bi-sys-typescale-display-small-weight: 400;
    --bi-sys-typescale-headline-large-weight: 400;
    --bi-sys-typescale-headline-medium-weight: 400;
    --bi-sys-typescale-headline-small-weight: 400;
    --bi-sys-typescale-title-large-weight: 400;
    --bi-sys-typescale-title-medium-weight: 500;
    --bi-sys-typescale-title-small-weight: 500;
    --bi-sys-typescale-body-large-weight: 400;
    --bi-sys-typescale-body-medium-weight: 400;
    --bi-sys-typescale-body-small-weight: 400;
    --bi-sys-typescale-label-large-weight: 500;
    --bi-sys-typescale-label-medium-weight: 500;
    --bi-sys-typescale-label-small-weight: 500;
}

/* Global Font Settings */
* {
    font-family: var(--bi-ref-typeface-brand);
    -webkit-font-smoothing: antialiased;
}

/* --- DISPLAY --- */
.bi-typescale-display.large {
    font-size: var(--bi-sys-typescale-display-large-size);
    line-height: var(--bi-sys-typescale-display-large-line-height);
    letter-spacing: var(--bi-sys-typescale-display-large-letter-spacing);
    font-weight: var(--bi-sys-typescale-display-large-weight);
}

.bi-typescale-display,
.bi-typescale-display.medium {
    font-size: var(--bi-sys-typescale-display-medium-size);
    line-height: var(--bi-sys-typescale-display-medium-line-height);
    letter-spacing: var(--bi-sys-typescale-display-medium-letter-spacing);
    font-weight: var(--bi-sys-typescale-display-medium-weight);
}

.bi-typescale-display.small {
    font-size: var(--bi-sys-typescale-display-small-size);
    line-height: var(--bi-sys-typescale-display-small-line-height);
    letter-spacing: var(--bi-sys-typescale-display-small-letter-spacing);
    font-weight: var(--bi-sys-typescale-display-small-weight);
}

/* --- HEADLINE --- */
.bi-typescale-headline.large {
    font-size: var(--bi-sys-typescale-headline-large-size);
    line-height: var(--bi-sys-typescale-headline-large-line-height);
    letter-spacing: var(--bi-sys-typescale-headline-large-letter-spacing);
    font-weight: var(--bi-sys-typescale-headline-large-weight);
}

.bi-typescale-headline,
.bi-typescale-headline.medium {
    font-size: var(--bi-sys-typescale-headline-medium-size);
    line-height: var(--bi-sys-typescale-headline-medium-line-height);
    letter-spacing: var(--bi-sys-typescale-headline-medium-letter-spacing);
    font-weight: var(--bi-sys-typescale-headline-medium-weight);
}

.bi-typescale-headline.small {
    font-size: var(--bi-sys-typescale-headline-small-size);
    line-height: var(--bi-sys-typescale-headline-small-line-height);
    letter-spacing: var(--bi-sys-typescale-headline-small-letter-spacing);
    font-weight: var(--bi-sys-typescale-headline-small-weight);
}

/* --- TITLE --- */
.bi-typescale-title.large {
    font-size: var(--bi-sys-typescale-title-large-size);
    line-height: var(--bi-sys-typescale-title-large-line-height);
    letter-spacing: var(--bi-sys-typescale-title-large-letter-spacing);
    font-weight: var(--bi-sys-typescale-title-large-weight);
}

.bi-typescale-title,
.bi-typescale-title.medium {
    font-size: var(--bi-sys-typescale-title-medium-size);
    line-height: var(--bi-sys-typescale-title-medium-line-height);
    letter-spacing: var(--bi-sys-typescale-title-medium-letter-spacing);
    font-weight: var(--bi-sys-typescale-title-medium-weight);
}

.bi-typescale-title.small {
    font-size: var(--bi-sys-typescale-title-small-size);
    line-height: var(--bi-sys-typescale-title-small-line-height);
    letter-spacing: var(--bi-sys-typescale-title-small-letter-spacing);
    font-weight: var(--bi-sys-typescale-title-small-weight);
}

/* --- BODY --- */
.bi-typescale-body,
.bi-typescale-body.large {
    font-size: var(--bi-sys-typescale-body-large-size);
    line-height: var(--bi-sys-typescale-body-large-line-height);
    letter-spacing: var(--bi-sys-typescale-body-large-letter-spacing);
    font-weight: var(--bi-sys-typescale-body-large-weight);
}

.bi-typescale-body.medium {
    font-size: var(--bi-sys-typescale-body-medium-size);
    line-height: var(--bi-sys-typescale-body-medium-line-height);
    letter-spacing: var(--bi-sys-typescale-body-medium-letter-spacing);
    font-weight: var(--bi-sys-typescale-body-medium-weight);
}

.bi-typescale-body.small {
    font-size: var(--bi-sys-typescale-body-small-size);
    line-height: var(--bi-sys-typescale-body-small-line-height);
    letter-spacing: var(--bi-sys-typescale-body-small-letter-spacing);
    font-weight: var(--bi-sys-typescale-body-small-weight);
}

/* --- LABEL --- */
.bi-typescale-label,
.bi-typescale-label.large {
    font-size: var(--bi-sys-typescale-label-large-size);
    line-height: var(--bi-sys-typescale-label-large-line-height);
    letter-spacing: var(--bi-sys-typescale-label-large-letter-spacing);
    font-weight: var(--bi-sys-typescale-label-large-weight);
}

.bi-typescale-label.medium {
    font-size: var(--bi-sys-typescale-label-medium-size);
    line-height: var(--bi-sys-typescale-label-medium-line-height);
    letter-spacing: var(--bi-sys-typescale-label-medium-letter-spacing);
    font-weight: var(--bi-sys-typescale-label-medium-weight);
}

.bi-typescale-label.small {
    font-size: var(--bi-sys-typescale-label-small-size);
    line-height: var(--bi-sys-typescale-label-small-line-height);
    letter-spacing: var(--bi-sys-typescale-label-small-letter-spacing);
    font-weight: var(--bi-sys-typescale-label-small-weight);
}`;
document.head.appendChild(style);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeClass);