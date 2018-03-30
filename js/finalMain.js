$(document).ready(function()
{
  //display the main menu first 
  setInitialMainPage();

 // create a function to set the initial stata of the main page
 function setInitialMainPage(){
 console.log("Main page now!");//test

  //only display the main menu and not display the other pages
  $("#mainPage").css({"display":"block"});
  $("#taskPage").css({"display":"none"});
  $("#plantPage").css({"display":"none"});
  $("#gardenpage").css({"display":"none"});
    //set the main menu title by js 
  $("#gameName").append("<h1>Procrastination Garden</h1>");
  $("#gameName").addClass("title");
  $("#userInput").css(
  {
  "width":"220px",
  "height":"20px",
  "borderRadius":"40px",
  "outline":"none",
  "border":"3px dashed black",
  "fontsize":"24px"
  });
  }

$("button#howToPlay").click(function(){
    swal("This is an application for procrastination.\nHow to get started: \nFill in your name on the home page, click on Start, you will enter the task page, which you can fill in the task content you want to do and set the task time at the same time. After you finished setting, click Start, and the clock will begin to count down.\nGame Difficulty: \nIn easy mode, you can only set a short task of 1 to 30 minutes. It is suitable for those who have procrastination disorders and are easily distracted by external influences.\nHard mode: Allows the user to set 1-60 minutes for each task. Note that it is not easy to focus on a task more than 30 minutes. Please don't just set up a long time task and not really do your task. Cherish your time.\nHow to get scores: \nThe time you set multiplied by 10 is the score you get after finished this task. The more tasks you completed, the more scores you get.\nCreate your Garden: \nWhen you finish your tasks, you can click Finish, and then use your earned score in exchange for plants or other interesting items.and these items will help you to arrange your own garden. Finally, when you finish the layout of the garden, click on the camera icon and you will get a screenshot of the garden to commemorate the time you consumed.");
});

$("button#backtoMeun").click(function(){
  console.log("back to menu");
  location.reload();
})


//set the start button
$("button#start").click(function(){
  if($("input#userInput").val()=="")//if the user don't input the name,there will be a reminder and the page will stay in main menu
  {
    swal("Please create a name to play.");
    console.log("Username is empty");
  }
    else//if the user has innputed the name,go to next page
    {
      theUser.name=$("input#userInput").val();
      console.log(theUser);
      setTimeMaxLimit();
      setInitialTask();
      setInitialTaskPage();
    }
})

    //set the default state of a new task
    function setInitialTask()
    {     
      $("#userInforInTaskPage").text(theUser.name);
      //set the default time displau
      defaultTime=20;
      $(".countNumber").text(defaultTime);
      minuteShow.innerHTML=("0"+defaultTime).slice(-2);
      secondShow.innerHTML=("00");

      //diaplay the score part
      task.score=defaultTime*10;
      $("#taskInfor").text("You will receive "+task.score+" scores after completing the task!!");
    }
    var timeMax=1;

    function setTimeMaxLimit(){
      console.log(checkGameMode());
    if(checkGameMode()=="easy"){
      timeMax=30;
    }
    else if(checkGameMode()=="hard"){
      timeMax=60;
    }
    console.log(timeMax);
    //return timeMax;
    }
    
    function checkGameMode(){
          var easyMode=document.getElementById("easymode").checked;
          var hardMode=document.getElementById("hardmode").checked;
          var gameMode;
          //console.log(easyMode);
          //console.log(hardMode);
          if(easyMode){
            gameMode="easy";
          }
          else{
            gameMode="hard";
          }
         // console.log(gameMode);
         return gameMode;
    }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=task page-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=global variable-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
  var defaultTime=20;//set the default time
  var timeTotal;//record time
  var timeLeft = new TimeLeft(0,0,0);//new a TimeLeft object
  var timeInterval;//for the setInterval loop
  var scoreUserEarn=0;
  var isTaskFinished=false;

  //bulid an task object
  var task= new Task("",0,0,"");
  task.name="Task"+taskName();
  task.time=defaultTime;
  task.score= defaultTime*10;
  task.content=$("taskInput").val();
  console.log(task);//test

  var theUser=new User($("input#userInput").val());
  console.log(theUser);//test

  $("#clock").css({"font-size":"12em","font-family":"'Lato', sans-serif"});
  $(".buttonShow").css({"width":"9%","height":"60px"});
  $("button.taskContinue").hide();
    //$("#userTaskInfo").text("Welcome, "+$("input#userInput").val()+" ! Your current scores is 0 !");

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=initial display-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  //set the initial display
  $(".countNumber").text(defaultTime);

  // display will be single when displaying two digits
  var minuteShow= document.getElementById("minutes");
  var secondShow= document.getElementById("seconds");
  minuteShow.innerHTML=("0"+defaultTime).slice(-2);//this way is better, two digits will displayed all the time
  secondShow.innerHTML=("00");
    //dispaly the score information
  $("#taskInfor").text("You will receive "+task.score+" scores after completing the task!!");
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=function parts-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

    //name the task according to the current time
  function taskName(){
    var time=new Date();
    var year= time.getFullYear();
    var Month= time.getMonth()+1;
    var day= time.getDate();
    var hour= time.getHours();
    var minutes= time.getMinutes();
    var seconds=time.getSeconds();

    //return year.toString()+Month.toString()+day.toString()+hour.toString()+minutes.toString()+seconds.toString();
    return year.toString()+showDoubleNum(Month)+showDoubleNum(day)
    +showDoubleNum(hour)+showDoubleNum(minutes)+showDoubleNum(seconds);
  }

    //when the num is single, transfor them to two digits
    //and convert the num to string
  function showDoubleNum(num){
    if(num < 10){
      return "0"+num.toString();
    }
    else{
      return num.toString();
    }
  }

     //calculate the left time
  function leftTime(time){

    //console.log(timeLeft.total);//test
    //var timeLeft.total=Date.parse(time)-Date.parse(new Date());
    //var timeLeft.seconds = Math.floor((timeLeft.total/1000) % 60);
    //var timeLeft.minutes = Math.floor((timeLeft.total/1000/60) % 60);
    var left=Date.parse(time)-Date.parse(new Date());
    var seconds = Math.floor((left/1000) % 60);
    var minutes = Math.floor((left/1000/60) % 60);
    
    timeLeft.total=left;
    timeLeft.seconds=seconds;
    timeLeft.minutes=minutes;

        return timeLeft;
  }
  var scoreUpload=0;

  //create a function to count down the time
  function countDown(){
    console.log("time left:"+leftTime(timeTotal).minutes);
    scoreUpload=leftTime(timeTotal).minutes*10;

    timeInterval=setInterval(function(){
    //display the time
      timeLeft = leftTime(timeTotal);
      minuteShow.innerHTML=("0"+timeLeft.minutes).slice(-2);
      secondShow.innerHTML=("0"+timeLeft.seconds).slice(-2);
      //when the time counted down to zero, the count will stop
      if(timeLeft.total<=0){
        //console.log('PUSH');
        // Push.create("Hello world!");
        Push.create("Congradulation!", {
             body: "Your task is finished!",
             icon: './image/pushiconpark.png',
             timeout: 4000,
             onClick: function () {
                 window.focus();
                 this.close();
             }
         });
        //this function is used to stop the count loop
        clearInterval(timeInterval);
        isTaskFinished=true;
        minuteShow.innerHTML=("00");
        secondShow.innerHTML=("00");

        console.log("score this time:"+scoreUpload);
        scoreUserGet();

        theUser.updateTaskList(task);
        console.log(theUser);
        $("button.taskStart").hide();
        $("button.taskReset").hide();
        $("button.taskBack").hide();
        $("button.taskFinish").show();
        $("button.taskContinue").show();
      }
  },1000);
  }//setInterval(startClock,1000);

  function scoreUserGet(){
    if (isTaskFinished){
      scoreUserEarn=scoreUserEarn+scoreUpload;
    console.log("finished! score earn:"+scoreUserEarn);
    }
   // return scoreUserEarn;
  }
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=button events -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

    //set the addCount + button
  $("button#addCount").click(function(){
    defaultTime++;
    if(defaultTime>timeMax){
    //not allow the defaultTime larger than 60
      //confirm("Sorry, the "+checkGameMode()+" Mode has the "+timeMax+" Mins limitation!!");
      swal("Sorry!\nThe "+checkGameMode()+" Mode has the "+timeMax+" Mins limitation!!");

      defaultTime=timeMax;
    }
  //update the time display 
  $(".countNumber").text(defaultTime);
  minuteShow.innerHTML=("0"+defaultTime).slice(-2);
  //update the score display 
  task.score=defaultTime*10;
  $("#taskInfor").text("You will receive "+task.score+" scores after completing the task!!");
  })

    //set the subtractCount - button
  $("button#subtractCount").click(function(){
    defaultTime--;
    if(defaultTime<1){
      swal("Sorry!\nThe minimum time you can set is 1!");
    //not allow the defaultTime smaller than 1
      defaultTime=1;
    }
  //update the time display 
  $(".countNumber").text(defaultTime);
  minuteShow.innerHTML=("0"+defaultTime).slice(-2);
  //update the score display 
  task.score=defaultTime*10;
  $("#taskInfor").text("You will receive "+task.score+" scores after completing the task!!");
  
  })

  //set the start button
  //when click it, the clock will count down till zero
  $("button.taskStart").click(function(){
    if($("#taskInput").val()==""){
      //when the user did not input the task information, give them a reminder infromation
      swal("Please complete the task description first.");
    }
    else{
    //hide all the time choose display
    //when click start button, the user cannot choose time any more
    $("#chooseTime").css({"display":"none"});
    $("button.taskStart").hide();
    $("#taskInput").hide();
    $("button.taskFinish").hide();
    $("button.taskContinue").hide();
    $("button.taskReset").show();
    $("button.taskBack").show();

    //just for test, this part should show the user's total score right now
    //$("#userTaskInfo").text("Welcome, "+$("input#userInput").val()+" ! Your current scores is 0 !");

    //update the task object
    task.name="Task"+taskName();
    task.time=defaultTime;
    task.score= defaultTime*10;
    task.content=$("#taskInput").val();
    console.log(task);//test
    //display the task information
    $("#taskInfor").text("Your task "+task.name+" ( "+task.content+" ) "+"is running. You will receive "+task.score+" scores after completing the task!!");
    //getting the defultiTime whenever it changed
    timeTotal = new Date(Date.parse(new Date()) + (defaultTime * 60 * 1000)); //Set deadline
    //call the function to count down
    countDown();
    }

    })


    //set the reset button
    //when click it, the clock will back to its initial state
  $("button.taskReset").click(function(){
    swal({
       title: "Notice: ",
       text: "Reset will lost the score of this task!\nClick OK will reset the task.\nClick Cancel will continue this task.",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     })
     .then((willDelete) => {
       if (willDelete) {
        swal("You will reset a new task!", {
           icon: "success",
         });
        resetTask();
       } 
       else {
         swal("Your task will continue!");
       }
     });

  })
  function setInitialTaskPage(){

      console.log("task page now!");
  $("#mainPage").css({"display":"none"});
  $("#taskPage").css({"display":"block"});
  $("#plantPage").css({"display":"none"});
  $("#gardenpage").css({"display":"none"});
  }


  function resetTask(){
  //show the choose time part again 
  //including the two buttons and task input part
  $("#chooseTime").css({"display":"block"});
  $("button.taskStart").show();
  $("#taskInput").show();
  $("button.taskContinue").hide();

  //call this function to resume the default state of the task
  //inluding the default time and other initial display part
  setInitialTask();

  //clear the count down of the clock
  clearInterval(timeInterval);
  }

    //when click the back button, it will back to main menu
  $("button.taskBack").click(function(){
    
     swal({
       title: "Notice: ",
       text: "Back to main page will lost the score of this task!\nClick OK will back to main menu.\nClick Cancel will continue this task.",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     })
     .then((willDelete) => {
       if (willDelete) {
        swal("You will back to the main menu!", {
           icon: "success",
         });
        backToMenu();
       } 
       else {
         swal("Your task will continue!");
       }
     });

  })

  function backToMenu(){
    console.log("back to menu");
    location.reload();
  }

    //when click the finish button, it will go to plant page
  $("button.taskFinish").click(setInitialPlantPage);

  $("button.taskContinue").click(function(){
    resetTask();
  })

  var scoreEarnDisplay = document.getElementById("earn");
  var scorePickDisplay = document.getElementById("pick");
  var scorePick=0;
  
  function setInitialPlantPage(){
      console.log("plant page now!");
  $("#mainPage").css({"display":"none"});
  $("#taskPage").css({"display":"none"});
  $("#plantPage").css({"display":"block"});
  $("#gardenpage").css({"display":"none"});
  //the display of score and user information
  $("#earn").text(scoreUserEarn);
  $("#pick").text(scorePick);
  // scoreEarnDisplay.innerHTML= scoreUserEarn.toFixed(2);
  // scorePickDisplay.innerHTML= scorePick.toFixed(2);
  $("#userInforInPlantPage").text(theUser.name+" ,you can choose the plants now!");
  console.log("plant page user display"+theUser.name);
  //set the layout of the score, user's information and buttons at the left part of thispage 
  $("#userInfoInPlantPage").css({
    "position":"absolute",
    "fontSize":"70px",
    "top":"5%",//not
    "left":"2%"//not
  });
  $("p#scoreEarn").css({
    "fontSize":"30px",
    "top":"15%",
    "left":"2%"
  });
  $("p#scorePick").css({
    "fontSize":"30px",
    "top":"25%",
    "left":"2%"
  });
  $("#clearPlant").css({
    "position":"absolute",
    "width":"18%",
    "height":"60px",
    "top": "40%",
    "left":"2%"
  })
  $("#goToGarden").css({
    "position":"absolute",
    "width":"18%",
    "height":"60px",
    "top":"55%",
    "left":"2%"
  })
   updateTableItemState();
  }


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=plant page-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=global variable-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

localStorage.clear();


//set all plants objects in an array
var plantTableArr= [];
var plants= [];

var newPlant=new Plants("peartree",30,"./image/peartree.png",false);
plants.push(newPlant);
newPlant=new Plants("redfruittree",10,"./image/redfruittree.png",false);
plants.push(newPlant);
newPlant=new Plants("singletree",20,"./image/squirrel.png",false);
plants.push(newPlant);
newPlant=new Plants("yellowgreentree",10,"./image/yellowgreentree.png",false);
plants.push(newPlant);
newPlant=new Plants("grass1",20,"./image/grass1.png",false);
plants.push(newPlant);
newPlant=new Plants("heartpotflower",10,"./image/heartpotflower.png",false);
plants.push(newPlant);
newPlant=new Plants("reed",10,"./image/reed.png",false);
plants.push(newPlant);
newPlant=new Plants("redflowers",10,"./image/redflowers.png",false);
plants.push(newPlant);
newPlant=new Plants("blueflower",20,"./image/blueflower.png",false);
plants.push(newPlant);
newPlant=new Plants("cat",30,"./image/cat.png",false);
plants.push(newPlant);
newPlant=new Plants("threecolorflower",30,"./image/threecolorflower.png",false);
plants.push(newPlant);
newPlant=new Plants("yellowtulip",20,"./image/yellowtulip.png",false);
plants.push(newPlant);

newPlant=new Plants("grill",10,"./image/grill.png",false);
plants.push(newPlant);
newPlant=new Plants("wheelbarrow",10,"./image/wheelbarrow.png",false);
plants.push(newPlant);
newPlant=new Plants("hedgehog",10,"./image/hedgehog.png",false);
plants.push(newPlant);
newPlant=new Plants("squirrel",20,"./image/squirrel.png",false);
plants.push(newPlant);

newPlant=new Plants("dog-house",50,"./image/dog-house.png",false);
plants.push(newPlant);
newPlant=new Plants("bird-house",50,"./image/bird-house.png",false);
plants.push(newPlant);

console.log(plants);
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=initial display of the table-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
updateTableArray();
createPlantsTable();

function updateData(dataItem){
  var dataString= JSON.stringify(dataItem);
  localStorage.setItem("plantData",dataString);
}

function updateTableArray(){
  if(localStorage.plantData){
  plantTableArr=JSON.parse(localStorage.plantData);
}
else{
  for(var i=0; i<3; i++){
    plantTableArr[i]= [];
    for(var j=0; j<6; j++){
      plantTableArr[i][j]= 0;
    }
  }
  updateData(plantTableArr);
}}

//create a table to display all plants
function createPlantsTable(){
  //display the plant table
  var plantsTable= document.createElement("table");
  //plantsTable.style.marginTop = "70px";
  plantsTable.style.marginTop = "3%";
  
  //set all attributes of rows
  plantsTable.setAttribute("border","4");
  plantsTable.setAttribute("bgcolor","pink");
  plantsTable.style.marginLeft = "30%";

//set the rows and cells
for(var i=0; i<plantTableArr.length; i++){
    //set the rows
    var tableRow = document.createElement("tr");
    tableRow.setAttribute("height","150");
    //hang rows to the table
    plantsTable.appendChild(tableRow);
    //set the cells part
  for(var j=0; j<plantTableArr[i].length; j++){
    //set the cells
    var tableColum= document.createElement("td");
    //set all attributes of cells
    tableColum.setAttribute("width","150");
    tableColum.setAttribute("id",i + "_" + j);
    tableColum.setAttribute("align","center");

    // tableColum.setAttribute("src",plants[i*(plantTableArr.length-1)+j].image);
    //hang cells to the rows
    tableRow.appendChild(tableColum);
    //display the image of plants
    var tableImage=document.createElement("img");
    tableImage.setAttribute("src",plants[i*(plantTableArr.length+1)+j].image);
    tableImage.setAttribute("id",i*(plantTableArr.length+1)+j);
    tableImage.setAttribute("height","70");
    tableImage.setAttribute("width","70"); 
    //hang images to the cell
    tableColum.appendChild(tableImage);
    //display score information of plants
    var tableText= document.createTextNode(plants[i*(plantTableArr.length+1)+j].score);
    //hang the scores of each plants to the cells
    tableColum.appendChild(tableText);
    //display the image of a gold icon behind the plants
    var coinImg=document.createElement("img");
    coinImg.setAttribute("src","./image/gold-medal.png");
    coinImg.setAttribute("height","12");
    coinImg.setAttribute("width","12"); 
    //hang images to the cell
    tableColum.appendChild(coinImg);
  }
}
    //hang this table to the plant page
    var plantPage= document.getElementById("plantPage");
    plantPage.appendChild(plantsTable);
}

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=function and event part-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
 // updateTableItemState();
//create a function to set the state of table item when they are clicked
//when the target plant's core add the scorePick are already more than scoreEarn
//the user cannot select plants any more
//only a cell not been selected, its score will be added to scorePick
function selectTableItem(event){

      //get the target cell's id
      //and seperate its id to find the target plant
       var itemId=$(this).attr("id");
       var idArr=itemId.split("_");
       var i=parseInt(idArr[0]);
       var j=parseInt(idArr[1]);

       //when the target plant's core add the scorePick are already more than scoreEarn
       //reminder the user cannot select plants any more
       if((scorePick+plants[i*(plantTableArr.length+1)+j].score)>scoreUserEarn){
           swal("Sorry! Your scores is not enough.\nPlease select anthor plant.")
          }
       else
          {
          //if this plant is not be choosed before
          //change this cell's color and change the object.selectOrNot to true,
          //add all scores of selected plants
          if(!plants[i*(plantTableArr.length+1)+j].selectOrNot){
          event.target.setAttribute("bgcolor","lightgreen");
          //console.log("2 "+i*(plantTableArr.length+1)+" "+j);
          //console.log("3 "+plants[i*(plantTableArr.length+1)+j].selectOrNot);
          plants[i*(plantTableArr.length+1)+j].selectOrNot=true;
          //update the scorePick part
          scorePick=scorePick+plants[i*(plantTableArr.length+1)+j].score;
          // scorePickDisplay.innerHTML= scorePick.toFixed(2);
          $("#pick").text(scorePick);
          }
          }
    }//}

//when a plant's score is smaller than or equar to the scoreEarn
//add click event to the cell 
//when a plant's score is more than the scoreEarn
//it cannot been selected and its color will be changed to gray
function updateTableItemState(){
  console.log(scoreUserEarn);
//set click event for each cell
for(var i=0; i<plantTableArr.length; i++){
  for(var j=0; j<plantTableArr[i].length; j++){
    if(plants[i*(plantTableArr.length+1)+j].score<=scoreUserEarn){
    //when a plant's score is smaller than or equar to the scoreEarn
    //add click event to the cell 
    var tableItem= document.getElementById(i + "_" + j);
    tableItem.addEventListener("click", selectTableItem); 
    }
    else{
    //display a lightgray color to show the item is not avaliable
    var cellItem = document.getElementById(i + "_" + j);
        cellItem.setAttribute("bgcolor", "lightgray");
    }   
  }
}
}
  $("button#clearPlant").click(clearSelectState);

  $("button#goToGarden").click(setIniGardenPage);

//clear the select state of plants
//set all the plants' selectOrNot is not
//update the table items' state
  function clearSelectState(){
    for(var i=0; i<plantTableArr.length; i++){
       for(var j=0; j<plantTableArr[i].length; j++){

        var cellItem = document.getElementById(i + "_" + j);
        cellItem.setAttribute("bgcolor", "pink");
        updateTableItemState();

        plants[i*(plantTableArr.length+1)+j].selectOrNot = false;

        scorePick=0;
        $("#pick").text(scorePick);
        // scorePickDisplay.innerHTML= scorePick.toFixed(2);
       }}    
  }
  function setIniGardenPage(){
    console.log("garden page now!");
    $("#mainPage").css({"display":"none"});
    $("#taskPage").css({"display":"none"});
    $("#plantPage").css({"display":"none"});
    $("#gardenpage").css({"display":"block"});

    inputPickedPlants();
    displayPlants();
    $("#userInforInGP").text(theUser.name);
    $("#userInforInGardenPage").css({"position":"absolute","top":"3%","left":"3%"});
    $("#taskInforInGP").text(theUser.taskArry.length);
    $("#timeInforInGP").text(scoreUserEarn/10);

  }

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=garden page=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=fixed scene drawing in garden page=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
displayGardenFixedScene();

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=main code garden page=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

var selectedPlants=[];
// inputPickedPlants();
// displayPlants();

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=functions in garden page=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

function displayGardenFixedScene(){
  $("img#rightMountain").css({
  "position":"absolute",
  "top":"50px",
    "left":"960px"
})
$("img#leftmountains").css({
  "position":"absolute",
  "top":"160px",
    "left":"290px"
})
$("img#mountain").css({
  "position":"absolute",
  "top":"70px",
    "left":"560px"
})
$("img#foresthree").css({
  "position":"absolute",
  "top":"30px",
    "left":"780px"
})
$("img#house").css({
  "position":"absolute",
  "top":"270px",
    "left":"680px"
})

$("img#parkwrite").css({
  "position":"absolute",
  "top":"315px",
    "left":"920px"
})

$("img#swing").css({
  "position":"absolute",
  "top":"345px",
    "left":"440px"
})
$("img#bush").css({
  "position":"absolute",
  "top":"450px",
    "left":"380px"
})

$("img#photocamera").css({
  "position":"absolute",
  "top":"30px",
    "left":"1300px"
})

$("img#photocamera").click(takeScreenshot);
}

function inputPickedPlants(){
  console.log("get picked plants");
  for(var i=0; i<plantTableArr.length; i++){
     for(var j=0; j<plantTableArr[i].length; j++){
        if(plants[i*(plantTableArr.length+1)+j].selectOrNot){
          selectedPlants.push(plants[i*(plantTableArr.length+1)+j]);
    }
  }}
    console.log("selectPlants "+selectedPlants);
}

function displayPlants(){

var gardenArea=document.getElementById("gardenpage");
  console.log("display plants")

  for(var i=0; i<selectedPlants.length; i++){
    // var x=20+parseInt(i/7)*80;
    // var y=60 + (i%7)* 100;
    var plant=document.createElement("img");
    plant.setAttribute("src",selectedPlants[i].image);
    plant.setAttribute("height","100");
    plant.setAttribute("width","100"); 
    plant.style.position='absolute';
    plant.style.top="700px";
    plant.style.left="150px";
    plant.setAttribute("class","plantsInGP");
    gardenArea.appendChild(plant);

    $(function(){
      $(".plantsInGP").draggable();
    })

  }
}


  
})


function takeScreenshot () {
  var element = $("body");
  html2canvas(element, {
    background: "#ffffff",
    onrendered: function(canvas){
      var imgData = canvas.toDataURL('image/jpeg');

      fetch(imgData)
        .then(res => res.blob())
        .then(blob => {
          saveAs(blob,"myIMG.png");
        })
    }
  });
}