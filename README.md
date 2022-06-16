## To-do

1. general web styling
    + favicon
    + banner image below homepage title?
1. make the tables (in e.g. "phase gates galore") in the pdf version look good
1. `\mapsto` -> `\longmapsto` in display mode (and similar for `\to`/`\rightarrow`)
1. **some way of hiding/showing all videos on a page**
1. **only one footnote per paragraph**
    + improve sidenote y-positioning using jquery
        - find the previous `.footnote-ref` in the DOM and align with that
1. pdf title page
    + **include update date**
1. **embed youtube videos for lecture 8**
    + [`lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed)
1. **search for TO-DO**
1. add more questions from problem sheets
1. TOC spacing in pdf (e.g. the §11.10 number overlaps with the subsection title)
1. **`{.technical}` divs**
    + should these also be in the latex? if so (i.e. almost certainly) make sure to add `latex=""` to each one
    + turn some footnotes into `{.technical}` divs!
1. $\rho^\mathcal{A}$ vs $\rho_\mathcal{A}$?
1. make physical page numbers agree with printed page numbers (PDF version)
1. smaller format pdf version ("book-sized", with footnotes at the bottom)
1. pretty urls
    + this is gonna have to be a hack: see [`bookdown/issues/1298`](https://github.com/rstudio/bookdown/issues/1298)
1. look at all internal links and check that their text isn't anything like "Chapter 3" or whatever (i.e. nothing that isn't permutation invariant!)
