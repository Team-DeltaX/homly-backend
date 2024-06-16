import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export enum Role {
  USER = "User",
  PRIADMIN = "PrimaryAdmin",
  LOCADMIN = "LocationAdmin",
}
@Entity()
export class Reservation extends BaseEntity {
  @PrimaryColumn()
  ReservationId!: string;

  @Column()
  ServiceNO!: string;

  @Column()
  HolidayHome!: string;

  @Column({
    type: "date",
  })
  CheckinDate!: Date;

  @Column({
    type: "date",
  })
  CheckoutDate!: Date;

  @Column()
  NoOfAdults!: number;

  @Column()
  NoOfChildren!: number;

  @Column({ nullable: true })
  NoOfRooms!: number;

  @Column({ nullable: true })
  NoOfHalls!: number;

  @Column({
    nullable: true,
  })
  RoomPrice!: number;

  @Column({
    nullable: true,
  })
  HallPrice!: number;

  @Column()
  Price!: number;

  @Column({
    default: false,
  })
  IsPaid!: boolean;

  @Column({
    default: false,
  })
  IsSpecial!: boolean;

  @Column({
    default: false,
  })
  IsCancelled!: boolean;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  CancelledBy!: Role;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
