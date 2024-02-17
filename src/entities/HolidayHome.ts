import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { CareTaker } from "./CareTaker";
import { Hall } from "./Hall";
import { Image } from "./Image";
import { ContactNo } from "./ContactNo";
import { Unit } from "./Unit";
import { Room } from "./Room";
@Entity()
export class HolidayHome extends BaseEntity {
  @PrimaryGeneratedColumn()
  HolidayHomeId!: string;

  @Column({
    unique: true
  })
  Name!: string;

  @Column()
  Address!: string;

  @Column()
  Description!: string;

  @Column()
  Category!: string;

  @Column()
  Status!: string;

  @Column(
    {
      type: "numeric"
    }
  )
  TotalRental!: number;

  @Column(
    {
      type: "numeric"
    }
  )
  ServiceCharge!: number;

  @Column(
    {
      type: "numeric"
    }
  )
  OtherCharge!: number;

  @Column()
  MaxNoOfAdults!: number;

  @Column()
  MaxNoOfChildren!: number;

  @Column()
  ApprovedOrNot!: Boolean;

  @Column({
    default:null
  })
  Gym!: String;

  @Column({
    default:null
  })
  Kitchen!: String;

  @Column({
    default:null
  })
  Park!: String;

  @Column({
    default:null
  })
  Wifi!: String;  

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(()=> CareTaker, (careTaker) => careTaker.holidayhome)
  careTaker!: CareTaker[]

  @OneToMany(()=> Hall, (hall) => hall.holidayhome)
  hall!: Hall[]

  @OneToMany(()=> Image, (image) => image.holidayhome)
  image!: Image[]

  @OneToMany(()=> ContactNo, (contactNo) => contactNo.holidayhome)
  contactNo!: ContactNo[]

  @OneToMany(()=> Unit, (unit) => unit.holidayhome)
  unit!: Unit[]

  @OneToMany(()=> Room, (room) => room.holidayhome)
  room!: Room[] 
}
