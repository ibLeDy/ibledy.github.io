// Types and site implementation are MIT-licensed. The personal CV text and
// identifying data below remain reserved; see CONTENT-LICENSE.md.
export type Link = {
  label: string;
  href: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Project = {
  name: string;
  strapline: string;
  description: string;
  href: string;
  linkLabel: string;
  tags: string[];
  index: string;
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export const site = {
  name: "Iago Alonso",
  title: "Systems & Platform Engineer",
  description:
    "Systems and platform engineer building reliable infrastructure, automation, and production services.",
  email: "iago@iagoalonso.xyz",
  url: "https://iagoalonso.xyz",
  intro:
    "I design, operate, and improve the infrastructure that production software depends on.",
  about: [
    "I’m a systems and platform engineer with a software development background and experience operating large-scale production infrastructure.",
    "I work across Linux, Kubernetes, networking, distributed databases, infrastructure automation, and observability—turning operational complexity into systems that are easier to understand and safer to run.",
  ],
  profiles: [
    { label: "GitHub", href: "https://github.com/ibLeDy", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/iago-alonso",
      icon: "linkedin",
    },
  ] as const,
  principles: ["Reproducible", "Observable", "Maintainable", "Safe to operate"],
} as const;

export const experience: Experience[] = [
  {
    company: "Marfeel",
    role: "SysOps Engineer",
    period: "August 2022 — Present",
    summary:
      "Operate and improve a large-scale production platform spanning Kubernetes environments and hundreds of on-premises systems.",
    highlights: [
      "Design, deploy, and maintain production infrastructure, distributed databases, and supporting platform services.",
      "Build infrastructure automation and deployment workflows using Ansible, Terraform, Helm, and Argo CD.",
      "Contribute to reliability, performance, and capacity planning for high-throughput production systems.",
      "Develop monitoring, alerting, and operational tooling to improve observability and incident response.",
    ],
  },
  {
    company: "Alliantum GmbH",
    role: "System Administrator",
    period: "June 2021 — June 2022",
    summary:
      "Worked across infrastructure and developer experience, introducing automation, engineering standards, and CI/CD workflows.",
    highlights: [
      "Built an automated per-branch Odoo instance manager with isolated application environments connected to cloned production data and file storage.",
      "Developed internal pipelines and tooling that reduced repetitive work and made deployments more reliable.",
      "Managed the on-premises infrastructure of the company’s largest client and migrated it to Google Cloud Platform.",
      "Maintained security, backup and recovery, rollback procedures, and infrastructure hosted on Hetzner.",
    ],
  },
  {
    company: "Alliantum GmbH",
    role: "Software Developer",
    period: "December 2020 — June 2021",
    summary:
      "Maintained customized Odoo installations and developed client-specific modules, integrations, and backend functionality.",
    highlights: [
      "Migrated Enterprise and Community installations from legacy Odoo releases to supported versions.",
      "Performed production deployments, routine maintenance, and urgent hotfixes.",
      "Diagnosed application and data issues across customized client environments.",
    ],
  },
];

export const projects: Project[] = [
  {
    index: "01",
    name: "ProviderIP",
    strapline: "Identify the provider behind an IP address",
    description:
      "A web service that checks IPv4 and IPv6 addresses against network ranges published by supported cloud, hosting, and network providers. It maintains a searchable provider catalog, refreshes its data automatically, and is backed by automated tests.",
    href: "https://providerip.com",
    linkLabel: "Visit providerip.com",
    tags: ["Python", "FastAPI", "IPv4 / IPv6", "Operations"],
  },
  {
    index: "02",
    name: "Timezone Converter",
    strapline: "Compare entire days across multiple time zones",
    description:
      "An open-source command-line tool that displays side-by-side, full-day comparisons across multiple time zones, making overlapping working hours easier to find. Distributed through PyPI and as a Docker container.",
    href: "https://github.com/ibLeDy/timezone-converter",
    linkLabel: "View source on GitHub",
    tags: ["Python", "CLI", "Time zones", "Docker"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Infrastructure",
    skills: ["Kubernetes", "Docker", "Helm", "Argo CD", "Ansible", "Terraform"],
  },
  {
    label: "Systems & networking",
    skills: [
      "Linux",
      "TCP/IP",
      "DNS",
      "TLS",
      "SSH",
      "Load balancing",
      "Reverse proxies",
    ],
  },
  {
    label: "Data & reliability",
    skills: [
      "Distributed databases",
      "Relational databases",
      "Prometheus",
      "Grafana",
      "Capacity planning",
    ],
  },
  {
    label: "Software & delivery",
    skills: ["Python", "Bash", "SQL", "Git", "GitHub", "GitLab", "CI/CD"],
  },
  {
    label: "Cloud & hosting",
    skills: ["AWS", "GCP", "OVHcloud", "Hetzner", "On-premises systems"],
  },
];
