export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  REVALIDATE_TIME: 60, // seconds
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 60 * 1000, // 1 minute
  REFETCH_ON_WINDOW_FOCUS: false,
  RETRY_COUNT: 1,
} as const;

export const UI_CONFIG = {
  CARD_IMAGE_HEIGHT: 500,
  PRODUCT_CARD_IMAGE_HEIGHT: 224, // h-56 = 224px
} as const;
