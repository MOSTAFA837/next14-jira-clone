"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { cn } from "@/lib/utils";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Loader2 } from "lucide-react";

function Projects() {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  const { open } = useCreateProjectModal();

  const { data, isLoading } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center p-2.5">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        data?.documents.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
          const isActive = pathname === href;

          return (
            <Link href={href} key={project.$id}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <ProjectAvatar image={project.imageUrl} name={project.name} />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default Projects;
