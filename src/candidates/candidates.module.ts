import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateProfile } from './candidate-profile.entity';
import { WorkExperience } from './work-experience.entity';
import { Education } from './education.entity';
import { CandidateProject } from './candidate-project.entity';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CandidateProfile,
      WorkExperience,
      Education,
      CandidateProject,
    ]),
  ],
  providers: [CandidatesService],
  controllers: [CandidatesController],
  exports: [CandidatesService],
})
export class CandidatesModule {}
