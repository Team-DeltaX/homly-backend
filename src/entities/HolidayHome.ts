import { Entity, PrimaryColumn, Column,  CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CareTaker } from "./CareTaker";
import { Hall } from "./Hall";
import { Image } from "./Image";
import { ContactNo } from "./ContactNo";
import { Unit } from "./Unit";
import { Room } from "./Room";
import { LocationAdmin } from "./LocationAdmin";
import { Rental } from "./Rental";
@Entity()
export class HolidayHome extends BaseEntity {
  @PrimaryColumn()
  HolidayHomeId!: string;

  @Column({
    unique: true
  })
  Name!: string;

  @Column()
  Address!: string;

  @Column()
  District!: string;

  @Column({
    length: 1000
  })
  Description!: string;

  @Column()
  Category!: string;

  @Column()
  Status!: string;

  @Column(
    {
      type: "numeric",
    }
  )
  TotalRental!: number;

  @Column(
    {
      type: "numeric",
      default: 0
    }
  )
  ServiceCharge!: number;

  @Column(
    {
      type: "numeric",
      default: 0
    }
  )
  OtherCharge!: number;

  @Column(
    {
      default: 0
    }
  )
  MaxNoOfAdults!: number;

  @Column({
    default: 0
  })
  MaxNoOfChildren!: number;

  @Column({
    default: false
  })
  Approved!: Boolean;

  @Column({
    default: null
  })
  Gym!: String;

  @Column({
    default: null
  })
  Kitchen!: String;

  @Column({
    default: null
  })
  Park!: String;

  @Column({
    default: null
  })
  Wifi!: String;

  @Column({
    default: null
  })
  Pool!: String;

  @Column({
    default: null
  })
  Bar!: String;

  @Column({
    default: null
  })
  Facilities!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    default: null
  })
  AdminNo!: string;

}
