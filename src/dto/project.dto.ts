import { IsString, IsUUID, MaxLength } from 'class-validator';

export class ProjectDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  ownerId: string;

  @IsString()
  @MaxLength(255)
  title: string;
}
