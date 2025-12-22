export type InternGroup = {
  content: string;
  title?: string;
};

export type PageProps = {
  content: string;
};

export type MemberCardProps = {
  memberPicture?: string;
  memberName: string;
  memberTitle: string;
  titleMail: string;
};

export type ArrangementCardProps = {
  title: string;
  date: string;
  description: string;
};

export type JobCardProps = {
  company: string;
  position: string;
  deadline: string;
  location: string;
};
