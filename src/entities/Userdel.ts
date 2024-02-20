import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Complaints } from './Complaint';
import { BlackListHistory } from './BlackListHistory';

@Entity()
export class Userdel {
  @PrimaryColumn()
  ServiceNo!: String ;

  @Column()
  UserName!: string;

  @Column()
  Password!: string ;

  @Column()
  Name!: string ;


  @Column()
  Nic!: string ;


  @Column()
  Address!: string ;


  @Column()
  Email!: string ;


  @Column()
  ContactNumber!: string ;

  @Column()
  WorkLocation!: string ;

  @Column({
    default:false
  })
  IsBlackListed!: Boolean ;


  @OneToMany(() => Complaints, (complaints) => complaints.ComplaintID)
  Complaint!: Complaints[]



@OneToMany(() => BlackListHistory, (blacklisthistory) => blacklisthistory. BlackListHistoryId)
BlackListHistory!: BlackListHistory[]

}