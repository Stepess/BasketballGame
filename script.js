window.onload = (function(){


            window.addEventListener("load", init, false);
            var counter = 0;
            var initialTop = 400;
            var initialLeft = 200;
            var goalFlag = false;
            function init() {
                
                var ball = document.getElementById("ball");
                var counterEl = document.getElementById("counter");

                ball.addEventListener("mousedown", function (e) {
                    drag(this, e);
                })
                ball.ondragstart = function() {
                    return false;
                };
                var hool = document.getElementById("hool");
                hool.addEventListener("mouseover", function (e) {
                    checkGoal(this, ball, counterEl, e);
                })

            }

            function checkGoal(hoolElement, ballElement, counterElement, event) {

                var ballTop = ballElement.offsetTop;

                var hoolTop = hoolElement.offsetTop;
                var hoolLeft = hoolElement.offsetLeft;
                var hoolRight = hoolElement.offsetLeft + hoolElement.offsetWidth;
                var ballLeft = ballElement.offsetLeft;
                var ballBottom = ballTop + ballElement.offsetHeight;
                var ballRight = ballElement.offsetLeft + ballElement.offsetWidth;

                console.log("hoolTop: " + hoolTop);
                console.log("ballTop " + ballTop);
                console.log("ballBottom: " + ballBottom);
                console.log("hoolLeft: " + hoolLeft);
                console.log("ballLeft" + ballLeft);
                console.log("hoolRight" + hoolRight);
                console.log("ballRight" + ballRight);
                if (hoolTop < ballBottom && hoolTop > ballTop && hoolLeft < ballLeft && hoolRight > ballRight && !goalFlag) {
                    goalFlag = true;
                    document.getElementById("status").innerHTML = "GOAL! Please, release ball to continue.";
                    registerGoal(counterElement);
                    document.addEventListener("mouseup", goalHendler, true);
                }
            }

            function goalHendler(e) {
                ball.style.left = initialLeft + "px";
                ball.style.top = initialTop + "px";
                goalFlag = false;
                document.getElementById("status").innerHTML = "";
                document.removeEventListener("mouseup", goalHendler, true);
            }

            function registerGoal(counterElement) {
                counterElement.innerHTML = "score: " + ++counter;
            }

            function drag(elementToDrag, event) {
                // координаты мыши в начале перетаскивания.
                var startX = event.clientX,
                    startY = event.clientY;

                // начальные координаты элемента, который будет перемещаться.
                var origX = elementToDrag.offsetLeft,
                    origY = elementToDrag.offsetTop;

                // разница между координатами мыши и координатами перетаскиваемого элемента.
                var deltaX = startX - origX,
                    deltaY = startY - origY;

                // Регистрация событий mouseup и mousemove
                document.addEventListener("mousemove", moveHandler, true);
                document.addEventListener("mouseup", upHandler, true);

                function moveHandler(e) {
                    if (!e) e = window.event;
                    var elem = document.getElementById("ball");
                    var ball = document.getElementById("ball");
                    //console.log(ball.offsetLeft + ball.offsetWidth);
                    //console.log(elem.offsetTop);
                    // перемещаем элемент с учетом отступа от первоначального клика.
                    elementToDrag.style.left = (e.clientX - deltaX) + "px";
                    elementToDrag.style.top = (e.clientY - deltaY) + "px";
                }

                function upHandler(e) {
                    if (!e) e = window.event; 
                    document.removeEventListener("mouseup", upHandler, true);
                    document.removeEventListener("mousemove", moveHandler, true);
                }
            }
        }
        )()