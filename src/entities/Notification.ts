import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  receiverId!: string;

  @Column()
  senderId!: string;

  @Column()
  type!: string;

  @Column()
  data!: string;

  @CreateDateColumn()
  time!: Date;
}
