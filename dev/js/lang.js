var langData = {
    'canvascontentheader' : {
        'rus' : 'Генератор водяных знаков',
        'eng' : 'Watermark generator'
    },
    'canvassidebarheader' : {
        'rus' : 'Настройки',
        'eng' : 'Options'
    },
    'settingstitleinputSRC' : {
        'rus' : 'Исходное изображение',
        'eng' : 'Original image'
    },
    'settingstitleinputWM' : {
        'rus' : 'Водяной знак',
        'eng' : 'Watermark'
    },
    'switchsettingstitle' : {
        'rus' : 'Положение',
        'eng' : 'Position'
    },
    'opacity' : {
        'rus' : 'Прозрачность',
        'eng' : 'Opacity'
    },
    'buttonreset' : {
        'rus' : 'Сброс',
        'eng' : 'Reset'
    },
    'buttonsubmit' : {
        'rus' : 'Скачать',
        'eng' : 'Download'
    },
    'containerfoot' : {
        'rus' : 'Это мой сайт, пожалуйста, не копируйте и не воруйте его',
        'eng' : 'This is my site, please, don’t copy and don’t steal this'
    },
    'loadbg' : {
        'rus' : 'Для начала генерации водяного знака, пожалуйста, выберите исходное изображение. Только jpg или png',
        'eng' : 'To start generating the watermark, please select the original image. Only jpg or png'
    },
    'loadwm' : {
        'rus' : 'Пожалуйста, выберите изображение, которое будет являться водяным знаком. Дальше вы сможете выбрать режим наложения, прозрачность, размеры и скачать готовое изображение. Только jpg или png',
        'eng' : 'Please select an image that will be watermarked. Then you can choose the blending mode, opacity, size, and download the final image. Only jpg or png'
    }
};

$(function () {

    function setLang(lng) {
        var keys = $(".lang");
        keys.each(function () {    
            var $this = $(this);
            var key = $this.data('key');
            $this.text(langData[key][lng]);
        });
        $("#language_type").val(lng);
    }

    setLang('rus');

    $(".language__link-rus").on('click',function () {
        setLang('rus');
        return false;
    });

    $(".language__link-eng").on('click',function () {
        setLang('eng');
        return false;
    });

});
