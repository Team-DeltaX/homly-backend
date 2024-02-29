import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Empolyee"

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    ReservationId!: string;

    @Column()
    ServiceNO!: String ;

    @Column()
    CheckinDate!: Date ;
  
    @Column()
    CheckoutDate!: Date ;

    @Column()
    NoOfAdults!: number;

    @Column()
    NoOfChildren!: number;

    @Column()
    NoOfSingleRooms!: number;

    @Column()
    NoOfDoubleRooms!: number;

    @Column()
    NoOfTripleRooms!: number;

    @Column()
    Price!: number ;
}