(function($) {

  $.kptalks = function(options) {

    var settings = $.extend({
        api: '',
        image: [
          'https://raw.githubusercontent.com/FuYaoDe/kp/gh-pages/img/khhungry2.png'
        ],
        height: 410, // image height
        width: 350, // image width
        effect: 'default', // options: default, fast, slow, veryslow, jump, sneaky
        popup_effect: 'fade', // options: default, fade, slide, zoom
        popup_radius: '8px', // popup radius
        popup_color: 'black', // popup font color
        popup_bgcolor: 'beige', // popup background color
        readmore_color: 'brown', // popup font color
        comein_position: 25, // show kp after scroll more than percent of page height
        default_text: '歡迎來到高雄巴豆妖，我是小豆~', // the words show in popup before loading done
        enter_from: 'right', // options: left, right
        enter_distance: -130 // the distance to window side

        //left: -130, // remove this option after ver2.0
    }, options);

    createKP(settings);

    var container = $('#kp_come_container'),
        kp_image = $('#kp_come_container img'),
        popup = $('#kp_popup'),
        close = $('#kp_close_popup');

    $(window).scroll(function(){
      var scroll = $(window).scrollTop(),
          window_h = $(window).height(),
          page_h = $(document).height(),
          come_in = {},come_out = {};
      come_in[settings.enter_from] = settings.enter_distance+'px';
      come_out[settings.enter_from] = '-'+(settings.width)+'px';

      if((scroll+window_h) > (page_h*(settings.comein_position/100))) {
        if(container.css(settings.enter_from) == '-'+settings.width+'px') {
          switch(settings.effect) {
            case 'fast':
              container.animate(come_in, 100, function() {
                popupIn(settings.popup_effect);
              });
              break;

            case 'slow':
              container.animate(come_in, 1000, function() {
                popupIn(settings.popup_effect);
              });
              break;

            case 'veryslow':
              container.animate(come_in, 10000, function() {
                popupIn(settings.popup_effect);
              });
              break;

            case 'jump':
              container
                .css('bottom','-'+settings.height+'px')
                .css(settings.enter_from,settings.enter_distance);
              container
                .animate({bottom: 0}, 300)
                .animate({bottom: '-10px'}, 50)
                .animate({bottom: 0}, 50)
                .animate({bottom: '-10px'}, 50)
                .animate({
                  bottom: 0
                }, 300, function() {
                  popupIn(settings.popup_effect);
                });
              break;

            case 'sneaky':
              var sneaky_pos1 = {},
                  sneaky_pos2 = {},
                  sneaky_pos3 = {};
              sneaky_pos1[settings.enter_from] = '-'+(settings.width*0.54)+'px';
              sneaky_pos2[settings.enter_from] = '-'+(settings.width*0.6)+'px';
              sneaky_pos3[settings.enter_from] = '-'+(settings.width*0.7)+'px';

              container
                .animate(sneaky_pos1, 800).delay(500)
                .animate(sneaky_pos2, 800).delay(500)
                // .animate(sneaky_pos1, 500).delay(500)
                // .animate(sneaky_pos3, 800).delay(500)
                .animate(come_in, 1000, function() {
                  popupIn(settings.popup_effect);
                });
              break;

            default:
              container.animate(
                come_in, 500, function() {
                  popupIn(settings.popup_effect);
              });
              break;
          }
        }
      }
      else {
        if(container.css(settings.enter_from) == settings.enter_distance+'px') {
          popup.hide();
          container.animate(come_out, 100);
          // loadData(settings);
        }
      }
    });
    kp_image.click(function(){
      var come_out_forever = {};
      come_out_forever[settings.enter_from] = '-'+(settings.width+10)+'px';
      popup.remove();
      container.animate(come_out_forever, 100);
    });
    close.click(function(){
      popup.hide();
      // loadData(settings);
    });
  };

  function createKP(settings){
    var img_src,arrow_pos;
    if(document.documentElement.clientWidth>500){
      if($.isArray(settings.image)==true)
        img_src = settings.image[Math.floor(Math.random()*(settings.image.length))];
      else
        img_src = settings.image;
      if(settings.enter_from == 'left')
        arrow_pos = 'right';
      else
        arrow_pos = 'left';
      var object = '<div id="kp_come_container" style="width:'+settings.width+'px; height:'+settings.height+'px; '+settings.enter_from+':-'+settings.width+'px; bottom:0;"><img src="'+img_src+'" style="width:'+settings.width+'px; height:'+settings.height+'px;"><div id="kp_popup" style="'+settings.enter_from+':'+((settings.width)*0.8)+'px;top:'+(settings.height*0.28)+'px;-webkit-border-radius:'+settings.popup_radius+';-moz-border-radius:'+settings.popup_radius+';border-radius:'+settings.popup_radius+';background-color:'+settings.popup_bgcolor+'"><div id="kp_says" style="color:'+settings.popup_color+'">'+settings.default_text+'<a href="https://www.facebook.com/kh.hungry" target="_blank" class="kp_readmore" style="color:'+settings.readmore_color+'">想要知道更多美食點這裡~</a><iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fkh.hungry&amp;width&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80&amp;appId=230744100437856" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:80px;" allowTransparency="true"></iframe></div><div id="kp_popup_arrow_shadow" style="border-'+arrow_pos+': 40px solid rgba(0,0,0,.1);'+settings.enter_from+': -40px;"></div><div id="kp_popup_arrow" style="border-'+arrow_pos+': 42px solid '+settings.popup_bgcolor+';'+settings.enter_from+': -40px;"></div><div id="kp_close_popup">X</div></div></div>';
      $('body').append(object);
    }
    // loadData(settings);
  }
  function popupIn(effect) {
    switch(effect) {

      case 'fade':
        $('#kp_popup').fadeIn('slow');
        break;

      case 'slide':
        $('.kp_readmore').hide(function(){
          $('#kp_popup').slideDown('fast',function(){
            $('.kp_readmore').fadeIn();
          });
        });
        break;

      case 'zoom':
        $('#kp_says').hide(function(){
          $('#kp_popup').show('slow',function(){
            $('#kp_says').fadeIn();
          });
        });
        break;

      default:
        $('#kp_popup').show();
        break;
    }
  }

}(jQuery));
