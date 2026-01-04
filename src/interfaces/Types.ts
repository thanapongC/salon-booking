export interface PaginationMeta {
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const initialPaginationMeta: PaginationMeta = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 10,
  hasNextPage: false,
  hasPrevPage: false,
}