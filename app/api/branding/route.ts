import { NextResponse } from "next/server";
import {
  BrandIdentity,
  Tagline,
  ToneOfVoice,
  DesignPrinciples,
  IdentityInUse,
} from "./mdx";

const data = {
  brand: {
    name: "AVIS Brand Book",
    monoLogo:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-mono.png",
    monoLogoDark:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-mono-dark.png",
    logo: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis.png",
    darkLogo:
      "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-dark.png",
    font: {
      name: "Geist",
      weights: [300, 400, 700, 900],
      subsets: ["latin", "latin-ext"],
    },
    color: {
      primaryColor: "#0068b5",
      secondaryColor: "#000000",
      actionColor: "#FFFFFF",
      otherColors: ["#00c950", "#737373", "#00a6f4", "#f0b100", "#fb2c36"],
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
        { id: "tone-of-voice", title: "Tone Of Voice", type: "tone_of_voice" },
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
  visualSectionCards: [
    {
      title: "Logo",
      href: "/logo",
      type: "image",
      lightImg:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis.png",
      darkImg:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-dark.png",
      desc: "Both light and dark versions of the AVIS logo, used across platforms.",
    },
    {
      title: "Typography",
      href: "https://vercel.com/font",
      type: "component",
      desc: "Font scale, styles, and usage guidance powered by Geist.",
    },
    {
      title: "Design Principles",
      href: "/design-principles",
      type: "image",
      lightImg:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis//design.png",
      darkImg:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis//design.-dark.png",
      desc: "Say hi to our friendly brand grid — the visual face of AVIS.",
    },
    {
      title: "Color Palette",
      href: "/color",
      type: "component",
      desc: "Explore AVIS’s carefully crafted brand colors in both light and dark modes.",
    },
  ],
  sections: [
    {
      type: "overview",
      title: "Brand Introduction",
      description: "AVIS",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi//18.png",
      img: "https://iran.firaworldcup.org/wp-content/uploads/2024/12/IRAN-FIRA-2025-1-1448x2048.png",
      video: "",
      items: {
        group: "introduction",
        title: "overview",
        desc: "Welcome to the **AVIS**, where innovation meets excellence in robotics and artificial intelligence. This prestigious competition will take place at the International Exhibition Center, a venue that embodies Iran’s commitment to hosting world-class events and fostering technological progress.",
        img: "",
      },

      style: 1,
    },
    {
      type: "statement",
      title: "Statement Section",
      description: "AVIS - IRAN,",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      video: "",
      items: {
        MDXComponent: BrandIdentity,
        title: "What **leads** us to the idea of dynamic identity:",
        items: ["Vision", "Mission", "Target"],
        desc: `AVIS represents global innovation in robotics and AI, uniting
              visionaries to challenge boundaries and inspire progress. It’s a platform where
              creativity meets technology, shaping the future of robotics.`,
      },

      style: 1,
    },
    {
      type: "brand_prism",
      title: "Brand Prism Section",
      description: "",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "https://avisengine.com/assets/img/logo.png",
      items: {
        MDXComponent:
          "A clear, human-friendly articulation of the essence behind Avis Engine’s brand identity.",
        title: "What **leads** us to the idea of dynamic identity:",
        desc: 'Today, on what is always a "first day," we have embarked on a new path to expand the journey from the trilogy of "going, staying, and returning" to a broader concept, as vast as our worlds full of differences. As always, we want to be companions on a journey that extends from the realm of imagination to the review of sweet memories.',
        prismBrand: [
          {
            title: "Physique",
            key: "physique",
            description:
              "Minimalist, modern, and purposeful—our visual identity is rooted in clarity and trust. The black-and-white logo, free of distractions, speaks to our commitment to transparency and technological precision. It’s a symbol of confidence and forward-thinking, designed not just to be seen, but to be remembered. Every detail, from our event environments to digital touchpoints, reflects a balance of simplicity and innovation that resonates with engineers, educators, and future builders.",
          },
          {
            title: "Personality",
            key: "personality",
            description:
              "Energetic, youthful, and empowering. We speak with clarity and confidence, always aiming to spark curiosity and celebrate technical creativity—just like a mentor cheering you on in a robotics arena.",
          },
          {
            title: "Culture",
            key: "culture",
            description:
              "We’re built on the belief that technology is a playground for all minds. Born from a community of creators and engineers, our culture values collaboration, innovation, and healthy competition as vehicles for learning and growth.",
          },
          {
            title: "Relationship",
            key: "relationship",
            description:
              "We’re not just a platform—we're teammates, mentors, and fans. Whether through events, workshops, or online engagement, we foster long-term relationships with makers, students, and enthusiasts, growing alongside their achievements.",
          },
          {
            title: "Self-Image",
            key: "selfImage",
            description:
              "Our audience sees themselves as trailblazers—smart, tech-savvy, and ready to take on challenges. Through our competitions and community, they find a space where their talents are recognized, sharpened, and celebrated.",
          },
          {
            title: "Reflection",
            key: "reflection",
            description:
              "We envision our audience as the future builders of the world—innovators, problem-solvers, and dreamers, typically students, hobbyists, and educators who are passionate about robotics and believe in the power of technology to transform lives.",
          },
        ],
      },
      style: 1,
    },
    {
      type: "tone_of_voice",
      title: "Tone Of Voice",
      description: "",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      items: {
        MDXComponent: ToneOfVoice,
        title: "",
        desc: "Our brand voice combines professionalism and friendliness to prioritize exceptional customer service. It remains adaptable to different contexts and audiences.",
        sliderContent: [
          {
            id: "1001",
            svg: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/icons/Copy%20of%20FIRA%20CANADA%20BRAND%20BOOK%20(2).png",
            title: "Trustworthy",
            description:
              "**AVIS** demonstrates *trustworthiness* and *authority* in all our communications.",
          },
          {
            id: "1002",
            svg: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/icons/Copy%20of%20FIRA%20CANADA%20BRAND%20BOOK%20(1).png",
            title: "Innovative",
            description: `As a **pioneering company**, we adopt an *energetic* and *dynamic* tone in our communications.`,
          },
        ],

        style: 1,
      },
    },
    {
      type: "tagline",
      title: "Tagline",
      description: "",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      items: {
        MDXComponent: Tagline,
        title: "Enjoy Robots, Enjoy Life",
      },
    },
    {
      type: "design_principles",
      title: "Design Principles",
      description: "",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      items: {
        MDXComponent: DesignPrinciples,
        title: "Our Logo",
        desc: ` Ensure use a custom font for readability and elegance to enhance brand identity across all communication channels.        `,
        image:
          "https://canada.firaworldcup.org/wp-content/uploads/2020/11/logo.png",
        video: "https://files-us-east-1.t-cdn.net/files/1GG2rmxcOLAUjnt5zTqoY",
        videoCover:
          "https://iran.firaworldcup.org/wp-content/uploads/2024/12/IRAN-FIRA-2025-1-1448x2048.png",
        tabsContent: [
          {
            title: "Design Strategics",
            description: `**AVIS strategic design** is a comprehensive travel solution. It always aims to optimize the journey and offer a seamless experience across all stages.
                          This mental model in strategic design helps the brand to evolve and emerge continuously.
                          Strategic design in AVIS is in service of communication and business growth.
                          The foundation of strategic design stems from upstream strategies and loops through feedback and iteration to complete and refine one another.
              `,
            svg: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/icons/Copy%20of%20FIRA%20CANADA%20BRAND%20BOOK%20(3).png",
          },
          {
            title: "Creative Design",
            description: `Creative design pushes innovation boundaries and aligns aesthetic vision with user needs...`,
            svg: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/icons/Copy%20of%20FIRA%20CANADA%20BRAND%20BOOK%20(2).png",
          },
        ],
      },
    },
    {
      type: "logo",
      title: "Logo",
      description: "",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      items: {
        MDXComponent: "",
        MDXComponentForLogo: "",
        title: "**Brand** Identity",
        desc: "To inspire and empower the global robotics community by **creating a dynamic platform** for innovation, collaboration, and excellence. AVIS is committed to advancing technology, nurturing young talent, and pushing the boundaries of what robotics",
        download:
          "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis.png",
        downloadBtnText: "Download AVIS Logo",
        logoVersion: [
          {
            id: 1,
            name: "Horizontal logo",
            text: "Priority is given to use the horizontal version of the logo.",
            svg: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis.png",
            darkSvg:
              "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-dark.png",
          },
          {
            id: 3,
            name: "Mono",
            text: "We use the monogram version in AVIS media, such as the brand's social media, website and app icons, and video watermarks. We can also use this version in other brand communications where the brand name does not need to be mentioned due to familiarity with the audience.",
            svg: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-mono.png",
            darkSvg:
              "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi//dark-mono-logo.png",
          },
        ],
        inBackgroundSection: {
          listItems: [
            "We use the AVIS logo on a white background, only in the solid black.",
            "We use the AVIS logo on a black background, only in the solid white.",
          ],
          inBackgroundComponent: [
            {
              colorBg: "#FFFFFF",
              logo: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis.png",
            },
            {
              colorBg: "#000000",
              logo: "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/avis/logo/avis-dark.png",
            },
          ],
        },
        alongWithOthers: {
          title: "Use it alongside other brand logos",
          desc: "When using the AVIS logo next to other brand logos, here’s the deal: if the second logo is vertical, go with the vertical version of the AVIS logo; if it’s horizontal, stick with the horizontal AVIS one. To keep things balanced, make sure the height of AVIS’s logo matches the graphic part of the second logo in both cases. Now, if the second logo is just a logotype (no fancy graphics), use the horizontal AVIS logo. In that case, the height of both logotypes should be the same.<br/>Always slap the AVIS logo on the left and above the second logo. Putting it on the right or below other logos? Nope, not allowed.",
          svg: [
            "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/co-branding/FIRA%20CUP%202025%20BRAND%20BOOK%20(12).svg",
            "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/co-branding/6.svg",
          ],
          darkSvg: [
            "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/co-branding/FIRA%20CUP%202025%20BRAND%20BOOK%20(13).svg",
            "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/co-branding/6.svg",
          ],
        },
      },
      style: 1,
    },
    {
      type: "color",
      title: "Color",
      description:
        "Our brand color palette is inspired by the sleek, minimalist aesthetic of Vercel and Geist, emphasizing a vibrant blue primary color with a clean black and white foundation for contrast and impact.",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      items: {
        MDXComponent: "",
        title: "Color of Our Brand",
        desc: "Our color palette is anchored by a vibrant blue primary color, paired with stark black and white for contrast, inspired by Vercel’s minimalist design ethos. This creates a modern, professional look, with consistent use across all platforms ensuring brand recognition and cohesion.",
        img: [
          "https://images.unsplash.com/photo-1618005182380-5f8a4e2c7121?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1516321318423-3f1e7993b62c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
        ],
        palette: {
          title: "The Main Palette",
          description:
            "The core palette is built on a vibrant blue primary color, with black as the secondary color, white as the complementary color, and teal as the action color, mirroring Vercel’s clean and modern aesthetic. The blue is used for emphasis, while black and white provide a timeless foundation. Teal is used sparingly for calls to action or highlights.",
          colors: {
            primary: {
              id: 1001,
              hex: "#0068b5",
              hexColor: "#FFFFFF",
              name: "Brand Blue",
              shades: [
                { id: 102, hex: "#004D87", name: "Dark Blue" },
                { id: 103, hex: "#0080E0", name: "Light Blue" },
                { id: 104, hex: "#99C7E8", name: "Pale Blue" },
              ],
            },
            action: {
              id: 2002,
              hex: "#000000",
              hexColor: "#FFFFFF",
              name: "Brand Black",
              shades: [
                { id: 202, hex: "#1A1A1A", name: "Dark Gray" },
                { id: 203, hex: "#333333", name: "Medium Gray" },
                { id: 204, hex: "#4D4D4D", name: "Light Gray" },
              ],
            },
            secondary: {
              id: 3003,
              hex: "#FFFFFF",
              hexColor: "#000000",
              name: "Brand White",
              shades: [
                { id: 302, hex: "#F5F5F5", name: "Off White" },
                { id: 303, hex: "#E6E6E6", name: "Light Gray White" },
                { id: 304, hex: "#D9D9D9", name: "Subtle Gray White" },
              ],
            },
          },
        },
        Harmony: {
          title: "Color Harmony",
          description:
            "The palette is designed for flexibility while maintaining a cohesive look. Three primary combinations guide usage:\n\n- **Combination 1:** Blue as the dominant color, with black for contrast, white for highlights, and teal for emphasis.\n- **Combination 2:** Black as the dominant color, with white for text and teal accents for vibrancy.\n- **Combination 3:** White as the dominant color, with black for text and teal for subtle highlights.\n\n> **Note:** Combination 1 and 2 are prioritized for most brand applications. Combination 3 is reserved for specific campaigns or secondary materials.",
          img: "https://cdn.vercel.app/brand/color-harmony-example.svg",
        },
        Gradient: {
          title: "Gradient Usage",
          img: "https://cdn.vercel.app/brand/gradient-example.svg",
          description:
            "Gradients are used sparingly to add depth. Recommended gradients include:\n\n- **Blue to Dark Blue:** For vibrant background transitions.\n- **Black to Dark Gray:** For subtle background transitions.\n- **White to Light Gray:** For clean, modern overlays.\n- **Teal to Dark Teal:** For accent elements like buttons or highlights.\n\n> **Note:** Gradients should not overpower the primary palette and are used only in digital or promotional materials.",
        },
        paletteUsage: {
          title: "Color Usage in Design",
          description:
            "The color palette is applied strategically to ensure clarity and brand consistency.",
          mainStructure: [
            {
              id: 5001,
              background: "#000000",
              name: "White or teal text on a black background",
            },
            {
              id: 5002,
              background: "#FFFFFF",
              name: "Black or teal text on a white background",
            },
            {
              id: 5003,
              background: "#0068b5",
              name: "White text on a blue background (for accents)",
            },
          ],
          usageGuidelines: {
            correct: [
              {
                id: 6003,
                background: "#000000",
                text: "#FFFFFF",
                description: "Black background with white text",
              },

              {
                id: 7003,
                background: "#FFFFFF",
                text: "#000000",
                description: "White background with black text",
              },
              {
                id: 7002,
                background: "#ffffff",
                text: "#0068b5",
                description: "Black background with teal accent text",
              },
              {
                id: 7004,
                background: "#0068b5",
                text: "#FFFFFF",
                description: "Blue background with white text",
              },
            ],
            incorrect: [
              {
                id: 7001,
                background: "#000000",
                text: "#0068b5",
                description: "White background with teal text (low contrast)",
              },
              {
                id: 6001,
                background: "#0068b5",
                text: "#000000",
                description: "Blue background with black text (low contrast)",
              },
            ],
          },
        },
      },
      style: 1,
    },
    {
      type: "typography",
      title: "Typography",
      description: "Poppins",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      font: {
        name: "Poppins",
        weights: [500, 700],
        subsets: ["latin", "latin-ext"],
      },
      items: {
        MDXComponent: "",
        title: "Typography",
        desc: "We use a custom font for **readability** and **elegance** to enhance brand identity across all communication channels.",
        fontFeatureComponent: {
          title: "Font Features",
          desc: "In AVIS Font Design, in addition to the main features, we have foreseen a set of supplementary features that enrich the typography. These features include: ligatures, alternate forms, strokes, style sets, and text and tabular numbers.",
          componentItems: [
            {
              text: "**Build** <br/> The Future",
              color: "#000000",
              bg: "#FDB813",
            },
            {
              text: "Challenge <br/> **Global Teams**",
              color: "#000000",
              bg: "#FFFFFF",
            },
            {
              text: `<p className="text-[#FDB813]">FIRA 2025 </p> <br/>
                   <p className="text-white font-bold">Starts Soon</p>`,
              color: "",
              bg: "#000000",
            },
            {
              text: "Innovate <br/> **Win Big**",
              color: "#000000",
              bg: "#FFFFFF",
            },
          ],
        },
        typographyPrinciples: {
          title: "Basic Typography Principles",
          description:
            "In typography, AVIS follows two fundamental principles:",
          section: [
            {
              subtitle: "Readability",
              content:
                "Readability is a core principle of AVIS’s typography. We organize all typographic elements—letter spacing, line spacing, and text alignment—so that the text is delivered to the reader in the clearest possible way.",
              examples: [
                {
                  status: "incorrect",
                  mdx: '<div className="text-left leading-5">\n  <p className="max-w-40">First-level heading with short and balanced text\nSecond-level heading that is longer and wraps to the next line\n...</p>\n</div>',
                  label: "incorrect",
                },
                {
                  status: "correct",
                  mdx: '<div className="text-left leading-6">\n  <p className="max-w-40">First-level heading with short and balanced text\nSecond-level heading that is longer and wraps to the next line\n...</p>\n</div>',
                  label: "correct",
                },
              ],
            },
            {
              subtitle: "Respecting Content Hierarchy",
              content:
                "One of AVIS's communication features is that its content always delivers priority and importance. In typography, we use characteristics like text size, weight, font, graphic elements, etc., to clearly communicate the hierarchy of different content layers to the audience.",
              examples: [
                {
                  status: "incorrect",
                  mdx: `<div className="space-y-1 sm:mx-2">
        <div className="bg-neutral-500 h-2 w-22 sm:w-30" />
        <div className="bg-neutral-500 h-2 w-12 sm:w-20" />
        <div className="bg-neutral-500 h-2 w-7 sm:w-14" />
        <div className="bg-neutral-500 h-2 w-17 sm:w-25" />
        <div className="bg-neutral-500 h-2 w-22 sm:w-30" />
        <div className="bg-neutral-500 h-2 w-12 sm:w-20" />
        <div className="bg-neutral-500 h-2 w-7 sm:w-14" />
        <div className="bg-neutral-500 h-2 w-17 sm:w-25" />
        <div className="bg-neutral-500 h-2 w-7 sm:w-14" />
        <div className="bg-neutral-500 h-2 w-17 sm:w-25" />
      </div>`,
                  label: "incorrect",
                },
                {
                  status: "correct",
                  mdx: `<div className="space-y-1 sm:mx-2">
        <div className="bg-neutral-500 h-5 w-8 sm:w-14 mb-3" />
        <div className="bg-neutral-300 h-2 w-22 sm:w-30" />
        <div className="bg-neutral-300 h-2 w-22 sm:w-30 mb-2" />
        <div className="bg-neutral-500 h-2 w-12 sm:w-18" />
        <div className="bg-neutral-300 h-2 w-22 sm:w-30" />
        <div className="bg-neutral-300 h-2 w-22 sm:w-30 mb-2" />
        <div className="bg-neutral-500 h-2 w-12 sm:w-18" />
        <div className="bg-neutral-300 h-2 w-22 sm:w-30" />
        <div className="bg-neutral-300 h-2 w-22 sm:w-30 mb-2" />
      </div>`,
                  label: "correct",
                },
              ],
            },
          ],
        },
        weights: {
          title: "Weights",
          desc: `In designing the AVIS font, in addition to the main features, we have foreseen a set of supplementary features that enrich the typography. These features include: ligatures, alternating forms, strokes, style sets, and text and tabular numbers.`,
          sampleText: "Some Sample Text",
        },
      },
    },
    {
      type: "identity_in_use",
      title: "Identity In Use",
      description: "",
      pattern:
        "https://kbgnpdzggogidjwifiuq.supabase.co/storage/v1/object/public/harchi/FIRA%20CUP%202025%20BRAND%20BOOK%20(7).svg",
      img: "",
      items: {
        MDXComponent: IdentityInUse,
        title: "Brand in Action: AVIS",
      },
    },
  ],
};

export async function GET() {
  return NextResponse.json(data);
}
