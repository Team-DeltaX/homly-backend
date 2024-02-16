import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  ServiceNo!: String ;

  @Column()
  UserName!: string;

  @Column()
  Password!: string ;

  @Column()
  Name!: string ;


  @Column()
  Nic!: string ;


  @Column()
  Address!: string ;


  @Column()
  Email!: string ;


  @Column()
  ContactNumber!: string ;

  @Column()
  WorkLocation!: string ;

  @Column({
    default:false
  })
  IsBlackListed!: Boolean ;
}