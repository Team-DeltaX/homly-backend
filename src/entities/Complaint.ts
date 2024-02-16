import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {LocationAdmin} from '../entities/LocationAdmin';
import { Userdel } from './Userdel';


@Entity()
export class Complaints{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryGeneratedColumn()
  ComplaintID!: String ;

  @Column()
  ServiceNo!:String;


  @ManyToOne(() => Userdel, (userdel) =>userdel.ServiceNo)
  @JoinColumn({ name: 'ServiceNo' })
    ServiceNoEmp!: Userdel




  @ManyToOne(() => LocationAdmin, (locationadmin) => locationadmin.Complaint)
  @JoinColumn({ name: 'AdminNo' })
    AdminNo!: LocationAdmin

  @Column()
  ReservationNo!:String;

  @Column()
  Date!:String;

  @Column()
  Reson!:String;

  @Column({
    default:false
  })
  Marked!:Boolean







}