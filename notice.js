$(document).ready(function() {
    // 네비바
    const $nav = $('.nav');
    const $first_nav = $('.first-nav');
    const $nav_wrap = $('.nav_wrap');
    const reducedHeight = '75px';
    const expandedHeight = '400px';

    // 처음 로딩 시 nav_wrap 길이를 0으로 설정
    $nav_wrap.css('height', '0px');

    $first_nav.on('mouseover', function(){
        $first_nav.removeClass('is-hover');
        $nav.addClass('is-hover');
        $nav_wrap.addClass('is-hover');
        $(this).addClass('is-hover');

        if ($(this).find('ul').length === 0) {
            $nav_wrap.css('height', reducedHeight);
        } else {
            $nav_wrap.css('height', expandedHeight);
        }
    });

    $nav_wrap.on('mouseleave', function() {
        $nav.removeClass('is-hover');
        $first_nav.removeClass('is-hover');
        $nav_wrap.removeClass('is-hover');

        // 마우스를 떼면 nav_wrap 길이를 다시 0으로 설정
        $nav_wrap.css('height', '0px');
    });
});