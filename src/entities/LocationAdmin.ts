import { Entity, PrimaryGeneratedColumn, Column ,PrimaryColumn} from 'typeorm';

@Entity()
export class User {
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

  
  @Column()
  Disabled!: Boolean ;

}