# xypnox.com


This is the source of [xypnox.com](https://xypnox.com)

<div align="center">

[![Deploy to GitHub Pages](https://github.com/xypnox/xypnox.github.io/actions/workflows/astro.yml/badge.svg)](https://github.com/xypnox/xypnox.github.io/actions/workflows/astro.yml)
![Built with Astro](https://img.shields.io/badge/built_with-Astro-blue)
![SolidJS](https://img.shields.io/badge/Solid-JS-blue)

</div>

- Redone in [astro](https://astro.build/) 
- Now comes with blag
  Previously it was maintained as a separate zola built blog but has now been integrated into the astro site.
- Has some design stuff too!


## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:3000`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |


---

# Checks

- `css variables`
  We have a postcss check that throws warnings when a css variable is encountered that has either not been declared in the style tag or is not present in the global theme variables.
  The check script does not reload on theme.ts changes. You can run `pnpm run convert` independently to recreate the `cssVariables.json` file to check the variables correctly.

# Dependencies

- solid-js
  For interactions in cover and logos 

---

Some parts of the code are artifacts that were initially prototyped but later removed from the final version. Start with the pages directory to see what was used and how.


