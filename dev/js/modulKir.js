/**
 * Created by Ragnarok on 06.03.2016.
 */
$(function(){

  var singleContent = $('.canvas-content__wrapper').html();
  function GeneralTiling() {

      var image = $('#watermark__image_BG');
      var tiling = $('.watermark__tiling_image');
      var imageURL = $(image).attr('src');
      var tilingURL = $(tiling).attr('src');
      var watermark = $('.canvas-content__wrapper');
      var watermarkWidth = watermark.width();
      var watermarkHeight = watermark.height();
      var watermarkBoxImg = $('.watermark__box-img');
      var tilingBox = $('#watermark__tiling_box');// контейнер для замощения

      /*=================================================*/
      var imageHeightOld = image.height();//высота загруженного фонового изображения
      var imageWidthOld = image.width();//ширина загруженного фонового изображения
      var tilingHeightOld = tiling.height();//высота загруженного вотермарка
      var tilingWidthOld = tiling.width();//ширина загруженного вотермарка
      /*=================================================*/

      imageMax();//подгоняю под размер родителя
      //максимальная ширина и высота фонового изображения
      //делаю это здесть чтобы узнать размер изначального изображения
      function imageMax(){
          image.css({
              'max-width': watermarkWidth + 'px',
              'max-height': watermarkHeight + 'px'
          });
      }
      //центрируем главную фотографию
      function watermarkBoxImgCenter(){
          watermarkBoxImg.css({
              top: ((watermarkHeight - watermarkBoxImg.height()) / 2) + 'px'
          });
      }
      watermarkBoxImgCenter();

      tilingMax();//выравниваю вотермарки и подгоняю под размер родителя
      //выравниваю вотермарки и подгоняю под размер родителя
      function tilingMax(){
          if(tiling.height() > imageHeightOld || tiling.width() > imageWidthOld){
              tiling.css({
                  'max-height': image.height()+'px',
                  'max-width': image.width()+'px'
              });
          }else if (image.width() < imageWidthOld) {
              tiling.width(tiling.width() / (imageWidthOld / image.width()));
          }else if(image.height() < imageHeightOld){
              tiling.height(tiling.height() / (imageHeightOld / image.height()));
          }
      }

      /*=================================================*/
      var imageHeightNew = image.height();//новая высота изображения
      var imageWidthNew = image.width();//новая ширина изображения
      var tilingHeightNew = tiling.height();//новая высота вотермарка
      var tilingWidthNew = tiling.width();//новая ширина вотермарка
      /*=================================================*/

      var quantityTilingX = Math.round(imageWidthNew / tilingWidthNew) + 2;//количество водяных по горизонтали
      var quantityTilingY = Math.round(imageHeightNew / tilingHeightNew) + 2;//количество водяных по вертикали
      var createTilingQuantity = quantityTilingX * quantityTilingY;//количество водяных

      var tilingMaxHeight = tiling.css("max-height");
      var tilingMaxWidth = tiling.css("max-width");

      createTiling(createTilingQuantity);//создаю и вставляю вотермарки
      // параметры картинки замощения:
      // width = ширина,
      // height = высота,
      // number = количество копий
      function createTiling(number){
          var tilingImage = "<img src='"+tilingURL+"' class='watermark__tiling_image' style='max-height:"+tilingMaxHeight+";max-width: "+tilingMaxWidth+";margin-bottom:"+$('#spinnerVert').val()+"px;margin-right:"+$('#spinnerHor').val()+"px;'>";//шаблон
          var arr = new Array(number + 1).join(tilingImage);// создание копий на основе шаблона
          tilingBox.html(arr);// вставляем копии в документ
      }

      tilingBoxSize();
      function tilingBoxSize(){
          tilingBox.innerWidth(quantityTilingX * tilingWidthNew).innerHeight(tilingHeightNew * quantityTilingY);
      }


      dragg();
      function dragg(){
        var waterBoxOffsetLeft = watermarkBoxImg.offset().left - (tilingBox.width() - imageWidthNew);
        var waterBoxOffsetTop = watermarkBoxImg.offset().top - (tilingBox.height() - imageHeightNew);
        var waterBoxOffsetRight = watermarkBoxImg.offset().left;
        var waterBoxOffsetBottom = watermarkBoxImg.offset().top;
        tilingBox.draggable({
          containment:[waterBoxOffsetLeft,waterBoxOffsetTop,waterBoxOffsetRight,waterBoxOffsetBottom],
          stop: function( event, ui ) {
            //console.log(ui);
            $("#spinnerX").val(ui.position.left);
            $("#spinnerY").val(ui.position.top);
          } 
        });
      }



      $('#spinnerHor').spinner({
          spin: function(event, ui) {
            var thisValue = $(this).val();
            tilingBox.width(($('.watermark__tiling_image').width() + 1 + +$(this).val()) * quantityTilingX);
            $('.watermark__tiling_image').css('margin-right', thisValue +'px');
            dragg();
            $('.vertical-line').width(thisValue);
          }
      });

      $('#spinnerVert').spinner({
          spin: function(event, ui) {
            var thisValue = $(this).val();
            tilingBox.height(($('.watermark__tiling_image').height() + 1 + +$(this).val()) * quantityTilingY);
            $('.watermark__tiling_image').css('margin-bottom', thisValue +'px');
            dragg();
            $('.horizontal-line').height(thisValue);
          }
      });
      $('.watermark__tiling_image').on('load',function(){
        GeneralTiling();
      });
}





//создаю свою разметку
function createMarkup() {
  var imageURL = $('.loaded__image').attr('src');
  var tilingURL = $('.loaded__watermark').attr('src');
  var Tpl = '<div class="watermark__box-img">\
          <img src="'+imageURL+'" id="watermark__image_BG" class="watermark__image_BG">\
          <div id="watermark__tiling_box" class="watermark__tiling_box">\
              <img src="'+tilingURL+'" class="watermark__tiling_image" style="margin-bottom:'+$("#spinnerVert").val()+'px;margin-right:"'+$('#spinnerHor').val()+'px";">\
          </div>\
      </div>';
  $('.canvas-content__wrapper').html(Tpl);
}



$('.switch__link').after('<div class="disable"></div>');
$('.switch__link_tile_active, .switch__link_single_active').siblings('.disable').css('z-index', '99999999');

$('.switch__link').on('click', function(e) {
  var target = e.target;
  $(target).siblings('.disable').css('z-index', '99999999');
  $(target).closest('.switch__item').siblings('.switch__item').find('.disable').css('z-index', '-1');

  if($(target).hasClass('switch__link_tile_active') && $('.loaded__image')){
      createMarkup();//меняю разметку
      GeneralTiling();
      //con sole.log($('#spinnerVert').val());
  } else {
    var imageURL = $('#watermark__image_BG').attr('src');
    var tilingURL = $('.watermark__tiling_image').attr('src');

    $('.canvas-content__wrapper').html(singleContent);
    $('.loaded__image').attr('src', imageURL).css({
        top: (($('.canvas__image').height() - $('.loaded__image').height()) / 2) + 'px',
        'position': 'relative'
    });
    $('.loaded__watermark').attr('src', tilingURL);
    imageHandling.onReset();
  }
});











});
