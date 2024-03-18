import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { HolidayHome } from "./HolidayHome";
@Entity()
export class Hall extends BaseEntity {
    @PrimaryColumn({
        unique: true
    })
    hallCode!: string;

    @PrimaryColumn({
        unique: true
    })
    HolidayHomeId!: string;

    @Column()
    hallAc!: string;

    @Column()
    floorLevel!: number;

    @Column()
    hallNoOfAdults!: number;

    @Column()
    hallNoOfChildren!: number;

    @Column()
    hallRemark!: string;

    @Column({
        type: "numeric"
    })
    hallRental!: Number;







}