# TaskFlow

A modern task management application built with HTML, CSS and JavaScript.

## Getting Started

- Clone the repository

```bash
git clone https://github.com/Mayowa-de/To-do-App-project.git
```

- Navigate to the project folder

```bash
cd to-do-practice
```

- Open `index.html` in your browser

Or use VS Code Live Server:

```bash
Right Click -> Open with Live Server
```
## Features

- Add tasks (title input + details popup)
- Task details popup with: due date and difficulty level (Easy / Medium / Hard)
- Validate task title in popup (inline error shown in popup)
- Save tasks to Local Storage (persist across reloads)
- Delete tasks
- Mark tasks completed / incomplete (toggle)
- Filter tasks by status: All / Active / Completed (click button to activate; active button shows red)
- Live search: filter tasks by title (input filters as you type and on Enter)
- Empty state UI when no tasks exist
- Per-task metadata shown on card: due-date indicator and difficulty badge
- Responsive layout and accessible controls

## Technologies

- HTML5
- CSS3
- JavaScript ES6

## Challenges

- No Frameworks
- Responsive Design
- Accessible UI

## Usage

- Open `index.html` in a browser or use VS Code Live Server.
- Click `+ Add Task` to open the details popup, enter a title (required), optional due date, and select difficulty, then click `Add Task`.
- Use the small checkbox on each card to mark it complete — this updates storage and the card styling.
- Use the filter buttons to show All / Active / Completed tasks; the selected filter button is highlighted in red.
- Type in the search box to filter cards by title (search respects the active filter).
- Tasks are stored in Local Storage and will remain after page reload.

If you'd like, I can add features such as persisting the active filter/search across reloads, or exporting/importing tasks.
