(function($)
{
	$.fn.my_paint=function()
	{
		var canvas = document.getElementById("canvas")
		var ctx = $('#canvas')[0].getContext('2d');
		var line = $(".line");
		var square = $(".square");
		var square_black = $(".square_black")
		var pencil = $(".pencil");
		var eraser = $(".eraser");
		var active = $(".active");
		var circle = $(".circle");
		var circle_black = $(".circle_black")
		var triangle = $(".triangle")
		var triangle_black = $(".triangle_black")
		var clickColor = [];

		function remove() {
			var remove = [
				line.removeClass("active"),
				pencil.removeClass("active"),
				eraser.removeClass("active"),
				square.removeClass("active"),
				square_black.removeClass("active"),
				circle.removeClass("active"),
				circle_black.removeClass("active"),
				triangle.removeClass("active"),
				triangle_black.removeClass("active")
			];
			return remove
		}


		download_img = function(e) {
			var image = canvas.toDataURL("image/jpg");
			e.href = image;
		};

		circle.click(function() {
			remove();
			circle.addClass("active")
			var tab = []
			$("canvas").click(function(event) {
				if(circle.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y)
					var radius = Math.sqrt(((tab[2] - tab[0]) * (tab[2] - tab[0])) + ((tab[3] - tab[1]) * (tab[3] - tab[1])));
					ctx.beginPath();
					ctx.strokeStyle = $("#couleur").val()
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.arc(tab[0], tab[1], radius, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.stroke();
					if(tab[3]) {
						tab = [];
					}
				}
			});
		});

		circle_black.click(function() {
			remove()
			circle_black.addClass("active")

			var tab = []
			$("canvas").click(function(event) {
				if(circle_black.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y)
					var radius = Math.sqrt(((tab[2] - tab[0]) * (tab[2] - tab[0])) + ((tab[3] - tab[1]) * (tab[3] - tab[1])));
					ctx.beginPath();
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.fillStyle = $("#couleur").val()
					ctx.arc(tab[0], tab[1], radius, 0, 2 * Math.PI);
					ctx.fill();
					ctx.closePath();
					if(tab[3]) {
						tab = [];
					}
				}
			});
		});

		line.click(function() {
			remove()
			line.addClass("active");

			var tab = [];
			$("#canvas").click(function(event){
				if (line.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y);
					ctx.strokeStyle = $("#couleur").val()
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.beginPath();
					ctx.moveTo(tab[0],tab[1]);
					ctx.lineTo(tab[2],tab[3]);
					ctx.closePath();
					ctx.stroke();
					if(tab[3]) {
						tab = [];
					}
				}
			});
		});

		square.click(function() {
			remove()
			square.addClass("active")

			var tab = [];
			$("#canvas").click(function(event){
				if (square.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y);
					ctx.strokeStyle = $("#couleur").val()
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.beginPath();
					ctx.moveTo(tab[0],tab[1]);
					ctx.lineTo(tab[2],tab[1]);
					ctx.lineTo(tab[2],tab[3]);
					ctx.lineTo(tab[0],tab[3]);
					ctx.closePath();
					ctx.stroke();
					if(tab[3]) {
						tab = [];
					}
				}
			});
		});

		square_black.click(function() {
			remove()
			square_black.addClass("active")

			var tab = [];
			$("#canvas").click(function(event) {
				if (square_black.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y);
					ctx.strokeStyle = $("#couleur").val()
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.beginPath();
					ctx.moveTo(tab[0],tab[1]);
					ctx.lineTo(tab[2],tab[1]);
					ctx.lineTo(tab[2],tab[3]);
					ctx.lineTo(tab[0],tab[3]);
					ctx.closePath();
					ctx.fillStyle = $("#couleur").val()
					ctx.fill();
					if(tab[3]) {
						tab = [];
					}
				}
			});
		});


		triangle.click(function() {
			remove()
			triangle.addClass("active")

			var tab = [];
			$("#canvas").click(function(event) {
				if(triangle.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y);
					ctx.strokeStyle = $("#couleur").val()
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.beginPath();
					ctx.moveTo(tab[0], tab[1]);
					ctx.lineTo(tab[2], tab[3]);
					ctx.lineTo(tab[4], tab[5]);
					ctx.lineTo(tab[0], tab[1]);
					ctx.closePath();
					ctx.stroke();

					console.log(tab);
					if(tab[5]) {
						tab = [];
					}
				}
			});
		});


		triangle_black.click(function() {
			remove()
			triangle_black.addClass("active")

			var tab = [];
			$("#canvas").click(function(event) {
				if(triangle_black.hasClass("active") == true) {
					var x = event.clientX;
					var y = event.clientY;
					tab.push(x, y);
					ctx.fillStyle = $("#couleur").val()
					ctx.lineWidth = $("#epaisseur").find("option:selected").text()
					ctx.beginPath();
					ctx.moveTo(tab[0], tab[1]);
					ctx.lineTo(tab[2], tab[3]);
					ctx.lineTo(tab[4], tab[5]);
					ctx.lineTo(tab[0], tab[1]);
					ctx.closePath();
					ctx.fill();

					if(tab[5]) {
						tab = [];
					}
				}
			});
		});


		pencil.click(function() {
			remove()
			pencil.addClass("active")
			var clickX = [];
			var clickY = [];
			var clickDrag = [];
			var clickEpais = [];
			var paint;

			$("#canvas").mousedown(function(event){
				if (pencil.hasClass("active") == true) {
					var x = event.pageX;
					var y = event.pageY;

					paint = true;
					addClick(x, y);
					redraw();
				}
			});

			$("#canvas").mousemove(function(e) {
				if (pencil.hasClass("active") == true && paint) {
					addClick(event.pageX, event.pageY, true);
					redraw();
				}
			});

			$("#canvas").mouseup(function(e) {
				if (pencil.hasClass("active") == true) {
					paint = false;
				}
			});

			$("#canvas").mouseleave(function(e) {
				if (pencil.hasClass("active") == true) {
					paint = false;
				}
			});

			function addClick(x,y,dragging) {
				if (pencil.hasClass("active") == true) {
					clickX.push(x);
					clickY.push(y);
					clickDrag.push(dragging);
					clickColor.push($("#couleur").val());
					clickEpais.push($("#epaisseur").find("option:selected").text());
				}
			}

			function redraw() {

				if (pencil.hasClass("active") == true) {
					for (var i = 0; i < clickX.length; i++) {
						ctx.beginPath();
						if(clickDrag[i]) {
							ctx.moveTo(clickX[i-1], clickY[i-1]);
						}
						ctx.lineWidth = clickEpais[i];
						ctx.strokeStyle = clickColor[i];
						ctx.lineTo(clickX[i], clickY[i]);
						ctx.closePath();
						ctx.stroke();
					}
				}
			}
		});

		eraser.click(function() {
			remove()
			eraser.addClass("active")
			var clickX = [];
			var clickY = [];
			var clickDrag = [];
			var clickEpais = [];
			var paint;

			$("#canvas").mousedown(function(event){
				if (eraser.hasClass("active") == true) {
					var x = event.pageX;
					var y = event.pageY;

					paint = true;
					addClick(x, y);
					redraw();
				}
			});

			$("#canvas").mousemove(function(e) {
				if (eraser.hasClass("active") == true && paint) {
					addClick(event.pageX, event.pageY, true);
					redraw();

				}
			});

			$("#canvas").mouseup(function(e) {
				if (eraser.hasClass("active") == true) {
					paint = false;
				}
			});

			$("#canvas").mouseleave(function(e) {
				if (eraser.hasClass("active") == true) {
					paint = false;
				}
			});

			function addClick(x,y,dragging) {
				if (eraser.hasClass("active") == true) {
					clickX.push(x);
					clickY.push(y);
					clickDrag.push(dragging);
					clickEpais.push($("#epaisseur").find("option:selected").text());
				}
			}

			function redraw() {
				if (eraser.hasClass("active") == true) {
					for (var i = 0; i < clickX.length; i++) {
						ctx.beginPath();
						if(clickDrag[i]) {
							ctx.moveTo(clickX[i-1], clickY[i-1]);
						}

						console.log(clickColor)
						ctx.lineWidth = $("#epaisseur").find("option:selected").text()
						ctx.strokeStyle = "#FFFFFF"
						ctx.lineWidth = clickEpais[i];
						ctx.lineTo(clickX[i], clickY[i]);
						ctx.closePath();
						ctx.stroke();
					}
				}
			}
		});
	}
})(jQuery);
