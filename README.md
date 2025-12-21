# Bi-Design Kit Web

Material Design 3 standartlarına uygun modern web component kütüphanesi.

## 📦 Component'ler

### 🎨 UI Element'leri
- **bi-button** - Buton component'i
- **bi-card** - Kart component'i  
- **bi-fab** - Floating Action Button
- **bi-icon-button** - İkon butonu
- **bi-switch** - Toggle switch
- **bi-slider** - Kaydırıcı
- **bi-text-field** - Metin giriş alanı
- **bi-split-button** - Bölünmüş buton

## 🚀 Hızlı Başlangıç

<link rel="stylesheet" href="example/tokens.css">

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="src/styles/tokens.css">
    <script type="module" src="src/components/index.js"></script>
</head>
<body>
    <!-- Component kullanımı -->
    <bi-button variant="filled">Tıkla</bi-button>
    <bi-text-field label="Adınız"></bi-text-field>
</body>
</html>
```

<bi-button variant="tonal" label="Adınız">Deneme</bi-button>

## 🎨 Tema

Material Design 3 renk sistemi kullanılır. Tüm renkler `src/styles/tokens.css` dosyasında tanımlıdır:

```css
:root {
  --primary: #ffb786;
  --onPrimary: #502400;
  --surface: #19120d;
  --onSurface: #f0dfd7;
  /* ... */
}
```

## 🔧 Geliştirme

```bash
# HTTP server ile çalıştır
python3 -m http.server 8080

# Demo sayfasını aç
http://localhost:8080/text-fields-demo.html
```

## 📱 Demo

- [Text Fields Demo](text-fields-demo.html) - Metin alanları özellikleri

## 🏗️ Proje Yapısı

```
src/
├── components/          # Web component'ler
│   ├── bi-button.js
│   ├── bi-card.js
│   ├── bi-fab.js
│   ├── bi-icon-button.js
│   ├── bi-slider.js
│   ├── bi-split-button.js
│   ├── bi-switch.js
│   ├── bi-text-field.js
│   └── index.js
├── styles/
│   └── tokens.css      # Material 3 token'ları
└── utils/               # Yardımcı fonksiyonlar
```

## 📄 Lisans

MIT License
<script type="module" src="./src/main.js"></script>