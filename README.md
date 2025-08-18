# DevIT Group Test Store — Shopify Theme

Це кастомна тема Shopify з реалізованою секцією **Lookbook**, модальним вікном із картками продуктів і Gulp-збіркою для SCSS/JS.

---

## 🔧 Встановлення

1. Клонувати репозиторій:
```bash
git clone git@github.com-stasalex:StasAlex/devit-group-test-store.git
cd devit-group-test-store
```

2. Встановити залежності:
```bash
npm install
```

3. Запустити збірку у режимі розробки (watcher):
```bash
npm run dev
```

Для продакшн-збірки:
```bash
npm run build
```

---

## ⚙️ Структура

```
src/
  styles/
    main.scss
    sections/
      lookbook.scss
    components/
      modal.scss

  scripts/
    main.js
    sections/
      lookbook.js
   

assets/
  theme.css
  theme.js
```

- `src/` — сирцеві SCSS та JS файли
- `assets/` — скомпільовані файли, які підключаються до теми

---

## 🧩 Секція Lookbook

### Особливості:

- Зображення + заголовок + текст + кнопка
- Розташування контенту (ліворуч/по центру/праворуч)
- Налаштування padding'ів, висоти секції
- Фоновий колір
- Вибір продуктів, які відкриваються у модальному вікні

### Модальне вікно:

- Відображає всі вибрані продукти
- Опції варіантів (color, size тощо)
- AJAX Add to Cart
- Оновлення лічильника кошика + відкриття cart drawer

---

## 💡 Примітки

- Для підключення `theme.js` і `theme.css` у `theme.liquid`:
```liquid
{{ 'theme.css' | asset_url | stylesheet_tag }}
{{ 'theme.js' | asset_url | script_tag }}
```

- Змінюйте SCSS і JS тільки в `src/`, `assets/` — генерується автоматично

---

## 🧪 Тестування

1. Додайте секцію `Lookbook` через редактор теми
2. Налаштуйте картинку, текст, продукти
3. Перевірте адаптивність та взаємодію з кошиком

---

## 👨‍💻 Автор

Розробка: [Stas Alexandronets](https://github.com/StasAlex)
