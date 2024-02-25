import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { HolidayHome } from "./HolidayHome";
@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    ImageId!: string;

    @Column({
        type: "clob"
    })
    MainImage!: string;

    @Column({
        type: "clob"
    })
    Image1!: string;

    @Column({
        type: "clob"
    })
    Image2!: string;

    @Column({
        type: "clob"
    })
    Image3!: string;

    @ManyToOne(() => HolidayHome, (holidayhome) => holidayhome.image)
    holidayhome!: HolidayHome;

}
