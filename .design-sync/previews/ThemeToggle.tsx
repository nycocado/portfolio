import { ThemeToggle } from "portfolio";

// Self-contained — reads/writes theme via next-themes' useTheme(), wired by
// cfg.provider's ThemeProvider. Toggling is a click interaction (View
// Transitions fade), so only the at-rest button is captured statically.
export const Default = () => <ThemeToggle />;
