import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerProfile } from './employer-profile.entity';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerProfile])],
  providers: [EmployersService],
  controllers: [EmployersController],
  exports: [EmployersService],
})
export class EmployersModule {}
