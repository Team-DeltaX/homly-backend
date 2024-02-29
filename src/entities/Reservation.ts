import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Empolyee"

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    ReservationId!: string;

    @Column()
    CheckinDate!: Date ;
  
    @Column()
    CheckoutDate!: Date ;

    @Column()
    Price!: number;

    @Column()
    NoOfAdults!: number;

    @Column()
    NoOfChildren!: number;

    @OneToMany(() => Employee, (employee) => employee.reservations)
  @JoinColumn({ name: "service_number" })
  locationadmin!: Employee
}