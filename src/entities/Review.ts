import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Review extends BaseEntity {
  @PrimaryColumn()
  ReservationId!: string;

  @Column()
  HolidayHomeId!: string;

  @Column({ nullable: true })
  UserReview!: string;

  @Column()
  ServiceNo!: string;
}
