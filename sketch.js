let size;
let center;
let center1;
let buttonAc; //Button to add clouds
let buttonSc; //Button to subtract clouds
let buttonAw; //Button to add wind
let buttonSw; //Button to subtract wind
let seto; //Check for rain ("seto" just a personal reference regarding rain)
let bgclrR; //Canvas colors
let bgclrG;
let bgclrB;
let shade; //Shade for the clouds
let wind; //speed of the clouds moving



let clouds = [];
function setup() {
  // put setup code here

	createCanvas(800,800); //Create 
	wind = 0; 

	bgclrR = 0;
	bgclrG = 204;
	bgclrB = 255;
	background(bgclrR,bgclrG,bgclrB);
	seto = false;
	size = 2.5;
	center = random(10,800);
    center1 = random(10,800);

    //Buttons For Weather Control

    buttonAc = createButton("Add Clouds");
    buttonAc.position(110, 650);
    buttonAc.mousePressed(addClouds);

    buttonSc = createButton("Sub Clouds");
    buttonSc.position(10, 650);
    buttonSc.mousePressed(subClouds);

    buttonAw = createButton("Add Wind");
    buttonAw.position(110, 690);
    buttonAw.mousePressed(addWind);

    buttonSw = createButton("Sub wind");
    buttonSw.position(10, 690);
    buttonSw.mousePressed(subWind);

    //buttonTr = createButton("Toggle Rain");
    //buttonTr.position(210, 650);
    //buttonTr.mousePressed(toggle);
}




function draw() {
	background(bgclrR,bgclrG-((clouds.length)*20),bgclrB - ((clouds.length)*20));
	console.log(wind);
	for (i = 0; i < clouds.length; i++) { //Interate through clouds
		clouds[i].display();
		clouds[i].update();
		clouds[i].displayRain();

	}

	if (clouds.length > 10) { //if more than 10 clouds, will start to rain
		seto = false;
	}
	else {
		seto = true;
	}

	if (seto == true) { // if not enough clouds, its still considered "sunny"
		//Sun
		fill(245, 187, 87);
  		stroke(225);
  		strokeWeight(2);
  		push();
  		translate(80,80);
  		rotate(radians(frameCount / 40)); //
	    ellipse(0, 0, 75, 75);
	    stroke(245, 187, 87);
	    strokeWeight(8);
	    line(0, -60, 0, -40);
	    line(0, 40, 0, 60);
	    line(-45, -45, -30, -30);
	    line(45, -45, 30, -30);
	    line(-60, 0, -40, 0);
	    line(40, 0, 60, 0);
	    line(-45, 45, -30, 30);
	    line(45, 45, 30, 30);
	    pop();
	    noStroke();
	}	    
}


// Botton Functions

function addClouds() {
	let newCloud = new Cloud();
	clouds.push(newCloud);
}

function subClouds() {
	clouds.splice(0, 1);
}
function addWind() {
	wind += 1;
}
function subWind() {
	wind -= 1;
}





class Cloud {

	constructor(){
		this.x = random(10,800);
		this.y = 700;
		this.raining = false;
		this.bord = random(100,150); //How far from the top the clouds stop
		this.location = new createVector(this.x, this.y);
    	this.velocity = new createVector(0, 0);
    	this.acceleration = new createVector(0.00, 0.09);
    	this.rain = [];
  

	}

	

	update() {

    	if (this.location.y < this.bord){
    		this.location.x = this.location.x;
    		this.location.y = this.location.y;
    		
			this.rain.push(new Drop(random(this.location.x-40,this.location.x+70),this.location.y));
			
			if (seto == false) {
    			this.raining = true;
    		} //When cloud reaches top, starts raining
    		else {
    			this.raining = false;
    		}
    		this.location.x += constrain(wind,0,4); //Wind max speed = 4
    		if (this.location.x > 800) {
    			this.location.x = 0; //clouds come back after going off canvas
    		}
    		
    	}
    	else {
    		this.velocity.add(this.acceleration);
    		this.location.sub(this.velocity);
    	}
    }

    displayRain() {
    	if (this.raining == true) {
			for (let i = 0; i < this.rain.length; i++) { //Goes through raindrops
		    	this.rain[i].display();
		    	this.rain[i].drip();
	  		}

		}
    }



	display() { //Displays clouds 
		shade = 255-((clouds.length)*10); //The greater the number of clouds the "denser"/darker the clouds are
		fill(constrain(shade,100,255));
		noStroke();
		arc(this.location.x - 10, this.location.y, 25 * size, 20 * size, PI + TWO_PI, TWO_PI); //First puff (1)
		arc(this.location.x + 5, this.location.y, 25 * size, 35 * size, PI + TWO_PI, TWO_PI); // Upper Puff (2)
		arc(this.location.x + 28, this.location.y, 25 * size, 45 * size, PI + TWO_PI, TWO_PI); //third puff (3)
		arc(this.location.x + 40, this.location.y, 30 * size, 17 * size, PI + TWO_PI, TWO_PI); //last puff (4)	
	}



}

class Drop{

	constructor(x_,y_) {
		this.xor = x_;
		this.yor = y_;
		this.x = x_;
		this.y = y_;
		this.length = 12;
		this.spd = 10;
	}

	drip() {
		this.y += this.spd;

	}
	display() {
		stroke(35,117,194);
		line(this.x,this.y,this.x,this.y+this.length);
	}

}


