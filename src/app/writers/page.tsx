import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import WriterExplorer from "@/components/writers/WriterExplorer";
import { getAllLanguages, getAllWriters, getStats } from "@/lib/writers";

export const metadata: Metadata = {
  title: "Writers",
  description:
    "Every writer in the collection, searchable by name, work, region, language and era.",
};

export default function WritersPage() {
  const writers = getAllWriters();
  const languages = getAllLanguages();
  const stats = getStats();

  return (
    <>
      <PageHeader
        eyebrow="The collection"
        title="Every writer, in one place"
        description="Listed in chronological order, from the composers of the Sanskrit and Tamil classics to novelists still publishing. Search by name, by the title of a work, or by region."
        meta={`${stats.writers} writers · ${stats.languages} languages · ${stats.works} works listed`}
      />

      <Container width="wide" className="py-12 sm:py-16">
        <WriterExplorer writers={writers} languages={languages} />
      </Container>
    </>
  );
}
