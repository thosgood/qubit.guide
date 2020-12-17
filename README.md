For the past however-many years, Artur Ekert has been teaching the masters course "Introduction to Quantum Information" at the University of Oxford.
During this time, many versions of accompanying lecture notes have come and gone, with constant improvements and changes being made.
The version that you will find on this website has been carefully edited into a cohesive "book", containing additional exercises and topics.

<div style="text-align: center;margin: 2em"><a href="book/" style="padding: 1em;border: 1px solid black;border-radius: 5px;">Read the book</a></div>

The online book is built using (the Bookdown fork of) Gitbook.
This means that it has some nice functionality to make reading more comfortable, with most options being accessed through the toolbar at the top (as explained below).

<img src="gitbook-toolbar.png" alt="The book toolbar" width="350" style="border: 1px solid black;float: right;">

1. Show/hide the table of contents.
2. Search within the entire book.
3. Change display settings (e.g. font size, dark mode).
4. View the source code of the current section on GitHub.
5. Open the PDF version of the book.


## Further reading

The best textbook to pair with these lecture notes is probably
> P. Kaye, R. Laflamme, and M. Mosca. _An Introduction to Quantum Computing_. Oxford University Press, 2007.

Although it was published in 2000, and thus has a slightly dated treatment of some topics, the standard textbook in the field is
> M. Nielsen and I. Chuang. _Quantum Computation and Quantum Information_. Cambridge University Press, 2000.

Some excellent lecture notes on quantum information theory are
> J. Preskill. _Ph219/CS219 Lecture Notes_. Available [here](http://theory.caltech.edu/~preskill/ph219/index.html#lecture).

A bit more idiosyncratic and fun to read, but still very informative, is
> S. Aaronson. _Quantum Computing since Democritus_. Cambridge University Press, 2013. (Complementary lecture notes also available [here](https://www.scottaaronson.com/democritus/)).


## Contact

For any problems or queries regarding this site or its contents, please get in touch with [Tim Hosgood](https://thosgood.com).


---

## To-do

1. replace links to sections with links named "Chapter 3", etc.
1. links at the start of every chapter
    + "whole chapter in one page" (links to `tufte/`)
    + css styling
1. be more consistent with the start of chapters
    + blockquote which says "About ..." and **uses words from the syllabus**
        * and make sure that _everything_ in the syllabus is covered!!
    + followed by a paragraph with a bit more of a detailed overview
1. make sure that you use **only** _either_ "chapter" _or_ "lecture"
1. idea blocks in dark mode
1. license and funding information along with bookdown link in `_includes/footer.html`
1. check everything (gitbook) on mobile (mainly for overly wide maths/tables)
1. **pdf output**
    + check for overlapping `\en`s
    + overlapping in the header (section/subsection names)
    + make `quote` environment italic
    + new page for each section
    + marginfigures
    + sizes of all images
    + idea environment (and, later on, scenario and circuits too)
        * tables in ideas look... bad
1. switch to katex
1. change the link prefixed to gitbook TOC when you have a domain
1. search for "TODO"
