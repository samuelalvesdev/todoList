(() => {
  const todo = {
    description: "todo",
    done: false,
  };

  const reminder = {
    description: "reminder",
    date: "15-12-2021",
  };

  const taskView = {
    render(tasks: Array<Object>) {
      const taskList = document.getElementById("tasksList");
      while (taskList?.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }

      tasks.forEach((task) => {
        const li = document.createElement("LI");
        const textNode = document.createTextNode(JSON.stringify(task));
        li.appendChild(textNode);
        taskList?.appendChild(li);
      });
    },
  };
})();
