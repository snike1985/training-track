( function(){

    $(function(){

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.photos').each( function() {
            new Photos( $(this) );
        } );

        $('.page-title_triangle').each( function() {
            new DrawTriangle( $(this) );
        } );

        $('.words').each( function() {
            new Words( $(this) );
        } );

    });

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
        var _obj = obj;

        //private methods
        var _addEvents = function() {


            },
            _draw = function() {
                var canvas = document.getElementById('triangle'),
                    ctx = canvas.getContext('2d');

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#ff8080';
                ctx.moveTo(201, 0);
                ctx.lineTo(265, 110);
                ctx.moveTo(369, 284);
                ctx.lineTo(405, 345);
                ctx.lineTo(0, 345);
                ctx.lineTo(36, 284);
                ctx.moveTo(140, 110);
                ctx.lineTo(201, 0);
                ctx.closePath();
                ctx.stroke();
            },
            _init = function() {
                _addEvents();
                // _draw();
            };

        //public properties

        //public methods

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
                }
                window.requestAnimationFrame(_step);
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
            };

        //public properties

        //public methods

        _init();
    };

} )();