export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  id: "capo" | "speedy" | "wash-buddy" | "world-of-toilets" | "physics-simulator";
  githubUrl: string;
  tags: string[];
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: "capo",
    githubUrl: "https://github.com/nycocado/capo",
    tags: ["NestJS", "Next.js", "MariaDB", "Docker"],
    images: [
      { src: "/projects/capo/01.gif", width: 800, height: 450 },
      { src: "/projects/capo/02.gif", width: 800, height: 450 },
      { src: "/projects/capo/03.gif", width: 800, height: 450 },
      { src: "/projects/capo/04.gif", width: 1000, height: 625 },
    ],
  },
  {
    id: "speedy",
    githubUrl: "https://github.com/nycocado/speedy",
    tags: ["ROS 2", "C++", "Python", "OpenCV"],
    images: [
      { src: "/projects/speedy/01.webp", width: 1200, height: 545 },
      { src: "/projects/speedy/02.webp", width: 800, height: 1200 },
      { src: "/projects/speedy/03.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/04.webp", width: 800, height: 1200 },
    ],
  },
  {
    id: "wash-buddy",
    githubUrl: "https://github.com/nycocado/wash-buddy",
    tags: ["C++", "Arduino", "Embedded systems", "IoT"],
    images: [
      { src: "/projects/wash-buddy/01.webp", width: 1200, height: 900 },
      { src: "/projects/wash-buddy/02.webp", width: 1200, height: 675 },
      { src: "/projects/wash-buddy/03.webp", width: 1200, height: 675 },
      { src: "/projects/wash-buddy/04.webp", width: 991, height: 1119 },
    ],
  },
  {
    id: "world-of-toilets",
    githubUrl: "https://github.com/nycocado/worldoftoilets",
    tags: ["NestJS", "Kotlin", "Docker", "gRPC"],
    images: [],
  },
  {
    id: "physics-simulator",
    githubUrl: "https://github.com/nycocado/physics-simulator",
    tags: ["C", "GTK4", "Cairo"],
    images: [],
  },
];
