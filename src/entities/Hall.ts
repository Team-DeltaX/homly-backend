import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { HolidayHome } from "./HolidayHome";
@Entity()
export class Hall extends BaseEntity{
    @PrimaryColumn({
        unique: true
    })
    HallId!: string;

    @PrimaryColumn({
        unique: true
    })
    HolidayHomeId!: string;

    @Column()
    AcNonAc!: string;

    @Column()
    FloorLevel!: Number;

    @Column()
    NoOfAdults!: Number;

    @Column()
    NoOfChildren!: Number;

    @Column()
    Remarks!: string;

    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.hall)
    @JoinColumn({name: "HolidayHomeId"})
    holidayhome!: HolidayHome;






}