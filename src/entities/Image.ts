import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { HolidayHome } from "./HolidayHome";
@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    ImageId!: string;

    @Column({
        type: "clob",
        default: null
    })
    MainImage!: string;

    @Column({
        type: "clob",
        default: null
    })
    Image1!: string;

    @Column({
        type: "clob",
        default: null
    })
    Image2!: string;

    @Column({
        type: "clob",
        default: null
    })
    Image3!: string;

    @Column()
    HolidayHomeId!: string;




}
