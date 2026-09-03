type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

type SocialProof = {
  metrics: readonly {
    value: string;
    label: string;
  }[];
  testimonial: Testimonial | null;
};

export const socialProof: SocialProof = {
  metrics: [
    { value: "Senior", label: "Product engineering" },
    { value: "3", label: "Products built / actively developed" },
    { value: "Nordic / EU", label: "Primary market" },
    { value: "End to end", label: "Architecture · product · production" },
  ],
  testimonial: null,
};
