import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("events")
class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;
}

export { Event };
