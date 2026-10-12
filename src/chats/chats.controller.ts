import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SenderType } from '../common/enums';

@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private service: ChatsService) {}

  @Get()
  @ApiOperation({ summary: 'Список чатів' })
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

  @Get(':id/messages')
  @ApiOperation({ summary: 'Повідомлення чату' })
  messages(@Param('id') id: string) {
    return this.service.getMessages(id);
  }

  @Post(':id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Надіслати повідомлення' })
  send(
    @Param('id') id: string,
    @Body() body: { senderId: string; senderType: SenderType; content: string },
  ) {
    return this.service.sendMessage({ chatId: id, ...body });
  }
}
