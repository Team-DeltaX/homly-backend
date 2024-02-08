import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class HomlyUser extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  contact_number!: string;

  @Column({
    type: "long",

  })
  image!: string;

  @Column({
    default: false,
  })
  verified!:boolean;

  @CreateDateColumn({
    nullable: false,
  })
  created_at!: Date;
}
