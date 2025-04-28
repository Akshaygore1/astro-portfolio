import LinkComponent from "../components/LinkComponent";
import { Metadata } from "../components/Metadata";
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
      <Metadata
        title="Akshay Gore | Full Stack Developer"
        description="Full Stack Developer passionate about building scalable applications and contributing to open source. Love to build and contribute."
      />
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          hey, I'm Akshay Gore 👋
        </h1>
        <div className="flex flex-col gap-4 pb-6">
          <p className="text-md">
            I'm a Full Stack Developer with 3 years of industry experience,
            passionate about building scalable and efficient web applications.
            Beyond work, I actively contribute to open-source projects and enjoy
            building side projects on weekends to sharpen my skills and explore
            new technologies.
          </p>
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
        <div className="flex flex-col gap-4 pb-6">
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            currently working on 🛠️
          </h2>
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="text-lg font-medium">{project.name}</div>
                <div className="text-sm">{project.description}</div>
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
