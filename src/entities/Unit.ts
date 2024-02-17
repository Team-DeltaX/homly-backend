import { BaseEntity, Entity,PrimaryColumn,Column,ManyToOne,JoinColumn, OneToMany} from "typeorm";
import { HolidayHome } from "./HolidayHome";
// import { Room } from "./Room";

@Entity()
export class Unit extends BaseEntity{
    @PrimaryColumn()
    UnitId!: String;

    @Column({
        type: "numeric"
    })
    TotalPrice!: number;

    @Column()
    ACNonAc!: String;

    @Column({
        type: "numeric"
    })
    FloorLevel!: number;

    @Column()
    Remarks!: String;

    // @OneToMany(()=>Room, (room) => room.unit)
    // room!: Room[];


    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.unit)
    @JoinColumn({name: "HolidayHomeId"})
    holidayhome!: HolidayHome;

    @PrimaryColumn()
    HolidayHomeId!: string;


}
