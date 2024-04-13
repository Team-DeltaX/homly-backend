import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class OnlineUsers extends BaseEntity {
  @PrimaryColumn()
  userId!: string;

  @Column()
  socketId!: string;

  @CreateDateColumn({
    nullable: false,
  })
  created_at!: Date;
}

export default OnlineUsers;