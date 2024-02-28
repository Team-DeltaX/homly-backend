import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne,CreateDateColumn, BaseEntity} from 'typeorm';
import { HomlyUser } from './User';

import { HomlyUser } from './User';


@Entity()
export class BlackListedUser extends BaseEntity{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryGeneratedColumn('uuid')
  BlackListId!: number ;

  @Column()
  BlackListReason!:String;

  
  @CreateDateColumn({
    nullable: false,
  })
  Date!: Date;

  @Column()
  ServiceNo!:String;
}
