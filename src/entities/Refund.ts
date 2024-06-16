import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Refund extends BaseEntity {
    @PrimaryColumn('uuid')
    refundId!: string;
    
    @Column()
    reservationNo!: string;

    @Column()
    serviceNo!: string;

    @Column()
    contact_number!: string;

    @Column()
    cancelledBy!: string;
  
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

    @UpdateDateColumn()
    updatedAt!: Date;

  }
  