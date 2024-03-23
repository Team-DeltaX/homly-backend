import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class PaymentCard extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @PrimaryColumn()
  card_number!: string;

  @Column()
  card_holder_name!: string;

  @Column()
  expiry_date!: string;

  @Column()
  cvv!: string;
}
