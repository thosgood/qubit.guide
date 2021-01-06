var $document = $(document);

$document.ready(function() {
  // TODO: run KaTeX on all <eq> tags (with env="math" or "displaymath")
  $('eq').map(function() {
    var display = (this.getAttribute('env') == "displaymath");
    try {
      katex.render(this.textContent, this, {displayMode: display});
    }
    catch(err) {
      this.style.color = 'red';
    }
  });
  $('eq span').map(function() {
    this.unwrap();
  });
});