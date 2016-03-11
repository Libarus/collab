;$(function () {

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
        }
    };

    function setLang(lng) {
        keys.each(function () {    
            var $this = $(this);
            var key = $this.data('key');
            $this.text(langData[key][lng]);
        })
    }

    var keys = $(".lang");
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
