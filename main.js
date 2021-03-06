window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  window.onload = function(){
    resize();
  }

window.onresize = function() {
    resize();
}

var screenSmall = false;
function resize(){
    if($(window).width() <= 620 && screenSmall == false)
    {
        screenSmall = true;
        div1 = $('.hName');
        div2 = $('.hHome');

        tdiv1 = div1.clone();
        tdiv2 = div2.clone();

        if(!div2.is(':empty')){
            div1.replaceWith(tdiv2);
            div2.replaceWith(tdiv1);

            tdiv1.addClass("replaced");
            
        }
        $('.topnav ul li').css("display", "block");
    }
    else if ($(window).width() > 620 && screenSmall == true){
        screenSmall = false;
        div1 = $('.hHome');
        div2 = $('.hName');

        tdiv1 = div1.clone();
        tdiv2 = div2.clone();

        if(!div2.is(':empty')){
            div1.replaceWith(tdiv2);
            div2.replaceWith(tdiv1);

            tdiv1.addClass("replaced");
        }
        $('.topnav ul li').css("display", "inline-block");
    }
}

function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

$(function (){
    var lastScrollTop = 0, delta = 5;
    var downBool = false;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
        
        if(Math.abs(lastScrollTop - st) <= delta)
        return;
        
        
    
        //trying to get position of the elements so this can be dynamic instead of fixed.
        //console.log("home = " + $("li.hHome").offset().top - $(this).scrollTop());
        $("li.hHome > a")[0].className = "";
        $("li.hAbout > a")[0].className = "";
        $("li.hProjects > a")[0].className = "";
        $("li.hContact > a")[0].className = "";
        if(st <= ($('.About')[0].offsetTop - 10))
        {
            $("li.hHome > a")[0].className = "current";
        }
        else if( st <= ($('.Projects')[0].offsetTop - 10))
        {
            $("li.hAbout > a")[0].className = "current";
        }
        else if(st <= ($('.Contact')[0].offsetTop - 10))
        {
            $("li.hProjects > a")[0].className = "current";
        }
        else if(st <= $('.footer')[0].offsetTop - 10)
        {
            $("li.hContact > a")[0].className = "current";
        }
        //var headerClassName = document.getElementById("header").className;
        
        //CHECK IF ANIMATION PLAYING AND DONT STOP IT?

        if (st > lastScrollTop){
            //scroll down
            //$(this).toggleClass("out");
            if(downBool)
            {
                lastScrollTop = st;
            }
            else
            {
                if(lastScrollTop - st <= -110)
                {
                    downBool = true;
                    lastScrollTop = st;
                    document.getElementById("navContainer").className = "out";
                } 
            }
            
        } else {
            //scroll up
            if(!downBool)
            {
                lastScrollTop = st;
            }
            else
            {
                if(lastScrollTop - st >= 110)
                {
                    downBool = false;
                    lastScrollTop = st;
                    document.getElementById("navContainer").className = "in";
                } 
            }
        }
        
    });
});
