// Forsiden (hjem)
// Leser fra CSV-fil som definerer rekkefølge på bilder og tekst

import { getContentRowLayout } from "@/lib/contentLayout"
import { ContentRow } from "../types";
import ContentRowBuilder from "@/components/ContentRowBuilder";

// Props for siden er en liste av rader indeksert i CSV-filen
type HomePageProps = {
  rows: ContentRow[];
};

// Hovedfunksjon
export default function Home({ rows }: HomePageProps) {  
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      <ContentRowBuilder rows={rows} />
    </main>
  );
}

// Henter layout fra CSV-fil og gjør de til props som hovedfunksjonen bruker
export function getStaticProps() {
  const rows = getContentRowLayout("arrangementer/hjemside.csv");
  return { props: { rows } };
}
