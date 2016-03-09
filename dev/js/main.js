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
    $( "#slider" ).slider();
  });
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
 if($('.download-background')){
    _chooseFileBackground()
 }
  if($('.download-watermark ')){
    _chooseFileWatermark()
 }