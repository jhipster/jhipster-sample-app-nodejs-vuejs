import { ObjectIdColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @ObjectIdColumn({ name: '_id' })
  id?: string;

  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  createdDate?: Date;
  @Column({ nullable: true })
  lastModifiedBy?: string;
  @Column({ nullable: true })
  lastModifiedDate?: Date;
}
