import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Unit } from "./Unit";
import { HolidayHome } from "./HolidayHome";


@Entity()
export class Room extends BaseEntity{
    @PrimaryColumn({
        unique: true
    })
    RoomId!: string;

    @PrimaryColumn({
        unique: true
    })
    HolidayHomeId!: string;

    @Column()
    ACNonAC!: string;

    @Column({
        type: "numeric"
    })
    Rental!: number;

    @Column()
    Remarks!: string;

    @Column()
    RoomType!: string;

    @Column()
    NoOfBeds!: number;

    @Column()
    NoOfAdults!: number;

    @Column()
    NoOfChildren!: number;  

    @Column()
    GroupedByUnit!: Boolean;

    @ManyToOne(()=>Unit, (unit) => unit.room)
    unitId!: Unit;

    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.room)
    holidayhome!: HolidayHome;

    



}