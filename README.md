# qubit.guide

The source for [qubit.guide](https://qubit.guide).

Build using the `./build_book` script.


## To-do

### General

- **make github actions FAIL if PDF build(s) are unsuccessful**
- **only one footnote per paragraph**
- **search for TO-DO**
- look at all internal links and check that their text isn't anything like "Chapter 3" or whatever (i.e. (*ideally*) nothing that isn't permutation invariant!)
- rewrite `.circuit` and `.scenario` to use `content: attr(title)".";`?
    + affects both HTML and PDF output

### Web

- *general web styling*
    + favicon
        * `favicon: "favicon.ico"` in the `index.Rmd` YAML
    + banner image below homepage title?
        * would have to work in both light and dark modes! (or alternatively have a separate image for each)
- separator in nav bar doesn't change in dark mode
- pretty urls
    + note that these already sort of work (i.e. you can happily delete the trailing `.html` from any page's url), but the *TOC* is all ugly links
    + this is gonna have to be a hack: see [`bookdown/issues/1298`](https://github.com/rstudio/bookdown/issues/1298)
- make embedded videos slide in/out rather than just appear/disappear
- improve sidenote y-positioning using jquery
    + find the previous `.footnote-ref` in the DOM and align with that
- **make it so that the *entire* `.technical` or `.video` div is actually the clickable area**

### PDF

- **`_pdf-instructions.Rmd` to mirror `_web-instructions.Rmd`**
    + talk about technical divs
    + explain that web version exists
- *general PDF styling*
    + ***FONT***
    + "Part X" pages
    + make the tables (e.g. in "phase gates galore") in the pdf version look good
    + title page
    + **"last updated" date**
    + TOC spacing (e.g. the §11.10 number overlaps with the subsection title)
        * also just make it smaller overall width?
    + make physical page numbers agree with printed page numbers
    + icon for `.technical` divs?
        * use the title of the div too
    + some figures are just TOO BIG (e.g. that relative phase/probability graph for decoherence)
    + `.idea` and `.technical` envs have two problems:
        * they start with a single space
        * they don't have paragraph line breaks
        * they sometimes have more space at the bottom than at the top?
- check footnotes don't spill over into subsequent pages
- make a smaller format pdf version ("book-sized", with footnotes at the bottom)
