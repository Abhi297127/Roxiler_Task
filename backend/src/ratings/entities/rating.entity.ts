import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column()
  value!: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user!: User;

  @ManyToOne(() => Store, (store) => store.ratings)
  store!: Store;
}
