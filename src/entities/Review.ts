import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Review extends BaseEntity {
  @PrimaryColumn()
  ReservationId!: string;

  @Column()
  HolidayHomeId!: string;

  @Column()
  ServiceNo!: string;


  @Column()
  UserReview!: string;
}
