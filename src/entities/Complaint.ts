import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Complaints {
  Save() {
    throw new Error("Method not implemented.");
  }
  @PrimaryColumn()
  ComplaintID!: String;

  @Column()
  ServiceNo!: String;

  @Column()
  AdminNo!: String;

  @Column()
  ReservationNo!: String;

  @CreateDateColumn({
    nullable: false,
  })
  created_at!: Date;

  @Column()
  Reason!: String;

  @Column({
    default: false,
  })
  Marked!: Boolean;

  @Column({
    default: false,
  })
  IsWarned!: Boolean;
}
