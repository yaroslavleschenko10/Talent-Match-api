import { Controller, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EmployersService } from './employers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('employers')
@Controller('employers')
export class EmployersController {
  constructor(private service: EmployersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Мій профіль компанії' })
  me(@Req() req: { user: { userId: string } }) {
    return this.service.findByUserId(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Профіль роботодавця за id' })
  one(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Оновити профіль компанії' })
  async updateMe(
    @Req() req: { user: { userId: string } },
    @Body() body: Record<string, unknown>,
  ) {
    const profile = await this.service.findByUserId(req.user.userId);
    return this.service.update(profile.id, body as never);
  }
}
