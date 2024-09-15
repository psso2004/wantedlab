import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, FindManyOptions } from "typeorm";
import { KeywordEntity } from "./entities/keyword.entity";

@Injectable()
export class KeywordService {
  constructor(private readonly dataSource: DataSource) {}

  // (공통) EntityManager가 주입되지 않을 경우, 기본 EntityManager를 생성합니다.
  // 이 매개변수는 트랜잭션 내에서 사용되며, 여러 작업을 하나의 트랜잭션으로 묶어야 할 때 사용됩니다.
  getKeywords(
    options: FindManyOptions<KeywordEntity>,
    entityManager?: EntityManager
  ): Promise<KeywordEntity[]> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.find(KeywordEntity, options);
  }

  getUniqueKeywords(): Promise<{ keyword: string }[]> {
    const repo = this.dataSource.getRepository(KeywordEntity);
    return repo
      .createQueryBuilder("keyword")
      .select("keyword.keyword", "keyword")
      .groupBy("keyword.keyword")
      .getRawMany<{ keyword: string }>();
  }

  async getMatchKeywords(content: string): Promise<string[]> {
    const keywords = await this.getUniqueKeywords();
    return keywords
      .filter(({ keyword }) => content.includes(keyword))
      .map(({ keyword }) => keyword);
  }
}
