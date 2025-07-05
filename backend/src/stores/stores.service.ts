import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  // Create a new store with optional owner property
  async create(createStoreDto: CreateStoreDto & { owner?: number }) {
    const store: DeepPartial<Store> = {
      ...createStoreDto,
      owner: createStoreDto.owner ? { id: createStoreDto.owner } : undefined,
    };

    // Save the store entity in the repository
    const createdStore = this.storesRepository.create(store);
    return this.storesRepository.save(createdStore);
  }

  // Find all stores ordered by name
  async findAll() {
    return this.storesRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  // Find stores owned by a specific owner
  async findByOwner(ownerId: number) {
    return this.storesRepository.find({
      where: { owner: { id: ownerId } },
    });
  }

  // Find store by its ID and include associated ratings
  async findById(id: number) {
    return this.storesRepository.findOne({
      where: { id },
      relations: ['ratings'],
    });
  }
}
