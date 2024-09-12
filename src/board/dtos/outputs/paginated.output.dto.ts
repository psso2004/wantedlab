export function PaginatedOutput<T, TOutput>(
  OutputClass: new (source: T) => TOutput,
  items: T[],
  total: number,
  currentPage: number,
  perPage: number
) {
  class PaginatedOutputDto {
    constructor(
      readonly items: T[],
      readonly total: number,
      readonly currentPage: number,
      readonly perPage: number
    ) {}

    get date(): TOutput[] {
      return this.items.map((item) => new OutputClass(item));
    }

    get meta() {
      return {
        totalCount: this.total,
        currentPage: this.currentPage,
        perPage: this.perPage,
        lastPage: Math.max(Math.ceil(this.total / this.perPage), 1),
      };
    }
  }

  return new PaginatedOutputDto(items, total, currentPage, perPage);
}
