import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export class HomlyAdmin extends BaseEntity {
  @PrimaryColumn()
  AdminNo!: String;

  @Column()
  UserName!: string;

  @Column()
  Password!: string;

  @Column()
  ContactNo!: string;

  @Column()
  Email!: string;

  @Column()
  WorkLocation!: string;

  @Column({
    default: false,
  })
  Disabled!: Boolean;

  @Column({
    default: null,
  })
  Sub!: string;

  @Column({})
  Role!: string;

  @CreateDateColumn({})
  createddate!: string;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    default: false,
  })
  Verified!: Boolean;
}
