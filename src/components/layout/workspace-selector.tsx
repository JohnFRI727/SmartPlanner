"use client";

import { useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspace.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock } from "lucide-react";

export function WorkspaceSelector() {
  const {
    workspaces,
    selectedWorkspaceId,
    setWorkspaces,
    setSelectedWorkspaceId,
  } = useWorkspaceStore();

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await fetch("/api/workspaces");
        if (response.ok) {
          const result = await response.json();
          setWorkspaces(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      }
    }
    fetchWorkspaces();
  }, [setWorkspaces]);

  return (
    <Select
      value={selectedWorkspaceId ?? "all"}
      onValueChange={(value) =>
        setSelectedWorkspaceId(value === "all" ? null : value)
      }
    >
      <SelectTrigger className="w-[180px]" aria-label="Workspace auswählen">
        <SelectValue placeholder="Alle Workspaces" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Alle Workspaces</SelectItem>
        {workspaces.map((ws) => (
          <SelectItem key={ws.id} value={ws.id}>
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: ws.color }}
              />
              {ws.name}
              {ws.privacyLevel === "CONFIDENTIAL" && (
                <Lock className="h-3 w-3 text-muted-foreground" />
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
