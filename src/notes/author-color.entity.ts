import { Column, Entity, ManyToOne } from 'typeorm/index';
import { User } from '../users/user.entity';
import { Note } from './note.entity';

@Entity()
export class AuthorColor {
  @ManyToOne(
    _ => Note,
    note => note.authorColors,
    {
      primary: true,
    },
  )
  note: Note;

  @ManyToOne(_ => User, {
    primary: true,
  })
  user: User;

  @Column()
  color: string;
}
