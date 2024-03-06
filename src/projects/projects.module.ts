import { MongoProjectsRepository } from './repositories/mongo-projects-repository';
import { PROJECTS_REPOSITORY } from './repositories/projects-repository';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectsController } from './projects.controller';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AzureStorageModule.withConfigAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        sasKey: config.get('azure.sasKey'),
        accountName: config.get('azure.accountName', 'account_name'),
        containerName: config.get('azure.containerName', 'container_name'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
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
