import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Employee extends BaseEntity {
  @PrimaryColumn()
  service_number!: string;

  @Column()
  name!: string;

  @Column()
  nic!: string;

  @Column()
  address!: string;

  @Column()
  work_place!: string;
}
