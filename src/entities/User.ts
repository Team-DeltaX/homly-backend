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
    default:'image'
  })
  image!: string;

  @CreateDateColumn({
    nullable: false,
  })
  created_at!: Date;
}
