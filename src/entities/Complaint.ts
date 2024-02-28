import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn,CreateDateColumn} from 'typeorm';
// import {LocationAdmin} from './Admin';
import { Userdel } from './Userdel';


@Entity()
export class Complaints{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryColumn()
  ComplaintID!: String ;

  @Column()
  ServiceNo!:String;


  // @ManyToOne(() => Userdel, (userdel) =>userdel.ServiceNo)
  // @JoinColumn({ name: 'ServiceNo' })
  //   ServiceNoEmp!: Userdel




  // @ManyToOne(() => LocationAdmin, (locationadmin) => locationadmin.Complaint)
  // @JoinColumn({ name: 'AdminNo' })
  //   AdminNo!: LocationAdmin
  @Column()
  AdminNo!:String

  @Column()
  ReservationNo!:String;

  @CreateDateColumn({
    nullable: false,
  })
  created_at!: Date;

  @Column()
  Reson!:String;

  @Column({
    default:false
  })
  Marked!:Boolean







}