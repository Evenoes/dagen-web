import { getHomePageLayout } from "../lib/homepage";
import { ContentRow } from "../types";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";


export default function Home({ rows }: { rows: ContentRow[] }) {
  const router = useRouter();
  
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      {rows?.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {row.map((item, itemIndex) => (
            item.type === "image" ? (
              <img
                key={itemIndex}
                src={`${router.basePath}/${item.content}`}
                alt={`Bilde ${rowIndex + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div key={itemIndex} className="prose">
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            )
          ))}
        </div>
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const rows = await getHomePageLayout("arrangementer/hjemside.csv");
  return { props: { rows } };
}
