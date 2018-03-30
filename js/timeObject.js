function TimeLeft(total, minutes,seconds)
	{
		this.total=total;
		this.minutes=minutes;
		this.seconds=seconds;
	}

//constructor function for tasks
function Task(name, time, score,content)
{
	this.name=name;
	this.time=time;
	this.score=score;
	this.content=content;
}

//constructor function for tasks
function Plants(name,score,image){
	this.name=name;
	this.score=score;
	this.image=image;
	this.selectOrNot=false;
}

function User(name)
{
    this.name=name;
    this.taskArry=[];
    this.plantArry=[];
    
    this.updateTaskList= function(task){
    this.taskArry.push(task);
    }
    this.updatePlantList= function(plant){
    	this.plantArry.push(plant);
    }

}