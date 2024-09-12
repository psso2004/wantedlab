export interface IOutputDto<T, TOutput> {
  fromEntity(source: T): TOutput;
}
