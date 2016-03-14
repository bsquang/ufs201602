var check,drop = false;
var next = 0;
var countFood;
var countTrue = 0;
var arrVoice = [];
var strSnd = [];
strSnd[0] = "sound/button_click.mp3";
arrVoice[0] = new Audio(strSnd[0]);
strSnd[1] = "sound/true.mp3";
arrVoice[1] = new Audio(strSnd[1]);
strSnd[2] = "sound/error.ogg";
arrVoice[2] = new Audio(strSnd[2]);
strSnd[3] = "sound/done.mp3";
arrVoice[3] = new Audio(strSnd[3]);
strSnd[4] = "sound/fail.mp3";
arrVoice[4] = new Audio(strSnd[4]);
var clear_interval;
var time = 40;

var nextTime = 4500;

var checkArr  = 0;

var snd_start = new Audio("sound/cooking_start.mp3");
var snd_bg = new Audio("sound/cooking_bg.mp3");
var snd_click = new Audio("sound/button_click.mp3");
var snd_choose_wrong = new Audio("sound/choose_wrong.mp3");
var snd_choose_right = new Audio("sound/right.mp3");
var snd_select_menu = new Audio("sound/selection_menu.mp3");
var snd_congrat = new Audio("sound/congrat_cooking.mp3");
var snd_win = new Audio("sound/win.mp3");
var snd_lose = new Audio("sound/fail.mp3");

function play_snd_start(){
  snd_start.pause();
  snd_start.currentTime = 0;
  snd_start.play();
  
  snd_start.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
}

function play_snd_bg(){
  snd_bg.pause();
  snd_bg.currentTime = 0;
  snd_bg.play();
  snd_bg.volume = 0.4;
  
  snd_bg.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
}
function stop_snd(name) {
  name.pause();
}
function play_snd(type) {
    if (type == 3) {
        snd_click.pause();
        snd_click.currentTime = 0;
        snd_click.play();
    }
    if (type == 4) {
        snd_choose_right.pause();
        snd_choose_right.currentTime = 0;
        snd_choose_right.play();
    }
    
        if (type == 5) {
        snd_choose_wrong.pause();
        snd_choose_wrong.currentTime = 0;
        snd_choose_wrong.play();
    }
    if (type == 6) {
        snd_select_menu.pause();
        snd_select_menu.currentTime = 0;
        snd_select_menu.play();
    }
    if (type == 7) {
        snd_congrat.pause();
        snd_congrat.currentTime = 0;
        snd_congrat.play();
    }
    if (type == 8) {
        snd_lose.pause();
        snd_lose.currentTime = 0;
        snd_lose.play();
    }
}

$(document).ready(function(){
  play_snd_start();
  init_game();
  
  $('.gift').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      winParticle();
  });
  
  $('.btn-reload').bind('click',function(){
    window.location.reload();
  })
  
  $('.btn-start').click(function(){
    play_snd(3);
    changePage(1);
    next +=1;
  })
  
  $('.menu-food').click(function(){
    var id = $(this).attr('data-item');
    if (id !== '0') {
      play_snd(3);
      play_snd_bg();
      changePage(id);
      stop_snd(snd_start);
    }
    else{
      return;
    }
  })
})

function winParticle() {
  clickSpark.fireParticles($('.gift'));
  
  setTimeout(function(){
    winParticle();
  },500)
}

function randomID(n) {
  var id = Math.floor(Math.random() * 10) + 0 ;
  return id
  if ($('.game').eq(n).find($('.food')).eq(id).hasClass('pulse') == true) {
    $('.food').eq(id).removeClass('pulse').addClass('pulse');
  }
  else{
    $('.food').eq(id).addClass('pulse');
  }
}
function changePage(current) {
  $('.page').hide();
  $('.page').eq(current).fadeIn();
  next = current;
  if (current == 1) {
    setTimeout(function(){
      changePage(2);
    },3000);
  }
  if (current >= 3 && current < 9) {
    $('#white-logo').show();
    $('#headline').show();
    $(".endtime").show();
    $(".endtime p").text(time + "s");
    countFood = $('.game').eq(current - 2).find('.food').length;
    countTrue = 0;
    countdown(next);
    
    //setInterval(function(){
    //  randomID();
    //},1000)
  }
  if (next == 9) {
    checkArray();
    $('.endtime').hide();
  }
}
function checkArray() {
  $('#headline').hide();
  $('#here').hide();
  stop_snd(snd_bg);
  if (checkArr== 1) {
    play_snd(7);
    $('.gift').show();
    $('.lose').hide();
  }
  else{
    $('.win').hide();
    play_snd(8);
  }
  setTimeout(function(){
    window.location.reload();
  },nextTime);
}

function countdown(n) {
  
  clear_interval = setInterval(function(){
    time -= 1;
    $(".endtime p").text(time + "s");
    if (time <= 0) {
      clearInterval(clear_interval);
      changePage(9);
    }
  },1000)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init_game() {
  $('.food').draggable({
    
    revert:true,
    cursor:"pointer",
    //cursorAt:{top:30,left:60},
    start: function(){
      var ctop = $(this).height() / 2;
      var cleft = $(this).width() / 2;
      $(this).css({'animation-name':'none'});
      // Getter
      var cursorAt = $(this).draggable( "option", "cursorAt" );
       
      // Setter
      $(this).draggable( "option", "cursorAt", { left: cleft, top:ctop } );
    },
    drag: function(event,ui){
       $(this).css({'opacity':'0.5'});
       bstop = true;
       if ($(this).hasClass("false")) {
          check = false;
       }
       else{
          check = true;
       }
    },
    stop: function(event,ui){
       $(this).css({'opacity':'1'});
       //$(this).addClass('pulse infinite');
       $(this).css({'animation-name':'pulse'});
       if (drop == false) {
          bstop = false;
       }
    },
  });
  
  
  $('.noicanh .drop').droppable({
    hoverClass:"dragging",
    drop: function(event,ui){
      drop = true;
      if (drop == true) {
        if (!check) {
          play_snd(5);
        }
        else{
          play_snd(4);
          var vacanh = $(this).parent().find('.vacanh');
          
          if ($(vacanh).hasClass('vacanh_animate')) {
            console.log('here animate');
            $(vacanh).parent().find('.vacanh_animate').css({'animation-name':'none'});
            setTimeout(function(){
              $(vacanh).parent().find('.vacanh_animate').css({'animation-name':'vacanh'});
            },100)
          }
          else{
            $(vacanh).addClass('vacanh_animate');
          }
          var obj = ui.draggable;
          // 15 count
          for(var i=0;i<8;i++){
            var tempSmoke = "<img class='steam animatedBSQ' src='img/new/smoke.png' style='position: absolute; left:  "+getRandomInt(0,300)+"px; top: "+getRandomInt(0,50)+"px; animation-delay: "+getRandomInt(0,200)/100+"s'>";
            
            $("#here").show().append(tempSmoke)
          }
          if ($(obj).hasClass('knorr')) {
            $(obj).css({'top': '210px','left':'430px','transform':'rotate(-135deg)'});
            $(obj).fadeOut(1000);
          }
          else{
            $(obj).fadeOut();
          }
          countTrue +=1;
          if (next == 3 || next == 4 || next == 5 || next == 8) {
            if (countFood - countTrue == 3) {
              clearInterval(clear_interval);
              checkArr = 1;
              changePage(9);
            }
          }
          else if(next == 6 || next == 7){
            if (countFood - countTrue == 2) {
              clearInterval(clear_interval);
              checkArr = 1;
              changePage(9);
            }
          }
        }
      }
    }
  })
}