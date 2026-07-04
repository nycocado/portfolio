# Hero section redesign

## Context

Hero atual (`app/[locale]/page.tsx`): coluna única centralizada — foto circular → nome → role → socials. `Hero.tagline` (já traduzida em `messages/en.json`/`messages/pt.json`) nunca chegou a ser renderizada.

## Design

**Desktop (`md:` e acima)** — split assimétrico, alinhado à esquerda:
- Foto à esquerda, recorte em blob orgânico (`border-radius: 45% 55% 58% 42% / 55% 48% 52% 45%`, validado no mockup), no lugar do círculo atual. Mesma borda `border-gruvbox-yellow`, mesmo `AnimatedPhoto` (fade-in preservado).
- Bloco de texto à direita, nessa ordem:
  1. Role como eyebrow (uppercase, pequeno, `text-gruvbox-gray`)
  2. Nome (`h1`, mesmo tratamento tipográfico de hoje)
  3. Tagline como subtítulo, abaixo do nome
  4. `SocialLinks`, alinhados à esquerda

**Mobile (abaixo de `md:`)** — mantém o empilhado centralizado que já existe hoje (foto em cima, texto centralizado, socials centralizados). Sem componente novo pro mobile — é o layout atual, só reaproveitado como breakpoint menor do novo layout.

## Fora de escopo

- Sem novas chaves de tradução (`Hero.tagline`, `role`, `name` já existem).
- Sem mudança em `config/portfolio.ts`, `SocialLinks.tsx` ou dados/JSON-LD.
- Sem teste automatizado — validação visual no navegador (dev server), light e dark.

## Referência visual

Mockups do brainstorming (blob vs. círculo vs. silhueta exata do abacate, hierarquia invertida) em `.superpowers/brainstorm/29827-1783188646/content/`.
