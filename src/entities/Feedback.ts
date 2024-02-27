import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
} from "typeorm";

@Entity()
export class UserFeedback extends BaseEntity {
  // two primary columns
  @PrimaryGeneratedColumn()
  feedback_id!: number;

  @PrimaryColumn()
  reservation_id!: string;

  @Column()
  service_number!: string;

  @Column()
  review!: string;

  @Column()
  food!: number;

  @Column()
  value_for_money!: number;

  @Column()
  staff!: number;

  @Column()
  location!: number;

  @Column()
  wifi!: number;

  @Column()
  furniture!: number;
}
