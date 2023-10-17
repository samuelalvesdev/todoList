"use strict";
(function () {
    var notificationPlataform;
    (function (notificationPlataform) {
        notificationPlataform["SMS"] = "SMS";
        notificationPlataform["EMAIL"] = "EMAIL";
        notificationPlataform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(notificationPlataform || (notificationPlataform = {}));
    var viewMode;
    (function (viewMode) {
        viewMode["TODO"] = "TODO";
        viewMode["REMINDER"] = "REMINDER";
    })(viewMode || (viewMode = {}));
    var UUID = function () {
        return Math.random().toString(32).substring(2, 9);
    };
    var dateUtils = {
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today: function () {
            return new Date();
        },
        formatDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ".").concat(date.getFullYear());
        },
    };
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = dateUtils.today();
            this.dateUpdate = dateUtils.today();
            this.description = "";
            this.date = dateUtils.tomorrow();
            this.notifications = [notificationPlataform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Reminder.prototype.render = function () {
            return "\n      --->Reminder<---\n      description: ".concat(this.description, "\n      date: ").concat(dateUtils.formatDate(this.date), "\n      plataform: ").concat(this.notifications.join(","), "\n      ");
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreated = dateUtils.today();
            this.dateUpdate = dateUtils.today();
            this.description = "";
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return "\n      --->TODO<---\n      description: ".concat(this.description, "\n      done: ").concat(this.done, "\n      ");
        };
        return Todo;
    }());
    var todo = new Todo("Todo criado com a classe");
    var reminder = new Reminder("Reminder criado com sucesso", new Date(), [
        notificationPlataform.EMAIL,
    ]);
    var taskView = {
        getTodo: function (form) {
            var todoDescription = form.todoDescription.value;
            form.reset();
            return new Todo(todoDescription);
        },
        getReminder: function (form) {
            var reminderNotifications = [
                form.notifications.value,
            ];
            var reminderDate = new Date(form.reminderDate.value);
            var reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Reminder(reminderDescription, reminderDate, reminderNotifications);
        },
        render: function (tasks, mode) {
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
            var todoSet = document.getElementById("todoSet");
            var reminderSet = document.getElementById("reminderSet");
            if (mode === viewMode.TODO) {
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("style", "display: block");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.removeAttribute("disabled");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("style", "display: none");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("disabled", "true");
            }
            else {
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.setAttribute("style", "display: block");
                reminderSet === null || reminderSet === void 0 ? void 0 : reminderSet.removeAttribute("disabled");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("style", "display: none");
                todoSet === null || todoSet === void 0 ? void 0 : todoSet.setAttribute("disabled", "true");
            }
        },
    };
    var taskController = function (view) {
        var _a, _b;
        var tasks = [];
        var mode = viewMode.TODO;
        var handleEvent = function (event) {
            event.preventDefault();
            var form = event.target;
            switch (mode) {
                case viewMode.TODO:
                    tasks.push(view.getTodo(form));
                    break;
                case viewMode.REMINDER:
                    tasks.push(view.getReminder(form));
                    break;
            }
            view.render(tasks, mode);
        };
        var handleToggleMode = function () {
            switch (mode) {
                case viewMode.TODO:
                    mode = viewMode.REMINDER;
                    break;
                case viewMode.REMINDER:
                    mode = viewMode.TODO;
                    break;
            }
            view.render(tasks, mode);
        };
        (_a = document
            .getElementById("toggleMode")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleToggleMode);
        (_b = document
            .getElementById("taskForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", handleEvent);
    };
    taskController(taskView);
})();
