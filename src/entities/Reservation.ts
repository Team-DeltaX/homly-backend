import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Employee } from "./Empolyee";

@Entity()
export class Reservation extends BaseEntity {
  Save() {
    throw new Error("Method not implemented.");
  }

  @PrimaryColumn()
  ReservationId!: string;

  @Column()
  ServiceNO!: string;

  @Column()
  HolidayHome!: string;

  @Column()
  CheckinDate!: Date;

  @Column()
  CheckoutDate!: Date;

  @Column()
  NoOfAdults!: number;

  @Column()
  NoOfChildren!: number;

  @Column({ nullable: true })
  NoOfRooms!: number;

    @Column({
        nullable: true
    })
    RoomPrice!: number ;

    @Column({
        nullable: true
    })
    HallPrice!: number ;

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
