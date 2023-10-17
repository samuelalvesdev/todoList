(() => {
  interface Task {
    id: string;
    dateCreated: Date;
    dateUpdate: Date;
    description: string;
    render(): string;
  }
  class Reminder implements Task {
    id: string = "";
    dateCreated: Date = new Date();
    dateUpdate: Date = new Date();
    description: string = "";

    date: Date = new Date();
    notification: Array<string> = ["EMAIL"];

    constructor(description: string, date: Date, notifications: Array<string>) {
      this.description = description;
      this.date = date;
      this.notification = notifications;
    }

    render(): string {
      return JSON.stringify(this);
    }
  }

  class Todo implements Task {
    id: string = "";
    dateCreated: Date = new Date();
    dateUpdate: Date = new Date();
    description: string = "";

    done: boolean = false;

    constructor(description: string) {
      this.description = description;
    }

    render(): string {
      return JSON.stringify(this);
    }
  }

  const todo = new Todo("Todo criado com a classe");

  const reminder = new Reminder("Reminder criado com sucesso", new Date(), [
    "EMAIL",
  ]);

  const taskView = {
    render(tasks: Array<Task>) {
      const taskList = document.getElementById("tasksList");
      while (taskList?.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }

      tasks.forEach((task) => {
        const li = document.createElement("LI");
        const textNode = document.createTextNode(task.render());
        li.appendChild(textNode);
        taskList?.appendChild(li);
      });
    },
  };

  const taskController = (view: typeof taskView) => {
    const tasks: Array<Task> = [todo, reminder];

    const handleEvent = (event: Event) => {
      event.preventDefault();
      view.render(tasks);
    };
    document
      .getElementById("taskForm")
      ?.addEventListener("submit", handleEvent);
  };

  taskController(taskView);
})();
