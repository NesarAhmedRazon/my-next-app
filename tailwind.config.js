import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,json}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      fontFamily: {
        nunito_sans: ["var(--nunito_sans-font)"],
        oswald: ["var(--oswald-font)"],
        entypo: ["entypo", "sans-serif"],
        robotoflex: ["var(--roboto_flex-font)"],
        inter: ["var(--inter-font)"],
        fa: ["var(--fontawesome-font)"]
      },
      colors: {
        tfnormal: "#3FB65B",
        tfhover: "#369C4E",
        oRnormal: "#EE7616",
        oRhover: "#F26523",
        tfBlack: "#202934",
        twitter: "#00acee",
        facebook: "#39569c",
        linkedin: "#0072b1",
        homeIco: "#FFCFA9",
        DeepPeach: "#FFCFA9",
        LandSubText: "#505b6a",
        pageBg: "#F6F8FA",
        body: "#546173",
        th: "#222222",
        tr: "#f9f9f9",
        td: "#333333",
        code: "#666666",
        h3: "#546173",
        lead: "#3e4856",
        grayBox: "#f6f8f9",
        instagram: "#e4405f"
      },
      expand: {
        inherit: "inherit",
        xs: "0.05em",
        sm: "0.1em",
        md: "0.15em",
        lg: "0.2em",
        xl: "0.25em",
        "2xl": "0.3em",
        "3xl": "0.4em",
        "4xl": "0.5em",
        "5xl": "0.6em",
        "6xl": "0.7em",
        "7xl": "0.8em",
        "8xl": "0.9em",
        "9xl": "1em",
        "10xl": "1.1em",
        "11xl": "1.2em",
        "12xl": "1.3em",
        "13xl": "1.4em",
        "14xl": "1.5em"
      },
      fontSize: {
        inherited: "inherit",
        xs: ["0.75rem", { lineHeight: "1.5" }],
        lg: [
          "1.125rem",
          {
            lineHeight: "1.5"
          }
        ],
        xl: [
          "1.25rem",
          {
            lineHeight: "2.2"
          }
        ],
        "1.5xl": [
          "1.4rem",
          {
            lineHeight: "1.5"
          }
        ],
        "2xl": [
          "1.55rem",
          {
            lineHeight: "1.6"
          }
        ],
        "2.5xl": [
          "1.75rem",
          {
            lineHeight: "1.5"
          }
        ],
        "3.5xl": [
          "2rem",
          {
            lineHeight: "1.5"
          }
        ],
        tfsize: [
          "16px",
          {
            lineHeight: "1.5"
          }
        ],
        "4xl": [
          "2.25rem",
          {
            lineHeight: "1.5"
          }
        ],
        "4.5xl": [
          "2.5rem",
          {
            lineHeight: "1.5"
          }
        ],
        "5xl": [
          "3rem",
          {
            lineHeight: "1.4"
          }
        ],
        "5.5xl": [
          "3.5rem",
          {
            lineHeight: "1.5"
          }
        ]
      },
      margin: {
        13: "3.25rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem"
      },
      padding: {
        13: "3.25rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem"
      },
      lineHeight: {
        inherited: "inherit",
        11: "3rem",
        12: "3.25rem",
        13: "3.5rem",
        14: "3.75rem",
        15: "4rem",
        16: "4.25rem",
        17: "4.5rem",
        18: "5rem",
        19: "5.25rem",
        20: "5.5rem"
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21"
      },
      borderWidth: {
        3: "3px"
      }
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      const wordSpacingClasses = {};
      Object.entries(theme("expand")).forEach(([key, value]) => {
        wordSpacingClasses[`.expand-${key}`] = {
          "word-spacing": value
        };
      });
      addBase(wordSpacingClasses);
    }
  ]
};
export default config;
