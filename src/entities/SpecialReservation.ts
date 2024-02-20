import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn} from 'typeorm';

@Entity()
export class SpecailReservation {
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryColumn()
  SpecailReservationID!: String ;

  @Column()
  ServiceNo!: string;

  @Column()
  HolidayHome!: string ;

  @Column()
  CheckinDate!: Date ;

  @Column()
  CheckoutDate!: Date ;

}