var mapimg;

var lat = 0;
var lon = 0;

var clat = 22.5726; var clon = 88.3639; //22.5726° N, 88.3639° E

var earthquakes;

function preload()
{
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoicmlkaGltYTQ3IiwiYSI6ImNqajczNnlxbjAxZGgzcG1uYW9kOXg3NmoifQ.R4n2Q4sXBbBgV2VxKMGglg');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function markX(lon)
{
	lon = radians(lon);
	var x = (256/PI)*(pow(2,1));
	var y = PI+lon;
	return x*y;
}

function markY(lat)
{
	lat = radians(lat);
	var x = (256/PI)*(pow(2,1));
	var y = tan((PI/4)+(lat/2));
	var z = PI-log(y);
	return x*z;
}

function earthquakespts()
{
  translate(windowWidth/2-110, windowHeight/2-20);
  imageMode(CENTER);
  var cx = markX(0);
  var cy = markY(0);

  for(var i = 0; i<earthquakes.length; i++)
  {
    var data = earthquakes[i].split(/,/);
    clon = data[2];
    clat = data[1];
    var mag = data[4];
    var x = markX(clon)-cx;
    var y = markY(clat)-cy;

    mag = pow(10, mag);
    mag = sqrt(mag);

    var magmax = sqrt(pow(10,10));

    var d = map(mag, 0, magmax, 0, 2000);

    fill(255,0,0);
    ellipse(x,y,d,d);

  }
}

function setup() 
{
  createCanvas(1224, 600);
  translate(windowWidth/2-110, windowHeight/2-20);
  imageMode(CENTER);
  image(mapimg, 0,0);

  button = createButton('EARTHQUAKES');
  button.position(130, 615);
  button.mousePressed(earthquakespts);

  /*var cx = markX(0);
  var cy = markY(0);

  for(var i = 0; i<earthquakes.length; i++)
  {
  	var data = earthquakes[i].split(/,/);
  	clon = data[2];
  	clat = data[1];
  	var mag = data[4];
  	var x = markX(clon)-cx;
    var y = markY(clat)-cy;

    mag = pow(10, mag);
    mag = sqrt(mag);

    var magmax = sqrt(pow(10,10));

    var d = map(mag, 0, magmax, 0, 2000);

    fill(255,0,0);
    ellipse(x,y,d,d);

  }*/
}
