import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { CreateHuespedDto } from './dto/create-huesped.dto';
import { UpdateHuespedDto } from './dto/update-huesped.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('huesped')
@ApiTags('huesped')
export class HuespedController {
  constructor(private readonly huespedService: HuespedService) {}

  @Post()
  create(@Body() createHuespedDto: CreateHuespedDto) {
    return this.huespedService.create(createHuespedDto);
  }

  @Get()
  findAll() {
    return this.huespedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.huespedService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHuespedDto: UpdateHuespedDto) {
    return this.huespedService.update(id, updateHuespedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huespedService.remove(id);
  }
}
