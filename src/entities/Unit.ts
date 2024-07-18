import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Unit extends BaseEntity {
  @PrimaryColumn()
  unitCode!: String;

  @Column()
  unitAc!: String;

  @Column({
    type: "numeric",
  })
  floorLevel!: number;

  @Column()
  unitRemark!: String;

  @Column()
  roomAttached!: Boolean;

  @PrimaryColumn()
  HolidayHomeId!: string;
}
