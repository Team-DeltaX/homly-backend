import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
// import { Unit } from "./Unit";
import { HolidayHome } from "./HolidayHome";
// import { Unit } from "./Unit";

@Entity()
export class Room extends BaseEntity {
    @PrimaryColumn({
        unique: true
    })
    RoomId!: string;

    @Column()
    UnitId!: string;

    @Column()
    ACNonAC!: String;

    @Column({
        type: "numeric"
    })
    Rental!: number;

    @Column()
    Remarks!: String;

    @Column()
    RoomType!: String;

    @Column()
    NoOfBeds!: number;

    @Column()
    NoOfAdults!: number;

    @Column()
    NoOfChildren!: number;

    @Column()
    GroupedByUnit!: Boolean;

    @ManyToOne(() => HolidayHome, (holidayhome) => holidayhome.room)
    @JoinColumn({ name: "HolidayHomeId" })
    holidayhome!: HolidayHome;

    @PrimaryColumn()
    HolidayHomeId!: String;

}