/*-=-=-=-=-=-=-=-=-=-=-=Seeting the Background Music-=-=-=-=-=-=-=-=-=-=-=-=*/
var bgm = document.getElementById("backgroundMusic");
var isPlayOrNot=false;
changeMusicState(isPlayOrNot);
//conncet with the "backgroundMusic" id of html

function changeMusicState(isPlayOrNot){
	if(!isPlayOrNot){
    playMode();
    isPlayOrNot=true;
	}
	else{
	muteMode();
	isPlayOrNot=false;
	}
}

function playMode(){
	$("#playmusic").hide();
    $("#mutemusic").show();
    
	bgm.muted = false;
	if(!bgm)return;
	bgm.currentTime = 0;
	bgm.play();
	console.log("Play BGM");

    $("#mutemusic").click(muteMode);
    console.log("playMode");
}
function muteMode(){
	$("#mutemusic").hide();
    $("#playmusic").show();

    bgm.muted= true;
	console.log("Mute BGM");

    $("#playmusic").click(playMode);
    //playMode();
    console.log("muteMode");
}
