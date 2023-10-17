"use strict";
(function () {
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = "";
            this.dateCreated = new Date();
            this.dateUpdate = new Date();
            this.description = "";
            this.date = new Date();
            this.notification = ["EMAIL"];
            this.description = description;
            this.date = date;
            this.notification = notifications;
        }
        Reminder.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = "";
            this.dateCreated = new Date();
            this.dateUpdate = new Date();
            this.description = "";
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Todo;
    }());
    var todo = new Todo("Todo criado com a classe");
    var reminder = new Reminder("Reminder criado com sucesso", new Date(), [
        "EMAIL",
    ]);
    var taskView = {
        render: function (tasks) {
            var taskList = document.getElementById("tasksList");
            while (taskList === null || taskList === void 0 ? void 0 : taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement("LI");
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
            });
        },
    };
    var taskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document
            .getElementById("taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleEvent);
    };
    taskController(taskView);
})();
