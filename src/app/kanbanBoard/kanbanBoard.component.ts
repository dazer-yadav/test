import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  taskName='';
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'task 0', stage: 0 },
      { name: 'task 1', stage: 1 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }
  createTask(){
    if(this.taskName==null){
      return;
    }
    let unique = true;
    this.tasks.forEach((task)=>{
      if(task.name==this.taskName){
        unique = false;
      }
    })
    if(unique){
      this.tasks.push({name: this.taskName,stage: 0});
    }
    this.configureTasksForRendering();
  }
  forwardPressed(task: any){
    task.stage+=1;
    let itemIndex = this.tasks.findIndex(item => item.name == task.id);
    this.tasks[itemIndex] = task;
    this.configureTasksForRendering();
  }

  backwardPressed(task: any){
    task.stage-=1;
    let itemIndex = this.tasks.findIndex(item => item.name == task.id);
    this.tasks[itemIndex] = task;
    this.configureTasksForRendering();
  }

  onDelete(task: any){
    this.tasks = this.tasks.filter(({ name }) => name !== task.name);
    this.configureTasksForRendering();
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}
