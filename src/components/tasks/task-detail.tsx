"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Trash2,
  Plus,
  CheckSquare,
  Square,
  X,
} from "lucide-react";

interface Subtask {
  id: string;
  title: string;
  status: string;
  deadline?: string | null;
  notes?: string | null;
  position: number;
}

interface TaskDetailProps {
  task: {
    id: string;
    projectId: string;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    deadline?: string | null;
    completedAt?: string | null;
    project: { id: string; name: string; workspaceId: string };
    subtasks: Subtask[];
    tags: { id: string; name: string; color: string }[];
    reminders: { id: string; remindAt: string; type: string; sent: boolean }[];
  };
}

const statusLabels: Record<string, string> = {
  OPEN: "Offen",
  IN_PROGRESS: "In Bearbeitung",
  WAITING: "Wartend",
  DONE: "Erledigt",
};

const priorityLabels: Record<string, string> = {
  LOW: "Niedrig",
  MEDIUM: "Mittel",
  HIGH: "Hoch",
  URGENT: "Dringend",
};

export function TaskDetail({ task }: TaskDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [deadline, setDeadline] = useState(
    task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : ""
  );
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSubtasks = subtasks.length;
  const doneSubtasks = subtasks.filter((st) => st.status === "DONE").length;
  const subtaskProgress =
    totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || null,
          status,
          priority,
          deadline: deadline ? new Date(deadline).toISOString() : null,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Möchtest du diese Aufgabe wirklich löschen?")) return;
    setLoading(true);
    try {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      router.push(`/projects/${task.projectId}`);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addSubtask() {
    if (!newSubtaskTitle.trim()) return;
    try {
      const response = await fetch(`/api/tasks/${task.id}/subtasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newSubtaskTitle.trim() }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubtasks([...subtasks, result.data]);
        setNewSubtaskTitle("");
      }
    } catch (error) {
      console.error("Add subtask error:", error);
    }
  }

  async function toggleSubtask(subtaskId: string, currentStatus: string) {
    const newStatus = currentStatus === "DONE" ? "OPEN" : "DONE";
    try {
      const response = await fetch(
        `/api/tasks/${task.id}/subtasks/${subtaskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setSubtasks((prev) =>
          prev.map((st) =>
            st.id === subtaskId ? { ...st, status: newStatus } : st
          )
        );
      }
    } catch (error) {
      console.error("Toggle subtask error:", error);
    }
  }

  async function deleteSubtask(subtaskId: string) {
    try {
      const response = await fetch(
        `/api/tasks/${task.id}/subtasks/${subtaskId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setSubtasks((prev) => prev.filter((st) => st.id !== subtaskId));
      }
    } catch (error) {
      console.error("Delete subtask error:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/tasks" aria-label="Zurück zu Aufgaben">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            <Link
              href={`/projects/${task.projectId}`}
              className="hover:underline"
            >
              {task.project.name}
            </Link>
          </p>
        </div>
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aufgabe bearbeiten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Titel</Label>
                <Input
                  id="task-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-desc">Beschreibung</Label>
                <textarea
                  id="task-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Beschreibung (optional)"
                  maxLength={5000}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Speichern..." : "Speichern"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">
                Unteraufgaben ({doneSubtasks}/{totalSubtasks})
              </CardTitle>
              {totalSubtasks > 0 && (
                <span className="text-xs text-muted-foreground">
                  {subtaskProgress}%
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {totalSubtasks > 0 && (
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${subtaskProgress}%` }}
                  />
                </div>
              )}

              <ul className="space-y-1">
                {subtasks.map((subtask) => (
                  <li
                    key={subtask.id}
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 shrink-0"
                      onClick={() => toggleSubtask(subtask.id, subtask.status)}
                      aria-label={
                        subtask.status === "DONE"
                          ? "Als offen markieren"
                          : "Als erledigt markieren"
                      }
                    >
                      {subtask.status === "DONE" ? (
                        <CheckSquare className="h-4 w-4 text-green-600" />
                      ) : (
                        <Square className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <span
                      className={`flex-1 text-sm ${
                        subtask.status === "DONE"
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {subtask.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                      onClick={() => deleteSubtask(subtask.id)}
                      aria-label="Unteraufgabe löschen"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <Input
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="Neue Unteraufgabe..."
                  maxLength={200}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSubtask();
                    }
                  }}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={addSubtask}
                  disabled={!newSubtaskTitle.trim()}
                  aria-label="Unteraufgabe hinzufügen"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPEN">Offen</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Bearbeitung</SelectItem>
                    <SelectItem value="WAITING">Wartend</SelectItem>
                    <SelectItem value="DONE">Erledigt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Priorität
                </p>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Niedrig</SelectItem>
                    <SelectItem value="MEDIUM">Mittel</SelectItem>
                    <SelectItem value="HIGH">Hoch</SelectItem>
                    <SelectItem value="URGENT">Dringend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Deadline
                </p>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              {task.tags.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
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

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Erinnerungen
                </p>
                {task.reminders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Keine Erinnerungen gesetzt.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {task.reminders.map((reminder) => (
                      <li key={reminder.id} className="text-sm">
                        {new Date(reminder.remindAt).toLocaleString("de-DE")}
                        {reminder.sent && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            (gesendet)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
