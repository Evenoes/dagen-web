type GridSectionProps = {
  title?: string;
  children: React.ReactNode;
  columns?: string;
};

export default function GridSection({ 
  title, 
  children, 
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
}: GridSectionProps) {
  return (
    <div className="space-y-4 text-center">
      {title && <h2 className="text-4xl font-bold text-(--primary)">{title}</h2>}
      <div className={`grid ${columns} gap-6`}>
        {children}
      </div>
    </div>
  );
}
