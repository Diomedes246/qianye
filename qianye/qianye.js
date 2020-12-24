var cnv;

var wid = 1000;
var hei = 600;

var NB_FRAMES = 100;

var frame_count = 0;

var data = [2042, 1242, 442, 1742, 2842, 842];
var i = 0;
var selector = 0;


let osc, playing, freq, amp;


function activation(t) {
    return ((1-cos(2*PI*t))/2)**1;
}

function setup() {

  curSeed = 0;
  noiseSeed(curSeed);
  randomSeed(1);
    
  let cnv = createCanvas(wid,hei);
  strokeWeight(1);   
  stroke(255,0,0);      
  noFill();

  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
    
  background(0);
  
  for(var i = 0;i<NB;i++) {
      Objects[i] = new object(i);
    
}
             // better not to have a fill for laser
}

function object(id) {
    
    this.id = id;
    
    this.draw = function() {
        var t = ((frame_count)%NB_FRAMES)/NB_FRAMES;
        
        var x0 = lerp(0,wid,this.id/NB);
        
        theta = PI/2;
        
        var xx = x0;
        var yy = 0;
        
        var Nt = 75;
        
        var step = hei/Nt;
        
        var turn = lerp(0,0.4,activation((this.id/NB+0*t)%1));
        
        stroke(255);
        strokeWeight(1);
        noFill();
        beginShape();
        
        vertex(xx,yy);

        
        for(var i=0;i<=Nt;i++){
            theta += turn*sin(100*noise(1000)+2*PI*(15*noise(0.2*this.id/NB,0.02*i)+t));
            xx += step*cos(theta);
            yy += step*sin(theta);
            
            var xx2 = lerp(xx,x0,(i/Nt)*(i/Nt)*(i/Nt));
            var yy2 = lerp(yy,lerp(0,hei-0,i/Nt),max((i/Nt),1-sqrt(i/Nt)));
            
            vertex(xx2,yy2);
            
            
        }
        endShape();
        
    }
}

var Objects = [];
var NB = 100;
var curLetter = ""
var letters = ["Q", "I", "A", "N", "Y", "E"]

function mousePressed(){
    curSeed = data[selector]
    curLetter = letters[selector]
    freq = data[selector]
    i += 1
    selector = i%6
    noiseSeed(curSeed);
    console.log(curSeed);
}


function draw() {
  background(0);
    
  var t = ((frame_count)%NB_FRAMES)/NB_FRAMES;
    
  for(var i=0;i<NB;i++) Objects[i].draw();
  
  noStroke();
  fill(255);
  textSize(20)
  text("seed : " + curLetter + " = " + curSeed + "Hz", 10, 20);
  text("press mouse!", 10, 40);
  textSize(200)
  text(curLetter, wid/2, hei/2)


  frame_count++;
  if (frame_count<=100 && frame_count>80) {
      
  }
  amp = 1

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq);
    osc.amp(amp, 0.1);
  }

}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}
