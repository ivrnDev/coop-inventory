/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-blue-background": "url('/background/home-background.svg')",
        "featured-background": "url('/background/featured-background.svg')",
        "categories-background": "url('/background/categories-background.svg')",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        custom: {
          orange: "#D71313",
        },
        header: {
          admin: "#3085C3",
        },
        navbar: {
          admin: "#085C9A",
          user: "#3085C3",
        },
        main: {
          user: "#D9D9D9",
          admin: "#D9D9D9",
        },
        inputColor: "#D9D9D9",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        "admin-header": "var(--h-admin-header)",
        "admin-navbar": "var(--h-admin-navbar)",
        "admin-main": "calc(100vh - var(--h-admin-header))",
        "admin-main-mobile":
          "calc(100vh - (var(--h-admin-header) + var(--h-admin-navbar)))",
        "user-header": "var(--h-user-header)",
        "user-header-mobile": "var(--h-user-header-mobile)",
        "user-navbar": "var(--h-user-navbar)",
        "user-navbar-mobile": "var(--h-user-navbar-mobile)",
        "user-main-mobile":
          "calc(100vh - (var(--h-user-header-mobile) + var(--h-user-navbar-mobile)))",
        "user-main":
          "calc(100vh - (var(--h-user-header) + var(--h-user-navbar)))",
      },
      width: {
        "admin-header": "calc(100vw - var(--w-admin-navbar))",
        "admin-navbar": "var(--w-admin-navbar)",
        "admin-main": "calc(100vw - var(--w-admin-navbar))",
        "products-section": "calc(100vw - var(--m-product-section))",
      },
      margin: {
        "admin-header-x": "var(--w-admin-navbar)",
        "admin-header-y": "var(--h-admin-header)",
        "admin-main": "var(--w-admin-navbar)",
        "user-header-mobile": "var(--h-user-header-mobile)",
        "user-header": "calc((var(--h-user-header) + var(--h-user-navbar)))",
        "products-section": "var(--m-product-section))",
      },
      padding: {
        "admin-main": "var(--p-admin-main)",
      },
      minHeight: {
        "admin-main": "calc(100vh - var(--h-admin-header))",
        "admin-main-mobile":
          "calc(100vh - (var(--h-admin-header) + var(--h-admin-navbar)))",
        "user-main-mobile":
          "calc(100vh - (var(--h-user-header-mobile) + var(--h-user-navbar-mobile)))",
        "user-main":
          "calc(100vh - (var(--h-user-header) + var(--h-user-navbar)))",
        "products-section": "calc(100vh / 2 )",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
