import { IOutputDto } from "../interfaces/output.interface";
import { IPaginated, IPaginatedMeta } from "../interfaces/paginated.interface";

export function PaginatedOutput<T, TOutput>(
  OutputClass: IOutputDto<T, TOutput>,
  items: T[],
  total: number,
  currentPage: number,
  perPage: number
): IPaginated<TOutput> {
  class PaginatedOutputDto {
    constructor(readonly data: TOutput[], readonly meta: IPaginatedMeta) {}

    static create(
      items: T[],
      total: number,
      currentPage: number,
      perPage: number
    ): PaginatedOutputDto {
      return new PaginatedOutputDto(
        items.map((item) => OutputClass.fromEntity(item)),
        {
          totalCount: total,
          currentPage: currentPage,
          perPage: perPage,
          lastPage: Math.max(Math.ceil(total / perPage), 1),
        }
      );
    }
  }

  return PaginatedOutputDto.create(items, total, currentPage, perPage);
}
