import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { HolidayHome } from "./HolidayHome";

@Entity()
export class ContactNo extends BaseEntity {
    @PrimaryColumn({
        unique: true,
        width: 10
    })
    ContactNo!: string;


    @PrimaryColumn()
    HolidayHomeId!: string;
}
