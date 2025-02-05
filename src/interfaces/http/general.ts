interface Filter {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "asc" | "desc";
  sortBy?: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export { Filter, Pagination };
