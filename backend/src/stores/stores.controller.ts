import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { Request as ExpressRequest } from 'express';
import { User } from 'src/users/entities/user.entity';

// Define the CustomRequest interface
interface CustomRequest extends ExpressRequest {
  user?: User;  // Ensure req.user is of type User
}

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin-create')
  createByAdmin(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Post('owner-create')
  createByOwner(@Body() createStoreDto: CreateStoreDto, @Request() req: CustomRequest) {
    const userId = req.user?.id ?? null;  // Access the user id
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.storesService.create({ ...createStoreDto, owner: userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-stores')
  findMyStores(@Request() req: CustomRequest) {
    const userId = req.user?.id ?? null;  // Access the user id
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.storesService.findByOwner(userId);
  }
}
