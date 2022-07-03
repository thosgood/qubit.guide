## To-do

### General

- `↗︎` symbol after *external* links?
- **only one footnote per paragraph**
- **embed youtube videos for lecture 8**
    + [`lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed)
- **search for TO-DO**
- add more questions from problem sheets
- **`{.technical}` divs**
    + make these concertinas/accordions
    + latex implementation
        * add `latex=""` to each one
- look at all internal links and check that their text isn't anything like "Chapter 3" or whatever (i.e. nothing that isn't permutation invariant!)


### Web

- *general web styling*
    + favicon
    + banner image below homepage title?
- pretty urls
    + this is gonna have to be a hack: see [`bookdown/issues/1298`](https://github.com/rstudio/bookdown/issues/1298)
- **some way of hiding/showing all videos on a page**
- improve sidenote y-positioning using jquery
    + find the previous `.footnote-ref` in the DOM and align with that

### PDF

- *general PDF styling*
    + make the tables (in e.g. "phase gates galore") in the pdf version look good
    + title page (**including update date**)
    + TOC spacing (e.g. the §11.10 number overlaps with the subsection title)
    + make physical page numbers agree with printed page numbers
- check footnotes don't spill over into subsequent pages
- smaller format pdf version ("book-sized", with footnotes at the bottom)
