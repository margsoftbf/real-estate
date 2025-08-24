import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyCronService {
  private readonly logger = new Logger(PropertyCronService.name);

  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleWeeklyPropertyUpdate() {
    this.logger.log('Running weekly property update cron job');
    
    try {
      const properties = await this.propertyRepository.find({
        take: 10,
        where: { isActive: true },
      });

      if (properties.length === 0) {
        this.logger.log('No properties found to update');
        return;
      }

      const propertyToUpdate = properties[Math.floor(Math.random() * properties.length)];
      
      propertyToUpdate.updatedAt = new Date();
      
      if (propertyToUpdate.isPopular) {
        propertyToUpdate.isPopular = false;
      } else {
        propertyToUpdate.isPopular = Math.random() > 0.7;
      }

      await this.propertyRepository.save(propertyToUpdate);

      this.logger.log(`Updated property ${propertyToUpdate.id} - isPopular: ${propertyToUpdate.isPopular}`);
      
    } catch (error) {
      this.logger.error('Error during weekly property update:', error);
    }
  }
}