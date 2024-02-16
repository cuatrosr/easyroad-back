import { MongoProjectsRepository } from './repositories/mongo-projects-repository';
import { PROJECTS_REPOSITORY } from './repositories/projects-repository';
import { HttpBadRequest } from '../utils/exceptions/http.exception';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectsController } from './projects.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (_req, image, cb) => {
          cb(
            null,
            `${Date.now()}-${image.originalname.split('.')[0]}${extname(image.originalname)}`,
          );
        },
      }),
      fileFilter: (_req, image, cb) => {
        if (!image.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(
            HttpBadRequest('El archivo no es una imagen válida'),
            false,
          );
        }
        cb(null, true);
      },
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
