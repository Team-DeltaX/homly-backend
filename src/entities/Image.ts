import { Entity,Column, PrimaryColumn,BaseEntity, ManyToOne} from "typeorm";
import { HolidayHome } from "./HolidayHome";
@Entity()
export class Image extends BaseEntity {
    @PrimaryColumn()
    ImageId!: string;

    @Column({
        type: "clob"
    })
    ImageCode!: string;

    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.image)
    holidayhome!: HolidayHome;

}
