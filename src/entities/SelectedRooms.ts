import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SelectedRooms extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  HolidayHomeId!: String;

  @PrimaryColumn()
  unitCode!: string;

  @PrimaryColumn()
  roomCode!: string;
}
