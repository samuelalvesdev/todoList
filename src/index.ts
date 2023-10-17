(() => {
  enum notificationPlataform {
    SMS = "SMS",
    EMAIL = "EMAIL",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
  }

  const UUID = (): string => {
    return Math.random().toString(32).substring(2, 9);
  };

  const dateUtils = {
    tomorrow(): Date {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },

    today(): Date {
      return new Date();
    },
    formatDate(date: Date): string {
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    },
  };

  interface Task {
    id: string;
    dateCreated: Date;
    dateUpdate: Date;
    description: string;
    render(): string;
  }
  class Reminder implements Task {
    id: string = UUID();
    dateCreated: Date = dateUtils.today();
    dateUpdate: Date = dateUtils.today();
    description: string = "";

    date: Date = dateUtils.tomorrow();
    notifications: Array<notificationPlataform> = [notificationPlataform.EMAIL];

    constructor(
      description: string,
      date: Date,
      notifications: Array<notificationPlataform>
    ) {
      this.description = description;
      this.date = date;
      this.notifications = notifications;
    }

    render(): string {
      return `
      --->Reminder<---
      description: ${this.description}
      date: ${dateUtils.formatDate(this.date)}
      plataform: ${this.notifications.join(",")}
      `;
    }
  }

  class Todo implements Task {
    id: string = UUID();
    dateCreated: Date = dateUtils.today();
    dateUpdate: Date = dateUtils.today();
    description: string = "";

    done: boolean = false;

    constructor(description: string) {
      this.description = description;
    }

    render(): string {
      return `
      --->TODO<---
      description: ${this.description}
      done: ${this.done}
      `;
    }
  }

  const todo = new Todo("Todo criado com a classe");

  const reminder = new Reminder("Reminder criado com sucesso", new Date(), [
    notificationPlataform.EMAIL,
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
