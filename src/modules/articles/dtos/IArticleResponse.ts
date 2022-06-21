import { Event } from "../infra/typeorm/entities/Event";
import { Launch } from "../infra/typeorm/entities/Launch";

interface IArticleResponse {
  id: number;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  publishedAt: Date;
  updatedAt: Date;
  summary: string;
  launches: Launch[];
  events: Event[];
}

export { IArticleResponse };
