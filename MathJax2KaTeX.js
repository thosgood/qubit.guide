var $document = $(document);

$document.ready(function() {
  // TODO: this should run AFTER everything else has finished (i.e. MathJax...)
  $('.math.display span').remove();
  // TODO: turn all display code things into <div class="math display">
  // TODO: then run KaTeX on everything!
});