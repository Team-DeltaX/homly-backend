import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
@Entity()
export class Hall extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  hallCode!: string;

  @PrimaryColumn({
    unique: true,
  })
  HolidayHomeId!: string;

  @Column()
  hallAc!: string;

  @Column()
  floorLevel!: number;

  @Column()
  hallNoOfAdults!: number;

  @Column()
  hallNoOfChildren!: number;

  @Column()
  hallRemark!: string;

  @Column({
    type: "numeric",
  })
  hallRental!: number;
}
