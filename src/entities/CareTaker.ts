import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class CareTaker extends BaseEntity {
  @PrimaryColumn()
  CareTakerId!: string;

  @Column()
  Name!: string;

  @Column({
    unique: true,
    width: 10,
  })
  ContactNo!: number;

  @Column()
  Status!: string;

  @Column()
  Address!: string;

  @Column()
  Description!: string;

  @Column({
    default: null,
  })
  Image!: string;

  @Column()
  HolidayHomeId!: string;
}
