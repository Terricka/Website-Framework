$("#menu-button").click(function() {
  $("#menu-panel").toggleClass("active-menu");
});

var bodyWrap = $('body');
var slides = document.getElementsByClassName('slide');
var slideShow = $('#slide-show');
var thumbnails = $("#thumbnails");
var screenWidth = $(window).width();
console.log(screenWidth);

if (slides) {

  for (var i = 0; i < slides.length; i++) {
    slides[i].id = "slide-" + i;
    var thumb = document.createElement("li");
    thumb.id = "thumb-" + i;
    thumb.className = "thumbnails";
    $(thumb).text("thumb-" + i);


    thumbnails.append(thumb);
  }

  var slidesWidth = (slides.length * 100) + 2;
  slidesWidth = slidesWidth + "vw";
  $(slideShow).css("width", slidesWidth);

}


$(document).ready(function() {
  $(window).scroll(function() {
    if ($('body').scrollTop() < 5) {
      $("footer").css("opacity", "0");
      $("footer").css("-webkit-opacity", "0");
      console.log("counter");
    } else {
      $("footer").css("opacity", "1");
      $("footer").css("-webkit-opacity", "1");
    }
  });
});

if (screen.width > 768) {
  var windowWidth = $(window).width();
  $('#slide-show-container').css("width", windowWidth);

  if (slides.length > 1) {
    var nextButton = document.createElement('span');
    nextButton.id = "next-slide";
    nextButton.className = "slide-control";
    $(nextButton).text("next");
    slideShow.append(nextButton);

    var prevButton = document.createElement('span');
    prevButton.id = "prev-slide";
    prevButton.className = "slide-control";
    $(prevButton).text("prev");
    slideShow.append(prevButton);
  }


  var counter = 0;
  nextButton.addEventListener("click", function() {
    counter++;
    var currentSlide = $("#slide-" + counter);
    $(prevButton).css("display", "block");

    var pos = getPosition(slides[counter]);
    //console.log(pos);
    var leftPos = pos.x;

    $("#slide-show-container").stop(false, true).animate({
      scrollLeft: leftPos
    }, 800);

    return false;

  });

  if (counter > 0) {
    $(prevButton).css("display", "block");
  } else {
    $(prevButton).css("display", "none");
  }


  prevButton.addEventListener("click", function() {
    counter--;
    console.log(counter);
    if (counter === 0) {
      $(prevButton).css("display", "none");
    }

    var pos = getPosition(slides[counter]);
    console.log(pos);
    var leftPos = pos.x;

    $("#slide-show-container").stop(false, true).animate({
      scrollLeft: leftPos
    }, 800);

    return false;
  });

  $('.thumbnails').click(function() {
    var id = $(this).attr('id');
    id = parseInt(id.substring(6));
    //console.log(id);
    var pos = getPosition(slides[id]);
    //console.log(pos);
    var leftPos = pos.x;

    $("#slide-show-container").stop(false, true).animate({
      scrollLeft: leftPos
    }, 800);

    return false;

  });

}

console.log(slides[slides.length - 1]);

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };

}
