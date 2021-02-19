(function () {
    const canvas = document.getElementById("canvas");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ctx = canvas.getContext("2d");

    const range = document.getElementById("range");
    const rangeLabel = document.getElementById("rangeLabel");
    const button = document.getElementById("button");

    rangeLabel.innerText = range.value;
    range.addEventListener("input", (e) => {
        rangeLabel.innerText = range.value;
    });

    button.addEventListener("click", () => growTree(+range.value));

    function growTree(height) {
        clearCanvas();

        let trunk = [
            {
                x: canvasWidth / 2,
                y: canvasHeight - range.value * 20,
                angle: -90,
            },
        ];

        let counter = 1;

        let i = setInterval(function () {
            clearCanvas();
            growTrunk(trunk, counter);
            growStructure(trunk, counter);
            counter++;
            if (counter === height) {
                clearInterval(i);
            }
        }, 500);
    }

    function growStructure(startPoints, level) {
        let endPoints = [];
        if (level > 0) {
            for (let startPoint of startPoints) {
                endPoints = calculateEndPoints(
                    startPoint.x,
                    startPoint.y,
                    startPoint.angle,
                    level
                );
                for (let endPoint of endPoints) {
                    drawLine(
                        startPoint.x,
                        startPoint.y,
                        endPoint.x,
                        endPoint.y,
                        level
                    );
                    if (level < 3) {
                        growLeaf(endPoint);
                    }
                }
                growStructure(endPoints, level - 1);
            }
        }
    }

    function calculateEndPoints(x, y, angle, length) {
        let angleOffset = getRandomNum(5, 45);
        let lengthOffset = getRandomNum(-10, 10);
        return [
            {
                x:
                    x +
                    (length * 10 + lengthOffset) *
                        Math.cos(((angle + angleOffset) * Math.PI) / 180),
                y:
                    y +
                    (length * 10 + lengthOffset) *
                        Math.sin(((angle + angleOffset) * Math.PI) / 180),
                angle: angle + angleOffset,
            },
            {
                x:
                    x +
                    (length * 10 + lengthOffset) *
                        Math.cos(((angle - angleOffset) * Math.PI) / 180),
                y:
                    y +
                    (length * 10 + lengthOffset) *
                        Math.sin(((angle - angleOffset) * Math.PI) / 180),
                angle: angle - angleOffset,
            },
        ];
    }

    function growTrunk(trunkPoint, width) {
        let { x, y } = trunkPoint[0];
        ctx.lineWidth = width;
        ctx.strokeStyle = "brown";
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }

    function growLeaf(point) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(point.x, point.y, 4, point.angle, point.angle + Math.PI);
        ctx.fill();
    }

    function drawLine(x1, y1, x2, y2, width) {
        ctx.lineWidth = width;
        ctx.strokeStyle = "brown";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
    }

    function getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
})();
