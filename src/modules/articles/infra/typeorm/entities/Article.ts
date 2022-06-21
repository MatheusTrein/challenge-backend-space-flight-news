import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Launch } from "./Launch";
import { Event } from "./Event";

@Entity("articles")
class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "reference_id" })
  referenceId: number;

  @Column()
  featured: boolean;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ name: "image_url" })
  imageUrl: string;

  @Column({ name: "news_site" })
  newsSite: string;

  @Column()
  summary: string;

  @Column({ name: "published_at" })
  publishedAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  //Relations:

  @ManyToMany(() => Launch, {
    cascade: true,
  })
  @JoinTable({
    name: "articles_launches",
    joinColumns: [{ name: "article_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "launch_id", referencedColumnName: "id" }],
  })
  launches: Launch[];

  @ManyToMany(() => Event, {
    cascade: true,
  })
  @JoinTable({
    name: "articles_events",
    joinColumns: [{ name: "article_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "event_id", referencedColumnName: "id" }],
  })
  events: Event[];
}

export { Article };
