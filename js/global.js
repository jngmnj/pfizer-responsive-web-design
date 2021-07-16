/**************************************************

	Global.css ( ver 1.0.0 )

**************************************************/
//�붾컮�댁뒪 泥댄겕
getdevice = function(){
	if($('#_device_pc').css('display')=='block'){
		return 'pc';
	}else if($('#_device_ta').css('display')=='block'){
		return 'ta';
	}else if($('#_device_mo').css('display')=='block'){
		return 'mo';
	}else{
		return null;
	}
}

//�꾩뿭蹂��� �좎뼵
VARS = {
	'ani' : {
		'speed' : 600,
		'easing' : 'easeInOutExpo'
	}
}

/**************************************************
	layout
**************************************************/
//AJAX POPUP
ajaxpop = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'btn' : $('*[data-ajaxpop]'),
			'pop' : $('<div id="popup"></div>'),
			'bg' : $('<div id="popupBG"></div>')
		}
        //open
		$ele.btn.on({
			'click' : function(e){
				e.preventDefault();
                var src = $(this).data('ajaxpop');
				$('body')
                .append($ele.bg)
                .append($ele.pop);
                $('#popup').load(src,function(){
                    $('#popup').addClass('on');
                    $('#popupBG').addClass('on');
                });
			}
		});
        //close
        $(document).on('click','#popup .close, #popupBG',function(e){
            e.preventDefault();
            $('#popup').removeClass('on').remove();
            $('#popupBG').removeClass('on').remove();
        })

	}
}
$(function(){
    ajaxpop.init();
})

//�꾨줈媛�湲� 踰꾪듉
gotop = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'btn' : $('#gotop')
		}
		$ele.btn.on({
			'click' : function(e){
				e.preventDefault();
				$('html,body').animate({
					'scrollTop' : 0
				},VARS.ani)
			}
		})
	}
}
$(function(){
    if($('#gotop').length>0){
        gotop.init();
    }
})

//�ㅻ뜑 寃��� 踰꾪듉
hd_sch = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'box' : $('#hd-sch'),
			'btn' : $('#hd-sch .btn')
		}
		$ele.btn.on({
			'click' : function(e){
				e.preventDefault();
				$ele.box.toggleClass('on');
			}
		})
	}
}
$(function(){
    if($('#hd-sch').length>0){
        hd_sch.init();
    }
})

//LNB媛� �녿뒗 �섏씠吏��� 寃쎌슦 full size濡� 留욎땄 (left�� LNB �덉씠�꾩썐�� 寃쎌슦)
full_layout = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		if($('#sub').length>0 && $('#gnb > li.active').length<1){
			$('#sub').addClass('fullsize');
		}
	}
}
$(function(){
    if($('#sub').length>0 && $('#gnb > li.active').length<1){
        full_layout.init();
    }
})

//dropdown menu
dropdown = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		$('#drdw .inner').html($('#gnb').html());
		var gnbLen = 0;
		$('#drdw .inner > li').each(function(){
			if(!$(this).hasClass('hidden-gnb')){
				gnbLen++;
			}
		})
		$('#drdw .inner > li').css({
			'width' : (100 / gnbLen) + '%'
		})
	}
}
$(function(){
    if($('#drdw').length>0){
        dropdown.init();
    }
})

//slide menu
slidemenu = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'btn' : $('#slide-btn button'),
			'drdw' : $('#drdw'),
			'slide' : $('#slide-menu'),
			'bg' : $('#slide-bg'),
			'close' : $('#slide-close'),
			'schform' : $('#hd-sch-mo')
		}
		//click
		$ele.btn.on({
			'click' : function(e){
				e.preventDefault();
				if(getdevice()=="pc"){
					var vis = $ele.btn.hasClass('on');
					if(!vis){
						$ele.drdw.stop().slideDown();
						$ele.btn.addClass('on');
						$('#hd-sch').removeClass('on');
					}else{
						$ele.drdw.stop().slideUp();
						$ele.btn.removeClass('on');
						$ele.schform.removeClass('on');
					}
				}else{
					var vis = $ele.slide.hasClass('on');
					if(!vis){
						$ele.bg.fadeIn();
						$ele.slide.addClass('on');
					}
				}
			}
		});
		$ele.close.on({
			'click' : function(e){
				e.preventDefault();
				var vis = $ele.slide.hasClass('on');
				if(vis){
					$ele.bg.fadeOut();
					$ele.slide.removeClass('on');
					$ele.schform.removeClass('on');
				}
			}
		})


        $(window).on({
            'resize load' : function(){
                $ele.drdw.stop().slideUp();
                $ele.btn.removeClass('on');
            }
        })
	}
}
$(function(){
    if($('#slide-menu').length>0){
        slidemenu.init();
    }
})

//GNB �먯꽌 LNB �먮룞�쇰줈 媛��� ��
get_lnb = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
        var html = $('#gnb > li.active > ul').html();
        $('#lnb').html(html);
        if($('#lnb > li').length<2){
            $('#lnb').remove();
        }
	}
}
$(function(){
    if($('#lnb').length>0){
        get_lnb.init();
    }
})

