import { NextResponse } from "next/server";

const data = {
  brand: {
    name: "FIRA RoboWorld Cup 2025 Tehran",
    primaryColor: "#01acec",
    monoLogo:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-mono.png",
    monoLogoDark:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-mono-dark.png",
    logo: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis.png",
    darkLogo:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-dark.png",
    font: {
      name: "Heebo",
      weights: [400, 500, 700, 900],
      subsets: ["latin", "latin-ext"],
    },
  },
  menu: {
    Introduction: {
      items: [
        { id: "overview", title: "Overview", type: "overview" },
        { id: "brand-identity", title: "Brand Identity", type: "statement" },
      ],
    },
    "Conceptual identity": {
      items: [{ id: "brand-prism", title: "Brand Prism", type: "brand_prism" }],
    },
    "Verbal identity": {
      items: [
        {
          id: "tone-of-voice",
          title: "Tone Of Voice",
          type: "tone_of_voice",
        },
        { id: "tagline", title: "Tagline", type: "tagline" },
      ],
    },
    "Visual identity": {
      items: [
        {
          id: "design-principles",
          title: "Design Principles",
          type: "design_principles",
        },
        { id: "logo", title: "Logo", type: "logo" },
        { id: "mascot", title: "Mascot", type: "mascot" },
        { id: "color", title: "Color", type: "color" },
        { id: "typography", title: "Typography", type: "typography" },
        {
          id: "identity-in-use",
          title: "Identity In Use",
          type: "identity_in_use",
        },
      ],
    },
  },
  sections: [
    {
      type: "overview",
      title: "Brand Introduction",
      description: "FIRA RoboWorld Cup 2025 ",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi//18.png",
      img: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/global//Screenshot%202025-05-03%20at%203.57.18%20PM.png",
      video: "",
      items: {
        group: "introduction",
        title: "overview",
        desc: "Welcome to the brand book of the Federation of International Robot Sports Association (FIRA). As the leading global organization dedicated to the promotion and development of robot sports, FIRA stands at the forefront of innovation, competition, and education in this exciting field.",
        img: "",
      },

      style: 1,
    },
  ],
};

export async function GET() {
  return NextResponse.json(data);
}
