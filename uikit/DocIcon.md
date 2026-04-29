# Использование `Icon` vs `AppIcon`

## `Icon` (базовый)

Используется для **UIKit-иконок (defaultIcons)**.

```tsx
<Icon name="Close" />
```

**Когда использовать:**

* только встроенные иконки библиотеки
* не нужен `DUIProvider`
* простой случай

**Ограничения:**

* нет кастомных иконок
* autocomplete только по `defaultIcons`

---

## `AppIcon` (typed)

Создаётся через:

```ts
const AppIcon = createIcon<TAppIcons>();
```

Используется для **кастомных + встроенных иконок**.

```tsx
<AppIcon name="User" />
<AppIcon name="Close" />
```

**Когда использовать:**

* есть кастомные иконки
* нужен autocomplete (`User`, `Settings`, `Close`)
* production код приложения

**Требует:**

```tsx
<DUIProvider icons={appIcons}>
  <AppIcon name="User" />
</DUIProvider>
```

---

## Кратко

| Компонент | Иконки         | Provider   | Autocomplete |
| --------- | -------------- | ---------- | ------------ |
| `Icon`    | только UIKit   | не нужен   | базовый      |
| `AppIcon` | UIKit + кастом | обязателен | полный       |

---

## Рекомендация

* UIKit → `Icon`
* Приложение → `AppIcon`
