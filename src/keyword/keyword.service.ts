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

  async getKeywordMatchCount(args: {
    userName: string;
    content: string;
  }): Promise<number> {
    const { userName, content } = args;
    const keywords = await this.getKeywords({
      where: {
        userName,
      },
    });

    // 게시글, 댓글내용에서 각 키워드가 포함된 총 개수를 계산합니다.
    // 해당 키워드가 포함된 경우, count를 증가시킵니다.
    const count = keywords.reduce((num, { keyword }) => {
      if (content.includes(keyword)) {
        num++;
      }
      return num;
    }, 0);

    return count;
  }
}
