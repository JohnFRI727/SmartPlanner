import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, FolderKanban, AlertTriangle, Clock } from "lucide-react";
import { taskService } from "@/lib/services/task.service";
import { projectService } from "@/lib/services/project.service";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [overdueTasks, upcomingTasks, projectsResult] = await Promise.all([
    taskService.getOverdue(userId),
    taskService.getUpcoming(userId, 7),
    projectService.list(userId, {
      status: "ACTIVE",
      page: 1,
      pageSize: 5,
    }),
  ]);

  // Today's tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayTasks = upcomingTasks.filter((t) => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);
    return d >= today && d < tomorrow;
  });

  const thisWeekTasks = upcomingTasks.filter((t) => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);
    return d >= tomorrow;
  });

  // Count open tasks
  const allTasksResult = await taskService.list(userId, {
    status: "OPEN",
    page: 1,
    pageSize: 1,
    sortBy: "position",
    sortOrder: "asc",
  });
  const openTaskCount = allTasksResult.pagination.total;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Willkommen, {session.user?.name ?? "Nutzer"}!
        </h1>
        <p className="text-muted-foreground">
          Hier ist deine Übersicht für heute.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heute fällig</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTasks.length}</div>
            <p className="text-xs text-muted-foreground">Aufgaben</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Überfällig</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {overdueTasks.length}
            </div>
            <p className="text-xs text-muted-foreground">Aufgaben</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aktive Projekte
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectsResult.pagination.total}
            </div>
            <p className="text-xs text-muted-foreground">Projekte</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Offene Aufgaben
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTaskCount}</div>
            <p className="text-xs text-muted-foreground">Aufgaben</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Überfällig</CardTitle>
          </CardHeader>
          <CardContent>
            {overdueTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Keine überfälligen Aufgaben. 🎉
              </p>
            ) : (
              <ul className="space-y-2">
                {overdueTasks.slice(0, 5).map((task) => (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      className="flex items-center justify-between rounded-md border border-destructive/30 p-2 hover:bg-accent"
                    >
                      <span className="text-sm truncate">{task.title}</span>
                      <span className="text-xs text-destructive shrink-0 ml-2">
                        {task.deadline &&
                          new Date(task.deadline).toLocaleDateString("de-DE")}
                      </span>
                    </Link>
                  </li>
                ))}
                {overdueTasks.length > 5 && (
                  <li className="text-center">
                    <Link
                      href="/tasks"
                      className="text-sm text-primary hover:underline"
                    >
                      Alle anzeigen ({overdueTasks.length})
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heute fällig</CardTitle>
          </CardHeader>
          <CardContent>
            {todayTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Keine Aufgaben für heute geplant.
              </p>
            ) : (
              <ul className="space-y-2">
                {todayTasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      className="flex items-center justify-between rounded-md border p-2 hover:bg-accent"
                    >
                      <span className="text-sm truncate">{task.title}</span>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {task.project.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diese Woche</CardTitle>
          </CardHeader>
          <CardContent>
            {thisWeekTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Keine weiteren Aufgaben diese Woche.
              </p>
            ) : (
              <ul className="space-y-2">
                {thisWeekTasks.slice(0, 5).map((task) => (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      className="flex items-center justify-between rounded-md border p-2 hover:bg-accent"
                    >
                      <span className="text-sm truncate">{task.title}</span>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {task.deadline &&
                          new Date(task.deadline).toLocaleDateString("de-DE")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktive Projekte</CardTitle>
          </CardHeader>
          <CardContent>
            {projectsResult.projects.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Keine aktiven Projekte.{" "}
                <Link href="/projects" className="text-primary hover:underline">
                  Projekt erstellen
                </Link>
              </p>
            ) : (
              <ul className="space-y-2">
                {projectsResult.projects.map((project) => {
                  const taskCount = project._count.tasks;
                  return (
                    <li key={project.id}>
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex items-center justify-between rounded-md border p-2 hover:bg-accent"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="inline-block h-2 w-2 rounded-full shrink-0"
                            style={{
                              backgroundColor: project.workspace.color,
                            }}
                          />
                          <span className="text-sm truncate">
                            {project.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                          {taskCount} Aufgaben
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
