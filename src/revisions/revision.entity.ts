import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinTable, ManyToMany } from 'typeorm/index';
import { Note } from '../notes/note.entity';
import { Authorship } from './authorship.entity';

/**
 * The state of a note at a particular point in time,
 * with the content at that time and the diff to the previous revision.
 *
 */
@Entity()
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The patch from the previous revision to this one.
   */
  @Column({
    type: 'text',
  })
  patch: string;

  /**
   * The note content at this revision.
   */
  @Column({
    type: 'text',
  })
  content: string;

  /**
   * The length of the note content.
   */
  @Column()
  length: number;

  /**
   * Date at which the revision was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Note this revision belongs to.
   */
  @ManyToOne(
    _ => Note,
    note => note.revisions,
    { onDelete: 'CASCADE' },
  )
  note: Note;
  /**
   * All authorship objects which are used in the revision.
   */
  @ManyToMany(
    _ => Authorship,
    authorship => authorship.revisions,
  )
  @JoinTable()
  authorships: Authorship[];
}
