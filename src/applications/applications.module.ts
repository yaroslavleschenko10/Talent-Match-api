import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerRequest } from './employer-request.entity';
import { CompanyApplication } from './company-application.entity';
import { BlacklistedCompany } from './blacklist.entity';
import { SavedJob } from './saved-job.entity';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployerRequest,
      CompanyApplication,
      BlacklistedCompany,
      SavedJob,
    ]),
  ],
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
