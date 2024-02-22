import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { Userdel } from './Userdel';


@Entity()
export class BlackListHistory{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryGeneratedColumn()
  BlackListHistoryId!: String ;

  @Column()
  BlacklistedDate!:String;

  @Column()
  RemovedDate!:String;

  @Column()
  Addreason!:String;

  @Column()
  RemoveReason!:String;

  @ManyToOne(() => Userdel, (userdel) =>userdel.ServiceNo)
  @JoinColumn({ name: 'ServiceNo' })
    ServiceNoEmp!: Userdel




 





}