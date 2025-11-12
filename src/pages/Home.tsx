import LinkComponent from "../components/LinkComponent";
import { links } from "../../data";

const skills = [
  "Next.js",
  "React.js",
  "Node.js",
  "Docker",
  "Kubernetes",
  "Cloud",
  "PostgreSQL",
  "ClickHouse",
  "GenAI",
];
const experiences = [
  {
    company: "ABBYY",
    from: "Dec 2024",
    to: "Present",
    position: "Software Engineer 2",
  },
  {
    company: "Zeliot",
    from: "April 2022",
    to: "Dec 2024",
    position: "Software Engineer",
  },
];

// ✅ Skill chip component
const SkillChip = ({ name }: { name: string }) => {
  return (
    <span className="px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105">
      {name}
    </span>
  );
};

export function Home() {
  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col gap-4">
        <div className="w-full min-h-10"></div>
        <div>
          <h1 className="text-xl font-medium dark:text-gray-50">
            hey, I'm Akshay Gore 👋
          </h1>
          <p className="text-md py-1">Building Softwares for browsers</p>
        </div>
        <div className="flex flex-col pb-4">
          <p className="text-md">
            Full-stack engineer with 4 years of experience building enterprise
            and SaaS products. I specialize in scalable data systems, analytics
            platforms, and AI-driven applications, with strong expertise across
            frontend, backend, and DevOps. Currently exploring how to make
            software more intelligent through AI-native design.
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
        <div className="flex flex-col gap-4 pb-4">
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillChip key={skill} name={skill} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
            Experience
          </h2>
          <div className="flex flex-col gap-4">
            {experiences.map((exp, index) => (
              <li key={index} className="flex gap-1 flex-col">
                <span className="text-md font-medium">{exp.company}</span>
                <span className="text-sm">
                  {exp.position}, {exp.from} - {exp.to}
                </span>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
