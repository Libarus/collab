/**
 * Created by Ragnarok on 06.03.2016.
 */
$(function(){
  var singleContent = $('.canvas-content__wrapper').html();
function GeneralTiling() {

      //создаю свою разметку
      function createMarkup() {
        var imageURL = $('.loaded__image').attr('src');
        var tilingURL = $('.loaded__watermark').attr('src');
        var Tpl = '<div class="watermark__box-img">\
                <img src="'+imageURL+'" id="watermark__image_BG" class="watermark__image_BG">\
                <div id="watermark__tiling_box" class="watermark__tiling_box">\
                    <img src="'+tilingURL+'" class="watermark__tiling_image">\
                </div>\
            </div>';
        $('.canvas-content__wrapper').html(Tpl);
      }
      if($('.loaded__image')){
        createMarkup();//меняю разметку  
      }



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
      tilingMax();//выравниваю вотермарки и подгоняю под размер родителя


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
      tilingBoxSize();

      dragg();


      // параметры картинки замощения:
      // width = ширина,
      // height = высота,
      // number = количество копий
      function createTiling(number){
          var tilingImage = "<img src='"+tilingURL+"' class='watermark__tiling_image' style='max-height:"+tilingMaxHeight+";max-width: "+tilingMaxWidth+";'>";//шаблон
          var arr = new Array(number + 1).join(tilingImage);// создание копий на основе шаблона
          tilingBox.html(arr);// вставляем копии в документ
      }

      function dragg(){
        var waterBoxOffsetLeft = watermarkBoxImg.offset().left - (tilingBox.width() - imageWidthNew);
        var waterBoxOffsetTop = watermarkBoxImg.offset().top - (tilingBox.height() - imageHeightNew);
        var waterBoxOffsetRight = watermarkBoxImg.offset().left;
        var waterBoxOffsetBottom = watermarkBoxImg.offset().top;
        tilingBox.draggable({
          containment:[waterBoxOffsetLeft,waterBoxOffsetTop,waterBoxOffsetRight,waterBoxOffsetBottom]
        });

      }

      //максимальная ширина и высота фонового изображения
      //делаю это здесть чтобы узнать размер изначального изображения
      function imageMax(){
          image.css({
              'max-width': watermarkWidth + 'px',
              'max-height': watermarkHeight + 'px'
          });
          watermarkBoxImgCenter();
      }

      //центрируем главную фотографию
      function watermarkBoxImgCenter(){
          watermarkBoxImg.css({
              top: ((watermarkHeight - watermarkBoxImg.height()) / 2) + 'px'
          });
      }

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

      function tilingBoxSize(){
          tilingBox.innerWidth(quantityTilingX * tilingWidthNew).innerHeight(tilingHeightNew * quantityTilingY);
      }

      $('#spinnerHor').spinner({
          spin: function(event, ui) {
            var thisValue = $(this).val();
            tiling = $('.watermark__tiling_image');
            tilingBox = $('#watermark__tiling_box');
            tiling.css('margin-right', thisValue +'px');
            dragg();
            tilingBox.css({
                'width': tilingBox.width() + 'px'
            });
            $('.vertical-line').width(thisValue);
          }
      });

      $('#spinnerVert').spinner({
          spin: function(event, ui) {
            var thisValue = $(this).val();
            tiling = $('.watermark__tiling_image');
            tilingBox = $('#watermark__tiling_box');
            tiling.css('margin-bottom', thisValue +'px');
            dragg();
            tilingBox.css({
                'height': tilingBox.height() + 'px'
            });
            $('.horizontal-line').height(thisValue);
          }
      });





}



$('.switch__list').on('click',function(e) {
  var target = e.target;
  console.log(target);
  if($(target).hasClass('switch__link_tile_active')){
      GeneralTiling();
      console.log(target);
  } else {
  }
});











});
