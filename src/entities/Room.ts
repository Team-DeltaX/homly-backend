import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Room extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  roomCode!: string;

  @Column()
  roomAc!: String;

  @Column({
    type: "numeric",
  })
  roomRental!: number;

  @Column()
  roomRemarks!: String;

  @Column()
  RoomType!: String;

  @Column()
  FloorLevel!: String;

  @Column()
  NoOfAdults!: number;

  @Column()
  NoOfChildren!: number;

  @Column()
  groupByUnit!: Boolean;

  @PrimaryColumn()
  HolidayHomeId!: String;
}
