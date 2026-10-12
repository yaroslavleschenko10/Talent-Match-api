import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './candidates/candidates.module';
import { EmployersModule } from './employers/employers.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { ChatsModule } from './chats/chats.module';
import { InterviewsModule } from './interviews/interviews.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: parseInt(config.get('DB_PORT', '5432'), 10),
        username: config.get('DB_USERNAME', 'talentmatch'),
        password: config.get('DB_PASSWORD', 'talentmatch'),
        database: config.get('DB_DATABASE', 'talentmatch'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    AuthModule,
    CandidatesModule,
    EmployersModule,
    VacanciesModule,
    PipelineModule,
    ChatsModule,
    InterviewsModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
