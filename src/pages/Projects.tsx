import { allProjects } from "../../data";
import LinkComponent from "../components/LinkComponent";

export function Projects() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          my projects
        </h1>
        {allProjects.map((project) => (
          <div key={project.name}>
            <h2>{project.name}</h2>
            <LinkComponent href={project.gitHubUrl} label="github" />
          </div>
        ))}
      </div>
    </div>
  );
}
