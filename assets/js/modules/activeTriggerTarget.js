var activeTriggerTarget = (function () {
  return {
    init: function() {
      $(document).on('click', '[data-active-trigger]', function(event) {
        event.preventDefault();
        var el = $(this);
        var key = el.data('active-trigger');
        var namespace = false;
        var namespaces = key.match(/^(.*)\[(.*?)\]$/);
        if (namespaces) {
          namespace = namespaces[1];
        }

        if (namespace) {
          $('[data-active-trigger^="'+namespace+'"]').removeClass('active');
          $('[data-active-trigger="'+key+'"]').addClass('active');
          $('[data-active-target^="'+namespace+'"]').removeClass('active');
          $('[data-active-target="'+key+'"]').addClass('active');
        }
        else if ($('[data-active-target="'+key+'"]').hasClass('active')) {
          $('[data-active-trigger="'+key+'"]').removeClass('active');
          $('[data-active-target="'+key+'"]').removeClass('active');
        }
        else {
          // the next line checks in case there are multiple triggers and only
          // marks the clicked trigger as active.
          $('[data-active-trigger="'+key+'"]').removeClass('active');
          el.addClass('active');
          $('[data-active-target="'+key+'"]').addClass('active');

          // If there is a visible target, and it needs to be scrolled into the
          // view then do that now
          if ($('[data-active-target="'+key+'"]').attr('data-active-scroll-into-view') !== undefined) {
            $('[data-active-target="'+key+'"]').css('top', $(document.body).scrollTop());
          }
        }
      });
    }
  };
})();