//GNB �먯꽌 Navigator �먮룞�쇰줈 媛��� ��
get_navigator = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
        //depth 1
    	var d1_txt = '<?=$_tit[0]?>';
    	var $d1 = '';
    	$('#navigator li.d1').append('<ul>'+$('#gnb').html()+'</ul>');
    	$('#navigator li.d1 > ul > li > ul').remove();
    	$('#navigator li.d1 > a').attr('href',$('#gnb > li.active > a').attr('href'));

    	//depth 2
    	var d2_txt = '<?=$_tit[1]?>';
    	var $d2 = '';
    	$('#navigator li.d2').append('<ul>'+$('#gnb > li.active > ul').html()+'</ul>');
    	$('#navigator li.d2 > a').attr('href',$('#gnb > li.active > ul > li.active > a').attr('href'));

        //click 2depth
        $(document).on('click','#navigator > ul > li > a',function(e){
            var $li = $(this).parent('li');
            var vis = $li.hasClass('on');
            if($li.find('ul').length>0){
                e.preventDefault();
            }
            if(!vis){
                $li.addClass('on').siblings().removeClass('on');
            }else{
                $li.removeClass('on');
            }
        });

        $('body').click(function(e){
            if($('#navigator').has(e.target).length==0 && !$('#navigator').is(e.target)){
                $('#navigator > ul > li').removeClass('on');
            }
        });
	}
}
$(function(){
    if($('#navigator').length>0){
        get_navigator.init();
    }
})

//�ㅻ뜑 language 踰꾪듉 for mobile
hd_lan_mo = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'box' : $('#hd-lan-mo'),
			'btn' : $('#hd-lan-mo > a')
		}
		$ele.btn.on({
			'click' : function(e){
				e.preventDefault();
				$ele.box.toggleClass('on');
			}
		})
	}
}
$(function(){
    if($('#hd-lan-mo').length>0){
        hd_lan_mo.init();
    }
})

//�ㅻ뜑 寃��� 踰꾪듉 for mobile
hd_sch_mo = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'box' : $('#hd-sch-mo'),
			'btn' : $('#hd-sch-mo .btn')
		}
		$ele.btn.on({
			'click' : function(e){
				e.preventDefault();
				$ele.box.toggleClass('on');
			}
		})
	}
}
$(function(){
    if($('#hd-sch-mo').length>0){
        hd_sch_mo.init();
    }
})

//gnb for mobile
gnb_mo = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'win' : $(window),
			'doc' : $(document),
			'gnb' : $('#gnb-mo')
		}
		var auto_open = function(){
			$('> li.active',$ele.gnb).find('a').click();
		}
		var d2_open = function(e,$this){
			var $ele2 = {
				'd2' : $this.parent().children('ul'),
				'd2_sib' : $this.parent().siblings().children('ul'),
			}
			var vars2 = {
				'disp' : $ele2.d2.is(':visible'),
				'd2_count' : $ele2.d2.children('li').length,
			}
			if(vars2.d2_count>0){
				e.preventDefault();
				if(vars2.disp){
					$ele2.d2.slideUp(VARS.ani);
					$this.parent('li').removeClass('active');
				}else{
					$ele2.d2.slideDown(VARS.ani);
					$ele2.d2_sib.slideUp(VARS.ani);
					$this.parent('li').addClass('active').siblings().removeClass('active');
				}
			}
		}
		$(window).on({
			'load' : function(){
				auto_open();
			}
		})
		$(document).on('click','#gnb-mo > li > a',function(e){
			d2_open(e,$(this));
		});
	}
}
$(function(){
    if($('#gnb-mo').length>0){
        gnb_mo.init();
    }
})

//Datepicker
$(function(){
	$('*[datepicker]').datepicker();
})

/**************************************************
	main
**************************************************/
//visual
visual = {
	'init' : function(){
		this.action();
	},
	'action' : function(){
		var $ele = {
			'roll' : $('.visual .roll')
		}
		var rolling = function(){
			$ele.roll.slick({
                'fade' : false, //Fade 濡ㅻ쭅 �④낵
                'dots' : true, //�섎떒 pager
                'arrows' : false, //next,prev 踰꾪듉
                'infinite' : true, //臾댄븳諛섎났
                'slidesToShow' : 1, //�щ씪�대뱶 媛�닔
                'slidesToScroll' : 1, //濡ㅻ쭅�� �щ씪�대뱶 媛�닔
                'autoplay' : true, //�먮룞濡ㅻ쭅
                'autoplaySpeed' : 4000, //�먮룞濡ㅻ쭅 �쒕젅��
                'swipe' : false, //紐⑤컮�� �ㅼ��� �щ�
                'centerMode' : false, //Center紐⑤뱶. 媛��대뜲 slide�� 'slick-active' �대옒�� 遺���.
                'centerPadding' : 0, //Center紐⑤뱶�� 寃쎌슦 醫�/�� �щ갚 �ㅼ젙
                'vertical' : false, //vertical 紐⑤뱶
                'zIndex' : 80, //z-index
                'responsive' : [
                    //tablet
                    {
                        'breakpoint' : 1300,
                        'settings' : {
                            'swipe' : true
                        }
                    },
                    //mobile
                    {
                        'breakpoint' : 750,
                        'settings' : {
                            'swipe' : true
                        }
                    }
                ]
			});
		}
		rolling();
	}
}



/**************************************************
	sub
**************************************************/
var headBg = {
	init : function(){
		this.action();
	},
	action : function(){
		$ele = {
			'hd' : $('#header'),
		}

		$(window).on({
			'scroll resize load' : function(){
				var wt = $ele.hd.offset().top;

				if(wt > 90){
					$ele.hd.addClass('on');
				} else {
					$ele.hd.removeClass('on');
				}
			}
		});

	}
}

