var $document = $(document);

$document.ready(function() {
  $('eq').map(function() {
    var display = (this.getAttribute('env') == "displaymath");
    katex.render(this.textContent, this, {displayMode: display, fleqn: true, throwOnError: false});
  });
});