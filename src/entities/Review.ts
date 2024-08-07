import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Review extends BaseEntity {
  @PrimaryColumn()
  ReservationId!: string;

  @Column()
  HolidayHomeId!: string;

  @Column({ nullable: true, length: 1000 })
  UserReview!: string;

  @Column()
  ServiceNo!: string;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "date",
  })
  updatedAt!: Date;
}
