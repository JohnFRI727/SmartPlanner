"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckSquare, Square, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadline?: string | null;
  project: { id: string; name: string; workspaceId: string };
  _count: { subtasks: number };
  subtasks: { status: string }[];
  tags: { id: string; name: string; color: string }[];
}

const statusLabels: Record<string, string> = {
  OPEN: "Offen",
  IN_PROGRESS: "In Bearbeitung",
  WAITING: "Wartend",
  DONE: "Erledigt",
};

const statusColors: Record<string, string> = {
  OPEN: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  WAITING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  DONE: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const priorityColors: Record<string, string> = {
  LOW: "border-slate-300",
  MEDIUM: "border-blue-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-500",
};

export function TaskList() {
  const router = useRouter();
  const { selectedWorkspaceId } = useWorkspaceStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("position");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedWorkspaceId) params.set("workspaceId", selectedWorkspaceId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (priorityFilter !== "all") params.set("priority", priorityFilter);
      params.set("sortBy", sortBy);
      params.set("pageSize", "50");

      const response = await fetch(`/api/tasks?${params.toString()}`);
      if (response.ok) {
        const result = await response.json();
        setTasks(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedWorkspaceId, statusFilter, priorityFilter, sortBy]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function toggleStatus(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === "DONE" ? "OPEN" : "DONE";
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Toggle status error:", error);
    }
  }

  function isOverdue(deadline: string | null | undefined): boolean {
    if (!deadline) return false;
    return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" aria-label="Status filtern">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="OPEN">Offen</SelectItem>
            <SelectItem value="IN_PROGRESS">In Bearbeitung</SelectItem>
            <SelectItem value="WAITING">Wartend</SelectItem>
            <SelectItem value="DONE">Erledigt</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[150px]" aria-label="Priorität filtern">
            <SelectValue placeholder="Priorität" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Prioritäten</SelectItem>
            <SelectItem value="LOW">Niedrig</SelectItem>
            <SelectItem value="MEDIUM">Mittel</SelectItem>
            <SelectItem value="HIGH">Hoch</SelectItem>
            <SelectItem value="URGENT">Dringend</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]" aria-label="Sortierung">
            <SelectValue placeholder="Sortieren" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="position">Position</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="priority">Priorität</SelectItem>
            <SelectItem value="createdAt">Erstellt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Keine Aufgaben gefunden.
        </p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-accent ${priorityColors[task.priority]}`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => toggleStatus(task.id, task.status)}
                aria-label={task.status === "DONE" ? "Als offen markieren" : "Als erledigt markieren"}
              >
                {task.status === "DONE" ? (
                  <CheckSquare className="h-4 w-4 text-green-600" />
                ) : (
                  <Square className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>

              <Link
                href={`/tasks/${task.id}`}
                className="flex flex-1 items-center justify-between min-w-0"
              >
                <div className="min-w-0">
                  <span
                    className={`block truncate ${
                      task.status === "DONE"
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {task.project.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 ml-2 shrink-0">
                  {task.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="text-xs"
                      style={{ borderColor: tag.color }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  <Badge variant="outline" className={statusColors[task.status]}>
                    {statusLabels[task.status]}
                  </Badge>
                  {task.deadline && (
                    <span
                      className={`flex items-center gap-1 text-xs ${
                        isOverdue(task.deadline) ? "text-destructive font-medium" : "text-muted-foreground"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      {new Date(task.deadline).toLocaleDateString("de-DE")}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
