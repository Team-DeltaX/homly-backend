import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class BlackListHistory extends BaseEntity {
  Save() {
    throw new Error("Method not implemented.");
  }
  @PrimaryColumn({
    nullable: false,
  })
  BlackListHistoryId!: String;

  @Column()
  BlacklistedDate!: String;

  @CreateDateColumn({
    nullable: false,
  })
  RemovedDate!: Date;

  @Column()
  Addreason!: String;

  @Column()
  RemoveReason!: String;

  @Column()
  ServiceNo!: String;
}
