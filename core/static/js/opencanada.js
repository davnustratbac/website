var breakpoint = 1000;

//var features = FeatureStyles;
var sharing = Sharing;
var header = Header;
var search = Search;

jQuery(document).ready(function() {

    initForWindow();

    FeatureStyles.Camera.initialize();
    FeatureStyles.Arrow.initialize();
    FeatureStyles.FeatureImages.initialize();
    FeatureStyles.RelatedArticles.initialize();

    search.Structure.initialize();

    sharing.Links.initialize();
    
});

//initialize window based on width and height
function initForWindow(){

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    FeatureStyles.MainFeatures.initializeForWindow(windowHeight);
    sharing.Links.initializeForWindow(windowWidth);
    header.Structure.toggleHeading(windowWidth);

    //set the body padding based on banner height
    var bannerHeight = $('header').height();
    $('body').css("padding-top", bannerHeight + "px");
    search.Structure.setOffset(bannerHeight);

    $("main").click(function () {
        Menu.close();
        Search.Structure.closeBox();
        FeatureStyles.MainFeatures.removeNavigationLock();
    });

    /*$('html').on('touchstart click', function (e) {
        var selected = $(e.target);

        if (selected.closest('button').data('target') == 'main-menu') {
            Menu.toggle();
        }
        else if (selected.closest('button').data('target') == 'search-box') {
            Search.Structure.toggleBox();
        }
        else {
            Menu.close();
            Search.Structure.closeBox();
        }

    });
*/

}

$(window).resize(function(){
    initForWindow();
});



