import { Entity, BaseEntity, Column ,PrimaryColumn, OneToMany,CreateDateColumn} from 'typeorm';
import { Complaints } from './Complaint';
@Entity()
export class HomlyAdmin extends BaseEntity {
    // Save() {
    //     throw new Error("Method not implemented. ");
    // }
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

  @Column({
   
  })
  Role!: string ;

  @CreateDateColumn({
   
  })
  createddate!: string ;

  // @OneToMany(() => Complaints, (complaints) => complaints.ComplaintID)
  // Complaint!: Complaints[]


  @Column({
    default:false
  })
  Verified!: Boolean ;

}