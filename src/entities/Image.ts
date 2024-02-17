import { Entity,Column, PrimaryColumn,PrimaryGeneratedColumn,BaseEntity, ManyToOne} from "typeorm";
import { HolidayHome } from "./HolidayHome";
@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    ImageId!: string;

    @Column({
        type: "clob"
    })
    ImageCode!: string;

    @ManyToOne(()=>HolidayHome, (holidayhome) => holidayhome.image)
    holidayhome!: HolidayHome;

}
