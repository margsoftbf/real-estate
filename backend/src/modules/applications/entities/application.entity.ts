import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  slug: string;

  @ManyToOne(() => Property, { eager: true })
  property: Property;

  @ManyToOne(() => User, { eager: true, nullable: true })
  applicant: User | null;

  @Column('varchar', { length: 100, nullable: true })
  applicantName: string | null;

  @Column('varchar', { nullable: true })
  applicantEmail: string | null;

  @Column('varchar', { length: 30, nullable: true })
  applicantPhone: string | null;

  @Column('text', { nullable: true })
  message: string | null;

  @Column('enum', { enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status: ApplicationStatus;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  proposedRent: number | null;

  @Column('date', { nullable: true })
  preferredMoveInDate: Date | null;

  @Column('text', { nullable: true })
  landlordNotes: string | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamp with time zone' })
  deletedAt: Date | null;
}