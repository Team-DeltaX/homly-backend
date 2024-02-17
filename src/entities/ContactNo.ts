import {BaseEntity, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import { HolidayHome } from "./HolidayHome";

@Entity()
export class ContactNo extends BaseEntity{
    @PrimaryColumn({
        unique: true,
        width: 10
    })
    ContactNo!: number;

    @PrimaryColumn()
    HolidayHomeId!: string;

    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.contactNo)
    holidayhome!: HolidayHome



    

}
