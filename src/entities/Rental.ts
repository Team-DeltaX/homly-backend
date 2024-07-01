import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Rental extends BaseEntity {
  @PrimaryColumn()
  Month!: String;

  @Column({
    type: "numeric",
  })
  WeekRental!: number;

  @Column({
    type: "numeric",
  })
  WeekEndRental!: number;

  @PrimaryColumn()
  HolidayHomeId!: String;

  @PrimaryColumn()
  HRUId!: String;
}
