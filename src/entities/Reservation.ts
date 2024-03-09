import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Empolyee"

@Entity()
export class Reservation extends BaseEntity {
    Save() {
    throw new Error("Method not implemented.");
    }

    @PrimaryColumn()
    ReservationId!: string;

    @Column()
    ServiceNO!: string ;

    @Column()
    HolidayHome!: string ;

    @Column()
    CheckinDate!: Date ;
  
    @Column()
    CheckoutDate!: Date ;

    @Column()
    NoOfAdults!: number;

    @Column()
    NoOfChildren!: number;

    @Column()
    NoOfRooms!: number;

    @Column()
    NoOfHalls!: number;

    @Column()
    Price!: number ;
}