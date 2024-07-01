import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Review extends BaseEntity {
  @PrimaryColumn()
  ReservationId!: string;

  @Column()
  HolidayHomeId!: string;

  @Column()
  UserReview!: string;

  @Column()
  ServiceNo! : string;

  @CreateDateColumn({
    type: "date",
})
  createdAt!: Date;

  @UpdateDateColumn({
    type: "date",
})
  updatedAt!: Date;
}
