import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  LANDLORD = 'landlord',
  TENANT = 'tenant',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true, unique: true })
  slug: string | null;

  @Column('varchar', { length: 100, nullable: true })
  firstName: string | null;

  @Column('varchar', { length: 100, nullable: true })
  lastName: string | null;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  passwordHash: string | null;

  @Column('varchar', { length: 30, nullable: true })
  phoneNumber: string | null;

  @Column('varchar', { length: 255, nullable: true })
  avatarUrl: string | null;

  @Column('enum', { enum: UserRole, default: UserRole.TENANT })
  role: UserRole;

  @Column('text', { nullable: true })
  address: string | null;

  @Column('varchar', { length: 100, nullable: true })
  city: string | null;

  @Column('varchar', { length: 20, nullable: true })
  postalCode: string | null;

  @Column('boolean', { default: false })
  emailVerified: boolean;

  @Column('boolean', { default: false })
  privacyConsent: boolean;

  @Column('boolean', { default: false })
  marketingConsent: boolean;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('timestamp', { nullable: true })
  lastLoginAt: Date | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamp with time zone' })
  deletedAt: Date | null;
}
