import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ReservedRooms {
  @PrimaryColumn()
  ReservationId!: string;

  @PrimaryColumn()
  roomCode!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
