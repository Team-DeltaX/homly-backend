import { BaseEntity, Entity,PrimaryColumn,Column,ManyToOne,JoinColumn, OneToMany} from "typeorm";
import { HolidayHome } from "./HolidayHome";
import { Room } from "./Room";

@Entity()
export class Unit extends BaseEntity{
    @PrimaryColumn()
    UnitId!: string;

    @Column({
        type: "numeric"
    })
    TotalPrice!: number;

    @Column()
    ACNonAc!: string;

    @Column({
        type: "numeric"
    })
    FloorLevel!: number;

    @Column()
    Remarks!: string;

    @OneToMany(()=>Room, (room) => room.unitId)
    room!: Room[];

    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.unit)
    @JoinColumn({name: "HolidayHomeId"})
    holidayhome!: HolidayHome;


}