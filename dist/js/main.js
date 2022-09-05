$(document).ready(function() {
    let _html = $('html');
    let body = $('body');
    let burgerBtn = $(".js-menu-btn");
    let customScroll = $(".js-custom-scroll");
    let tooltip = $('[data-toggle="tooltip"]');
    let optionsBtn = $('.options-btn');
    let optionsWrap = $('.options-wrap');
    let categoryItem = $('.main-menu--item');
    let categoryItemBody = $('.main-menu-modal');
    let overflow = $('.overflow');
    let cartModal = $('.cart-modal');
    let cartBtn = $('.icon-list--item.cart');
    let mobileMenu = $('.mobile-menu-wrap');
    let modalMenu = $('.modal-menu-wrap');
    let modalMenuClose = $('.modal-menu-wrap .close');
    let gridBtn = $('.grid-type--item');

    burgerBtn.on('click', function (e) {
        e.preventDefault();

        modalMenu.toggleClass('open');
        $(this).toggleClass('active');
        overflow.toggleClass('active');

        if (!_html.hasClass('noscroll')) {
            _html.addClass('noscroll');
            body.addClass('noscroll');
        } else {
            _html.removeClass('noscroll');
            body.removeClass('noscroll');
        }

        return false
    });

    modalMenuClose.on('click', function () {
        modalMenu.removeClass('open');
        mobileMenu.removeClass('open');
        _html.removeClass('noscroll');
        body.removeClass('noscroll');
        overflow.removeClass('active');

        return false
    });

    $('.mobile-menu-wrap .close, .overflow').on('click', function (e) {
        e.preventDefault();

        $('html, body').removeClass('noscroll');
        modalMenu.removeClass('open');
    });

    $('.city-select').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.city-select--item').on('click', function () {
        $(this).parents('.city-select').find('.city-select--head .text span').text($(this).text())
    });

    tooltip.tooltip({
        html: true,
        placement: 'bottom',
    });

    customScroll.mCustomScrollbar();

    if (window.innerWidth < 769) {
        $(".js-custom-scroll-mobile").mCustomScrollbar();
    }

    cartBtn.on("click", function(e) {
        e.preventDefault();
        cartModal.addClass('active');
        overflow.addClass('active');
        overflow.addClass('cart-open');
        categoryItemBody.removeClass('active');
    });

    overflow.on("click", function(e) {
        categoryItemBody.removeClass('active');
        cartModal.removeClass('active');
        cartBtn.removeClass('active');
        overflow.removeClass('active');
        overflow.removeClass('cart-open');
    });

    optionsBtn.on("click", function() {
        optionsWrap.removeClass('active');
        $(this).parent().addClass('active');
    });


    $(document).on('click', function (event) {
        let $target = $(event.target);

        if (!$target.closest('.location-wrap').length) {
            $('.js-autocomplete-input')[0].value = '';
            $('.js-autocomplete').addClass('d-none');
            $('.location-wrap').removeClass('active');
        }

        if (!$target.closest('.phones').length) {
            $('.phones-wrap').removeClass('active');
        }

        if (!$target.closest('.dropdown-wrap .label').length) {
            $('.dropdown-wrap').removeClass('active');
        }
    });

    /*** Dropdown header ***/

    $('.dropdown-wrap .label').on('click', function () {
        $(this).parent().toggleClass('active');
    });

    /*** End Dropdown header ***/


    /*** Location header ***/

    let autocompleteInput = $('.js-autocomplete-input');
    let autocompleteList = $('.js-autocomplete');
    let locationModalBtn = $('.js-location-modal-btn');
    let cities = ['Адлер', 'Ангарск', 'Альметьевск', 'Апрелевка', 'Архангельск', 'Белгород', 'Великий Новгород', 'Внуково', 'Воронеж', 'Воткинск', 'Глазов', 'Домодедово', 'Иваново', 'Ижевск', 'Кисловодск', 'Краснодар', 'Курск', 'Минеральные воды', 'Москва', 'Можга', 'Можайск', 'Молькино'];

    $('.location').on('click', function () {
        $(this).parent().toggleClass('active');
    });

    autocompleteInput.on('input', function () {

        const checkInput = (wordTyped, cities) => {
            return cities.filter(place => {
                const REG_CHECK = new RegExp(wordTyped, "gi");
                return place.match(REG_CHECK) || place.match(REG_CHECK);
            });
        };

        const FILTERED = checkInput(this.value, cities);

        const RENDER = FILTERED.map(place => {
            const REG_CHECK = new RegExp(this.value, "gi");
            const CITY_NAME = place.replace(
                REG_CHECK,
                `<span class="text-primary">${this.value}</span>`
            );

            return `<div class="autocomplete-list--item">${CITY_NAME}</div>`;
        }).join("");
        autocompleteList[0].innerHTML = RENDER;

        if ($(this)[0].value.length > 1) {
            autocompleteList.removeClass('d-none');
        } else {
            autocompleteList.addClass('d-none');
        }
    });

    $('.autocomplete-list').on('click', '.autocomplete-list--item', function (e) {
        $(this).parent().addClass('d-none');
        autocompleteInput.val($(this).text());
    });

    $('.location-search').on('click', '.btn', function (e) {
        let wrap = $(this).parents('.location-wrap');
        locationModalBtn.find('.text').text(autocompleteInput.val());
        autocompleteInput.val('');
        wrap.removeClass('active');
    });

    /*** End Location header ***/


    /*** Phone header ***/

    $('.phones').on('click', function () {
        $(this).parent().toggleClass('active');
    });

    $('.phones-list').on('click', '.location-list--item', function (e) {
        let wrap = $(this).parents('.phones-wrap');
        wrap.removeClass('active');
    });

    /*** End Phone header ***/


    /*** Password ***/

    $('.password-wrap .icon').on("click", function() {
        $(this).toggleClass('active');
        if($(this).parent().find('input')[0].type === 'password') {
            $(this).parent().find('input')[0].type = 'text'
        } else {
            $(this).parent().find('input')[0].type = 'password'
        }
    });


    /*** Timepicker ***/

    $(".timepicker").timepicker();

    /*** End Timepicker ***/


    /*** Datepicker ***/

    $(".datepicker").datepicker({
        dateFormat: 'dd.mm.y',
    });

    $(".datepicker-from").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd.mm.y',
        numberOfMonths: 1,
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    });

    $(".datepicker-to").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd.mm.y',
        numberOfMonths: 1,
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    });

    /*** End Datepicker ***/


    gridBtn.on("click", function(e) {
        e.preventDefault();

        gridBtn.removeClass('active');
        $(this).addClass('active');

        if ($(this).data('type') === 'list') {
            $('.product-list').addClass('type-list');
        } else {
            $('.product-list').removeClass('type-list');
        }
    });

    /*** Tabs ***/

    $('.tabs-head--item').on("click", function() {
        let id = $(this).attr('data-tab'),
            content = $('.tabs-body--item[data-tab="'+ id +'"]');

        $('.tabs-head--item.active').removeClass('active');
        $(this).addClass('active');

        $('.tabs-body--item.active').removeClass('active');

        content.addClass('active');
    });

    function categoryTab(item, event) {
        let id = item.attr('data-tab'),
            content = $('.main-menu-modal[data-tab="' + id + '"]');

        if (event === 'hover') {

            if (!item.hasClass('active')) {
                content.removeClass('active');
            }

            $('.main-menu--item.active').removeClass('active');
        }

        item.addClass('active');
        $('.main-menu-modal.active').removeClass('active');

        content.addClass("active");
        overflow.addClass('active');
    }

    categoryItem.on('click', function () {
        categoryTab($(this), 'hover');
    });

    categoryItemBody.mouseleave(function () {
        categoryItemBody.removeClass('active');
        categoryItem.removeClass('active');
        overflow.removeClass('active');
    });

    /*** End Tabs ***/


    /*** Spoiler ***/

    let spoilerItemHead = $('.spoiler--head');
    let spoilerItem = $('.spoiler--item');

    spoilerItemHead.on("click", function () {
        $(this).parent().toggleClass('active');

        spoilerItem.each(function () {

            if (!$(this).hasClass('active')) {
                $(this).parent().removeClass('active');
                $(this).parent().find('.spoiler--body').slideUp();
            }
        });

        if (!$(this).parent().hasClass('active')) {
            spoilerItem.removeClass('active');
            $(this).parent().find('.spoiler--body').slideUp();
            $(this).parent().removeClass('active');
        } else {
            spoilerItem.removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().find('.spoiler--body').slideDown();
        }
    });

    $('.filters-btn').on("click", function () {
        let filters = $('.filters');
        $(this).toggleClass('active');

        if (filters.hasClass('active')) {
            filters.slideUp();
            filters.removeClass('active');
        } else {
            filters.addClass('active');
            filters.slideDown();
        }
    });

    /*** End Spoiler ***/


    /*** Sliders ***/

    new Swiper('.js-slider-image', {
        slidesPerView: 2,
        simulateTouch: true,
        breakpoints: {
            561: {
                slidesPerView: 4,
            },
            1601: {
                slidesPerView: 5,
            }
        }
    });

    $('.js-slider-car-select').each(function () {

        $(this)[0].classList.forEach(function (item) {

            if (item.indexOf('index-slider-') > -1) {

                new Swiper('.' + item, {
                    slidesPerGroup: 1,
                    simulateTouch: true,
                    dragged: false,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        nextEl: ".js-slider-car-select .swiper-button-next",
                        prevEl: ".js-slider-car-select .swiper-button-prev",
                    },
                });
            }
        })
    });

    new Swiper('.js-reviews-slider', {
        slidesPerGroup: 1,
        simulateTouch: true,
        spaceBetween: 330,
        loop: true,
        navigation: {
            nextEl: ".js-reviews-slider .swiper-button-next",
            prevEl: ".js-reviews-slider .swiper-button-prev",
        },
        breakpoints: {
            768: {
                spaceBetween: 40,
            },
            992: {
                spaceBetween: 80,
            },
            1400: {
                spaceBetween: 150,
            },
            1601: {
                spaceBetween: 300,
            }
        }
    });

    new Swiper('.js-products-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        simulateTouch: true,
        navigation: {
            nextEl: ".js-products-slider .swiper-button-next",
            prevEl: ".js-products-slider .swiper-button-prev",
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });

    /*** Range slider ***/

    let $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = $range.data('min'),
        max = $range.data('max'),
        from = $range.data('from'),
        to = $range.data('to'),
        currency = '';

    if($range.length > 0) {

        $range.ionRangeSlider({
            skin: "round",
            type: "double",
            min: min,
            max: max,
            from: from,
            to: to,
            hide_min_max: true,
            hide_from_to: true,
            onStart: updateInputs,
            onChange: updateInputs,
            onFinish: updateInputs
        });
        instance = $range.data("ionRangeSlider");

        function updateInputs(data) {
            from = data.from;
            to = data.to;

            $inputFrom.prop("value", from + currency);
            $inputTo.prop("value", to + currency);
        }

        $inputFrom.on("change", function () {
            let val = $(this).prop("value");

            // validate
            if (val < min) {
                val = min;
            } else if (val > to) {
                val = to;
            }

            instance.update({
                from: val
            });

            $(this).prop("value", val + currency);

        });

        $inputTo.on("change", function () {
            let val = $(this).prop("value");

            // validate
            if (val < from) {
                val = from;
            } else if (val > max) {
                val = max;
            }

            instance.update({
                to: val
            });

            $(this).prop("value", val + currency);
        });
    }
    
    /*** End Sliders ***/


    /*** Rating ***/

    $('[data-rating-count]').each(function () {
        let rating = $(this).data('rating-count');
        let stars = $(this).find('.icon');

        for (let i = 0; i < stars.length; i++) {

            if (rating > i) {
                stars[i].classList.remove('disabled');
            }
        }
    });

    /*** End Rating ***/


    /*** Modal ***/

    let idModal = null;

    $('.modal-btn').on("click", function() {

        if ($(this).attr('href')) {
            idModal = $(this).attr('href');
            idModal = idModal.slice(1, idModal.length);
        } else {
            idModal = $(this).attr('data-url');
        }

        $('.modal-wrap').each(function () {

            if (idModal === $(this).attr('id')) {
                $(this).addClass('open');

                body.css('padding-right', (window.innerWidth - document.documentElement.clientWidth));
                body.addClass('noscroll');
            }
        });
    });

    $('.modal-wrap .overflow').css('left', -(window.innerWidth - document.documentElement.clientWidth));

    $('.modal-wrap .overflow, .modal-wrap .close').on("click", function() {
        body.removeClass('noscroll').css('padding-right', 0);
        $('.modal-wrap').removeClass('open');
        idModal = null;
    });

    $('.modal-menu-wrap .close, .modal-menu-overflow').on("click", function() {
        $('.modal-menu-wrap').removeClass('open');
        $('.modal-menu-overflow').removeClass('active');
    });

    /*** End Modal ***/

    
    /*** Custom select ***/

    $('.custom-select').each(function () {
        let classes = $(this).attr('class');
        let template = '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger"><span>' + $(this).attr('placeholder') + '</span></span>';

        template += '<div class="custom-options">';
        $(this).find('option')
            .each(function () {
                let data = $(this).attr("value");
                let classes = $(this).attr('class');
                let dataTab = $(this).attr('data-tab');

                template += '<span class="custom-option ' + classes + '" data-tab="'+ dataTab +'">' + '<span class="text">' + data + '</span>' +'</span>'
            });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).after(template)
        $('.custom-options').mCustomScrollbar();
    });

    $('.custom-option:first-of-type').hover(
        function () {
            $(this).parents('.custom-options').addClass('option-hover')
        },
        function () {
            $(this).parents('.custom-options').removeClass('option-hover')
        }
    );

    $('.custom-select-trigger').on('click', function (event) {
        event.stopPropagation();

        $('.custom-select').not($(this).parent()).removeClass('opened');
        $(this).parents('.custom-select').toggleClass('opened');
    });

    _html.on('click', function () {
        $('.custom-select').removeClass('opened');
    });

    $('.custom-option').on('click', function () {
        let valueSelect = $(this).find('.text').text();
        let template = '';
        let id = $(this).data('tab'),
            content = $('.tabs-body--item[data-tab="'+ id +'"]');

        $('.tabs-body--item.active').removeClass('active');
        content.addClass('active');

        template += '<span>' + valueSelect + '</span>'

        $(this).parents('.custom-select-wrapper').find('select').val(valueSelect);
        $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
        $(this).addClass('selection');
        $(this).parents('.custom-select').removeClass('opened');
        $(this).parents('.custom-select').find('.custom-select-trigger').html(template).addClass('added');
    });

    /*** End Custom select ***/

    $('.fancybox').fancybox();


    /*** Steps rent ***/

    let stepBlock = $('.step');

    $('[data-step-btn]').on('click', function (e) {
        e.preventDefault();

        let _this = $(this);

        stepBlock.removeClass('active');

        stepBlock.each(function () {

            if ($(this).data('step') === _this.data('step-btn')) {
                $(this).addClass('active');
            }
        });
    });

    /*** End Steps rent ***/


    /*** Characteristics ***/

    $('.characteristics-list-wrap .more-btn').on("click", function(e) {
        e.preventDefault();

        $(this).parents('.characteristics-list-wrap').toggleClass('open');
    });

    /*** End characteristics ***/


    /*** Quantity ***/

//Calculate new total when the quantity changes.

    $('.quantity-block').each(function () {
        let input = $(this).find(".quantity-input");
        let step = Number($(this).data('step'));

        $(this).find('.quantity-minus').on('click', function () {
            let value = Number(input.val());
            let newValue = value - step;
            if(newValue < 0) newValue = 0;

            input.val(newValue);
        });

        $(this).find('.quantity-plus').on('click', function () {
            let value = Number(input.val());
            let newValue = value + step;

            input.val(newValue);
        });
    });

    /*** End Quantity ***/
});

