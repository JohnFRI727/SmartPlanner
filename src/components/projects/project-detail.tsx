"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Archive,
  Trash2,
  CheckSquare,
  Plus,
} from "lucide-react";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadline?: string | null;
  _count: { subtasks: number };
}

interface ProjectDetailProps {
  project: {
    id: string;
    name: string;
    description?: string | null;
    goal?: string | null;
    status: string;
    priority: string;
    deadline?: string | null;
    workspace: { id: string; name: string; color: string };
    tasks: Task[];
    tags: { id: string; name: string; color: string }[];
  };
}

const statusLabels: Record<string, string> = {
  PLANNED: "Geplant",
  ACTIVE: "Aktiv",
  WAITING: "Wartend",
  COMPLETED: "Abgeschlossen",
  ARCHIVED: "Archiviert",
};

const priorityLabels: Record<string, string> = {
  LOW: "Niedrig",
  MEDIUM: "Mittel",
  HIGH: "Hoch",
  URGENT: "Dringend",
};

const taskStatusLabels: Record<string, string> = {
  OPEN: "Offen",
  IN_PROGRESS: "In Bearbeitung",
  WAITING: "Wartend",
  DONE: "Erledigt",
};

const taskStatusColors: Record<string, string> = {
  OPEN: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  WAITING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  DONE: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(project.status);
  const [loading, setLoading] = useState(false);

  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter((t) => t.status === "DONE").length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch (error) {
      console.error("Status update error:", error);
      setStatus(project.status);
    }
  }

  async function handleArchive() {
    if (!confirm("Möchtest du das Projekt wirklich archivieren?")) return;
    setLoading(true);
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ARCHIVED" }),
      });
      router.push("/projects");
    } catch (error) {
      console.error("Archive error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Möchtest du das Projekt wirklich löschen? Alle Aufgaben werden ebenfalls gelöscht.")) return;
    setLoading(true);
    try {
      await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      router.push("/projects");
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/projects" aria-label="Zurück zu Projekten">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: project.workspace.color }}
            />
            {project.workspace.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleArchive}
            disabled={loading}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archivieren
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Löschen
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {project.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Beschreibung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">
                Aufgaben ({totalTasks})
              </CardTitle>
              <CreateTaskDialog projectId={project.id} />
            </CardHeader>
            <CardContent>
              {project.tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Noch keine Aufgaben. Erstelle die erste Aufgabe!
                </p>
              ) : (
                <ul className="space-y-2">
                  {project.tasks.map((task) => (
                    <li key={task.id}>
                      <Link
                        href={`/tasks/${task.id}`}
                        className="flex items-center justify-between rounded-md border p-3 transition-colors hover:bg-accent"
                      >
                        <div className="flex items-center gap-3">
                          <CheckSquare className="h-4 w-4 text-muted-foreground" />
                          <span
                            className={
                              task.status === "DONE"
                                ? "line-through text-muted-foreground"
                                : ""
                            }
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={taskStatusColors[task.status]}
                          >
                            {taskStatusLabels[task.status]}
                          </Badge>
                          {task.deadline && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.deadline).toLocaleDateString("de-DE")}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Status
                </p>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PLANNED">Geplant</SelectItem>
                    <SelectItem value="ACTIVE">Aktiv</SelectItem>
                    <SelectItem value="WAITING">Wartend</SelectItem>
                    <SelectItem value="COMPLETED">Abgeschlossen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Priorität
                </p>
                <Badge variant="outline">
                  {priorityLabels[project.priority]}
                </Badge>
              </div>

              {project.deadline && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Deadline
                  </p>
                  <p className="text-sm">
                    {new Date(project.deadline).toLocaleDateString("de-DE")}
                  </p>
                </div>
              )}

              {project.goal && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Ziel
                  </p>
                  <p className="text-sm">{project.goal}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Fortschritt
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {progress}%
                  </span>
                </div>
              </div>

              {project.tags.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        style={{ borderColor: tag.color }}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
