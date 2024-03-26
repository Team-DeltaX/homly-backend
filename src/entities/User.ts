import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class HomlyUser extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  contact_number!: string;

  @Column({
    nullable: true,
  })
  image!: string;

  @Column({
    default: false,
  })
  verified!:boolean;
  
  @Column({
    default: false,
  })
  blacklisted!:boolean;

  @Column({
    nullable:true,
  })
  lastLogin!: Date;

  @CreateDateColumn({
    nullable: false,
  })
  created_at!: Date;
}
@Entity()
export class UserEmailVerification extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @Column()
  verification_code!: string;

  @Column({
    nullable: false,
  })
  created_at!: Date;

  @Column({
    nullable: false,
  })
  expires_at!: Date;
}
@Entity()
export class UserOTPVerification extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @Column()
  otp!: string;
  
  @Column({
    default: false,
  })
  verified!:boolean;
  
  @Column({
    nullable: false,
  })
  created_at!: Date;

  @Column({
    nullable: false,
  })
  expires_at!: Date;
}
@Entity()
export class UserInteresed extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @Column({
    nullable: true,
  })
  interested_1!: string;

  @Column({
    nullable: true,
  })
  interested_2!: string;

  @Column({
    nullable: true,
  })
  interested_3!: string;
}