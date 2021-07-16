
// $('.item-content').eq(0).show()
// $('.nav-item>a').eq(0).addClass('active')
// $('.nav-item>a').click(function(){
//   $(this).addClass('active')
//   // siblings가 아니라 상위의 하위요소 탐색
//   // this에 active추가후 다른요소에 active클래스를 삭제

//   // $(this).siblings('.nav-item>a').removeClass('active')
//   $(this).parents().find('.nav-item>a').removeClass('active')
//   // this의 형제요소 slideDown
//   $(this).next().slideDown()
//   // 다른하위요소의 형제요소 slideup
//   $(this).siblings('.nav-item>a').next().slideUp()
// })


$('.nav-item ul').eq(0).show()
$('.nav-item>a').eq(0).addClass('active')
console.log('active클래스 추가안됨')
console.log($('.nav-item>a'))

// 클릭하면. 
$('.nav-item>a').click(function(){
  $(this).addClass('active');
  console.log('active클래스 추가');
  // siblings가 아니라 상위의 하위요소 탐색
  // this에 active추가후 다른요소에 active클래스를 삭제

  // $(this).siblings('.nav-item>a').removeClass('active')
  $(this).parents().find('.nav-item>a').removeClass('active');
  // this의 형제요소 slideDown
  $(this).next().slideDown();
  // 다른하위요소의 형제요소 slideup
  $(this).siblings('.nav-item>a').next().slideUp();
})

