# Product Store - Inforce Test Task

Монорепозиторій з Product List Web App: фронтенд на Next.js (React + Redux + React Query) та бекенд на Nest.js.

## Опис проекту

Product Store - це веб-додаток для управління продуктами з двома основними екранами:

1. **Список продуктів** - перегляд всіх продуктів з можливістю сортування, додавання та видалення
2. **Детальна сторінка продукту** - повна інформація про продукт, редагування та управління коментарями

### Frontend
- **Next.js 15**
- **React 18**
- **TypeScript**
- **Redux Toolkit**
- **TanStack React Query**
- **Tailwind CSS**
- **Shadcn UI**
- **Zod**
- **React Hook Form**
- **Sonner**
- **Lucide React**

### Backend
- **Nest.js 10**
- **TypeScript**
- **Express**
- **Class-validator**
- **Class-transformer**

## 📁 Структура проекту

```
inforceTestTask/
├── apps/
│   ├── frontend/                   # Next.js Application
│   │   ├── src/
│   │   │   ├── app/               # Next.js App Router
│   │   │   │   ├── layout.tsx    # Root layout
│   │   │   │   ├── page.tsx      # Home page (Products list)
│   │   │   │   └── products/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx  # Product detail page
│   │   │   ├── components/        # React Components
│   │   │   │   ├── views/        # Page view containers
│   │   │   │   ├── forms/        # Form components
│   │   │   │   ├── ui/           # Shadcn UI components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductsToolbar.tsx
│   │   │   │   ├── CommentsSection.tsx
│   │   │   │   └── ...           # Other components
│   │   │   ├── api/              # API layer
│   │   │   │   ├── endpoints.ts  # API endpoints
│   │   │   │   ├── fetch.config.ts
│   │   │   │   ├── constants.ts  # Query keys
│   │   │   │   └── services/
│   │   │   │       ├── services.ts   # API service class
│   │   │   │       ├── queries.ts    # React Query hooks
│   │   │   │       └── mutations.ts  # Mutation hooks
│   │   │   ├── store/            # Redux store
│   │   │   ├── types/            # TypeScript types
│   │   │   ├── utils/            # Utility functions
│   │   │   │   ├── sorting.ts
│   │   │   │   ├── date.ts
│   │   │   │   ├── mappers.ts
│   │   │   │   └── text.ts
│   │   │   ├── lib/              # Libraries & validations
│   │   │   │   └── validations/
│   │   │   ├── config/           # Configuration
│   │   │   └── providers/        # Context providers
│   │   ├── CODE_STRUCTURE.md     # Code structure documentation
│   │   ├── REFACTORING.md        # Refactoring documentation
│   │   └── package.json
│   │
│   └── backend/                    # Nest.js Application
│       ├── src/
│       │   ├── main.ts           # Entry point
│       │   ├── app.module.ts     # Root module
│       │   └── products/         # Products module
│       │       ├── products.controller.ts
│       │       ├── products.service.ts
│       │       ├── products.module.ts
│       │       ├── dto/          # Data Transfer Objects
│       │       │   ├── create-product.dto.ts
│       │       │   ├── update-product.dto.ts
│       │       │   └── create-comment.dto.ts
│       │       └── interfaces/   # TypeScript interfaces
│       │           └── product.interface.ts
│       └── package.json
│
└── package.json                   # Root workspace configuration
```

## Встановлення

### Вимоги
- Node.js 18+ 
- npm 9+

### Крок 1: Клонування репозиторію
```bash
git clone <repository-url>
cd inforceTestTask
```

### Крок 2: Встановлення залежностей
```bash
npm install
```

Ця команда встановить всі залежності для frontend та backend через npm workspaces.

## Запуск проекту

### Швидкий старт (обидва додатки одночасно)

```bash
npm run dev
```

Це запустить:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

### Окремий запуск

#### Тільки Frontend
```bash
npm run dev:frontend
```
Доступний на: http://localhost:3000

#### Тільки Backend
```bash
npm run dev:backend
```
Доступний на: http://localhost:3001

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Отримати всі продукти |
| `GET` | `/api/products/:id` | Отримати продукт за ID |
| `POST` | `/api/products` | Створити новий продукт |
| `PUT` | `/api/products/:id` | Оновити продукт |
| `DELETE` | `/api/products/:id` | Видалити продукт |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/products/:id/comments` | Додати коментар до продукту |
| `DELETE` | `/api/products/:id/comments/:commentId` | Видалити коментар |

### Приклад payload для створення продукту
```json
{
  "name": "Product Name",
  "imageUrl": "https://images.unsplash.com/photo-...",
  "count": 10,
  "size": {
    "width": 30,
    "height": 20
  },
  "weight": "500g"
}
```

## Тестові продукти для створення

Ось приклади продуктів, які можна створити для тестування:

### 1. Ноутбук Dell XPS 15
```json
{
  "name": "Dell XPS 15 Laptop",
  "imageUrl": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
  "count": 15,
  "size": {
    "width": 35.7,
    "height": 23.5
  },
  "weight": "1.8kg"
}
```

### 2. Бездротові навушники Sony
```json
{
  "name": "Sony WH-1000XM5 Wireless Headphones",
  "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
  "count": 8,
  "size": {
    "width": 20,
    "height": 18
  },
  "weight": "250g"
}
```

### 3. Механічна клавіатура
```json
{
  "name": "Mechanical Gaming Keyboard RGB",
  "imageUrl": "https://images.unsplash.com/photo-1595225476474-87563907a212",
  "count": 12,
  "size": {
    "width": 44,
    "height": 13.5
  },
  "weight": "950g"
}
```

### 4. Смартфон iPhone
```json
{
  "name": "iPhone 15 Pro Max",
  "imageUrl": "https://images.unsplash.com/photo-1592286927505-4fbcf1f81d66",
  "count": 5,
  "size": {
    "width": 16,
    "height": 7.7
  },
  "weight": "221g"
}
```

### 5. Фітнес-трекер
```json
{
  "name": "Fitness Tracker Smart Watch",
  "imageUrl": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
  "count": 20,
  "size": {
    "width": 4.5,
    "height": 3.8
  },
  "weight": "32g"
}
```

### 6. Бездротова миша
```json
{
  "name": "Logitech MX Master 3S Wireless Mouse",
  "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  "count": 25,
  "size": {
    "width": 12.5,
    "height": 8.4
  },
  "weight": "141g"
}
```

### 7. Планшет iPad
```json
{
  "name": "iPad Pro 12.9-inch",
  "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
  "count": 7,
  "size": {
    "width": 28,
    "height": 21.5
  },
  "weight": "682g"
}
```

### 8. Портативний зарядний пристрій
```json
{
  "name": "Portable Power Bank 20000mAh",
  "imageUrl": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
  "count": 30,
  "size": {
    "width": 15,
    "height": 7
  },
  "weight": "365g"
}
```

##  Команди

### Root (всі workspace)
```bash
npm run dev          # Запустити frontend і backend
npm run build        # Зібрати frontend і backend
npm run dev:frontend # Запустити тільки frontend
npm run dev:backend  # Запустити тільки backend
npm install          # Встановити всі залежності
```

### Frontend (apps/frontend)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend (apps/backend)
```bash
npm run dev          # Development server (watch mode)
npm run build        # Production build
npm run start:prod   # Start production server
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
```
