import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { HolidayHome } from "./HolidayHome";
import { SelectedRooms } from "./SelectedRooms";
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

    @PrimaryColumn()
    HolidayHomeId!: string;



}
