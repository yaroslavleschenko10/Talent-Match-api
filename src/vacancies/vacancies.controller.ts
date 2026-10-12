import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VacancyStatus } from '../common/enums';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private service: VacanciesService) {}

  @Get()
  @ApiOperation({ summary: 'Вакансії роботодавця' })
  @ApiQuery({ name: 'employerId', required: true })
  list(@Query('employerId') employerId: string) {
    return this.service.findByEmployer(employerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Вакансія за id' })
  one(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Створити вакансію' })
  create(@Body() body: { employerId: string } & Record<string, unknown>) {
    const { employerId, ...data } = body;
    return this.service.create(employerId, data as never);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Оновити вакансію' })
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.service.update(id, body as never);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Змінити статус вакансії' })
  status(@Param('id') id: string, @Body('status') status: VacancyStatus) {
    return this.service.setStatus(id, status);
  }
}
