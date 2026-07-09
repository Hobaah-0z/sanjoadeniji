export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: number;
  image: string;
  video?: string;
  description: string;
  gallery: string[];
};

const videos = [
  "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
  "https://storage.googleapis.com/coverr-main/mp4/Winter-1.mp4",
  "https://storage.googleapis.com/coverr-main/mp4/Sunset-in-the-mountains.mp4",
  "https://storage.googleapis.com/coverr-main/mp4/coverr-a-woman-walking-in-the-desert-1584804747139.mp4",
];

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const imageIds = [
  "photo-1509785307050-d4066910ec1e",
  "photo-1611532736597-de2d4265fba3",
  "photo-1520975916090-3105956dac38",
  "photo-1519681393784-d120267933ba",
  "photo-1503602642458-232111445657",
  "photo-1478720568477-152d9b164e26",
  "photo-1541961017774-22349e4a1262",
  "photo-1499750310107-5fef28a66643",
  "photo-1447933601403-0c6688de566e",
  "photo-1461988091159-192b6df7054f",
  "photo-1442512595331-e89e73853f31",
  "photo-1517423440428-a5a00ad493e8",
  "photo-1524578271613-d550eacf6090",
  "photo-1519750157634-b6d493a0f77c",
  "photo-1493663284031-b7e3aefcae8e",
  "photo-1505691938895-1758d7feb511",
  "photo-1493809842364-78817add7ffb",
  "photo-1524678606370-a47ad25cb82a",
  "photo-1499750310107-5fef28a66643",
  "photo-1495511167051-13bb07bde85b",
  "photo-1489599849927-2ee91cede3ba",
  "photo-1517604931442-7e0c8ed2963c",
  "photo-1520637836862-4d197d17c55a",
  "photo-1499750310107-5fef28a66643",
];

const disciplines = [
  "Branding",
  "Art Direction",
  "Lettering",
  "Typeface",
  "Main Title",
  "Product",
  "Murals",
  "Illustration",
];

const projectNames: Record<string, string[]> = {
  Branding: ["Meridian", "Rally", "Noon", "Fable", "Monolith", "Sphere"],
  "Art Direction": ["Nord", "Still", "Lumen", "Cove", "Ark", "Pylon"],
  Lettering: ["Verso", "Canto", "Vox", "Plinth", "Grove", "Forge"],
  Typeface: ["Atlas", "Ratio", "Mira", "Cella", "Tide", "Kern"],
  "Main Title": ["Kino", "After", "Halo", "Flicker", "Reel", "Vault"],
  Product: ["Form", "Ledge", "Taper", "Base", "Mold", "Vessel"],
  Murals: ["Harbor", "Canal", "Ferry", "Quay", "Dock", "Jetty"],
  Illustration: ["Field Notes", "Acre", "Moor", "Hollow", "Ridge", "Bramble"],
};

const clientNames: Record<string, string[]> = {
  Branding: [
    "Meridian Coffee Roasters",
    "Rally Athletics",
    "Noon Hospitality",
    "Fable Editions",
    "Monolith Ventures",
    "Sphere Labs",
  ],
  "Art Direction": [
    "Nord Objects",
    "Still Life Gallery",
    "Lumen Atelier",
    "Cove Records",
    "Ark Collective",
    "Pylon Institute",
  ],
  Lettering: [
    "Verso Publishing",
    "Canto Music",
    "Vox Media",
    "Plinth Architecture",
    "Grove Gardens",
    "Forge Workshop",
  ],
  Typeface: [
    "Atlas Type Foundry",
    "Ratio Design",
    "Mira Studio",
    "Cella Press",
    "Tide Agency",
    "Kern Collective",
  ],
  "Main Title": [
    "Kino Film Festival",
    "After Hours",
    "Halo Records",
    "Flicker TV",
    "Reel Cinema",
    "Vault Streaming",
  ],
  Product: [
    "Form Studio",
    "Ledge Furniture",
    "Taper Lighting",
    "Base Skincare",
    "Mold Ceramics",
    "Vessel Glassworks",
  ],
  Murals: [
    "Harbor District",
    "Canal Walk",
    "Ferry Terminal",
    "Quay Market",
    "Docklands",
    "Jetty Park",
  ],
  Illustration: [
    "Field Notes Journal",
    "Acre Magazine",
    "Moor Review",
    "Hollow Press",
    "Ridge Quarterly",
    "Bramble Books",
  ],
};

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

export const projects: Project[] = disciplines.flatMap((discipline) => {
  const names = projectNames[discipline];
  const clients = clientNames[discipline];
  return names.map((name, i) => {
    const slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${discipline.toLowerCase().replace(/\s+/g, "-")}`;
    return {
      slug,
      title: name,
      client: clients[i],
      category: discipline,
      year: 2023 + (i % 3),
      image: img(imageIds[(disciplines.indexOf(discipline) * 6 + i) % imageIds.length]),
      video: i % 2 === 0 ? pick(videos, i) : undefined,
      description: `Placeholder project for ${discipline} — ${name} is a studio project built as a structural template for the portfolio grid.`,
      gallery: [
        img(imageIds[(disciplines.indexOf(discipline) * 6 + i + 1) % imageIds.length]),
        img(imageIds[(disciplines.indexOf(discipline) * 6 + i + 2) % imageIds.length]),
      ],
    };
  });
});

export const categories = ["All", ...disciplines];

export const logoMarks = Array.from({ length: 24 }).map((_, i) => ({
  label: `Mark ${String(i + 1).padStart(2, "0")}`,
  year: 2018 + (i % 8),
}));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
