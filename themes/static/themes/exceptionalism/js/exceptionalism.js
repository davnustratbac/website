jQuery(document).ready(function() {

    var windowWidth = $(window).width();
    $(window).on('load resize', function(){
        updateReadingBar();
        updateActiveMenuItem();

        windowWidth = $(window).width();
       
        if(windowWidth > 998){
            if($('.quote').length){
                quoteSize();
            }
            if($('.chapter-links').length){
                $('.chapter-links').css('display','inline-block');
                if($('.chapter-links').hasClass('open')){
                    $('.chapter-links').removeClass('open');
                    $('.fa').toggleClass('fa-chevron-down fa-chevron-up');
                }
            }
        }
        if(windowWidth < 998){
            if($('.chapter-links').length && (!($('.chapter-links').hasClass('open')))){
                $('.chapter-links').css('display', 'none');
            }
        }
    });

    if($('.chapter-heading').length){
        $('.chapter-heading').wrap('<div class="container-clear-none heading-wrapper"></div>');
    }

    $('#mobile-chapter-menu').click(function(e) {
        $('.chapter-links').slideToggle().toggleClass('open');
        $('.fa').toggleClass('fa-chevron-down fa-chevron-up');
    });

    if($('.block-RelatedItems').length){       
        $('.story').before( '<div class="related-content-menu"><i class="fa fa-bars"></div>' );
        setRelatedMenu();
        $('.related-content-menu').click(function(e){
            $('.block-RelatedItems').slideToggle();
            $('.block-RelatedItems').closest('.container-clear-none').addClass('open');
            $('.related-content-menu i').toggleClass('fa-close fa-bars');
        });
    }
    
    function setRelatedMenu(){
        var fromTop = $('.related-content-menu').offset().top - $(window).scrollTop() - 200;
        var windowPosition = $(window).scrollTop();
        if(fromTop <= 0){
            $('.related-content-menu').addClass('fixed');
            $('.container-clear-none.open').addClass('fixed');
        }
        if(windowPosition < 550){
            $('.related-content-menu').removeClass('fixed');
            $('.container-clear-none.open').removeClass('fixed');
        }
    }

    function quoteSize(){
        $('.quote').each(function (index, value){
            var blockHeight = $(this).height();
            var maxHeight = 300;
            var minHeight = 150;
            var fontSize = 1.0;
            var fontAdjust = 1.0;

            if(blockHeight > maxHeight){
                fontAdjust = maxHeight/blockHeight;
            }
            if(blockHeight < minHeight ){
                fontAdjust = minHeight/blockHeight;
            }
            fontSize = fontSize * fontAdjust;

            $(this).css({'font-size': fontSize+'em', 'line-height' : '130%'});
        });
    }

    function updateReadingBar() {
        var s = $(window).scrollTop(); // Current scroll mark
        ap = $('#article-page').last();
        s = s - ap.position().top; // Start counting at the top of the article
        d = ap.height(); // The end of the article page element
        c = $(window).height(); // Height of the element
        scrollPercent = (s / (d-c)) * 100;
        if (scrollPercent > 100) scrollPercent = 100;
        else if (scrollPercent < 0) scrollPercent = 0;
        $('.readingbar').width(scrollPercent + '%');
    }

    /*** update selected chapter in header menu on scroll */
    function updateActiveMenuItem() {
       // Get container scroll position
       var fromTop = $(this).scrollTop() + chapterMenuHeight;
    
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
    }

    // Keeping track of position in article to update active page in menu
    var chapterMenu = $(".chapter-links ul"),
        chapterMenuHeight = chapterMenu.outerHeight(),
        // All list items
        menuItems = chapterMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

    // Bind click handler to menu items to scroll down to chapter on page
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-chapterMenuHeight+1;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

// Bind to scroll
    $(window).scroll(function(){
       updateReadingBar();
       updateActiveMenuItem();
       setRelatedMenu();
    });

});