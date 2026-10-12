import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineStage } from './pipeline-stage.entity';
import { PipelineCandidate } from './pipeline-candidate.entity';
import { PipelineService } from './pipeline.service';
import { PipelineController } from './pipeline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PipelineStage, PipelineCandidate])],
  providers: [PipelineService],
  controllers: [PipelineController],
  exports: [PipelineService],
})
export class PipelineModule {}
