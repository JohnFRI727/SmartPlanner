"use client";

import { TaskList } from "@/components/tasks/task-list";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Aufgaben</h1>
          <p className="text-muted-foreground">
            Alle deine Aufgaben auf einen Blick.
          </p>
        </div>
        <CreateTaskDialog />
      </div>
      <TaskList />
    </div>
  );
}
