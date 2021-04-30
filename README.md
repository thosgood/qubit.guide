# An introduction to quantum information science

## Lecture notes

For the past however-many years, [Artur Ekert](https://www.arturekert.com/) has been teaching the masters course "Introduction to Quantum Information" at the University of Oxford.
During this time, many versions of accompanying lecture notes have come and gone, with constant improvements and changes being made.
The version that you will find on this website has been carefully edited by [Tim Hosgood](https://thosgood.com) into a cohesive "book", containing additional exercises and topics.

<div style="text-align: center;margin: 2em"><a href="book/" style="padding: 1em;border: 1px solid black;border-radius: 5px;">Read the book</a></div>

The online book is built using (the [Bookdown](https://github.com/rstudio/bookdown/) fork of) Gitbook.
This means that it has some nice functionality to make reading more comfortable, with most options being accessed through the toolbar at the top (as explained below).

<img src="gitbook-toolbar.png" alt="The book toolbar" width="350" style="border: 1px solid black;float: right;">

1. Show/hide the table of contents.
2. Search within the entire book.
3. Change display settings (e.g. font size, dark mode).
4. View the source code of the current section on GitHub.
5. Open the PDF version of the book.


## Lecture videos

Complementary to the lecture notes, there are also lecture videos covering the same topics (but in a slightly different order), which can be found on YouTube.
These are embedded in the web version of the book, but can also be watched separately as a standalone series.

<div style="text-align: center;margin: 2em"><a href="https://www.youtube.com/c/ArturEkert/playlists" style="padding: 1em;border: 1px solid black;border-radius: 5px;">Watch the videos</a></div>


## Further reading

- P. Kaye, R. Laflamme, and M. Mosca. _An Introduction to Quantum Computing_. Oxford University Press, 2007.
- M. Nielsen and I. Chuang. _Quantum Computation and Quantum Information_. Cambridge University Press, 2000.
- J. Preskill. [_Ph219/CS219 Lecture Notes_](http://theory.caltech.edu/~preskill/ph219/index.html#lecture).
- S. Aaronson. _Quantum Computing since Democritus_. Cambridge University Press, 2013. ([Complementary lecture notes also available](https://www.scottaaronson.com/democritus/)).
- Quantum Open Source Foundation. [_Learning Resources on Quantum Computing_](https://www.qosf.org/learn_quantum/).


## Contact

For any problems or queries regarding this site or its contents, please get in touch with [Tim Hosgood](https://thosgood.com).


---

## To-do

1. explain lecture videos (in an html-only div)
1. **only one footnote per paragraph**
    + **improve sidenote y-positioning using jquery**
        - find the previous `.footnote-ref` in the DOM and align with that
1. pdf title page
1. embed youtube videos (**but not into PDF output!**)
    + "_To use privacy-enhanced mode, change the domain for the embed URL in your HTML from `https://www.youtube.com` to `https://www.youtube-nocookie.com`_"
1. **search for "TODO"**
1. add all questions from problem sheets