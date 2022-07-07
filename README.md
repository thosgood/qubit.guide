# qubit.guide

The source for [qubit.guide](https://qubit.guide).

Build using the `./build_book` script.


## To-do

### General

- **only one footnote per paragraph**
- **search for TO-DO**
- add more questions from problem sheets
- look at all internal links and check that their text isn't anything like "Chapter 3" or whatever (i.e. (*ideally*) nothing that isn't permutation invariant!)
- rewrite `.circuit` and `.scenario` to use `content: attr(title)".";`?


### Web

- *general web styling*
    + favicon
        * `favicon: "favicon.ico"` in the `index.Rmd` YAML
    + banner image below homepage title?
- pretty urls
    + note that these already sort of work (i.e. you can happily delete the trailing `.html` from any page's url), but the *TOC* is all ugly links
    + this is gonna have to be a hack: see [`bookdown/issues/1298`](https://github.com/rstudio/bookdown/issues/1298)
- make embedded videos slide in/out rather than just appear/disappear
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
        * also just make it smaller overall width?
    + make physical page numbers agree with printed page numbers
    + icon for `.technical` divs?
        * use the title of the div too
    + some figures are just TOO BIG (e.g. that relative phase/probability p graph for decoherence)
    + `.idea` and `.technical` envs have two problems:
        * they start with a single space
        * they don't have paragraph line breaks
- check footnotes don't spill over into subsequent pages
- smaller format pdf version ("book-sized", with footnotes at the bottom)
