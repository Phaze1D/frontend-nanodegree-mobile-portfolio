## Website Performance Optimization Project
This is a Udacity Frontend Nanodegree Project for optimizing a website's render speed and animation.

### Getting Started
To get started you need to have [npm](https://www.npmjs.com/) and [gulp](http://gulpjs.com/) installed on your computer. Once you have that installed clone this repository and run these commands in the terminal directory.

```
$ npm install
$ gulp build
$ python -m SimpleHTTPServer 8080
```

Once those commands are finished, open you browser and goto `localhost:8080`

### Implementation

##### Gulp Optimizations
Used gulp to minify all .js, .css and .html files and moved all the files to a dist folder. I also used imageMagick to optimize all .png and .jpg images

##### Index Optimizations
Optimized the index.html file by first adding a media query on the necessary link tags like so

```
<link href="css/print.css" rel="stylesheet" media="print">
```

I also added the async attribute to google-analytics script tag and the js/perfmatters.js script tag, and I also move the google-analytics initialization to the end of the body

```
<script async src="http://www.google-analytics.com/analytics.js"></script>
<script async src="js/perfmatters.js"></script>
```

For the google fonts I used google's webfont loader to load fonts asynchronously

```
<script async src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
```

##### Main Optimizations
For main.js file the main problems that I found were all the force reflow in the changePizzaSizes, determineDx, and updatePositions functions.

In the changePizzaSizes I moved all querySelectorAll and offsetWidth calls before the loop like so

```
var pizzas = document.querySelectorAll(".randomPizzaContainer");
var offsetWidth = pizzas[0].offsetWidth;
var windowWidth = document.querySelector("#randomPizzas").offsetWidth;

for (var i = 0; i < pizzas.length; i++) {
  var dx = determineDx(pizzas[i], offsetWidth, windowWidth, size);
  var newwidth = (offsetWidth + dx) + 'px';
  pizzas[i].style.width = newwidth;
}
```

In the updatePositions function I also moved scrollTop outside the for loop like so

```
var items = document.querySelectorAll('.mover');
var scrollTop = document.body.scrollTop
for (var i = 0; i < items.length; i++) {
  var phase = Math.sin((scrollTop / 1250) + (i % 5));
  items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
}
```
