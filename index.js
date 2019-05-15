(function($) {
  "use strict";

  const navbarHeight = $(".navbar").outerHeight();

  // Elevator - Scroll back to top utility JS
  // ========================================

  // append necessary class
  // should have already contain wrapper on a page.
  // <div class="elevator-wrapper"></div>
  $(".elevator-wrapper").append(
    '<div class="elevator"><img src="img/elevator.svg" class="arrow-up" alt="elevator"/></div>'
  );

  const elevator = $(".elevator");

  // smooth scroll to top
  elevator.on("click", function(event) {
    event.preventDefault();
    $("body,html").animate(
      {
        scrollTop: 0
      },
      700
    );
  });

  function onScroll() {
    const isBottom =
      $(window).scrollTop() + $(window).height() == $(document).height();

    if (!isBottom) {
      const currentScrollPos = $(document).scrollTop() + navbarHeight;
      $(".navbar ul li a#contacts").removeClass("active");

      $(".navbar ul li a").each(function(i) {
        const curLink = $(this);
        const refElem = $(curLink.attr("href"));

        if (
          refElem.position().top <= currentScrollPos &&
          refElem.position().top + refElem.height() > currentScrollPos
        ) {
          $(".navbar ul li a").removeClass("active");
          curLink.addClass("active");
        } else {
          curLink.removeClass("active");
        }
      });
    } else {
      /**
       * hard dengarous code
       *
       * быстрый фикс бага с отсутствием подсветки активной ссылки для секции контактов
       * в данном случае подсветка контаков выполняется по достижению низа страницы
       * если контакты будут не последней секцией, следует убрать эту логику
       */
      $(".navbar ul li a").removeClass("active");
      $(".navbar ul li a[href='#contacts'").addClass("active");
    }

    $(this).scrollTop() > 300
      ? elevator.addClass("elevator-is-visible")
      : elevator.removeClass("elevator-is-visible");
  }

  function toggleNavigation() {
    $(".navbar").toggleClass("is-opened");
    $(".navbar-toggler").toggleClass("open");
  }

  function init() {
    const owl = $(".owl-carousel");

    owl.owlCarousel({
      items: 1,
      center: true,
      nav: true,
      loop: true,
      mouseDrag: false,
      autoHeight: true,
      navText: [
        '<img class="arrow arrow-left" src="img/strelka.svg"/>',
        '<img class="arrow arrow-right" src="img/strelka.svg"/>'
      ],
      navClass: ["owl-prev", "owl-next"],
      responsive: {
        0: {
          nav: false
        },
        992: {
          nav: true
        }
      }
    });

    $('a[href^="#"]').click(function() {
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - navbarHeight + 2
        },
        850,
        "easeInOutExpo"
      );

      toggleNavigation();

      return false;
    });

    $(".navbar-toggler").click(toggleNavigation);

    $(".circle__progress")
      .appear({ force_process: true })
      .on("appear", function() {
        const circle = $(this);

        if (!circle.data("inited")) {
          circle.circleProgress({
            value: $(this).attr("data-value"),
            size: 225,
            startAngle: -Math.PI / 2,
            fill: { color: "#3B110E" },
            emptyFill: "#fff",
            lineCap: "round",
            animation: { duration: 2300, easing: "circleProgressEasing" }
          });

          circle.data("inited", true);
        }
      })
      .on("circle-animation-progress", function(event, progress, stepValue) {
        $(this)
          .find("strong")
          .text(Math.round(stepValue * 100) + "%");
      });

    $(window)
      .scroll(onScroll)
      .scroll();
  }

  $(document).ready(init);
})(jQuery);
