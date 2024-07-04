import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class FavoriteHH extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @PrimaryColumn()
  holidayHomeId!: string;

  @CreateDateColumn()
  created_at!: Date;
}
