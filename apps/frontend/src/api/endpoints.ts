export const endpoints = {
  products: {
    getAll: '/api/products',
    getById: (id: string) => `/api/products/${id}`,
    create: '/api/products',
    update: (id: string) => `/api/products/${id}`,
    delete: (id: string) => `/api/products/${id}`,
    addComment: (id: string) => `/api/products/${id}/comments`,
    deleteComment: (id: string, commentId: string) => `/api/products/${id}/comments/${commentId}`,
  },
};