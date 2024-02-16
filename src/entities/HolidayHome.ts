import { Entity,PrimaryColumn,Column ,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class HolidayHome {
  @PrimaryGeneratedColumn()
  HolidayHomeId!: string;

  @Column()
  Name!: string;

  @Column()
  Address!: string;

  @Column()
  Description!: string;

  @Column()
  Category!: string;

  @Column()
  Status!: string;

  @Column()
  TotalRental!: number;

  @Column()
  ServiceCharge!: number;

  @Column(
    
  )
  OtherCharge!: number;

  @Column()
  MaxNoOfAdults!: number;

  @Column()
  MaxNoOfChildren!: number;

  @Column()
  ApprovedOrNot!: Boolean;






  

  
}
