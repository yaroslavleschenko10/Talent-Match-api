import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestStatus } from '../common/enums';

@Controller()
export class ApplicationsController {
  constructor(private service: ApplicationsService) {}

  @Get('requests')
  @ApiTags('requests')
  @ApiOperation({ summary: 'Запити до кандидата' })
  @ApiQuery({ name: 'candidateId', required: true })
  requests(@Query('candidateId') candidateId: string) {
    return this.service.getRequestsByCandidate(candidateId);
  }

  @Post('requests')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiTags('requests')
  @ApiOperation({ summary: 'Надіслати запит кандидату' })
  createRequest(@Body() body: Record<string, unknown>) {
    return this.service.createRequest(body as never);
  }

  @Patch('requests/:id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiTags('requests')
  @ApiOperation({ summary: 'Змінити статус запиту' })
  updateRequest(@Param('id') id: string, @Body('status') status: RequestStatus) {
    return this.service.updateRequestStatus(id, status);
  }

  @Get('applications')
  @ApiTags('applications')
  @ApiOperation({ summary: 'Заявки кандидата' })
  @ApiQuery({ name: 'candidateId', required: true })
  applications(@Query('candidateId') candidateId: string) {
    return this.service.getApplications(candidateId);
  }

  @Get('blacklist')
  @ApiTags('blacklist')
  @ApiOperation({ summary: 'Чорний список компаній' })
  @ApiQuery({ name: 'candidateId', required: true })
  blacklist(@Query('candidateId') candidateId: string) {
    return this.service.getBlacklist(candidateId);
  }

  @Post('blacklist')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiTags('blacklist')
  @ApiOperation({ summary: 'Додати компанію в чорний список' })
  addBlacklist(@Body() body: Record<string, unknown>) {
    return this.service.addToBlacklist(body as never);
  }

  @Delete('blacklist/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiTags('blacklist')
  @ApiOperation({ summary: 'Прибрати з чорного списку' })
  removeBlacklist(@Param('id') id: string) {
    return this.service.removeFromBlacklist(id);
  }

  @Get('saved-jobs')
  @ApiTags('saved-jobs')
  @ApiOperation({ summary: 'Збережені вакансії' })
  @ApiQuery({ name: 'candidateId', required: true })
  savedJobs(@Query('candidateId') candidateId: string) {
    return this.service.getSavedJobs(candidateId);
  }

  @Post('saved-jobs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiTags('saved-jobs')
  @ApiOperation({ summary: 'Зберегти вакансію' })
  saveJob(@Body() body: Record<string, unknown>) {
    return this.service.saveJob(body as never);
  }

  @Delete('saved-jobs/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiTags('saved-jobs')
  @ApiOperation({ summary: 'Видалити зі збережених' })
  unsave(@Param('id') id: string) {
    return this.service.unsaveJob(id);
  }
}
