"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderKanban } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string | null;
    status: string;
    priority: string;
    deadline?: string | null;
    workspace: { id: string; name: string; color: string };
    _count: { tasks: number };
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

const priorityColors: Record<string, string> = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  MEDIUM: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  URGENT: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base line-clamp-1">
                {project.name}
              </CardTitle>
            </div>
            <Badge variant="outline" className={priorityColors[project.priority]}>
              {priorityLabels[project.priority]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: project.workspace.color }}
              />
              {project.workspace.name}
            </span>
            <span>{statusLabels[project.status]}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{project._count.tasks} Aufgaben</span>
            {project.deadline && (
              <span>
                Fällig: {new Date(project.deadline).toLocaleDateString("de-DE")}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
