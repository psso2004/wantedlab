export interface IPaginated<TOutput> {
  data: TOutput[];
  meta: IPaginatedMeta;
}

export interface IPaginatedMeta {
  totalCount: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
}
