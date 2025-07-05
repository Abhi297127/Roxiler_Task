import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  create(@Body() rating: any) {
    return this.ratingsService.create(rating);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('value') value: number) {
    return this.ratingsService.update(+id, value);
  }
}
