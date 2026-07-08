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

const V1 = "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4";
const V2 = "https://storage.googleapis.com/coverr-main/mp4/Winter-1.mp4";
const V3 = "https://storage.googleapis.com/coverr-main/mp4/Sunset-in-the-mountains.mp4";
const V4 = "https://storage.googleapis.com/coverr-main/mp4/coverr-a-woman-walking-in-the-desert-1584804747139.mp4";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "meridian",
    title: "Meridian",
    client: "Meridian Coffee Roasters",
    category: "Branding",
    year: 2025,
    image: img("photo-1509785307050-d4066910ec1e"),
    video: V1,
    description:
      "A complete brand identity for a specialty coffee roaster crossing time zones — built around a rotating typographic mark and a monochrome print system.",
    gallery: [
      img("photo-1447933601403-0c6688de566e"),
      img("photo-1461988091159-192b6df7054f"),
      img("photo-1442512595331-e89e73853f31"),
    ],
  },
  {
    slug: "atlas-type",
    title: "Atlas",
    client: "Atlas Type Foundry",
    category: "Typeface",
    year: 2025,
    image: img("photo-1611532736597-de2d4265fba3"),
    video: V2,
    description:
      "Atlas is a contemporary display serif drawn for editorial use — five weights, extensive alternates, and a companion mono.",
    gallery: [
      img("photo-1517423440428-a5a00ad493e8"),
      img("photo-1524578271613-d550eacf6090"),
      img("photo-1519750157634-b6d493a0f77c"),
    ],
  },
  {
    slug: "nord",
    title: "Nord",
    client: "Nord Objects",
    category: "Art Direction",
    year: 2024,
    image: img("photo-1520975916090-3105956dac38"),
    video: V3,
    description:
      "Seasonal art direction and photography for a Scandinavian homeware label. Quiet compositions, natural light, matte paper.",
    gallery: [
      img("photo-1493663284031-b7e3aefcae8e"),
      img("photo-1505691938895-1758d7feb511"),
      img("photo-1493809842364-78817add7ffb"),
    ],
  },
  {
    slug: "verso",
    title: "Verso",
    client: "Verso Publishing",
    category: "Lettering",
    year: 2024,
    image: img("photo-1519681393784-d120267933ba"),
    video: V4,
    description:
      "Hand-drawn covers and internal display lettering for a series of essays on architecture and material culture.",
    gallery: [
      img("photo-1524678606370-a47ad25cb82a"),
      img("photo-1499750310107-5fef28a66643"),
      img("photo-1495511167051-13bb07bde85b"),
    ],
  },
  {
    slug: "form-studio",
    title: "Form",
    client: "Form Studio",
    category: "Product",
    year: 2024,
    image: img("photo-1503602642458-232111445657"),
    video: V1,
    description:
      "Packaging system and product identity for an independent ceramics studio — one grid, one grotesk, endless permutations.",
    gallery: [
      img("photo-1493663284031-b7e3aefcae8e"),
      img("photo-1520975916090-3105956dac38"),
    ],
  },
  {
    slug: "kino",
    title: "Kino",
    client: "Kino Film Festival",
    category: "Main Title",
    year: 2023,
    image: img("photo-1478720568477-152d9b164e26"),
    video: V2,
    description:
      "Main title sequence and identity system for an international short film festival. Type on film, animated by hand.",
    gallery: [
      img("photo-1489599849927-2ee91cede3ba"),
      img("photo-1517604931442-7e0c8ed2963c"),
    ],
  },
  {
    slug: "harbor-mural",
    title: "Harbor",
    client: "Harbor District",
    category: "Murals",
    year: 2023,
    image: img("photo-1541961017774-22349e4a1262"),
    description:
      "A permanent mural for a working port district — 34 metres of hand-painted geometric type on painted brick.",
    gallery: [img("photo-1520637836862-4d197d17c55a")],
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    client: "Field Notes Journal",
    category: "Illustration",
    year: 2023,
    image: img("photo-1499750310107-5fef28a66643"),
    description:
      "Editorial illustration series accompanying a long-form journal on landscape and language.",
    gallery: [img("photo-1519681393784-d120267933ba")],
  },
];

export const categories = [
  "All",
  "Branding",
  "Art Direction",
  "Lettering",
  "Typeface",
  "Main Title",
  "Product",
  "Murals",
  "Illustration",
];

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