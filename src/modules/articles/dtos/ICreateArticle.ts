import { Launch } from "../infra/typeorm/entities/Launch";
import { Event } from "../infra/typeorm/entities/Event";

interface ICreateArticle {
  id?: number;
  referenceId?: number;
  featured?: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  publishedAt?: Date;
  updatedAt?: Date;
  summary: string;
  launches?: Launch[];
  events?: Event[];
}

export { ICreateArticle };
