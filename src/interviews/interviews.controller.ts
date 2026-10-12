import { Controller, Get, Post, Patch, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('interviews')
@Controller('interviews')
export class InterviewsController {
  constructor(private service: InterviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Список співбесід' })
  @ApiQuery({ name: 'employerId', required: false })
  @ApiQuery({ name: 'candidateId', required: false })
  list(
    @Query('employerId') employerId?: string,
    @Query('candidateId') candidateId?: string,
  ) {
    if (employerId) return this.service.findByEmployer(employerId);
    if (candidateId) return this.service.findByCandidate(candidateId);
    return [];
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Створити співбесіду' })
  create(@Body() body: Record<string, unknown>) {
    return this.service.create(body as never);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Оновити співбесіду' })
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.service.update(id, body as never);
  }
}
