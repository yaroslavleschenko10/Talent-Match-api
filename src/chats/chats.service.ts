import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { ChatMessage } from './chat-message.entity';
import { SenderType } from '../common/enums';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chats: Repository<Chat>,
    @InjectRepository(ChatMessage) private messages: Repository<ChatMessage>,
  ) {}

  findByEmployer(employerId: string) {
    return this.chats.find({
      where: { employerId },
      relations: ['candidate'],
      order: { updatedAt: 'DESC' },
    });
  }

  findByCandidate(candidateId: string) {
    return this.chats.find({
      where: { candidateId },
      relations: ['employer'],
      order: { updatedAt: 'DESC' },
    });
  }

  async getMessages(chatId: string) {
    return this.messages.find({
      where: { chatId },
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(data: {
    chatId: string;
    senderId: string;
    senderType: SenderType;
    content: string;
  }) {
    const chat = await this.chats.findOne({ where: { id: data.chatId } });
    if (!chat) throw new NotFoundException('Chat not found');

    const msg = this.messages.create({ ...data, read: false });
    await this.messages.save(msg);

    chat.updatedAt = new Date();
    if (data.senderType === SenderType.CANDIDATE) {
      chat.unreadCount += 1;
    }
    await this.chats.save(chat);

    return msg;
  }
}
