import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ReservedHalls {
    @PrimaryColumn()
    ReservationId!: string;

    @PrimaryColumn()
    hallCode!: string;

    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
}