$(document).ready(function() {
  var $nav = $(this);
  var $navTotal = $('.menu-btn');
  var $navContainer = $('.nav-container');
  var $navgnb = $('.navbar-nav'); // ul div에걸려있어야됟는데.
  var $moveContet = $('#section1');
  var $tempContet = $moveContet.prepend('<div class="tempsection"></div>').find('.tempsection').css({'position':'absolute','width':'100%','left':'0','top':'0','z-index':'1','backgroundColor':'#000','opacity':0.5}).hide();
	var isAgent = navigator.userAgent.toLowerCase();
	var isMobile = false;

  if ( (isAgent.indexOf("iphone") != -1) || (isAgent.indexOf("android") != -1) ) {
    isMobile = true;
    console.log('모바일')
  } else {
    isMobile = false;
    console.log('모바일아님')
  }
  
  // 데스크탑일때 
  var fnDeskTopLink = function() {
    $moveContet.removeClass('on'); // section1 on 없어짐
    $tempContet.hide();
    $navContainer.show();

  }
  
  // 모바일일때
  var fnSmartLink = function() {
    $moveContet.removeClass('on'); // section1 
    $tempContet.hide();
    // $navgnb.hide();
    $navContainer.hide(); // 전체 hide됨
    $(".nav-item ul").slideUp();

    $nav.find('li:has(ul)').removeClass('on').unbind('mouseenter mouseleave keyup').parent().find('>li:last-child li:last-child a:last-child').unbind('blur');

    $nav.find('li:has(ul)').find('>a').unbind('click keyup').bind('click keyup',function() {
      if ( $(this).parent().hasClass('on') ) {
        $(".nav-item ul").slideUp();
        $(this).parent().removeClass('on'); 
      } else { 
        $(".nav-item ul").slideUp()
        $(this).parent().addClass('on').siblings().removeClass('on');
        $(this).next().slideDown();
      }
      
      
      return false;
    });
  }
  
  // 메뉴 보임
  var fnTotalLink = function() {
    // 안보이게 right -100% - right:0 
    if ( $moveContet.hasClass('on') ) { // section1 on클래스 있으면
      $moveContet.removeClass('on');  // 
      // setTimeout(function() { $navContainer.hide() },150);
      $navContainer.css({'right': '-500px'});
      setTimeout(function() { $navContainer.hide() },150);
      // $navContainer.css({'height': 'inherit'});

      $tempContet.hide();
    } else { // section1 on클래스 없으면 보이게, menu-btn show,hide
      $moveContet.addClass('on');
      // $navgnb.show();
      $navContainer.show()
      setTimeout(function() { $navContainer.css({'right': '0'})  },150);
      // $navContainer.css({'right': '0'});
      
      // $navContainer.css({'height': '100vh'});
      $tempContet.css({'height':'100vh'}).show();
    }
  }
  // 메뉴클릭하면. 
  $navTotal.click(function() {
    fnTotalLink();
    return false;
  });
  
  $tempContet.click(function() {
    fnTotalLink();
    return false;
  });
  
  // 모바일일때 
  if ( isMobile ) {
    fnSmartLink();
    $(window).load(function() {
      setTimeout(function(){ if(window.pageYOffset==0){ window.scrollTo(0,1) }},100);
    });

  } else { // 데스크탑일때
    
    var fnDeskTopInit = function() {
      if ( $navContainer.width() > 500 ) { // .nav가 500 이상이면 = 데스크탑
        fnDeskTopLink();
      } else { // 500이하면 = 모바일일때
        fnSmartLink();
      }
    }
    $(window).resize(function() {
      fnDeskTopInit();
    });
    fnDeskTopInit();
  }
  
  
  // return this;
});


