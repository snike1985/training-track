( function(){

    $( function(){
        $( 'select' ).each( function(){

            if ( $(this).parents('.popup').length ) {
                new WebstersSelect( {
                    obj: $( this ),
                    optionType: 1,
                    showType: 2,
                    visible: 3
                } );
            } else {
                new WebstersSelect( {
                    obj: $( this ),
                    optionType: 1,
                    showType: 2
                } );
            }
        } );
    } );

    var WebstersSelect = function( params ){

        //private properties
        var _self = this,
            _obj = params.obj,
            _optionType = params.optionType || 0,
            _showType = params.showType || 0,
            _visible = params.visible || 5,
            _device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ),
            _text = $( '<span class="websters-select__item"></span>' ),
            _wrap = $( '<div class="websters-select"></div>' ),
            _body = $( 'body' ),
            _opened = false,
            _popup, _scroll;
        
        console.log(_visible);
        
        //private methods
        var _addWrap = function(){
                var curText = '';

                _obj.css( {
                    opacity: 0
                } );

                _obj.wrap( _wrap );
                _wrap = _obj.parent();
                _wrap.append( '<div class="websters-select__arrow"></div>' );
                _obj.after( _text );
                _obj.find( 'option' ).each( function(){
                    var curItem = $( this );

                    if( curItem.attr( 'selected' ) == 'selected' ){
                        curText = curItem.text();
                    }
                } );

                if ( _obj.data('placeholder') ) {
                    curText = _obj.data('placeholder')
                }

                if( curText == '' ){
                    curText =  _obj.find( 'option').eq( 0 ).text();
                }
                _text.text( curText );
            },
            _hidePopup = function(){
                _opened = false;

                if( !_showType ){
                    _popup.css( {
                        display: 'none'
                    } );
                } else if( _showType == 1 ){
                    _popup.stop( true, false ).slideUp( 300, function(){
                        _popup.remove();
                    } );
                } else if( _showType == 2 ) {
                    _popup.stop( true, false ).fadeOut( 300, function(){
                        _popup.remove();
                    } );
                }

                _wrap.removeClass( 'websters-select_opened' );

            },
            _constructor = function(){
                _obj[ 0 ].obj = _self;

                _addWrap();
                _selectViewType();
                _onEvents();
            },
            _onEvents = function(){
                _obj.on( 'change', function() {
                    _text.text( $( this ).find( 'option:selected' ).text() );

                } );
                $(document).on(
                    "change",
                    "select",
                    function() {
                        $( this).prev().text( $( this ).find( 'option:selected' ).text() );
                    }
                );

                if( _optionType == 1 && !_device ){
                    _wrap.on( {
                        'click': function( e ){
                            e.stopPropagation();

                            if( _opened ){
                                _hidePopup();
                            } else {
                                _showPopup();
                            }

                        }
                    } );
                }
                _body.on( {
                    'click': function(){
                        if( _opened ){
                            _hidePopup();
                        }
                    }
                } );

            },
            _selectViewType = function(){

                if( !_optionType || _device ){
                    _setMobileView();
                } else if( _optionType == 1 ){
                    _setCustom1();
                }
            },
            _setCustom1 = function(){
                _wrap.addClass( 'websters-select_custom' );
            },
            _setMobileView = function(){
                _wrap.addClass( 'websters-select_mobile' );
            },
            _showPopup = function(){
                var selects = $( 'select' ),
                    list = $( '<ul></ul>'),
                    curIndex = _obj.find( 'option:selected' ).index(),
                    id = Math.round( Math.random() * 1000 );
                
                selects.each( function(){
                    if( this !== _obj[ 0 ] && this.obj.checkOpened() ){
                        this.obj.close();
                    }
                } );

                if( _opened ){
                    _popup.remove();
                }
                _opened = true;

                _popup = $( '<div class="websters-select__popup" id="websters-select__popup' + id + '"></div>' );

                _obj.find( 'option' ).each( function( i ){
                    var curItem = $( this );

                    if( i == curIndex ){
                        list.append( '<li class="active">' + curItem.text() + '</li>' );
                    } else {
                        list.append( '<li>' + curItem.text() + '</li>' );
                    }

                } );

                _popup.append( list );
                _wrap.append( _popup );
                _wrap.addClass( 'websters-select_opened' );

                _popup.css( {
                    width: _wrap.outerWidth(),
                    left: -1,
                    top: _wrap.outerHeight()
                } );

                maxHeight = _popup.outerHeight();
                if( maxHeight > _popup.find( 'li' ).eq( 0 ).outerHeight() * _visible ){
                    _popup.height( _popup.find( 'li' ).eq( 0 ).outerHeight() * _visible );
                    _scroll = _popup.perfectScrollbar();
                }

                if( _showType == 1 ){
                    _popup.css( {
                        display: 'none'
                    } );
                    _popup.slideDown( 300 );
                } else if( _showType == 2 ) {
                    _popup.css( {
                        opacity: 0.1
                    } );
                    _popup.animate( { opacity: 1 }, 300);
                }

                _popup.find( 'li' ).on( {
                    'click': function( e ){
                        var index = $( this ).index();

                        e.stopPropagation();

                        _obj.val( _obj.find( 'option' ).eq( index ).attr( 'value' ) );
                        _obj.trigger( 'change' );
                        _hidePopup();
                    }
                } );

            };

        //public properties

        //public methods
        _self.checkOpened = function(){
            return _opened;
        };
        _self.close = function(){
            _hidePopup();
        };


        _constructor();

    };

} )();