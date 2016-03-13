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
                    if (typeof(imgFirst.error) != "undefined") {

                        $("#popupwin .text").text(imgFirst.error);
                        $("#popupwin").bPopup();

                    } else if (imgFirst.type != "image/jpeg" &&
                               imgFirst.type != "image/png") {

                        $("#popupwin .text").text("Неподдерживаемый формат файла");
                        $("#popupwin").bPopup();

                    } else {
                        // ошибок нет, грузим
                        $('.download-background__text').text(imgFirst.url).appendTo('.download-background__text');
                        $('.loaded__image').attr('src', imgFirst.url);
                        $('#watermark__image_BG').attr('src', imgFirst.url);
                        $('.download-watermark__file').removeAttr('disabled');
                        $("#img_background").val(imgFirst.url);
                    }
                }
            });
        };
        var _fileUploadSecond = function () {
        	$(this).fileupload({
        		dataType: 'json',
        		type: 'POST',
        		done: function (e, data) {
                    var imgSecond = data.result.files[0];
                    if (typeof(imgSecond.error) != "undefined") {

                        $("#popupwin .text").text(imgSecond.error);
                        $("#popupwin").bPopup();

                    } else if (imgSecond.type != "image/jpeg" &&
                               imgSecond.type != "image/png") {

                        $("#popupwin .text").text("Неподдерживаемый формат файла");
                        $("#popupwin").bPopup();

                    } else {
                        // аякс-запрос на масштабирование картинки
                        var imgSecond_url = '',
                            postData = {'bg':$("#img_background").val(),
                                        'sizebg':maxWidthBackground,
                                        'wm':imgSecond.url};
                        console.log(postData);

                        $.ajax({
                            url:'/server/resizewm.php',
                            dataType: 'json',
                            type: 'post',
                            data: postData,
                            success: function (data) {
                                console.log(data);
                                imgSecond_url = data.url;
                                console.log(imgSecond_url);
                                $('download-watermark__text').text(imgSecond_url).appendTo('download-watermark__text');
                                $(".loaded__watermark").attr("src", imgSecond_url);
                                $('.watermark__tiling_image').attr("src", imgSecond_url);
                                $('[disabled]').removeAttr('disabled');
                                $("#img_watermark").val(imgSecond.url);
                                $("#ratio").val(data.ratio);
                                tilingBoxSize();
                            },
                            error:function (jqXHR, textStatus, errorThrown) {
                                $("#popupwin .text").text(jqXHR + "<Br>" + textStatus + "<Br>" + errorThrown);
                                $("#popupwin").bPopup();
                            }
                        });
                    }
                }
            });
        };

return {
    init: init
};

})();

myModule.init();
