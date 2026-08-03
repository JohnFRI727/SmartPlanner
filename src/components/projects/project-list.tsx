"use client";

import { useEffect, useState, useCallback } from "react";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { ProjectCard } from "@/components/projects/project-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  priority: string;
  deadline?: string | null;
  workspace: { id: string; name: string; color: string };
  _count: { tasks: number };
}

export function ProjectList() {
  const { selectedWorkspaceId } = useWorkspaceStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedWorkspaceId) params.set("workspaceId", selectedWorkspaceId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (priorityFilter !== "all") params.set("priority", priorityFilter);

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (response.ok) {
        const result = await response.json();
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedWorkspaceId, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" aria-label="Status filtern">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="PLANNED">Geplant</SelectItem>
            <SelectItem value="ACTIVE">Aktiv</SelectItem>
            <SelectItem value="WAITING">Wartend</SelectItem>
            <SelectItem value="COMPLETED">Abgeschlossen</SelectItem>
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
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Noch keine Projekte vorhanden. Erstelle dein erstes Projekt!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
