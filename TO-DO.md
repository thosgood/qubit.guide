## To-do

### General

- **make github actions FAIL if PDF build(s) are unsuccessful**
- update to quantikz2


### Reminders

- **only one footnote per paragraph**
- check that you use Chapter vs. Section consistently in any `\@ref`
- consistent use of `\longrightarrow` vs `\to` in display maths
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
    + (I can't remember why I specifically wanted mathjax...)
