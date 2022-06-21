import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("launches")
class Launch {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  provider: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Launch };
