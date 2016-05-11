(function ($) {

    var breakpoint = 985;
    var smBreakpoint = 600;
    var xsBreakpoint = 480;
    var windowWidth = $(window).width();

    var chapter = $('.profile .chapter');
    var menuItem = $('#toc li a');

    var pager = $('#pager ul');
    var pagerItem = $('#pager ul li');
    var pagerItemLink = $('#pager ul li a');

    var pagerCount = pagerItem.length;
    var indexCount = pagerCount - 1;

    var pagerItemWidth = pagerItem.width();
    var pagerWidth = pagerItemWidth * 5;
    var fullPagerWidth = pagerCount * pagerItemWidth;

    var pagerDisplayLimit = 5;

    var selectedIndex = 0;
    var selectedItem = null;
    var hash = window.location.hash;

    function initPage(windowWidth){
        chapter.hide();

        if(windowWidth < xsBreakpoint){
           pagerDisplayLimit = 2;
        }
        else if(windowWidth < smBreakpoint){
            pagerDisplayLimit = 3;
        }
        else{
            pagerDisplayLimit = 5;
        }

        pagerWidth = pagerItemWidth * pagerDisplayLimit;
        $('#pager').css("width",  + pagerWidth + "px");
        pager.width(fullPagerWidth);
        pager.css("left", "0px");

        if(hash === '' || hash === '#undefined'){
            selectedItem = menuItem.first().attr('href');
        }
        else{
            selectedItem = hash;
        }

        loadSlide(selectedItem);
    }

    function getSlide(){
        selectedItem = $(this).attr('href');
        loadSlide(selectedItem);
        scrollView();
    }

    function loadSlide(selectedItem){
        window.location.hash = hash;

        selectedIndex = getSelectedIndex(selectedItem);
        setPagerPosition(selectedIndex);

        $('.profile .chapter').removeClass('active').hide();
        $('.profile .chapter' + selectedItem).addClass('active').fadeIn(800);
        return false;
    }

    function getSelectedIndex(selectedItem) {

        pagerItem.removeClass('selected');
        pagerItem.each(function (index) {
            if ($(this).children().attr('href') === selectedItem) {
                $(this).addClass('selected');
                selected = $(this);
                selectedIndex = index;
            }
        });
        return selectedIndex;
    }

    function setPagerPosition(selectedIndex){
        var pagerPosition = 0;

        if(pagerDisplayLimit === 2){
            if(selectedIndex === indexCount){
                pagerPosition = -(selectedIndex * pagerItemWidth - pagerItemWidth);
            }
            else{
                pagerPosition = -(selectedIndex * pagerItemWidth);
            }
        }
        else if(pagerDisplayLimit === 3){
            if(selectedIndex === 0 ){
                pagerPosition = -(selectedIndex * pagerItemWidth);
            }
            else if(selectedIndex === indexCount){
                pagerPosition = -(selectedIndex * pagerItemWidth - 2 * pagerItemWidth);
            }
            else{
                pagerPosition = -(selectedIndex * pagerItemWidth - pagerItemWidth);
            }
        }
        else if(pagerDisplayLimit === 5){
            if(selectedIndex < 2 ){
                pagerPosition = -((selectedIndex * pagerItemWidth) - (selectedIndex * pagerItemWidth));
            }
            else if(selectedIndex >  indexCount - 2){
                pagerPosition = -(selectedIndex * pagerItemWidth - (pagerDisplayLimit - 1 - (indexCount - selectedIndex)) * pagerItemWidth);
            }
            else{
                pagerPosition = -(selectedIndex * pagerItemWidth - 2 * pagerItemWidth);
            }
        }

        $('#pager ul').css({left: pagerPosition});
        setPagerArrow();

    }

    function setPagerArrow(){
        var sliderPosition = null;
        sliderPosition = parseInt(($('#pager ul').css("left")).replace(/px/, ''));

        if(sliderPosition === 0){
            $('.prev').addClass('inactive');
        }
        else if(sliderPosition === (-(fullPagerWidth - pagerDisplayLimit * pagerItemWidth))){
            $('.next').addClass('inactive');
        }
        else{
            $('.prev').removeClass('inactive');
            $('.next').removeClass('inactive');
        }

    }

    function scrollView() {
      $('html,body').animate({
          scrollTop: $('.profile').offset().top
      }, 1000);
        return false;
    }

    /*  Activate selected slider and set pager */
     $(document).ready(function (e) {

        initPage(windowWidth);
        menuItem.on('click tap', getSlide);
        pagerItemLink.on('click tap', getSlide);

        $('.prev').click(function () {
            setPagerArrow();
            if(!($('.prev').hasClass('inactive'))) {
                $('#pager ul').animate({left: '+=' + pagerItemWidth}, 500);

            }
        });

        $('.next').click(function () {
            setPagerArrow();
            if(!($('.next').hasClass('inactive'))){
                $('#pager ul').animate({left: '-='+pagerItemWidth}, 500);

            }
        });

    });

    $(window).resize(function() {
        windowWidth = $(window).width();
        initPage(windowWidth);
    });

 })(jQuery);

