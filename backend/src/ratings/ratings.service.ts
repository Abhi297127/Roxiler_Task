import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async create(rating: Rating) {
    return this.ratingsRepository.save(rating);
  }

  async findAll() {
    return this.ratingsRepository.find({ relations: ['user', 'store'] });
  }

  async update(id: number, value: number) {
    await this.ratingsRepository.update(id, { value });
    return this.ratingsRepository.findOne({ where: { id } });
  }
}
