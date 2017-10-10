( function(){

    $(function(){

        $('.book').each( function() {
            new Book( $(this) );
        } );

        $('.inscription').each( function() {
            new Inscription( $(this) );
        } );

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.photos').each( function() {
            new Photos( $(this) );
        } );

        $('.page-title__triangle').each( function() {
            new DrawTriangle( $(this) );
        } );

        $('.quote__triangle').each( function() {
            new QuoteTriangle( $(this) );
        } );

        $('.words').each( function() {
            new Words( $(this) );
        } );

        $('.step').each( function() {
            new Step( $(this) );
        } );

    });

    var Inscription = function(obj) {

        //private properties
        var _obj = obj,
            _slider = _obj.find('.swiper-container'),
            _steps = _obj.find('.swiper-pagination'),
            _items = _obj.find('.swiper-slide'),
            _next = _obj.find('.inscription__next'),
            _prev = _obj.find('.inscription__prev'),
            _window = $(window),
            _swiper;

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'submit': function () {

                        console.log('submit');

                        return false;
                    }
                });

                _window.on({
                    'resize': function () {

                        if ( _obj.parent('.popup__content') ) {
                            _checkPopupWidth();
                            _swiper.update();
                        } else {
                            _swiper.update();
                        }

                        var stepWidth = 100/_items.length + '%';
                        _items.each(function () {
                            _steps.append('<div class="steps" style="width: ' + stepWidth + '"></div>');
                        });
                    }
                });

                _next.on({
                    'click': function () {

                        console.log(_obj.serializeArray());

                        return false;
                    }
                });

            },
            _checkPopupWidth = function() {
                var curWidth = $(window).width() - 20;

                if ( curWidth > 589 ) {
                    curWidth = 589;
                }
                _obj.parent('.popup__content').css({ 'width': curWidth + 'px' });
            },
            _initSlider = function() {
                _swiper = new Swiper(_slider, {
                    pagination: _steps,
                    nextButton: _next,
                    prevButton: _prev,
                    paginationType: 'progress',
                    spaceBetween: 30,
                    effect: 'fade',
                    touchRatio: 0,
                    paginationClickable: true
                });

                var stepWidth = 100/_items.length + '%';
                _items.each(function () {
                    _steps.append('<div class="steps" style="width: ' + stepWidth + '"></div>');
                });
            },
            _init = function() {
                _addEvents();

                if ( _obj.parent('.popup__content') ) {
                    _checkPopupWidth();
                    _initSlider();
                } else {
                    _initSlider();
                }
            };

        //public properties

        //public methods

        _init();
    };

    var Book = function(obj) {

        //private properties
        var _obj = obj,
            _slider = _obj.find('.swiper-container'),
            _steps = _obj.find('.swiper-pagination'),
            _items = _obj.find('.swiper-slide'),
            _next = _obj.find('.book__next'),
            _prev = _obj.find('.book__prev'),
            _window = $(window),
            _swiper,
            _fields = _obj.find( ':required' ),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'submit': function () {

                        console.log('submit');
                        _sendRequest();
                        return false;
                    }
                });

                _window.on({
                    'resize': function () {

                        if ( _obj.parent('.popup__content') ) {
                            _checkPopupWidth();
                            _swiper.update();
                        } else {
                            _swiper.update();
                        }

                        var stepWidth = 100/_items.length + '%';
                        _items.each(function () {
                            _steps.append('<div class="steps" style="width: ' + stepWidth + '"></div>');
                        });
                    }
                });

                _next.on({
                    'click': function () {

                        if ($(this).hasClass('submit')) {
                            console.log('this is submit button');
                            _obj.trigger('submit');
                        }
                        var activeSlide = $(this).parents('.swiper-slide-active');

                        if ( _checkStep( activeSlide ) ) {

                            _swiper.slideNext();
                        }
                        return false;
                    }
                });

                _fields.on({
                    'focus': function () {
                        $( this ).removeClass( 'not-touched' );
                        $( this ).removeClass( 'not-valid' );
                    }
                });

            },
            _checkPopupWidth = function() {
                var curWidth = $(window).width() - 20;

                if ( curWidth > 589 ) {
                    curWidth = 589;
                }
                _obj.parent('.popup__content').css({ 'width': curWidth + 'px' });
            },
            _checkStep = function (curStep) {

                var requaredInputs = curStep.find( ':required' ),
                    notValid = false;

                requaredInputs.each(function () {
                    var curElem = $(this),
                        curValue = curElem.val();

                    if ( curValue == '' ) {
                        curElem.addClass('not-valid');
                        notValid = true;
                    } else {
                        curElem.removeClass('not-valid');
                    }
                });

                if ( notValid ) {
                    return false;
                } else  {
                    return true;
                }
            },
            _sendRequest = function () {

            console.log(_obj.serialize());
                _request.abort();
                _request = $.ajax({
                    url: _obj.data('action'),
                    data: {
                        address: _obj.serialize()
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'get',
                    success: function (data) {

                        console.log('success');
                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != "abort") {
                            console.error(XMLHttpRequest);
                        }
                    }
                });

                currentItem.addClass('loading');

                // $.ajax({
                //     url: $('body').data('action'),
                //     dataType: 'html',
                //     timeout: 20000,
                //     type: 'get',
                //     data: {
                //         action: 'test',
                //         page: currentItem.data('page')
                //     },
                //     success: function (data) {
                //
                //         currentItem.removeClass('loading');
                //
                //         currentItem.html(data);
                //
                //         updateInit();
                //
                //     },
                //     error: function (XMLHttpRequest) {
                //         if (XMLHttpRequest.statusText != "abort") {
                //             console.log(XMLHttpRequest);
                //         }
                //     }
                // });
            },
            _initSlider = function() {
                _swiper = new Swiper(_slider, {
                    pagination: _steps,
                    // nextButton: _next,
                    prevButton: _prev,
                    paginationType: 'progress',
                    spaceBetween: 30,
                    effect: 'fade',
                    touchRatio: 0,
                    paginationClickable: true
                });

                var stepWidth = 100/_items.length + '%';
                _items.each(function () {
                    _steps.append('<div class="steps" style="width: ' + stepWidth + '"></div>');
                });
            },
            _init = function() {
                _addEvents();

                if ( _obj.parent('.popup__content') ) {
                    _checkPopupWidth();
                    _initSlider();
                } else {
                    _initSlider();
                }
            };

        //public properties

        //public methods

        _init();
    };

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = $( '.menu-btn' ),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'open' ) ) {
                            _btn.addClass('active');
                            _showMenu();
                        } else {
                            _btn.removeClass('active');
                            _hideMenu();
                        }
                    }
                });

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _showMenu = function() {
                _obj.addClass( 'open' );
                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
            },
            _hideMenu = function() {
                _obj.removeClass( 'open' );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Step = function(obj) {

        //private properties
        var _obj = obj,
            _items = _obj.find('.step__item'),
            _nextBtn = _obj.find('.step__next'),
            _prevBtn = _obj.find('.step__prev');

        //private methods
        var _addEvents = function() {

                _nextBtn.on({
                    'click': function() {

                        _next();
                    }
                });

                _prevBtn.on({
                    'click': function() {

                        _prev();
                    }
                });
                
                _items.on({
                    'submit': function () {
                        
                    }
                })

            },
            _next = function (){

            },
            _prev = function() {

            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Photos = function(obj) {

        //private properties
        var _obj = obj,
            _thumbnailSlider = _obj.find('.swiper-container'),
            _bigSliderWrap = $(' .big-photos'),
            _bigSlider = _bigSliderWrap.find('.swiper-container'),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _scrollConteiner.on({
                    'click': function() {
                    }
                });

            },
            _initSlider = function() {

                var bigSwiper = new Swiper(_bigSlider, {
                    nextButton: _bigSliderWrap.find('.swiper-button-next'),
                    prevButton: _bigSliderWrap.find('.swiper-button-prev')
                });

                var swiper = new Swiper(_thumbnailSlider, {
                    nextButton: _obj.find('.swiper-button-next'),
                    prevButton: _obj.find('.swiper-button-prev'),
                    slidesPerView: 3,
                    paginationClickable: true,
                    spaceBetween: 30,
                    breakpoints: {
                        // when window width is <= 480px
                        480: {
                            slidesPerView: 1
                        },
                        // when window width is <= 640px
                        748: {
                            slidesPerView: 2
                        }
                    },
                    onClick: function (sw) {
                        bigSwiper.slideTo(sw['clickedIndex'], 0);
                    }
                });

                // bigSwiper.params.control = swiper;
                // swiper.params.control = bigSwiper;
            },
            _init = function() {
                _addEvents();
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var DrawTriangle = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _fill = _obj.data('fill');

        //private methods
        var _addEvents = function() {


            },
            _draw = function(fill) {
                var canvas = _obj[0],
                    ctx = canvas.getContext('2d');

                canvas.width = 744;
                canvas.height = 567;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = fill;
                ctx.moveTo(253, 182);
                ctx.lineTo(372, 0);
                ctx.lineTo(491, 182);
                ctx.moveTo(664, 449);
                ctx.lineTo(744, 567);
                ctx.lineTo(0, 567);
                ctx.lineTo(80, 449);
                ctx.moveTo(80, 449);
                ctx.closePath();
                ctx.stroke();


                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = fill;
                ctx.moveTo(0, 567);
                ctx.lineTo(744, 567);
                ctx.closePath();
                ctx.stroke();
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
                _draw(_fill);
            };

        //public properties

        //public methods
        _self.drawTriangle = function ( fill ) {
            _draw(fill);
        };

        _init();
    };

    var QuoteTriangle = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _fill = _obj.data('fill');

        //private methods
        var _addEvents = function() {


            },
            _draw = function(fill) {
                var canvas = _obj[0],
                    ctx = canvas.getContext('2d');

                canvas.width = 262;
                canvas.height = 224;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = fill;
                ctx.moveTo(0, 224);
                ctx.lineTo(32, 170);
                ctx.moveTo(91, 68);
                ctx.lineTo(131, 0);
                ctx.lineTo(171, 68);
                ctx.moveTo(230, 170);
                ctx.lineTo(262, 224);
                ctx.moveTo(262, 224);
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = fill;
                ctx.moveTo(262, 224);
                ctx.lineTo(0, 224);
                ctx.moveTo(0, 224);
                ctx.closePath();
                ctx.stroke();
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
                _draw(_fill);
            };

        //public properties

        //public methods
        _self.drawTriangle = function ( fill ) {
            _draw(fill);
        };

        _init();
    };

    var Words = function(obj) {

        //private properties
        var _obj = obj,
            _items = _obj.find('span'),
            _itemsLength = _items.length - 1,
            _activeIndex = 0,
            _startTime = 0,
            _duration = _obj.data('duration') || 2000;

        //private methods
        var _addEvents = function() {

                $(window).on({
                    'load': function () {

                        _step();
                    }
                });

            },
            _step = function(time) {
                var delta = time - _startTime;

                if ( delta > _duration ) {
                    _startTime = time;

                    _items.eq(_activeIndex).addClass('is-hidden');
                    _items.eq(_activeIndex).removeClass('is-visible');

                    if ( _activeIndex < _itemsLength ) {
                        _activeIndex++;
                    } else  {
                        _activeIndex = 0;
                    }

                    _items.eq(_activeIndex).removeClass('is-hidden');
                    _items.eq(_activeIndex).addClass('is-visible');

                    if ( _obj.parents('.page-title') ) {

                        _drawTriangle(_items.eq(_activeIndex).data('fill'));
                    }
                }
                window.requestAnimationFrame(_step);
            },
            _drawTriangle = function (fill) {
                var triangle = _obj.parents('.page-title').find('.page-title__triangle');

                if (triangle.length) {
                    $('.page-title__triangle')[0].obj.drawTriangle(fill);
                }
            },
            _setMaxWidth = function() {
                var maxWidth = 0;
                _items.each(function () {
                    var curWidth = $(this).width();

                    if ( curWidth > maxWidth ) {
                        maxWidth = curWidth;
                    }
                });
                _obj.css({ 'width': maxWidth + 'px' });
            },
            _init = function() {
                _addEvents();
                _setMaxWidth();
                _items.eq(_activeIndex).removeClass('is-hidden');
                _items.eq(_activeIndex).addClass('is-visible');
                _drawTriangle(_items.eq(_activeIndex).data('fill'));
            };

        //public properties

        //public methods

        _init();
    };

} )();