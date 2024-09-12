import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, FindOptionsWhere } from "typeorm";
import { KeywordEntity } from "./entities/keyword.entity";

@Injectable()
export class KeywordService {
  constructor(private readonly dataSource: DataSource) {}

  getKeyword(
    where: FindOptionsWhere<KeywordEntity>,
    entityManager?: EntityManager
  ): Promise<KeywordEntity | null> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    return em.findOneBy(KeywordEntity, where);
  }
}
