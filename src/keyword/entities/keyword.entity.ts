import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("keywords")
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  userName: string;

  @Column()
  keyword: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
