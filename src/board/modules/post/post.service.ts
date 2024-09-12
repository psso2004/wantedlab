import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { PostEntity } from "./entities/post.entity";

@Injectable()
export class PostService {
  constructor(private readonly dataSource: DataSource) {}

  createPost(
    createData: DeepPartial<PostEntity>,
    entityManager?: EntityManager
  ): Promise<PostEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    // todo: password hash
    return em.save(PostEntity, createData);
  }

  async updatePost(
    updateData: DeepPartial<PostEntity>,
    entityManager?: EntityManager
  ): Promise<PostEntity> {
    const em = entityManager ?? this.dataSource.createEntityManager();

    const { id } = updateData;
    const post = await em.findOneBy(PostEntity, { id });
    if (!post) {
      throw new NotFoundException("post not found");
    }

    em.merge(PostEntity, post, updateData);
    return em.save(PostEntity, post);
  }

  async deletePost(id: number, entityManager?: EntityManager): Promise<void> {
    const em = entityManager ?? this.dataSource.createEntityManager();
    await em.softDelete(PostEntity, id);
  }
}
