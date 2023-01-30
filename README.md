# qubit.guide

The source for [qubit.guide](https://qubit.guide).

Build using the `./build_book` script.


## To-do

### General

- **make github actions FAIL if PDF build(s) are unsuccessful**
- **only one footnote per paragraph**
- **search for `TO-DO` and `.todo`**

### Web

- check that all videos appear at the top of the page
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
- extra output (added to downloads) that uses the single page html bookdown format **with mathjax**

### PDF

- **`_pdf-instructions.Rmd` to mirror `_web-instructions.Rmd`**
    + talk about technical divs
    + explain that web version exists
- *general PDF styling*
    + ***FONT*** (in headings)
    + "Part X" pages --- less empty space (maybe centred text?)
    + make the tables (e.g. in "phase gates galore" and "Pauli matrices, algebraically") in the pdf version look good
    + make title page nice
    + remove the dashes from page numbers
    + TOC spacing (e.g. the §11.10 number overlaps with the subsection title)
        * also just make it smaller overall width?
    + make physical page numbers agree with printed page numbers
    + icon for `.technical` divs?
        * use the title of the div too
    + some figures are just TOO BIG (e.g. that relative phase/probability graph for decoherence)
    + external link icon?
- **"last updated" date on title page**
- `.idea` and `.technical` envs have problems:
    + they start with a single space
    + they don't have paragraph line breaks
    + they sometimes have more space at the bottom than at the top?
    + **they can't break midway (e.g. Segre embedding)**
- check footnotes don't spill over into subsequent pages
- make a smaller format pdf version ("book-sized", with footnotes at the bottom)
    + also a large print pdf version
