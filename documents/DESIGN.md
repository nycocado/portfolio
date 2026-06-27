# Design System — portfolio

Identidade visual do portfólio — tema Gruvbox, tipografia dupla display/corpo, tema claro/escuro via CSS variables.

> **Em desenvolvimento.** Cores e estilos serão revistos.

## Visão geral

O design system é construído sobre **Tailwind CSS v4** com tokens Gruvbox expostos como CSS custom properties (`--background`, `--foreground`, `--gruvbox-yellow`, `--gruvbox-gray`, `--gruvbox-outline`), alternados por `next-themes` via a classe `.dark`. A tipografia usa **Space Grotesk** em títulos e **Manrope** no corpo. A cor de marca é o amarelo Gruvbox — `#fabd2f` no tema escuro, `#b57614` no claro.

## Tokens de cor (`globals.css`)

Dois conjuntos de variáveis CSS — `:root` para tema claro, `.dark` para tema escuro:

| Token               | Claro (`#`)  | Escuro (`#`) | Significado                              |
| ------------------- | ------------ | ------------ | ---------------------------------------- |
| `--background`      | `#fbf1c7`    | `#282828`    | Fundo da página                          |
| `--foreground`      | `#3c3836`    | `#ebdbb2`    | Texto principal                          |
| `--gruvbox-yellow`  | `#b57614`    | `#fabd2f`    | Cor de marca — títulos, bordas, accent   |
| `--gruvbox-gray`    | `#7c6f64`    | `#928374`    | Texto secundário — role, footer, labels  |
| `--gruvbox-outline` | `#a89984`    | `#665c54`    | Bordas e outlines                        |

Todos os tokens são expostos ao Tailwind via `@theme inline` como `color-*`, permitindo uso directo com `text-gruvbox-yellow`, `border-gruvbox-outline`, etc.

## Tipografia

Duas fontes carregadas via `next/font/google`, ambas com `display: swap`:

| Variável CSS            | Fonte          | Alias Tailwind  | Uso                               |
| ----------------------- | -------------- | --------------- | --------------------------------- |
| `--font-space-grotesk`  | Space Grotesk  | `font-display`  | Títulos — nome, headings          |
| `--font-manrope`        | Manrope        | `font-sans`     | Corpo — role, footer, botões, UI  |

## Tema claro/escuro

Gerido por `next-themes` com `attribute="class"` — a classe `.dark` é adicionada ao `<html>`. O padrão é `system` (segue a preferência do OS).

A transição entre temas usa a **View Transitions API** (`document.startViewTransition`), com fade de 300ms (`cubic-bezier(0.4, 0, 0.2, 1)`). Navegadores sem suporte fazem a troca directamente (fallback no `ThemeToggle`).

## Animações

| Nome            | Duração  | Uso                                              |
| --------------- | -------- | ------------------------------------------------ |
| `scroll-left`   | `60s`    | Linhas de texto do `BackgroundText` (par → esq)  |
| `scroll-right`  | `60s`    | Linhas de texto do `BackgroundText` (ímpar → dir)|
| `float`         | `6s`     | Disponível via `animate-float`                   |
| `fade-in-up`    | `0.8s`   | Disponível via `animate-fade-in-up`              |
| `fade-in/out`   | `300ms`  | View Transitions entre temas                     |
