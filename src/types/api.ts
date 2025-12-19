/**
 * Standard response type for Server Actions
 * Provides consistent success/error handling with optional field-level errors
 */
export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Pagination parameters for list queries
 */
export type PaginationParams = {
  page?: number;
  pageSize?: number;
};

/**
 * Paginated response wrapper
 */
export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

/**
 * Action response with pagination
 */
export type PaginatedActionResponse<T> = ActionResponse<PaginatedResponse<T>>;
