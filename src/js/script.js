import $ from 'jquery';
import ScrollBooster from 'scrollbooster';

function setLocationArea(that, target){
  let t = $(that);
  let g = t.find(target);
  let radius = t.attr('rad')
  g.css({
    width: radius,
    height: radius,
  });
}
function setLocationPosition(that){
  let t = $(that);
  let x = t.attr('posX');
  let y = t.attr('posY');
  t.css({
    top: ''+y+'px',
    left: ''+x+'px',
  });
}

function moveSrc(that, target, rel) {
  let t = $(that);
  let g = $(target);
  g.find('[rel="'+rel+'"]').attr('src', t.find('[rel="'+rel+'"]').attr('src'));
}
function moveInnerElements(that, target, rel) {
  let t = $(that);
  let g = $(target);
  t.find('[rel="'+rel+'"] *').clone().appendTo(g.find('[rel="'+rel+'"]').html(''))
}
function moveText(that, target, rel) {
  let t = $(that);
  let g = $(target);
  g.find('[rel="'+rel+'"]').text('').text(t.find('[rel="'+rel+'"] *').text())
}

function grabMap(container, inner, img){
    var viewport = document.querySelector(container);
    var content = document.querySelector(inner);
    var image = document.querySelector(img);
    
    var sb = new ScrollBooster({
      viewport,
      content,
      scrollMode: 'native',
      emulateScroll: true
    });
    
    image.addEventListener('load', () => {
      // set viewport position to the center of an image
      var offsetX = image.scrollWidth - viewport.offsetWidth;
      var offsetY = image.scrollHeight - viewport.offsetHeight;
      sb.setPosition({
        x: offsetX / 2,
        y: offsetY / 2
      });
    });
}



$(document).ready(function(){

  grabMap('.map__container', '.map__map', '.map__map img');

  $('.location').click(function(){
    moveSrc(this, '.modal', 'locImg')
    moveInnerElements(this, '.modal', 'locDesc')
    moveText(this, '.modal', 'locName')
  })

  $('.location').each(function(){
    setLocationArea(this, '.location__area');
    setLocationPosition(this);
  })


    $('.map__location').fancybox({
        touch: false
    });

});