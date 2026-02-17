# Inforce Test Task - Monorepo

Це монорепозиторій з фронтендом на Next.js (React + Redux) та бекендом на Nest.js.

## Структура проекту

```
inforceTestTask/
├── apps/
│   ├── frontend/          # Next.js фронтенд
│   │   ├── src/
│   │   │   ├── app/       # App Router
│   │   │   ├── components/
│   │   │   └── store/     # Redux store
│   │   └── package.json
│   └── backend/           # Nest.js бекенд
│       ├── src/
│       │   ├── app.module.ts
│       │   ├── app.controller.ts
│       │   ├── app.service.ts
│       │   └── main.ts
│       └── package.json
└── package.json           # Root package.json
```

## Технології

### Frontend
- **Next.js 15** - React фреймворк з App Router
- **React 18** - UI бібліотека
- **Redux Toolkit** - Управління станом
- **TypeScript** - Типізація
- **Tailwind CSS** - Стилізація

### Backend
- **Nest.js 10** - Node.js фреймворк
- **TypeScript** - Типізація
- **Express** - HTTP сервер

## Встановлення

1. Встановіть всі залежності:

```bash
npm install
```

Це встановить залежності для всіх воркспейсів (frontend і backend).

## Запуск проекту

### Запуск обох додатків одночасно:

```bash
npm run dev
```

### Запуск тільки фронтенду:

```bash
npm run dev:frontend
```

Фронтенд буде доступний на http://localhost:3000

### Запуск тільки бекенду:

```bash
npm run dev:backend
```

Бекенд буде доступний на http://localhost:3001

## Команди для розробки

### Фронтенд

```bash
cd apps/frontend

# Запуск в режимі розробки
npm run dev

# Збірка для продакшену
npm run build

# Запуск продакшн версії
npm run start

# Лінтинг
npm run lint
```

### Бекенд

```bash
cd apps/backend

# Запуск в режимі розробки
npm run dev

# Збірка для продакшену
npm run build

# Запуск продакшн версії
npm run start:prod

# Лінтинг
npm run lint

# Тести
npm run test
npm run test:e2e
```

## API Endpoints

Бекенд надає наступні endpoints:

- `GET /` - Привітання
- `GET /api/health` - Перевірка здоров'я сервісу

## Redux Store

У фронтенді налаштований Redux Toolkit зі слайсом counter як приклад. Ви можете додати власні слайси в `apps/frontend/src/store/`.

## Особливості

- **Monorepo** з використанням npm workspaces
- **TypeScript** на фронтенді та бекенді
- **CORS** налаштований для взаємодії між фронтендом і бекендом
- **Hot reload** на обох додатках під час розробки
- **Готова структура** для масштабування проекту

## Подальший розвиток

Можливі напрямки розширення проекту:

1. Додати shared пакети для спільного коду
2. Інтегрувати базу даних (PostgreSQL, MongoDB)
3. Додати автентифікацію (JWT, Passport)
4. Налаштувати Docker для контейнеризації
5. Додати CI/CD pipeline
6. Інтегрувати тестування (Jest, Cypress)

## Ліцензія

MIT
