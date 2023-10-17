(() => {
  enum notificationPlataform {
    SMS = "SMS",
    EMAIL = "EMAIL",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
  }

  enum viewMode {
    TODO = "TODO",
    REMINDER = "REMINDER",
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
    getTodo(form: HTMLFormElement): Todo {
      const todoDescription = form.todoDescription.value;
      form.reset();
      return new Todo(todoDescription);
    },
    getReminder(form: HTMLFormElement): Reminder {
      const reminderNotifications = [
        form.notifications.value as notificationPlataform,
      ];
      const reminderDate = new Date(form.reminderDate.value);
      const reminderDescription = form.reminderDescription.value;
      form.reset();
      return new Reminder(
        reminderDescription,
        reminderDate,
        reminderNotifications
      );
    },

    render(tasks: Array<Task>, mode: viewMode) {
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

      const todoSet = document.getElementById("todoSet");
      const reminderSet = document.getElementById("reminderSet");

      if (mode === viewMode.TODO) {
        todoSet?.setAttribute("style", "display: block");
        todoSet?.removeAttribute("disabled");
        reminderSet?.setAttribute("style", "display: none");
        reminderSet?.setAttribute("disabled", "true");
      } else {
        reminderSet?.setAttribute("style", "display: block");
        reminderSet?.removeAttribute("disabled");
        todoSet?.setAttribute("style", "display: none");
        todoSet?.setAttribute("disabled", "true");
      }
    },
  };

  const taskController = (view: typeof taskView) => {
    const tasks: Array<Task> = [];
    let mode: viewMode = viewMode.TODO;

    const handleEvent = (event: Event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      switch (mode as viewMode) {
        case viewMode.TODO:
          tasks.push(view.getTodo(form));
          break;
        case viewMode.REMINDER:
          tasks.push(view.getReminder(form));
          break;
      }
      view.render(tasks, mode);
    };

    const handleToggleMode = () => {
      switch (mode as viewMode) {
        case viewMode.TODO:
          mode = viewMode.REMINDER;
          break;
        case viewMode.REMINDER:
          mode = viewMode.TODO;
          break;
      }
      view.render(tasks, mode);
    };
    document
      .getElementById("toggleMode")
      ?.addEventListener("click", handleToggleMode);
    document
      .getElementById("taskForm")
      ?.addEventListener("submit", handleEvent);
  };

  taskController(taskView);
})();
