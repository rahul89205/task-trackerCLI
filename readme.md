Task Manager

This is a simple command-line task manager application written in JavaScript.

## Installation

1. Clone the repository or download the code.
   git clone https://github.com/rahul89205/task-trackerCLI.git
   cd task-trackerCLI
2. Make sure you have Node.js installed on your machine.
3. Open a terminal and navigate to the project directory.
4. Run the following command to install the dependencies:

```shell
npm install
```

## Usage

To use the task manager, open a terminal and navigate to the project directory. Then, you can run the following commands:

- Add a new task:

  ```shell
  node task-trackerCLI.js add <id> <description>
  ```

- Update a task:

  ```shell
  node task-trackerCLI.js update <id> <newDescription>
  ```

- Delete a task:

  ```shell
  node task-trackerCLI.js delete <id>
  ```

- Mark a task as completed:

  ```shell
  node task-trackerCLI.js complete <id>
  ```

- Mark a task as in progress:

  ```shell
  node task-trackerCLI.js inprogress <id>
  ```

- List all tasks:

  ```shell
  node task-trackerCLI.js list
  ```

- List all completed tasks:

  ```shell
  node task-trackerCLI.js list-done
  ```

- List all tasks that are not done:

  ```shell
  node task-trackerCLI.js list-notdone
  ```

- List all tasks that are in progress:
  ```shell
  node task-trackerCLI.js list-inprogress
  ```

## Configuration

By default, the tasks are stored in a file named `tasks.json`. You can specify a different file using the `-f` or `--file` option. For example:

```shell
node task-trackerCLI.js --file mytasks.json add 1 "Review the code"
```
