import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, FindManyOptions } from "typeorm";
import { KeywordEntity } from "./entities/keyword.entity";

@Injectable()
export class KeywordService {
  constructor(private readonly dataSource: DataSource) {}

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
    const count = keywords.reduce((num, { keyword }) => {
      if (content.includes(keyword)) {
        num++;
      }
      return num;
    }, 0);

    return count;
  }
}
