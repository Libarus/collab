// Стрелочки для инпутов
$(function() {
  $( "#spinnerX" ).spinner({
    min:0
  });
  $( "#spinnerY" ).spinner({
    min:0
  });
  $( "#spinnerVert" ).spinner({
    min:0
  });
  $( "#spinnerHor" ).spinner({
    min:0
  });
});
// Слайдер
$(function() {
  $( "#slider" ).slider({
      range: "min",
      min: 1,
      max: 100,
      value:50
  });
});
// Код для скрытых инпутов типа файл, и текстовых инпутов
 if($('.download-background')){
    _chooseFileBackground()
 }
  if($('.download-watermark')){
    _chooseFileWatermark()
 }
 function _chooseFileBackground(){

            $('.download-background').click(function(){
                $('.download-background__file').click();
                return(false);
            });
            $('.download-background__file').on('change',function(){
                //console.log($('.file-upload').val())
                $('.download-background__text').val($('.download-background__file').val());
                var text= $('.download-background__text').val();
                text = text.replace("C:\\fakepath\\", "");
                $('.download-background__text').val(text);
                $('.loaded__image').load(function() {
                    $('.loaded__image').position({
                          of: $('.canvas-content__wrapper'),
                          my: 'center center',
                          at: 'center center',
                      });
                });
            }).change();// .change() в конце для того чтобы событие сработало при обновлении страницы

 };
  function _chooseFileWatermark(){

            $('.download-watermark').click(function(){
                $('.download-watermark__file').click();
                return(false);
            });
            $('.download-watermark__file').on('change',function(){
                // console.log($('.file-upload').val())
                $('.download-watermark__text').val($('.download-watermark__file').val());
                var text= $('.download-watermark__text').val();
                text = text.replace("C:\\fakepath\\", "");
                $('.download-watermark__text').val(text);
                imageHandling.imageLoad();
            }).change();// .change() в конце для того чтобы событие сработало при обновлении страницы

 };

// Переключатель
 $('.switch__link').on('click', _changeView);
 function _changeView(e){
    e.preventDefault();
    _change($(this));
 }
 previosClass = '';
function _change($this){

  item = $this.closest('.switch__link'),
  itemClass = item.attr('class'),
  view = item.attr("data-view"),
  views = $('#views'),
  prefix = 'position_',
  classOfViewState = prefix + view; 
  if (previosClass == '') {
    previosClass = views.attr('class');
  } views.attr('class', previosClass+ ' ' +classOfViewState);
} 

  switchTile = $('.switch__link_tile');
  switchSingle = $('.switch__link_single');
  switchTileActive = 'switch__link_tile_active';
  switchSingleActive = 'switch__link_single_active';

  switchTile.on('click', function(event) {
    event.preventDefault();
    if (!switchTile.hasClass(switchTileActive)) {
      switchTile.addClass(switchTileActive);
      switchSingle.removeClass(switchSingleActive);
    }
  });
  switchSingle.on('click', function(event) {
    event.preventDefault();
    if (!switchSingle.hasClass(switchSingleActive)) {
      switchSingle.addClass(switchSingleActive);
      switchTile.removeClass(switchTileActive);
    }
  });