import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column('text')
  content!: string;

  @Column({ default: false })
  published: boolean = false;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];
} 