var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 75 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    if (i === this.toRotate.length - 1) {
      clearTimeout(this.timeout);
      this.el.innerHTML = '<span class="wrap">' + fullTxt + "</span>";
      return;
    }
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  this.timeout = setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");

    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
  document.body.appendChild(css);
};

//
let elements = document.querySelectorAll(
  ".element, .project-img, .case_headline, .case-img"
);

window.addEventListener("scroll", function () {
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let positionFromTop = element.getBoundingClientRect().top;

    if (positionFromTop - window.innerHeight <= 0) {
      if (element.classList.contains("element")) {
        element.classList.add("tracking-in-contract");
      } else if (element.classList.contains("project-img")) {
        element.classList.add("scale-in-center");
      } else if (element.classList.contains("case_headline")) {
        element.classList.add("animate__animated");
        element.classList.add("animate__fadeInRight");
      } else if (element.classList.contains("case-img")) {
        element.classList.add("animate__animated");
        element.classList.add("animate__fadeIn");
      }
    }
  }
});

$(window)
  .scroll(function () {
    // selectors
    var $window = $(window),
      $body = $("body"),
      $panel = $(".panel");

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + $window.height() / 3;

    $panel.each(function () {
      var $this = $(this);

      // if position is within range of this panel.
      // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
      // Remember we set the scroll to 33% earlier in scroll var.
      if (
        $this.position().top <= scroll &&
        $this.position().top + $this.height() > scroll
      ) {
        // Remove all classes on body with color-
        $body.removeClass(function (index, css) {
          return (css.match(/(^|\s)really-dark-\S+/g) || []).join(" ");
        });

        // Add class of currently active div
        $body.addClass("really-dark-" + $(this).data("color"));
      }
    });
  })
  .scroll();

//img zoom
let imgs = document.getElementsByClassName("case-img"),
  modal = document.getElementById("myModal");
for (let i = 0; i < imgs.length; i++) {
  imgs[i].onclick = function (e) {
    imgZoom(e);
  };
}
function imgZoom(e) {
  modal.style.display = "block";
  let src = e.target.style.backgroundImage.slice(4, -1).replace(/['"]/g, "");
  imgModal.src = src;
}
let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};
