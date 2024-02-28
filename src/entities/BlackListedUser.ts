import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne,CreateDateColumn, BaseEntity} from 'typeorm';

import { HomlyUser } from './User';


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

  // @OneToOne(() => HomlyUser)
  // @JoinColumn()
  // ServiceNo!:HomlyUser;
  @Column()
  ServiceNo!:String;
    




 





}