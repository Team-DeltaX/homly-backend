import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Empolyee"

@Entity()
export class HolidayHome extends BaseEntity {
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

    @ManyToMany(() => Employee, (employee) => employee.holidayhome)
  @JoinColumn({ name: "service_number" })
  locationadmin!: Employee
}