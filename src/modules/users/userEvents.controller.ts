import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { ProjectDto } from 'src/dto/project.dto';

@Controller()
export class UserEventsController {
  private logFile = path.join(__dirname, './projects-created.json');

  @EventPattern('PROJECT_CREATED')
  handleProjectCreated(@Payload() data: ProjectDto) {
    console.log('Received PROJECT_CREATED event:', data);
    let logs: any[] = [];
    if (existsSync(this.logFile)) {
      const raw = readFileSync(this.logFile, 'utf-8');
      logs = raw ? JSON.parse(raw) : [];
    }

    logs.push({
      timestamp: new Date().toISOString(),
      projectId: data.projectId,
      clientId: data.ownerId,
      title: data.title,
    });

    writeFileSync(this.logFile, JSON.stringify(logs, null, 2), 'utf-8');
  }
}
