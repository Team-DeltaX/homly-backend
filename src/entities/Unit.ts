import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { HolidayHome } from "./HolidayHome";
// import { Room } from "./Room";

@Entity()
export class Unit extends BaseEntity {
    @PrimaryColumn()
    unitCode!: String;

    @Column({
        type: "numeric"
    })
    unitRental!: number;

    @Column()
    unitAc!: String;

    @Column({
        type: "numeric"
    })
    floorLevel!: number;

    @Column()
    unitRemark!: String;

    @Column()
    roomAttached!: Boolean;

    // @OneToMany(()=>Room, (room) => room.unit)
    // room!: Room[];


    @ManyToOne(() => HolidayHome, (holidayhome) => holidayhome.unit)
    @JoinColumn({ name: "HolidayHomeId" })
    holidayhome!: HolidayHome;

    @PrimaryColumn()
    HolidayHomeId!: string;


}
