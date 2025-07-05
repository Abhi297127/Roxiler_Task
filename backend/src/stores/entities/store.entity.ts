import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @ManyToOne(() => User, (user) => user.stores, { eager: true })
  owner!: User;

  @OneToMany(() => Rating, (rating) => rating.store)
  ratings!: Rating[];
}
