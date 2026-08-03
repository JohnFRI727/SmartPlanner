import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { projectService } from "@/lib/services/project.service";
import { ProjectDetail } from "@/components/projects/project-detail";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const project = await projectService.getById(session.user.id, id);

  if (!project) {
    redirect("/projects");
  }

  return <ProjectDetail project={project} />;
}
