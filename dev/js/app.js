/**
 * Модуль imageHandling
 * Загружает картинку и вотермарк, обеспечивает перемещение вотермарка с помощью
 * 9-позиционного блока кнопок и инпутов с координатами "х" и "у".
 * Используется плагин Jquery UI https://jqueryui.com
 * Методы: 
 * imageHandling.imageLoad(imageLink, watermarkLink) - размещает 2 картинки на своих местах
 * imageHandling.onReset() - очищает все инпуты и возвращает вотермарк в исходное положение
 */
(function() {
    var imageHandling = {},
        relativePos;
  
  publicMethod();
  attachEvents();
  
  function attachEvents() {
    /**
     * @private
     * Следит за событиями:
     * 1) Нажатие на кнопки 9-позиционного блока - происходит перемещение на позицию
     * 2) Изменение значений числовых инпутов, с помощью стелочек или вручную - 
     * происходит изменение положения вотермарка.
     * 3) Нажатие на кнопку "сброс" - вотермарк и 9-поз. блок возвращаются в начальное положение,
     * значения инпутов обнуляются.
     */
    $('.position__link').on('click', onChangeCorner);
    $('#spinnerY, #spinnerX').on('spinstop spinchange spin', onChangeSpinner);
    $('.button__reset').on('click', imageHandling.onReset);
  }

  function changeInputs(posObject) {
    /**
     * @private
     * @param {object} - Положение вотермарка, поля - left и top
     * Изменяет значения цифровых инпутов, подставляя переданные значения
     * 
     */
    $('#spinnerX').val(Math.round(posObject.left));
    $('#spinnerY').val(Math.round(posObject.top));
  }

  function onChangeCorner(e) {
    /**
     * @private
     * Изменяет положение вотермарка при нажатии на кнопки 9-поз. блока
     * Вызывает changeInputs
     */
    var $this = $(this),
        markId = $this.attr('id'),
        markPos = markId.split('-');

      e.preventDefault();

      $('.position__link').removeClass('position__link_active');
      $this.addClass('position__link_active');

      $('.loaded__watermark').position({
          of: $('.loaded__image'),
          my: markPos[0] + ' ' + markPos[1],
          at: markPos[0] + ' ' + markPos[1],
          using: function(css, calc) {
              $(this).stop(true).animate(css, 0, "linear");

      			  css.top = css.top - relativePos.top;
              css.left = css.left - relativePos.left;

              changeInputs(css);
          }
      });
  }

  function onChangeSpinner(e, ui) {
    /**
     * @private
     * @param {event} - Событие изменения значения цифрового поля
     * @param {object} - Различная информация о состоянии цифрового поля
     * Срабатывает при изменении значения цифрового поля.
     * Изменяет положение вотермарка в соответствии с новыми значениями.
     */
    var $this = $(this),
        value = $this.spinner('value'),
        id = $this.attr('id'),
        leftValue,
        topValue;

    if (~id.indexOf('X')) {
      topValue = $('#spinnerY').val();
      leftValue = value;
    } else {
      leftValue = $('#spinnerX').val();
      topValue = value;
    }

    $('.loaded__watermark').position({
        of: $('.loaded__image'),
        my: 'left top',
        at: 'left+' + leftValue + ' top+' + topValue,
        using: function(css, calc) {
            $(this).stop(true).animate(css, 0, "linear");
        }
    });
  }

  function changePosition(posObject) {
    /**
     * @private
     * @param {object} - Положение вотермарка, поля - left и top
     * Измениет положение вотермарка в соотествии с переданными значениями.
     * Вызывает changeInputs()
     */
    $('.loaded__watermark').position({
        of: $('.loaded__image'),
        my: 'left top',
        at: 'left+' + posObject.left + ' top+' + posObject.top,
        using: function(css, calc) {
            $(this).stop(true).animate(css, 0, "linear");

      			css.top = css.top - relativePos.top;
            css.left = css.left - relativePos.left;

            changeInputs(css);
        }
    });
  }
 
  function imageDrag() {
    /**
     * @private
     * Инициализирует метод, обеспечивающий возможность перетаскивания вотермарка.
     * Вызывает changeInputs()
     */
    $('.loaded__watermark').draggable({ 
        containment: ".loaded__image",
        drag: function( event, ui ) {

			      //ui.position.top = ui.position.top - relativePos.top;
            //ui.position.left = ui.position.left - relativePos.left;
            changeInputs(ui.position);
        } 
    });
  }

  function initSpinner() {
    /**
     * @private
     * Инициализирует цифровые инпуты. Задает мин и макс для инпутов,
     * реализует защиту от ввода некорректных значений.
     */
    var cMaxX = $('.loaded__image').width(),
        cMaxY = $('.loaded__image').height(),
        maxX = cMaxX - $('.loaded__watermark').width(),
        maxY = cMaxY - $('.loaded__watermark').height(),
        max = [maxX, maxY],
        ids = ['#spinnerX', '#spinnerY'];

    //con sole.log(cMaxX);
    //con sole.log(cMaxY);
    //con sole.log(max);

    ids.forEach(function (item, i) {
      $(item).spinner({
      min: 0,
      max: max[i]
    // Этот кусок я вам честно признаюсь что содрала отсюда 
    // http://stackoverflow.com/questions/16791940/jquery-ui-spinner-able-to-exceed-max-by-keyboard
    }).on('input', function () {
        if ($(this).data('onInputPrevented')) return;
        var val = this.value,
            $this = $(this),
            max = $this.spinner('option', 'max'),
            min = $this.spinner('option', 'min');
        // We want only number, no alpha. 
        // We set it to previous default value.         
        if (!val.match(/^[+-]?[\d]{0,}$/)) val = $(this).data('defaultValue');
        this.value = val > max ? max : val < min ? min : val;

        }).on('keydown', function (e) {
          // we set default value for spinner.
          if (!$(this).data('defaultValue')) $(this).data('defaultValue', this.value);
          // To handle backspace
          $(this).data('onInputPrevented', e.which === 8 ? true : false);
          });
    })
    changeInputs({top: 0, left: 0});
  }

  
  function publicMethod() {
    imageHandling = {

        imageLoad: function() {
          /**
           * @public
           * 
           * Определяет положение вотермарка относительно большой картинки (переменная relativePos)
           * Вызывает imageGrag(), initSpinner() 
           */
              $('.loaded__watermark').load(function() {
              
              imageHandling.onReset();

              imageDrag();
              initSpinner();
              });
        },

        onReset: function() {
          /**
         * @public
         * Вызывается при нажатии на кнопку "сброс"
         * Возвращает вотермарк на 0, делает активной первую кнопку 9-поз блока.
         * Вызывает changePosition()
         */
          var pos = {
            left: saveSpinnerX,
            top: saveSpinnerY
          };
          if ($('.loaded__watermark').attr('src')) {
            relativePos = $('.loaded__image').position();
            changePosition(pos);
            $('.position__link').removeClass('position__link_active');
            $('#left-top').addClass('position__link_active');
            initSpinner();
            $("#spinnerX").val(saveSpinnerX);
            $("#spinnerY").val(saveSpinnerY);
          }
        },

        setDrag : function () {
          imageDrag();
        }

    };
  }
  
  return window.imageHandling = imageHandling;
}());



//# sourceMappingURL=app.js.map
