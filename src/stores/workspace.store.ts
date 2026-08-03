"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Workspace {
  id: string;
  name: string;
  type: string;
  privacyLevel: string;
  color: string;
}

interface WorkspaceState {
  workspaces: Workspace[];
  selectedWorkspaceId: string | null;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setSelectedWorkspaceId: (id: string | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, data: Partial<Workspace>) => void;
  removeWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: [],
      selectedWorkspaceId: null,
      setWorkspaces: (workspaces) => set({ workspaces }),
      setSelectedWorkspaceId: (id) => set({ selectedWorkspaceId: id }),
      addWorkspace: (workspace) =>
        set((state) => ({ workspaces: [...state.workspaces, workspace] })),
      updateWorkspace: (id, data) =>
        set((state) => ({
          workspaces: state.workspaces.map((ws) =>
            ws.id === id ? { ...ws, ...data } : ws
          ),
        })),
      removeWorkspace: (id) =>
        set((state) => ({
          workspaces: state.workspaces.filter((ws) => ws.id !== id),
          selectedWorkspaceId:
            state.selectedWorkspaceId === id ? null : state.selectedWorkspaceId,
        })),
    }),
    {
      name: "smartplanner-workspace",
      partialize: (state) => ({ selectedWorkspaceId: state.selectedWorkspaceId }),
    }
  )
);
