import ReactMarkdown from "react-markdown";

type PageLayoutProps = {
  content: string;
  children?: React.ReactNode;
  maxWidth?: string;
};

export default function PageLayout({ 
  content, 
  children, 
  maxWidth = "max-w-6xl" 
}: PageLayoutProps) {
  return (
    <main className={`${maxWidth} mx-auto px-4 py-8`}>
      <div className="prose max-w-4xl mx-auto px-4 py-8 text-center">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      {children}
    </main>
  );
}
