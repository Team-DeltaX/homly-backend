import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { HolidayHome } from "./HolidayHome";


@Entity()
export class SelectedRooms extends BaseEntity {
    @PrimaryColumn({
        unique: true,
    })
    HolidayHomeId!: String;

    @PrimaryColumn()
    unitCode!: string;

    @PrimaryColumn()
    roomCode!: string;


}
