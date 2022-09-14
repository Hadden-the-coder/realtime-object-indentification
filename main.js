
img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(380,380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw(){
  image(video,0,0,640,420);
  if(status != ""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i=0; i < objects.length; i++){
      document.getElementById("status").innerHTML = "status : objectDetected";
      fill("#FF0000");
    percent = floor(objects[i].confidence*100);
    text(objects[i].label + ""+percent + "%",objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("#FF0000");
    rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
    } 
  }
}