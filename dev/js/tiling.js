;(function($){

    var me,
        isInit = false,
        wmSrc = "",
        width = 0, // ширина фона
        height = 0, // высота фона
        widthWM = 0,
        heightWM = 0,
        allWidth = 0,
        allHeight = 0,
        countWidth = 0,
        countHeight = 0,
        shiftY = 0,
        shiftX = 0;

    publicInterface();

    function _reset() {
        $(".position__list .vertical-line").width(0);
        $(".position__list .horizontal-line").height(0);
    }

    function _initDrag () {
        var x1 = 0 + shiftX,
            y1 = 0 + shiftY,
            x2 = 100 + shiftX,
            y2 = 100 + shiftY;
        $(".loaded__watermark-tilingblock").draggable({
            drag: function( event, ui ) {
                var tt = $(".canvas-content__header"),
                    sX = $("#spinnerHor").val();
                tt.text(ui.position.top + " x " + ui.position.left);
                if (ui.position.left > sX) ui.position.left = sX;
            } 
        });
    }

    function _crateTiling() {
        console.log('_crateTiling');
        width = $(".loaded__image-tiling").width();
        height = $(".loaded__image-tiling").height();
        $(".canvas__watermark-tiling").width(width);
        $(".canvas__watermark-tiling").height(height);
        $(".canvas__watermark-tiling").css("position","absolute");
        $(".canvas__watermark-tiling").css("top",$(".loaded__image-tiling").css("top"));

        wmSrc = $(".loaded__watermark-tiling").attr('src'),
        widthWM = $(".loaded__watermark-tiling").width(),
        heightWM = $(".loaded__watermark-tiling").height(),
        countWidth = Math.round(width / widthWM) + 2,
        countHeight = Math.round(height / heightWM) + 2;

        shiftX = Math.round($(".loaded__image-tiling").css("left").replace("px",""));
        shiftY = Math.round($(".loaded__image-tiling").css("top").replace("px",""));
        console.log(shiftX + " x " + shiftY);
        /*
        console.log('width: ' + width);
        console.log('height: ' + height);
        console.log('widthWM: ' + widthWM);
        console.log('heightWM: ' + heightWM);
        console.log('countWidth: ' + countWidth);
        console.log('countHeight: ' + countHeight);
        */
        
        for(i = 0; i < countWidth * countHeight; i++) {
            $(".loaded__watermark-tilingblock").append('<img src="' + wmSrc + '" class="tileImg">');
        }

        $(".loaded__watermark-tilingblock").width(countWidth * widthWM);
        $(".loaded__watermark-tilingblock").height(countHeight * heightWM);

        $(".loaded__watermark-tiling").hide();
        _reset();
        _initSpinner();
        _initDrag();
    }

    function horSpinChage(value) {
        console.log(value);
        $(".loaded__watermark-tilingblock").width(countWidth * widthWM + countWidth * parseInt(value) + parseInt(value));
        $(".tileImg").css("margin-right",value + "px");
        $('.vertical-line').width(value);
    }

    function verSpinChage(value) {
        $(".loaded__watermark-tilingblock").height(countHeight * heightWM + countHeight * parseInt(value) + parseInt(value));
        $(".tileImg").css("margin-bottom",value + "px");
        $('.horizontal-line').height(value);
    }

    function _initSpinner() {
        var minmin = 0,
            maxmax = 100;
        $('#spinnerHor').spinner({
            min: minmin,
            max: maxmax,
            spin: function(event, ui) {
                var thisValue = $(this).val();
                horSpinChage(thisValue);
            }
        }).on('input', function () {
            var val = this.value;
            if (!val.match(/^[+-]?[\d]{0,}$/)) val = 0;
            this.value = val > maxmax ? maxmax : val < minmin ? minmin : val;
            horSpinChage(this.value);
        });

        $('#spinnerVert').spinner({
            min: minmin,
            max: maxmax,
            spin: function(event, ui) {
                var thisValue = $(this).val();
                verSpinChage(thisValue);
            }
        }).on('input', function () {
            var val = this.value;
            if (!val.match(/^[+-]?[\d]{0,}$/)) val = 0;
            this.value = val > maxmax ? maxmax : val < minmin ? minmin : val;
            verSpinChage(this.value);
        });
    }

    function publicInterface () {
        return me = {
            init : function () {
                if (!isInit) {
                    
                    $(".loaded__image-tiling").attr("src",$(".loaded__image").attr("src"));
                    $(".loaded__watermark-tiling").attr("src",$(".loaded__watermark").attr("src"));
                    $(".loaded__image-tiling").load(function () {
                        $(".loaded__image-tiling").position({
                            of: $('.canvas__image-tiling'),
                            my: 'center center',
                            at: 'center center'
                        });
                    });
                    wmImg = $(".loaded__watermark").attr("src");
                    setTimeout(_crateTiling,100);
                    isInit = true;
                } else {
                    console.log('Tiling');
                }
            }
        }
    }    

    window.tiling = me;

})(jQuery);