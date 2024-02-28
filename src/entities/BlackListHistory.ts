import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, BaseEntity} from 'typeorm';

@Entity()
export class BlackListHistory extends BaseEntity{
    Save() {
        throw new Error("Method not implemented.");
    }
  @PrimaryGeneratedColumn('uuid')
  BlackListHistoryId!: String ;

  @Column()
  BlacklistedDate!:String;

  @CreateDateColumn({
    nullable: false,
  })
  RemovedDate!: Date;

  @Column()
  Addreason!:String;

  @Column()
  RemoveReason!:String;

  @Column()
  ServiceNo!:String;

  // @ManyToOne(() => Userdel, (userdel) =>userdel.ServiceNo)
  // @JoinColumn({ name: 'ServiceNo' })
  //   ServiceNoEmp!: Userdel
}
