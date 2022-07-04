# qubit.guide

The source for [qubit.guide](https://qubit.guide).

Build using the `./build_book` script.


## To-do

### General

- **only one footnote per paragraph**
- **search for TO-DO**
- add more questions from problem sheets
- look at all internal links and check that their text isn't anything like "Chapter 3" or whatever (i.e. (*ideally*) nothing that isn't permutation invariant!)


### Web

- **`{.technical}` divs**
    + make these concertinas/accordions
    + possible icon: [search-plus](https://fontawesome.com/v4/icon/search-plus), [book](https://fontawesome.com/v4/icon/book), [cogs](https://fontawesome.com/v4/icon/cogs), [comments](https://fontawesome.com/v4/icon/comments), [rocket](https://fontawesome.com/v4/icon/rocket)
- *general web styling*
    + favicon
        * `favicon: "favicon.ico"` in the `index.Rmd` YAML
    + banner image below homepage title?
- pretty urls
    + note that these already sort of work (i.e. you can happily delete the trailing `.html` from any page's url), but the *TOC* is all ugly links
    + this is gonna have to be a hack: see [`bookdown/issues/1298`](https://github.com/rstudio/bookdown/issues/1298)
- **some way of hiding/showing all videos on a page**
- improve sidenote y-positioning using jquery
    + find the previous `.footnote-ref` in the DOM and align with that

### PDF

- **`_pdf-instructions.Rmd` to mirror `_web-instructions.Rmd`**
    + talk about technical divs
    + explain that web version exists
- *general PDF styling*
    + FONT
    + "Part X" pages
    + make the tables (in e.g. "phase gates galore") in the pdf version look good
    + title page
    + **"last updated" date**
    + TOC spacing (e.g. the §11.10 number overlaps with the subsection title)
    + make physical page numbers agree with printed page numbers
    + icon for `.technical` divs?
    + some figures are just TOO BIG (e.g. that relative phase/probability p graph for decoherence)
- check footnotes don't spill over into subsequent pages
- smaller format pdf version ("book-sized", with footnotes at the bottom)
