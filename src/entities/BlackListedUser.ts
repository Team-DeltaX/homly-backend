import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne,CreateDateColumn, BaseEntity} from 'typeorm';
@Entity()
export class BlackListedUser extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  BlackListId!: String ;

  @Column()
  BlackListReason!:String;

  
  @CreateDateColumn({
    nullable: false,
  })
  Date!: Date; 

  @Column()
  ServiceNo!:String;
}
