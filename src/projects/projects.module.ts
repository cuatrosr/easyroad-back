import { MongoProjectsRepository } from './repositories/mongo-projects-repository';
import { PROJECTS_REPOSITORY } from './repositories/projects-repository';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GridFsStorage } from 'multer-gridfs-storage';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        storage: new GridFsStorage({
          url: `${config.get('database.host')}`,
          file: (_req, file) => ({
            filename: `${Date.now()}-${file.originalname}`,
          }),
        }),
      }),
    }),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: PROJECTS_REPOSITORY,
      useClass: MongoProjectsRepository,
    },
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
