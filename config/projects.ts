export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export const isVideoSrc = (src: string) => /\.(webm|mp4)$/.test(src);

export interface Project {
  id:
    "capo" | "speedy" | "wash-buddy" | "world-of-toilets" | "physics-simulator";
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
      { src: "/projects/capo/01.webm", width: 1920, height: 1080 },
      { src: "/projects/capo/02.webm", width: 1920, height: 1080 },
      { src: "/projects/capo/03.webm", width: 1920, height: 1080 },
      { src: "/projects/capo/04.webm", width: 1920, height: 1080 },
    ],
  },
  {
    id: "world-of-toilets",
    githubUrl: "https://github.com/nycocado/worldoftoilets",
    tags: ["NestJS", "Kotlin", "Docker", "gRPC"],
    images: [
      {
        src: "/projects/world-of-toilets/mobile-01.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-02.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-03.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-04.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-05.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-06.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-07.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/mobile-08.webp",
        width: 486,
        height: 1080,
      },
      {
        src: "/projects/world-of-toilets/web-01.webp",
        width: 1200,
        height: 675,
      },
      {
        src: "/projects/world-of-toilets/web-02.webp",
        width: 1200,
        height: 675,
      },
      {
        src: "/projects/world-of-toilets/web-03.webp",
        width: 1200,
        height: 675,
      },
      {
        src: "/projects/world-of-toilets/web-04.webp",
        width: 1200,
        height: 675,
      },
      {
        src: "/projects/world-of-toilets/web-05.webp",
        width: 1200,
        height: 675,
      },
    ],
  },
  {
    id: "speedy",
    githubUrl: "https://github.com/nycocado/speedy",
    tags: ["ROS 2", "C++", "Python", "OpenCV"],
    images: [
      { src: "/projects/speedy/01.webp", width: 1200, height: 721 },
      { src: "/projects/speedy/02.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/03.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/04.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/05.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/06.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/07.webp", width: 1200, height: 800 },
      { src: "/projects/speedy/08.webp", width: 800, height: 1200 },
      { src: "/projects/speedy/09.webp", width: 800, height: 1200 },
      { src: "/projects/speedy/10.webp", width: 800, height: 1200 },
    ],
  },
  {
    id: "wash-buddy",
    githubUrl: "https://github.com/nycocado/wash-buddy",
    tags: ["C++", "Arduino", "Embedded systems", "IoT"],
    images: [
      { src: "/projects/wash-buddy/01.webp", width: 878, height: 1200 },
      { src: "/projects/wash-buddy/02.webp", width: 1200, height: 977 },
      { src: "/projects/wash-buddy/03.webp", width: 1200, height: 900 },
      { src: "/projects/wash-buddy/04.webp", width: 1200, height: 675 },
      { src: "/projects/wash-buddy/05.webp", width: 1200, height: 675 },
      { src: "/projects/wash-buddy/06.webp", width: 1200, height: 675 },
      { src: "/projects/wash-buddy/07.webp", width: 1200, height: 675 },
      { src: "/projects/wash-buddy/08.webp", width: 1200, height: 675 },
    ],
  },
  {
    id: "physics-simulator",
    githubUrl: "https://github.com/nycocado/physics-simulator",
    tags: ["C", "GTK4", "Cairo"],
    images: [
      { src: "/projects/physics-simulator/01.webm", width: 1920, height: 1080 },
      { src: "/projects/physics-simulator/02.webm", width: 1920, height: 1080 },
    ],
  },
];
