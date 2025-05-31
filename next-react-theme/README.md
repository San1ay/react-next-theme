# 🌗 ThemeProvider

A lightweight and extensible **React context-based Theme Provider** for managing theme (`light` / `dark`) and optional color schemes (e.g., `"green"`, `"red"`, `"blue"`, `"yellow"`) with persistence in `localStorage`. Ideal for modern apps using Tailwind CSS or CSS variables with theme and color support — all with zero external dependencies.

---

## 📦 Features

- 🎨 Light/Dark mode toggle
- 🌈 Optional color scheme support
- 💾 Persistent settings using `localStorage`
- 🧠 System preference fallback (`prefers-color-scheme`)
- ⚛️ React Context + Hooks (`useContext`)
- 🧪 Built-in `useTheme` hook
- 🌐 Applies classes/attributes directly to `<html>`

---
## 🛠 Installation

```bash
# npm
npm install next-react-theme

# or pnpm
pnpm add next-react-theme

# or yarn
yarn install next-react-theme
```
---

## 🎨 Integration with shadcn/ui

1. Import the themes CSS in your `global.css` above base:

```css
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));
@custom-variant red (&:is([data-theme="red"] *));
@custom-variant dark-red (&:is(.dark[data-theme="red"] *));

/* Remaining code */

@import "next-react-theme/dist/themes.css";

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

This will add support for all shadcn/ui themes including:
- zinc
- slate
- stone
- gray
- neutral
- red
- rose
- orange
- green
- blue
- yellow
- violet

---

## 🚀 Usage

Place this provider inside your root layout or `_app.tsx`.

### 1. Wrap Your App

```tsx
// app/layout.tsx or pages/_app.tsx
import { ThemeProvider } from "next-react-theme";

export default function App({ children }) {
  return <ThemeProvider colorScheme={true}>{children}</ThemeProvider>;
}
```

### 2. Access Theme

```tsx
import { useTheme } from "next-react-theme";

const ThemeSwitcher = () => {
  const { theme, setTheme, color, setColor } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme ({theme})
      </button>
      {setColor && (
        <select onChange={(e) => setColor(e.target.value)} value={color}>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
      )}
    </div>
  );
};
```

---

## 🧬 API Reference

### `<ThemeProvider />`

| Prop         | Type        | Required | Description                                                                 |
|--------------|-------------|----------|-----------------------------------------------------------------------------|
| `children`   | `ReactNode` | ✅       | Children components                                                         |
| `colorScheme`| `boolean`   | ✅       | Enable color scheme support. When `true`, sets a `data-color` attribute.   |

---

### `useTheme()`

Returns theme context values.

#### Returns

| Name       | Type                 | Description                                       |
|------------|----------------------|---------------------------------------------------|
| `theme`    | `string`             | Current theme (`"light"` or `"dark"`)            |
| `setTheme` | `(t: string) => void`| Function to update the theme                     |
| `color?`   | `string`             | Current color scheme (`"red"`, `"green"`, etc.)  |
| `setColor?`| `(c: string) => void`| Function to update color scheme (if enabled)     |

---

## 💾 Theme Persistence

- Stores `theme` under key: `"theme"`
- Stores `color` under key: `"color"` (if `colorScheme` is `true`)

On first load:
- Tries to load from `localStorage`
- Falls back to system preference (`prefers-color-scheme`)
- Sets `red` color as initial color

---

## 🧩 Dependencies

- React (>= 17)
- Tailwind (recommended for class-based theming)
- Optional: CSS variables or `data-color` attribute for accent themes

---

## 📁 File Structure

```bash
src/
│
├── ThemeProvider.tsx       # Contains ThemeProvider and useTheme
├── utils.ts                # getFromLS / setToLS (localStorage helpers)
├── types.ts                # Type for ThemeContextType
```

---

## 🧪 Example: CSS Integration

```css
/* Tailwind example */
:root {
  --accent: green; /* default fallback */
}

/* Light mode red theme */
[data-theme="red"] {
  --accent: red;
  --background: oklch(98% 0.12 27);
  --text: oklch(29% 0.12 27); 
}

/* Dark mode red theme */
.dark[data-theme="red"] {
  --accent: red;
  --background: oklch(15% 0.05 27);
  --text: oklch(95% 0.02 27); 
}

```

---

## 🔒 Type Definition (types.ts)

```ts
export type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  color?: string;
  setColor?: (color: string) => void;
};
```

---

## 🧠 Tips

- Ensure your HTML supports the `dark` class (e.g., Tailwind dark mode is set to `"class"`)
- Use the `data-color` attribute in CSS for dynamic theming
- SSR-safe usage recommended (fallback loading state: `return null` before context is ready)

---

## 📄 License

MIT — Feel free to use, adapt, and contribute.