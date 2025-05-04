import LinkComponent from "../components/LinkComponent";
import { links, projects } from "../../data";

const experiences = [
  {
    company: "Zeliot",
    from: "April 2022",
    to: "Dec 2024",
  },
  {
    company: "ABBYY",
    from: "Dec 2024",
    to: "Present",
  },
];

export function Home() {
  return (
    <>
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          hey, I'm Akshay Gore 👋
        </h1>
        <div className="flex flex-col gap-2 pb-4">
          <p className="text-md">Building Softwares for browsers</p>
          <div className="flex flex-row gap-2 items-center">
            {links.map((link) => (
              <LinkComponent
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            currently working on 🛠️
          </h2>
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="text-lg font-medium">{project.name}</div>
                <div className="text-sm py-2 text-zinc-500">
                  {project.description}
                </div>
                <div className="flex flex-row gap-2">
                  {project.links.map((link) => (
                    <LinkComponent
                      key={link.href}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            Experience 💼
          </h2>
          <div className="flex flex-col gap-4">
            {experiences.map((exp, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-medium">{exp.company}</span>
                <span className="text-sm">
                  {exp.from} - {exp.to}
                </span>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
