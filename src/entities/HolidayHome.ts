import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CareTaker } from "./CareTaker";
import { Hall } from "./Hall";

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
    unique: true,
  })
  Name!: string;

  @Column()
  Address!: string;

  @Column()
  District!: string;

  @Column({
    length: 1000,
  })
  Description!: string;

  @Column()
  Category!: string;

  @Column()
  Status!: string;

  @Column({
    default: 0,
  })
  MaxNoOfAdults!: number;

  @Column({
    default: 0,
  })
  MaxNoOfChildren!: number;

  @Column({
    default: false,
  })
  Approved!: Boolean;

  @Column({
    default: null,
  })
  Gym!: String;

  @Column({
    default: null,
  })
  Kitchen!: String;

  @Column({
    default: null,
  })
  Park!: String;

  @Column({
    default: null,
  })
  Wifi!: String;

  @Column({
    default: null,
  })
  Pool!: String;

  @Column({
    default: null,
  })
  Bar!: String;

  @Column({
    default: null,
  })
  Facilities!: string;

  @Column({
    default: 0,
    type: "float",
  })
  food_rating!: number;

  @Column({
    default: 0,
    type: "float",
  })
  value_for_money_rating!: number;

  @Column({
    default: 0,
    type: "float",
  })
  staff_rating!: number;

  @Column({
    default: 0,
    type: "float",
  })
  location_rating!: number;

  @Column({
    default: 0.0,
    type: "float",
  })
  furniture_rating!: number;

  @Column({
    default: 0,
    type: "float",
  })
  wifi_rating!: number;

  @Column({
    default: 0,
    type: "float",
  })
  overall_rating!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    default: null,
  })
  AdminNo!: string;

  @Column({
    default: null,
  })
  MainImage!: string;

  @Column({
    default: null,
  })
  Image1!: string;

  @Column({
    default: null,
  })
  Image2!: string;

  @Column({
    default: null,
  })
  Image3!: string;

  @Column({
    default: 0,
  })
  isDiclined!: Boolean;

  @Column({
    default: null,
  })
  reason!: string;
}

@Entity()
export class RoomRentalSettings extends BaseEntity {
  @PrimaryColumn()
  RSId!: string;

  @Column()
  HolidayHomeId!: string;

  @Column()
  roomType!: string;

  @Column()
  rental!: string;

  @Column()
  acNonAc!: string;
}

@Entity()
export class RoomTypeSettings extends BaseEntity {
  @PrimaryColumn()
  RTId!: string;

  @Column()
  roomType!: string;

  @Column()
  HolidayHomeId!: string;

  @Column()
  adults!: string;

  @Column()
  children!: string;
}
