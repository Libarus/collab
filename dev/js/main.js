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

$(function() {

  // Слайдер
  $( "#slider" ).slider({
      range: "min",
      min: 1,
      max: 100,
      value:100,
                //Получаем значение и выводим его на странице
                //Обновляем скрытое поле формы, так что можно передать данные с помощью формы
                slide: function( event, ui ) {
                    //$( ".slider-result" ).html( ui.value );
                    $('.slider-result-hidden').val(ui.value);
                    var opacityValue = ui.value * 0.01;
                    $('.loaded__watermark').css('opacity', opacityValue);
                    $('.watermark__tiling_box').css('opacity', opacityValue);
                },
  });
  $('.slider-result-hidden').val(100);

  // Социальные кнопки
  function openSocial(url,name) {
    window.open(url,name,'width=600,height=400,scrollbars=no,menubar=nu,toolbar=no,resizable=no,status=no,location=no');
  }
  $(".social-button__link_vk").on('click',function () {
    openSocial('http://vkontakte.ru/share.php?url=http://wmg.1btn.ru/','vk');
  });
  $(".social-button__link_tw").on('click',function () {
    openSocial('http://twitter.com/share?url=http://wmg.1btn.ru/','tw');
  });
  $(".social-button__link_fb").on('click',function () {
    openSocial('http://www.facebook.com/share.php?p[url]=http://wmg.1btn.ru/','fb');
  });

  $("#popupwin .close").on('click',function () {
    $("#popupwin").bPopup().close();
  })

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
                    imageHandling.onReset();
                    $(".disable__watermark").hide();
                    $(".disable__interface").addClass("lang");
                    $(".disable__interface").text(langData['loadwm'][$("#language_type").val()]);
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
                $('.loaded__watermark').load(function() {
                  $(".disable__interface").hide();
                });
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
      // включаем режим замощения
      event.preventDefault();
      if (!switchTile.hasClass(switchTileActive)) {
          switchTile.addClass(switchTileActive);
          switchSingle.removeClass(switchSingleActive);
      }
      $("#switch_item_type").val("tile");
      setTimeout(function(){
        $('.watermark__tiling_box').css('opacity', $('.slider-result-hidden').val()*0.01);
      },10);
  });
  switchSingle.on('click', function(event) {
      // включаем режим 9 зон
      event.preventDefault();
      if (!switchSingle.hasClass(switchSingleActive)) {
          switchSingle.addClass(switchSingleActive);
          switchTile.removeClass(switchTileActive);
      }
      $("#switch_item_type").val("single");
      setTimeout(function(){
        $('.loaded__watermark').css('opacity', $('.slider-result-hidden').val()*0.01);
        imageHandling.setDrag();
      },100);
  });

