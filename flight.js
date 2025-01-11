$(document).ready(function () {
    // 네비바
    const $nav = $('.nav');
    const $first_nav = $('.first-nav');
    const $nav_wrap = $('.nav_wrap');
    const reducedHeight = '72px';
    const expandedHeight = '400px';

    // 처음 로딩 시 nav_wrap 길이를 0으로 설정
    $nav_wrap.css('height', '0px');

    $first_nav.on('mouseover', function () {
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

    $nav_wrap.on('mouseleave', function () {
        $nav.removeClass('is-hover');
        $first_nav.removeClass('is-hover');
        $nav_wrap.removeClass('is-hover');

        // 마우스를 떼면 nav_wrap 길이를 다시 0으로 설정
        $nav_wrap.css('height', '0px');
    });

    // 왕복, 편도, 다구간 탭 내용 변경
    $('.reservation').hide();
    $('.round_trip').show();
    $('.button div').eq(0).addClass('active');

    // URL 쿼리 파라미터 확인
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // 'type' 파라미터가 'multi'인 경우 다구간 탭을 활성화
    if (getQueryParameter('type') === 'multi') {
        $('.reservation').hide();
        $('.button div').removeClass('active');
        $('.multi_city').show();
        $('.button div:contains("다구간")').addClass('active');
    }

    $('.button div').on('click', function () {
        $('.reservation').hide();
        $('.button div').removeClass('active');

        $(this).addClass('active');

        if ($(this).text() === '왕복') {
            $('.round_trip').show();
        } else if ($(this).text() === '편도') {
            $('.one_way').show();
        } else if ($(this).text() === '다구간') {
            $('.multi_city').show();
        }
    });

    // 여정 추가 버튼 클릭 시 multi_reservation 요소 추가
    $('#addJourney').on('click', function () {
        const newReservation = `
                <div class="multi_reservation">
                    <div class="location">
                        <div class="location1">
                            <span>출발지 선택</span>
                            <span>출발
                                <img src="img/location.png" style="width: 20px; height: 20px;">
                            </span>
                        </div>
                        <div class="swap">
                            <img src="img/swap.png" style="width: 33px; height: 33px;">
                        </div>
                        <div class="location2">
                            <span>도착지 선택</span>
                            <span>도착
                                <img src="img/location.png" style="width: 20px; height: 20px;">
                            </span>
                        </div>
                    </div>
                    <div class="more">
                        <div class="date">
                            <img src="img/calendar.png" style="width: 17px; height: 17px;">
                            <span class="tag" style="margin: 0 15px; font-weight: bold;">여행기간</span>
                            <span class="input">가는날
                                <img src="img/down-arrow.png" style="width: 10px; height: 10px;">
                            </span>
                        </div>
                        <div class="person">
                            <img src="img/person.png" style="width: 17px; height: 17px;">
                            <span class="tag" style="margin: 0 15px; font-weight: bold;">탑승 승객 인원</span>
                            <span class="input">성인 1
                                <img src="img/down-arrow.png" style="width: 10px; height: 10px;">
                            </span>
                        </div>
                        <div class="promotion">
                            <img src="img/promotion.png" style="width: 17px; height: 17px;">
                            <span class="tag" style="margin: 0 15px; font-weight: bold;">프로모션 코드 입력</span>
                            <input type="text" placeholder="코드를 입력하세요.">
                        </div>
                    </div>
                </div>
                `;
        $(this).before(newReservation);
    });
});
