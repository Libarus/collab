var myModule = (function () {

        //Инициализация модуля
        var init = function () {
            _setUpListners ();
        };

        //Прослушка событий
        var _setUpListners = function () {
            $('.download-background__file').on('click', _fileUploadFirst);
            $('.download-watermark__file').on('click', _fileUploadSecond);
        };

        var _fileUploadFirst = function () {
        	$(this).fileupload({
        		dataType: 'json',
        		type: 'POST',
        		done: function (e, data) {
           var imgFirst = data.result.files[0];

            $('.download-background__text').text(imgFirst.url).appendTo('.download-background__text');
            console.log(imgFirst.url);
            $('.loaded__image').attr('src', imgFirst.url);
            $('.download-watermark__file').removeAttr('disabled');
        }
    });
        };
        var _fileUploadSecond = function () {
        	$(this).fileupload({
        		dataType: 'json',
        		type: 'POST',
        		done: function (e, data) {
            var imgSecond = data.result.files[0];

            $('download-watermark__text').text(imgSecond.url).appendTo('download-watermark__text');
            console.log(imgSecond.url);
            $(".loaded__watermark").attr("src", imgSecond.url);
            $('[disabled]').removeAttr('disabled');
        }
    });
        };

return {
    init: init
};

})();

myModule.init();
