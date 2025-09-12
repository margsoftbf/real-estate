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

export enum PropertyType {
  SELL = 'sell',
  RENT = 'rent',
}

export enum PropertyAvailabilityStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  ARCHIVED = 'archived',
}

export interface PropertyFeatures {
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  parkingSpaces?: number;
  dateAvailable?: string;
  homeType?: 'house' | 'condo' | 'apartment' | 'townhouse' | 'studio';
  laundry?: 'in-unit' | 'shared' | 'none';
  heating?: 'central' | 'electric' | 'gas' | 'oil' | 'none';
  yearBuilt?: number;
  furnished?: boolean;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
  balcony?: boolean;
  garden?: boolean;
  garage?: boolean;
  elevator?: boolean;
  airConditioning?: boolean;
  dishwasher?: boolean;
  washerDryer?: boolean;
  internet?: boolean;
  cable?: boolean;
  [key: string]: any;
}

export interface PropertyPriceHistory {
  price: number;
  date: Date;
  reason?: string;
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  slug: string;

  @ManyToOne(() => User, user => user.properties)
  owner: User;

  @Column('enum', { enum: PropertyType })
  type: PropertyType;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('varchar', { length: 100 })
  city: string;

  @Column('varchar', { length: 100 })
  country: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  latitude: number | null;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  longitude: number | null;

  @Column('varchar', { length: 200, nullable: true })
  title: string | null;

  @Column('text', { array: true, default: '{}' })
  photos: string[];

  @Column('text', { nullable: true })
  description: string | null;

  @Column('jsonb', { nullable: true })
  features: PropertyFeatures | null;

  @Column('jsonb', { nullable: true, default: '[]' })
  priceHistory: PropertyPriceHistory[];

  @Column('boolean', { default: false })
  isPopular: boolean;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('enum', { 
    enum: PropertyAvailabilityStatus, 
    default: PropertyAvailabilityStatus.AVAILABLE 
  })
  availabilityStatus: PropertyAvailabilityStatus;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamp with time zone' })
  deletedAt: Date | null;
}