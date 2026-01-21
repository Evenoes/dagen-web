export type CardData = { title: string; text: string };

export type ApplyLinks = {
  funk: string | null;
  intern: string | null;
};

export type PriceRow = { label: string; price: string };

export type CheckedRow = {
  checked: 0 | 1;
  text: string;
};
