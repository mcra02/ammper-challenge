import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn( 'varchar', {
    nullable: false,
    length: 100
  })
  email: string;

  @Column( 'varchar', {
    nullable: false,
    length: 300
  })
  password: string;

  @Column( 'varchar', {
    nullable: false,
    length: 300
  })
  fullname: string;
}
