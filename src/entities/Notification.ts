import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  receiverId!: string;

  @Column()
  senderId!: string;

  @Column()
  notificationType!: string;

  @Column()
  data!: string;

  @CreateDateColumn()
  created_at!: Date;
}
