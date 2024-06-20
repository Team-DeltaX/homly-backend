import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Refund extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    refundId!: string;
    
    @Column()
    reservationNo!: string;

    @Column()
    serviceNo!: string;

    @Column()
    contactNumber!: string;

    @Column()
    cancelledBy!: string;

    @Column()
    payment!: number;
  
    @Column({
        default: "Pending",
    })
    status!: string;

    @Column()
    accountHolder!: string;
    
    @Column()
    accountNumber!: string;

    @Column()
    bank!: string;

    @Column()
    branch!: string; 

    @Column(
      {
        default: 0,
    }
    )
    refundAmount!: number;

    @Column({nullable: true,})
    reason!: string;

    @Column({
        nullable: true,
        type: "date",
      })
    refundDate!: Date;
    
    @Column({
        nullable: true,
      })
    bankSlip!: string;
    
    @CreateDateColumn({
        type: "date",
    })
    createdAt!: Date;

    @UpdateDateColumn({
      type: "date",
  })
    updatedAt!: Date;

  }
  