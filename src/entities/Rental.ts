import { BaseEntity, Entity, PrimaryColumn,Column, ManyToOne, JoinColumn, Collection } from "typeorm";
import { HolidayHome } from "./HolidayHome";

@Entity()
export class Rental extends BaseEntity{
    @Column()
    Month! : String

    @Column({
        type:"numeric"
    })
    WeekRental!: number

    @Column({
        type:"numeric"
    })
    WeekEndRental! : number

    @ManyToOne(() => HolidayHome, (holidayhome) => holidayhome.rental)
    @JoinColumn({ name: "HolidayHomeId" })
    holidayhome!: HolidayHome;

    @PrimaryColumn()
    HolidayHomeId!:String

    @PrimaryColumn()
    HRUId! : String




}