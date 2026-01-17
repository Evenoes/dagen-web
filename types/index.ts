export type InternGroup = {
  content: string;
  title?: string;
};

export type JoinUsProps = {
  contentRows: ContentRow[];
  internGroups: InternGroup[];
}

export type Member = {
  name: string;
  title: string;
  email: string;
  picturePath: string | null;
};

export type LayoutCsvRow = {
    index: string;
    file: string;
    buttonhref?: string;
    buttonlabel?: string;
    size?: string | null;
};

export type ContentItem = {
  type: "image" | "markdown";
  content: string;
  buttonHref?: string | null; // Link til sub pages - "/bedrift", "/", "kontakt", osv.
  buttonLabel?: string | null; // Det som skal stå på knappen
  rowId?: string;  // For å mappe knapper til index
  size: number | null; // 2 - 8 (20-80%)
};

export type ContentRow = ContentItem[];

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProgramItem = {
    time?: string;
    text: string;
};

export type BedriftItem = {
    name: string;
    logo: string;
}