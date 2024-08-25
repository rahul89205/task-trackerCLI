import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { Command } from "commander";
const program = new Command();
let taskFile = resolve("tasks.json");

function loadTask() {
  try {
    if (existsSync(taskFile)) {
      return JSON.parse(readFileSync(taskFile, "utf8"));
    } else {
      saveTask({});
      return {};
    }
  } catch (err) {
    console.error("Error loading tasks:", err);
    return {};
  }
}

function saveTask(task) {
  try {
    writeFileSync(taskFile, JSON.stringify(task, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving tasks:", err);
  }
}

function addTask(id, description) {
  const tasks = loadTask();
  if (tasks[id]) {
    console.log("Task already exists");
    return;
  }

  tasks[id] = { description, status: "in progress" };
  saveTask(tasks);
  console.log(`Task ${id} added`);
}

function updateTask(id, newDescription) {
  const tasks = loadTask();
  if (!tasks[id]) {
    console.log("Task not found");
    return;
  }

  tasks[id].description = newDescription;
  saveTask(tasks);
  console.log(`Task ${id} updated`);
}

function setStatus(id, status) {
  const tasks = loadTask();
  if (!tasks[id]) {
    console.log("Task not found");
    return;
  }

  tasks[id].status = status;
  saveTask(tasks);
  console.log(`Task ${id} marked as ${status}`);
}

function deleteTask(id) {
  const tasks = loadTask();
  if (!tasks[id]) {
    console.log("Task not found");
    return;
  }

  delete tasks[id];
  saveTask(tasks);
  console.log(`Task ${id} deleted`);
}

function listTasks(filter) {
  const tasks = loadTask();
  for (const id in tasks) {
    if (!filter || tasks[id].status === filter) {
      console.log(`${id}: ${tasks[id].description} [${tasks[id].status}]`);
    }
  }
}

program
  .option("-f, --file <filename>", "File to store tasks", "tasks.json")
  .action((options) => {
    taskFile = path.resolve(options.file);
  });

program
  .command("add <id> <description>")
  .description("Add a new task")
  .action((id, description) => {
    addTask(id, description);
  });

program
  .command("update <id> <newDescription>")
  .description("Update a task")
  .action((id, newDescription) => {
    updateTask(id, newDescription);
  });

program
  .command("delete <id>")
  .description("Delete a task")
  .action((id) => {
    deleteTask(id);
  });

program
  .command("complete <id>")
  .description("Mark a task as completed")
  .action((id) => {
    setStatus(id, "done");
  });

program
  .command("inprogress <id>")
  .description("Mark a task as in progress")
  .action((id) => {
    setStatus(id, "in progress");
  });

program
  .command("list")
  .description("List all tasks")
  .action(() => {
    listTasks();
  });

program
  .command("list-done")
  .description("List all completed tasks")
  .action(() => {
    listTasks("done");
  });

program
  .command("list-notdone")
  .description("List all tasks that are not done")
  .action(() => {
    listTasks("in progress");
  });

program
  .command("list-inprogress")
  .description("List all tasks that are in progress")
  .action(() => {
    listTasks("in progress");
  });

program.parse(process.argv);
