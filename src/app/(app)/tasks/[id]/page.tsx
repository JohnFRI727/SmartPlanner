import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { taskService } from "@/lib/services/task.service";
import { TaskDetail } from "@/components/tasks/task-detail";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const task = await taskService.getById(session.user.id, id);

  if (!task) {
    redirect("/tasks");
  }

  return <TaskDetail task={task} />;
}
