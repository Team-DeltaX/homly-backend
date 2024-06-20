import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class LocationAdmin {
  Save() {
    throw new Error("Method not implemented.");
  }
  @PrimaryColumn()
  AdminNo!: String;

  @Column()
  UserName!: string;

  @Column()
  Password!: string;

  @Column()
  ContactNo!: string;

  @Column()
  Email!: string;

  @Column()
  WorkLocation!: string;

  @Column({
    default: false,
  })
  Disabled!: Boolean;

  @Column({
    default: null,
  })
  Sub!: string;

  @Column()
  HolidayHomeId!: string;
}
