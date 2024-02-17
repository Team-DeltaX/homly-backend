import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { HolidayHome } from "./HolidayHome";

@Entity()
export class CareTaker extends BaseEntity {
    @PrimaryGeneratedColumn()
    CareTakerId!: string;

    @Column()
    Name!: string;

    @Column({
        unique: true,
        width: 10

    })
    ContactNo!: number;

    @Column()
    Status!: string;

    @Column()
    Address!: string;

    @Column()
    Description!: string;

    @Column({
        type: "clob",
        default: null
    })
    Image!: string;

    @ManyToOne(() => HolidayHome, (holidayhome) => holidayhome.careTaker)
    @JoinColumn({ name: "HolidayHomeId" })
    holidayhome!: HolidayHome







}