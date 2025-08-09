[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Raven390_devhub-ui&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Raven390_devhub-ui) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Raven390_devhub-ui&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Raven390_devhub-ui) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Raven390_devhub-ui&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Raven390_devhub-ui) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Raven390_devhub-ui&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Raven390_devhub-ui) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Raven390_devhub-ui&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Raven390_devhub-ui) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Raven390_devhub-ui&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Raven390_devhub-ui)
 
# GameHub UI

Простой интерфейс для платформы кооперации геймдев-специалистов. Проект построен на базе **React**, **TypeScript** и **Vite**. Навигация реализована через **React Router DOM**.

## Требования

- Node.js **v18** или новее
- npm **v9** или новее

## Установка зависимостей

```bash
npm install
```

## Режим разработки

Запустите дев‑сервер командой:

```bash
npm run dev
```

После запуска приложение будет доступно по адресу `http://localhost:5173/` (порт может отличаться).

## Сборка проекта

Для подготовки production-версии выполните:

```bash
npm run build
```

Посмотреть собранный проект локально можно командой:

```bash
npm run preview
```

## Структура

- `src/` — исходный код компонентов и типов
- `index.html` — HTML‑шаблон
- `vite.config.ts` — конфигурация Vite
