//console.log(resume_json);

createMajorContainers(resume_json);
// var bpad = parseInt($("body").css("padding-left")) + parseInt($("body").css("padding-right"));
// vae winvw = $(window).width()

var navht = $("nav").height();
//$("nav").css("max-height",navht);
var navmar = parseInt($("nav").css("margin-top"));
//var padminus = navpad * 2;
//var mainaddpad = navht + padminus;
var mainaddpad = navht + navmar;

$("#main").css("padding-top", mainaddpad + "px");
$(".container").css("min-height",$(window).height() - mainaddpad - 2*parseInt($(".container").css("margin-top")));
// $(".container").height(rht);

function createMajorContainers(jsonobj){
	//document.getElementsByTagName("body")[0].innerHTML="";
	var getProfile = false;
	for(var i in jsonobj){
				if(!getProfile)
				{
					//setProfileInfo(i, resume_json[i]);
					getProfile = true;
					continue;
				}
				var tmcon = document.createElement("div");
				setClass(tmcon,"container");
				setId(tmcon,i + "-con");
				document.getElementById("main").appendChild(tmcon);
				//console.log(tmcon);
				//var tcon = document.createElement("div");
				//setClass(tcon,"cat-con");
				//setId(tcon, i);
				//console.log(tcon);
				//tmcon.appendChild(tcon);
				var tcont = document.createElement("div");
				setClass(tcont, "content");
				tmcon.appendChild(tcont);
				//console.log(tcont);
				var ticon = document.createElement("span");
				ticon.innerHTML = createIcon(i);
				tcont.appendChild(ticon);
				console.log(ticon);
				var ttext = document.createElement("span");
				setClass(ttext, "text-cont");
				tcont.appendChild(ttext);
				var ttitle = document.createElement("span");
				setClass(ttitle, "title");
				ttitle.innerHTML = i;
				ttext.appendChild(ttitle);
				recArray(ttext, resume_json[i], 0, 0)
		}				
}
function recObject(target, jsonobj, i, level){
	console.log(jsonobj);
	var tjobj = document.createElement("span");
	tjobj.innerHTML = i;
	var sappend = "";
	for(var x = 0; x < level; x++){
		sappend += "s";
	}
	setClass(tjobj, sappend != "" ? sappend + "-title" : "title");
	target.appendChild(document.createElement("br"));
	target.appendChild(tjobj);
	recArray(tjobj, jsonobj[i], 0, level);
}
function recArray(target, array, i, level){
	if(array[i]==""){
		recArray(target, array, i+1, level);
		return;
	}
	if(typeof(array[i])=="string"){
		var tdesc = document.createElement("span");
		setClass(tdesc, "desc");
		tdesc.innerHTML = array[i];
		target.appendChild(document.createElement("br"));
		target.appendChild(tdesc);
		recArray(target, array, i+1, level);
		return;
	}
	for(var j in array[i]){
		recObject(target, array[i], j, level + 1);
	}
}

function setClass(elt, c){
	elt.className == "" ? elt.className = c : elt.className += (" " + c);
}
function setId(elt, id){
	elt.id == "" ? elt.id = id : "";
}

function createIcon(i){
	return i;
}
// $(".menu.nav li").addClass("hover");
// $(".hover").hover(function(){return inverseColors(this);}, 
					// function(){return inverseColors(this);});
 $(".menu.nav li").hover(function(){
                               //  console.log("hovered");
                                // console.log(this);
								 $(this).removeClass("item");
                                 $(this).addClass("hover");
                            },
                        function(){
                               // console.log("remove Hover");
                               // console.log(this);
                                $(this).removeClass("hover");
								$(this).addClass("item");
                                }
                        );

if(history.state!=null){
	$('body').animate({
        scrollTop:$("#"+history.state.division+"-con").offset().top - navht - navmar - parseInt($("#"+history.state.division+"-con").css("margin-top"))
    }, 1000);
}						
window.onpopstate = function(event) {
	console.log("event state:",event.state.division);
	$('body').animate({
        scrollTop:$("#"+event.state.division+"-con").offset().top - navht - navmar - parseInt($("#"+event.state.division+"-con").css("margin-top"))
    }, 1000);
  //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};                        
$('.menu.nav li').click(function(){
	history.pushState({"division": $(this).text()}, "Resume | " + $(this).text(),"#"+$(this).text());
	$('body').animate({
        scrollTop:$("#"+$(this).text()+"-con").offset().top - navht - navmar - parseInt($("#"+$(this).text()+"-con").css("margin-top"))
    }, 1000);
	console.log("#"+$(this).text()+"-con");
});

function inverseColors(elt){
	var bg = $(elt).css("background-color");
	console.log("bg: " + bg);
	
	var cl = $(elt).css("color");
	console.log("cl: " + cl);
	$(elt).animate({color: "#FFFFFF"}, 1000);
    // $(elt).animate({
          // backgroundColor: "#aa0000",
          // color: "#fff",
          // width: 500
        // }, 1000 );
	//console.log("bg: " + bg);
	//$(elt).find("font").attr("color", bg);
	//$(elt).css("color", bg);
}

// $('.menu.nav li').hover(function(){
		// console.log("hovered");
        // $(this).animate({
            // color: "#ffffff"
        // }, 1500);
    // });

$(".content").click(function(){
	var tar_cont = this;
	var tar_parent = $(this).parent();
	if (  $(tar_cont).css( "transform" ) == 'none' ){
		$(tar_cont).css("transform", "rotate(360deg)");
		$(tar_cont).find(".subtitle").show();
		$(tar_cont).find("span.icon").css("font-size","3em");
		$(tar_cont).hover(function() {
				$(this).css("");
		});
	} else {
		$(this).css("transform","");
	}
	$(".content").each(function(i, e){
	if(e!=tar_cont){
		$(e).parent().hide();
		$(tar_parent).css("max-width","none");
		$(tar_parent).parent().css("width","100%");
		$(tar_cont).css("margin","0");
		}
	});
});

// window.onpopstate = function(event) {
  // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };
// $('.menu.nav li').click(function() {
  // //console.log("clicked");
  // history.pushState({"division": $(this).text()}, "Resume | " + $(this).text(),"#"+$(this).text());
  // $('html, body').animate({
	// scrollTop: $("#edu-con-test").offset().top
	// }, 2000);
  // return false;
// });