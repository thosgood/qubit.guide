// From https://johndjameson.com/blog/responsive-sidenotes/

var $document = $(document);
var $wrapper = $('.page-wrapper');
var $page = $('.page-inner');
var $markers = $('.footnote-ref');
var $footnotes = $('.footnotes ol');

$document.ready(function() {
  createSidenotes();
  toggleSidenotes();
});

$(window).resize(function () {
  waitForFinalEvent(function(){
    toggleSidenotes();
  }, 500, "resizing");
});

$(document).on('click', '.btn', function() {
  waitForFinalEvent(function(){
    toggleSidenotes();
  }, 500, "resizing");
});


function createSidenotes() {
  var $footnoteArray = $footnotes.children();
  $markers.parent().wrap("<div class='page-subject'></div>");
  for (var i = 0; i < $markers.length; i++) {
    $($('.page-subject')[i]).append(
      // role='complementary' provided for ARIA support
      "<aside class='page-sidenote' role='complementary'><p>" +
        $($footnoteArray[i]).html() +
        '</p></aside>'
    );
  };
}

function toggleSidenotes() {
  var wideEnough = $footnotes.length > 0 && $markers.length > 0 && $wrapper.width() > 1280;
  $page.toggleClass('has-sidenotes', wideEnough);
}


// From https://stackoverflow.com/questions/2854407/

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
