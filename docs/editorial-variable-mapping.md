# Editorial variable mapping

This refactor keeps the existing SCSS system as the single visual source of truth.

| Editorial role         | Existing variable                                       | Declared in                            | Refactor usage                                         |
| ---------------------- | ------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| Canvas / surface       | `$brutal-white`, `$primary-cl`                          | `src/styles/scss/core/_variables.scss` | Light portfolio canvas and quiet image backgrounds     |
| Primary text / divider | `$brutal-black`, `$brutal-border-thin`                  | `_variables.scss`                      | Headlines, hairline editorial dividers, focus contrast |
| Accent                 | `$brutal-red` / `$highlight-cl`                         | `_variables.scss`                      | Restrained underline, availability and key emphasis    |
| Muted metadata         | `$brutal-gray`                                          | `_variables.scss`                      | Indexes, dates, categories and supporting copy         |
| Display type           | `B-s-*` font faces + `--display-fs`, `--h1-fs`          | `_fonts.scss`, `_variables.scss`       | Hero, project titles and statement typography          |
| Body/UI type           | `B-vn-*` font faces + body tokens                       | `_fonts.scss`, `_variables.scss`       | Reading copy, nav, labels and metadata                 |
| Layout spacing         | `--brutal-margin`, `--brutal-gutter`, `--brutal-offset` | `_variables.scss`                      | Existing responsive gutters and internal rhythm        |
| Breakpoints/easing     | `$xs-*` through `$xxl-*`, `$brutal-ease-out`            | `_variables.scss`                      | Existing responsive composition and hover timing       |

## Additions

Only three semantic layout tokens were added because no equivalent existed:

- `--editorial-max-width`: consistent wide content measure.
- `--editorial-reading-width`: readable body-copy measure.
- `--space-section`: shared responsive vertical pacing.

They do not duplicate palette, typography or breakpoint values; those continue to use the pre-existing tokens above.
