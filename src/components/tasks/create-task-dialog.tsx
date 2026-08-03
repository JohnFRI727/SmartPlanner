"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreateTaskDialogProps {
  projectId?: string;
}

export function CreateTaskDialog({ projectId }: CreateTaskDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [deadline, setDeadline] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(projectId ?? "");
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);

  async function loadProjects() {
    if (projectId) return;
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const result = await response.json();
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || undefined,
          projectId: projectId ?? selectedProjectId,
          priority,
          deadline: deadline ? new Date(deadline).toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error?.message ?? "Fehler beim Erstellen");
        return;
      }

      setOpen(false);
      resetForm();
      router.refresh();
    } catch {
      setError("Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setDeadline("");
    setSelectedProjectId(projectId ?? "");
    setError("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) loadProjects();
        if (!value) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Neue Aufgabe
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue Aufgabe erstellen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Titel *</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Aufgabentitel"
              required
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Beschreibung</Label>
            <Input
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibung (optional)"
              maxLength={5000}
            />
          </div>

          {!projectId && (
            <div className="space-y-2">
              <Label htmlFor="task-project">Projekt *</Label>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger id="task-project">
                  <SelectValue placeholder="Projekt auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="task-priority">Priorität</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="task-priority">
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

          <div className="space-y-2">
            <Label htmlFor="task-deadline">Deadline</Label>
            <Input
              id="task-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={loading || !title || !(projectId ?? selectedProjectId)}
            >
              {loading ? "Erstellen..." : "Erstellen"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
