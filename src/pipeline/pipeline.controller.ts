import { Controller, Get, Post, Patch, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PipelineService } from './pipeline.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('pipeline')
@Controller('pipeline')
export class PipelineController {
  constructor(private service: PipelineService) {}

  @Get('stages')
  @ApiOperation({ summary: 'Етапи воронки' })
  @ApiQuery({ name: 'employerId', required: true })
  stages(@Query('employerId') employerId: string) {
    return this.service.getStages(employerId);
  }

  @Get('candidates')
  @ApiOperation({ summary: 'Кандидати у воронці' })
  @ApiQuery({ name: 'employerId', required: true })
  candidates(@Query('employerId') employerId: string) {
    return this.service.getCandidates(employerId);
  }

  @Post('candidates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Додати кандидата у воронку' })
  add(@Body() body: { employerId: string; candidateId: string; stageId: string; notes?: string }) {
    return this.service.addCandidate(body);
  }

  @Patch('candidates/:id/stage')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Перемістити кандидата на інший етап' })
  move(@Param('id') id: string, @Body('stageId') stageId: string) {
    return this.service.moveCandidate(id, stageId);
  }
}
