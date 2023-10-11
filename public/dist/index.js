"use strict";
(function () {
    var todo = {
        description: "todo",
        done: false,
    };
    var reminder = {
        description: "reminder",
        date: "15-12-2021",
    };
    var taskView = {
        render: function (tasks) {
            var taskList = document.getElementById("tasksList");
            while (taskList === null || taskList === void 0 ? void 0 : taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement("LI");
                var textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
            });
        },
    };
})();
