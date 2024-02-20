import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { HolidayHome } from "./HolidayHome";

@Entity()
export class ContactNo extends BaseEntity {
    @PrimaryColumn({
        unique: true,
    })
    HolidayHomeId!: number;

    @PrimaryColumn()
    unitCode!: string;

    @PrimaryColumn()
    roomCode!: string;
}
