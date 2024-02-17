import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany} from 'typeorm';
import { Complaints } from './Complaint';
@Entity()
export class LocationAdmin {
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryColumn()
  AdminNo!: String ;

  @Column()
  UserName!: string;

  @Column()
  Password!: string ;

  @Column()
  ContactNo!: string ;
  
  @Column()
  Email!: string ;

  @Column()
  WorkLocation!: string ;

  
  @Column({
    default:false
  })
  Disabled!: Boolean ;
    // static create: any;


  @Column({
    default:null
  })
  Sub!: string ;

  @OneToMany(() => Complaints, (complaints) => complaints.ComplaintID)
  Complaint!: Complaints[]


  @Column({
    default:false
  })
  Verified!: Boolean ;

}