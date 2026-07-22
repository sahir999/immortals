export const site = {
  name: "Immortals",
  tagline: "The makers of Indian literature",
  description:
    "A guide to the writers who built literature in India — across Sanskrit, Tamil, Bengali, Hindi, Urdu, Kannada, Malayalam, Telugu, Marathi, Odia, Gujarati, Punjabi and English.",
} as const;

export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const navigation: NavItem[] = [
  {
    href: "/",
    label: "Home",
    description: "An introduction to the collection",
  },
  {
    href: "/writers",
    label: "Writers",
    description: "Every figure in the collection, searchable",
  },
  {
    href: "/languages",
    label: "Languages",
    description: "The same literature, sorted by the tongue it was written in",
  },
  {
    href: "/timeline",
    label: "Timeline",
    description: "Two and a half thousand years, in order",
  },
  {
    href: "/honours",
    label: "Honours",
    description: "Nobel, Booker, Jnanpith, Sahitya Akademi and Padma",
  },
  {
    href: "/about",
    label: "About",
    description: "What this is, and how it was put together",
  },
];
