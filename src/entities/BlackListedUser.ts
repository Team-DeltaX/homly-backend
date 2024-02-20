import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { Userdel } from './Userdel';


@Entity()
export class BlackListedUser{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryGeneratedColumn()
  BlackListId!: String ;

  @Column()
  BlackListReason!:String;

  @Column()
  Date!:String;

  @OneToOne(() => Userdel)
    @JoinColumn()
    ServiceNo!:Userdel
    




 





}