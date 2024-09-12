import { Injectable, NotFoundException } from "@nestjs/common";
import {
  DataSource,
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
} from "typeorm";
import { PostEntity } from "./entities/post.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class PostService {
  constructor(private readonly dataSource: DataSource) {}

  getPost(where: FindOptionsWhere<PostEntity>): Promise<PostEntity | null> {
    const repo = this.dataSource.getRepository(PostEntity);
    return repo.findOneBy(where);
  }

  getPosts(options: FindManyOptions<PostEntity> = {}): Promise<PostEntity[]> {
    const repo = this.dataSource.getRepository(PostEntity);
    return repo.find(options);
  }

  getTotalPostsCount(
    where: FindOptionsWhere<PostEntity> = {}
  ): Promise<number> {
    const repo = this.dataSource.getRepository(PostEntity);
    return repo.countBy(where);
  }

  async createPost(
    createData: DeepPartial<PostEntity>,
    entityManager?: EntityManager
  ): Promise<PostEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();

    const hashedPassword = await this.hashPassword(createData.password);
    const post = em.create(
      PostEntity,
      Object.assign(createData, {
        password: hashedPassword,
      })
    );

    return em.save(PostEntity, post);
  }

  async updatePost(
    updateData: DeepPartial<PostEntity>,
    entityManager?: EntityManager
  ): Promise<PostEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();

    const { id, password, ...filteredUpdateData } = updateData;
    const post = await em.findOneBy(PostEntity, { id });
    if (!post) {
      throw new NotFoundException("post not found");
    }

    em.merge(PostEntity, post, filteredUpdateData);
    return em.save(PostEntity, post);
  }

  async deletePost(id: number, entityManager?: EntityManager): Promise<void> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    await em.softDelete(PostEntity, id);
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
