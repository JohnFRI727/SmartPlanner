"use client";

import { ProjectList } from "@/components/projects/project-list";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projekte</h1>
          <p className="text-muted-foreground">
            Verwalte deine Projekte und ihren Fortschritt.
          </p>
        </div>
        <CreateProjectDialog />
      </div>
      <ProjectList />
    </div>
  );
}
