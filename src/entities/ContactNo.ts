import {
  BaseEntity,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class ContactNo extends BaseEntity {
  @PrimaryColumn({
    unique: true,
    width: 10,
  })
  ContactNo!: string;

  @PrimaryColumn()
  HolidayHomeId!: string;
}
