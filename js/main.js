'use strict';
$(document).ready(function () {
    let slider = $(".slider");
    let thumbnail = $(".thumbnail");
    let syncedSecondary = true;

    slider
        .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: false,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200
        })
        .on("changed.owl.carousel", syncPosition);

    thumbnail
        .on("initialized.owl.carousel", function () {
            thumbnail
                .find(".owl-item")
                .eq(0)
                .addClass("current");
        })
        .owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            navText: [
                '<svg viewBox="0 0 477.175 477.175" width="20" height="30"><path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z" fill="#9f9f9f"/></svg>',
                '<svg viewBox="0 0 477.175 477.175" width="20" height="30"><path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" fill="#9f9f9f"/></svg>'
            ],
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 4,
            responsiveRefreshRate: 100
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        let count = el.item.count - 1;
        let current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        thumbnail
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        let onscreen = thumbnail.find(".owl-item.active").length - 1;
        let start = thumbnail
            .find(".owl-item.active")
            .first()
            .index();
        let end = thumbnail
            .find(".owl-item.active")
            .last()
            .index();

        if (current > end) {
            thumbnail.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            thumbnail.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            let number = el.item.index;
            slider.data("owl.carousel").to(number, 100, true);
        }
    }

    thumbnail.on("click", ".owl-item", function (e) {
        e.preventDefault();
        let number = $(this).index();
        slider.data("owl.carousel").to(number, 300, true);
    });
});
