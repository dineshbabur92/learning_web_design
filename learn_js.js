//console.log(resume_json);
createMajorContainers(resume_json);
var rht = $("#main").height();
$(".container").height(400);

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
				//ticon.innerHTML = createIcon(i);
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

$(".nav li").hover(function(){})
$(".hover").hover(function(){return inverseColors(this);}, 
					function(){return inverseColors(this);});

function inverseColors(elt){
	var bg = $(elt).css("background-color");
	var cl = $(elt).css("color");
	$(elt).css({"background-color": cl, "color": bg});
}

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

$('.menunav li').click(function() {
  console.log("clicked");
  history.pushState($(this).text(), "Resume | " + "Summary","#Summary");
  $('html, body').animate({
	scrollTop: $("#edu-con-test").offset().top
	}, 2000);
  return false;
});