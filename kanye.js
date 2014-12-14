$( document ).ready(function() {
	bool = true;
	setInterval(tick, 1000);
    console.log( "ready!" );
    
    height = window.innerHeight;
    width = window.innerWidth;
    
    console.log(width);
    console.log(height);

    $("#content").width('100%');
    $("#content").height('100%');
    
    $("#banner").width('100%');
    $("#banner").height('5%');
    
    $("#myCanvas").width('100%');
    $("#myCanvas").height('95%');

});

function tick () {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("kanye_pic");
	if (bool) {
		ctx.drawImage(img,50, 10, 30, 30);
	} else {
		ctx.fillStyle = "white";
		ctx.fillRect(50,10,30,30);
	}
	bool = !bool
}