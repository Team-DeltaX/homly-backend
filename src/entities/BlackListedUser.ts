import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne,CreateDateColumn, BaseEntity} from 'typeorm';
import { Userdel } from './Userdel';


@Entity()
export class BlackListedUser extends BaseEntity{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryColumn()
  BlackListId!: String ;

  @Column()
  BlackListReason!:String;

  
  @CreateDateColumn({
    nullable: false,
  })
  Date!: Date;

  // @OneToOne(() => Userdel)
  //   @JoinColumn()
  //   ServiceNo!:Userdel
  @Column()
  ServiceNo!:String;
    




 





}