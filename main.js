$(document).ready(function () {
    // 메인 배너 이미지
    var images = [
        'img/eastar_banner1.jpg',
        'img/eastar_banner2.jpg',
        'img/eastar_banner3.jpg',
        'img/eastar_banner4.jpg',
        'img/eastar_banner5.jpg'
    ];

    var i = 0;
    var banner = $('.top_banner');
    var fadeTime = 800; // 페이드인/페이드아웃 시간 (밀리초)
    var displayTime = 5000; // 각 이미지 표시 시간 (밀리초)

    banner.css('background-image', 'url(' + images[i] + ')');

    function changeImage() {
        i = (i + 1) % images.length;
        banner.fadeOut(fadeTime, function () {
            banner.css('background-image', 'url(' + images[i] + ')');
            banner.fadeIn(fadeTime);
        });
    }

    setInterval(changeImage, displayTime + 2 * fadeTime); // 이미지 변경 간격 설정


    //최저가 항공 특가
    const $items = $('.accordion-item');
    let currentIndex = 0;
    let autoSlide;

    function showNextItem() {
        $items.removeClass('active');
        currentIndex = (currentIndex + 1) % $items.length;
        $items.eq(currentIndex).addClass('active');
    }

    $items.on('mouseover', function () {
        clearInterval(autoSlide);
        $items.removeClass('active');
        $(this).addClass('active');
    });

    $items.on('mouseout', function () {
        autoSlide = setInterval(showNextItem, 5000);
    });

    // Initial setting
    $items.eq(currentIndex).addClass('active');
    autoSlide = setInterval(showNextItem, 5000);

    // 슬릭슬라이더
    $('.autoplay').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    // 네비바
    const $nav = $('.nav');
    const $first_nav = $('.first-nav');
    const $nav_wrap = $('.nav_wrap');
    const $logo = $('.logo');
    const reducedHeight = '77px';
    const expandedHeight = '400px';

    // 처음 로딩 시 nav_wrap 길이를 0으로 설정
    $nav_wrap.css('height', '0px');

    $first_nav.on('mouseover', function () {
        $first_nav.removeClass('is-hover');
        $nav.addClass('is-hover');
        $logo.addClass('is-hover');
        $nav_wrap.addClass('is-hover');
        $(this).addClass('is-hover');

        if ($(this).find('ul').length === 0) {
            $nav_wrap.css('height', reducedHeight);
        } else {
            $nav_wrap.css('height', expandedHeight);
        }
    });

    $nav_wrap.on('mouseleave', function () {
        deactivateNavWrap();
    });

    // 화면의 width 100vw, height 400px 이외의 곳에 마우스가 있을 때 nav_wrap을 비활성화
    $(document).on('mousemove', function (e) {
        const mouseY = e.clientY;

        // 화면의 height 400px 이내일 때만 유지, 그 외는 비활성화
        if (mouseY > 400) {
            deactivateNavWrap();
        }
    });

    // nav_wrap을 비활성화하는 함수
    function deactivateNavWrap() {
        $nav.removeClass('is-hover');
        $first_nav.removeClass('is-hover');
        $nav_wrap.removeClass('is-hover');
        $logo.removeClass('is-hover');

        // nav_wrap 길이를 다시 0으로 설정
        $nav_wrap.css('height', '0px');
    }



    //top_tab 왕복, 편도, 다구간
    $('.button button:first').addClass('selected');

    // 버튼 클릭 이벤트 핸들러
    $('.button button').click(function () {
        // 모든 버튼에서 'selected' 클래스를 제거
        $('.button button').removeClass('selected');
        // 클릭된 버튼에 'selected' 클래스 추가
        $(this).addClass('selected');

        // 버튼 텍스트에 따라 동작 수행
        if ($(this).text() === '왕복') {
            $('.date').text('가는날 - 오는날');
        } else if ($(this).text() === '편도') {
            $('.date').text('가는날');
        } else if ($(this).text() === '다구간') {
            window.location.href = 'flight.html?type=multi'; // 다구간 페이지로 이동, 쿼리 파라미터 추가
        }
    });

    //tablet ver 왕복, 편도, 다구간
    $('.type span:first').addClass('selected');

    // span 클릭 이벤트 핸들러
    $('.type span').click(function () {
        // 모든 span에서 'selected' 클래스를 제거
        $('.type span').removeClass('selected');
        // 클릭된 span에 'selected' 클래스 추가
        $(this).addClass('selected');

        // span 텍스트에 따라 동작 수행
        if ($(this).text() === '왕복') {
            $('.date_info span').text('가는날~오는날');
        } else if ($(this).text() === '편도') {
            $('.date_info span').text('가는날');
        } else if ($(this).text() === '다구간') {
            window.location.href = 'flight.html?type=multi'; // 다구간 페이지로 이동, 쿼리 파라미터 추가
        }
    });

    // .small_nav를 활성화하고 오버레이를 추가하는 함수
    function activateSmallNav() {
        $('body').addClass('small_nav_active');

        // 오버레이 요소가 이미 존재하지 않는 경우만 추가
        if (!$('.nav .overlay').length) {
            let $overlay = $('<div>', { class: 'overlay' });
            $overlay.on('click', deactivateSmallNav);

            // .contents > .top_ct > .nav 요소 안에 오버레이 추가
            $('.contents > .top_ct > .nav').append($overlay);
        }
    }

    // .small_nav를 비활성화하고 오버레이를 제거하는 함수
    function deactivateSmallNav() {
        $('body').removeClass('small_nav_active');
        $('.nav .overlay').remove();

        // 모든 서브메뉴를 닫고, .active 클래스 제거
        $('.small_nav_sub').slideUp(300); // 모든 서브메뉴 슬라이드업
        $('.has_sub').removeClass('active'); // 모든 li에서 active 클래스 제거
    }

    // .nav_button 클릭 시 .small_nav를 활성화하는 이벤트 리스너 추가
    $('.nav_button').on('click', function (event) {
        event.stopPropagation();
        if ($('body').hasClass('small_nav_active')) {
            deactivateSmallNav();
        } else {
            activateSmallNav();
        }
    });

    // .small_nav 내부 클릭 시 이벤트 버블링을 막아 .small_nav가 닫히지 않게 함
    $('.small_nav').on('click', function (event) {
        event.stopPropagation();
    });

    // document 클릭 시 .small_nav가 닫히도록 설정
    $(document).on('click', function (event) {
        if (!$('body').hasClass('small_nav_active')) return;
        if (!$(event.target).closest('.small_nav').length && !$(event.target).closest('.nav_button').length) {
            deactivateSmallNav();
        }
    });

    $('.contents > .top_ct > .nav > .nav_button > .small_nav > .small_nav_top > img').on('click', function () {
        deactivateSmallNav();
    });

    $('li:has(.small_nav_sub)').addClass('has_sub');

    $('.has_sub > a').on('click', function (event) {
        event.preventDefault(); // 기본 링크 동작 막기

        var $this = $(this);
        var $currentSub = $this.siblings('.small_nav_sub'); // 현재 클릭한 항목의 서브메뉴
        var $parentLi = $this.parent(); // 부모 li 요소

        // 현재 열려 있는 다른 서브메뉴들을 닫음
        $('.small_nav_sub').not($currentSub).slideUp(300); // 현재 서브메뉴를 제외한 다른 서브메뉴 닫기
        $('.has_sub').not($parentLi).removeClass('active'); // 현재 클릭한 항목을 제외한 다른 항목에서 active 클래스 제거

        // 클릭한 항목의 서브메뉴 토글
        $currentSub.slideToggle(300);
        $parentLi.toggleClass('active'); // 클릭한 항목에 active 클래스 토글
    });

    // 화면 크기가 1119px 이하일 때 실행되는 함수
    function updateHTMLForMobile() {
        if (window.matchMedia('(max-width: 1119px)').matches) {
            // HTML 코드 수정: 특정 텍스트 변경
            $('.news_left span').eq(1).html(function (_, html) {
                return html.replace('을　　알려드려요', '을 알려드려요');
            });
        } else {
            // 원래 상태로 복원 (원하는 대로 텍스트 복원)
            $('.news_left span').eq(1).html(function (_, html) {
                return html.replace('을 알려드려요', '을　　알려드려요');
            });
        }
    }

    // 화면 크기가 변경될 때마다 실행
    $(window).resize(updateHTMLForMobile);

    // 페이지 로드 시 한 번 실행
    $(document).ready(updateHTMLForMobile);
});

