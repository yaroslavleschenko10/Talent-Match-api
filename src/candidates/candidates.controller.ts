import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Query,
  UseGuards,
  Req,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CandidatesService } from './candidates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const uploadDir = join(process.cwd(), 'uploads', 'cv');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const cvStorage = diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = extname(file.originalname).toLowerCase() || '.pdf';
    cb(null, `cv-${unique}${ext}`);
  },
});

const ALLOWED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

@ApiTags('candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private service: CandidatesService) {}

  @Get()
  @ApiOperation({ summary: 'Список кандидатів (фільтри)' })
  @ApiQuery({ name: 'position', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'minExperience', required: false })
  @ApiQuery({ name: 'skill', required: false })
  findAll(
    @Query('position') position?: string,
    @Query('location') location?: string,
    @Query('minExperience') minExperience?: string,
    @Query('skill') skill?: string,
  ) {
    return this.service.findAll({
      position,
      location,
      minExperience: minExperience ? Number(minExperience) : undefined,
      skill,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Мій профіль кандидата' })
  me(@Req() req: { user: { userId: string } }) {
    return this.service.findByUserId(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Профіль кандидата за id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Оновити свій профіль' })
  async updateMe(
    @Req() req: { user: { userId: string } },
    @Body() body: Record<string, unknown>,
  ) {
    const profile = await this.service.findByUserId(req.user.userId);
    return this.service.update(profile.id, body as never);
  }

  @Post('me/cv')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Завантажити CV (PDF/DOC/DOCX, до 5 МБ)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: cvStorage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const ok =
          ALLOWED_MIME.includes(file.mimetype) ||
          /\.(pdf|doc|docx)$/i.test(file.originalname);
        if (ok) {
          cb(null, true);
        } else {
          cb(new Error('Дозволені лише PDF, DOC або DOCX') as never, false);
        }
      },
    }),
  )
  async uploadCv(
    @Req() req: { user: { userId: string } },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Файл не надіслано');
    }
    const profile = await this.service.findByUserId(req.user.userId);
    const cvFileUrl = `/uploads/cv/${file.filename}`;
    const updated = await this.service.update(profile.id, { cvFileUrl });
    return {
      cvFileUrl,
      url: cvFileUrl,
      filename: file.originalname,
      size: file.size,
      profile: updated,
    };
  }
}
