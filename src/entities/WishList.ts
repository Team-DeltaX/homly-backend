import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class WishList extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @PrimaryColumn()
  holidayHomeId!: string;

  @CreateDateColumn()
  created_at!: Date;
  
}
