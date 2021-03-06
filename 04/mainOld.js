'use strict'
const CIRCLE = Math.PI * 2;
const degreesToRadians = (degrees) => degrees * Math.PI / 180;

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


const level = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const WORLD = {
    sizeBlock: 10,
    playerRadius: 8
}

class Bitmap {
    constructor(src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    }
}

class Control {
    constructor() {
        this.codes = {
            37: 'left',
            39: 'right',
            38: 'forward',
            40: 'backward',
            87: 'forward',
            83: 'backward',
            65: 'leftward',
            68: 'rightward'
        };
        this.status = {
            'left': false,
            'right': false,
            'forward': false,
            'backward': false,
            'leftward': false,
            'rightward': false,
        };
        document.addEventListener('keydown', this.onKey.bind(this, true), false);
        document.addEventListener('keyup', this.onKey.bind(this, false), false);
    }

    onKey(val, e) {
        let state = this.codes[e.keyCode];
        if (typeof state === 'undefined') return;
        this.status[state] = val;
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
    }
}

class Player {

    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.rot = Math.PI * 0.4;
        this.speed = 4;
    }

    walk(distance) {
        let dx = Math.cos(this.direction) * distance;
        let dy = Math.sin(this.direction) * distance;

        let radiusPlaterInMap = WORLD.playerRadius / WORLD.sizeBlock;
        let collisionX = dx > 0 ? radiusPlaterInMap : -radiusPlaterInMap;
        let collisionY = dy > 0 ? radiusPlaterInMap : -radiusPlaterInMap;

        if (map.collision(this.x + collisionX, this.y) <= 0) this.x += dx;
        if (map.collision(this.x, this.y + collisionY) <= 0) this.y += dy;
    }

    strafe(distance) {
        let dx = Math.cos(this.direction - Math.PI / 2) * distance;
        let dy = Math.sin(this.direction - Math.PI / 2) * distance;

        let radiusPlaterInMap = WORLD.playerRadius / WORLD.sizeBlock;
        let collisionX = dx > 0 ? radiusPlaterInMap : -radiusPlaterInMap;
        let collisionY = dy > 0 ? radiusPlaterInMap : -radiusPlaterInMap;

        if (map.collision(this.x + collisionX, this.y) <= 0) this.x += dx;
        if (map.collision(this.x, this.y + collisionY) <= 0) this.y += dy;
    }

    rotate(angle) {
        this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
    }

    update(seconds) {
        if (controls.status.left) this.rotate(-this.rot * seconds);
        if (controls.status.right) this.rotate(this.rot * seconds);
        if (controls.status.forward) this.walk(this.speed * seconds);
        if (controls.status.backward) this.walk(-this.speed * seconds);
        if (controls.status.leftward) this.strafe(this.speed * seconds);
        if (controls.status.rightward) this.strafe(-this.speed * seconds);
    }
}

class Map {
    constructor() {
        this.wallTexture = [, [new Bitmap('assets/wall_texture1.jpg', 1024, 1024), 1],
            [new Bitmap('assets/wall_texture2.jpg', 1024, 1024), 2],
            [new Bitmap('assets/wall_texture3.png', 1024, 1024), 3],
            [new Bitmap('assets/wall_texture4.png', 256, 256), 0.3],
            [new Bitmap('assets/wall_texture5.png', 1024, 1024), 0.5],
            [new Bitmap('assets/wall_texture1.jpg', 1024, 1024), 1]
        ]
        this.width = level[0].length;
        this.height = level.length;
    }
    update(s) {}

    castRay(angle, range) {
        //
        // castRay(angle, range) {
        //     const sin = Math.sin(angle);
        //     const cos = Math.cos(angle);
        //     const tan = sin / cos;
        //     const cot = cos / sin;
        //     const range2 = range ** 2;
        //     let hit = [];
        //
        //     let currentX = player.x;
        //     let currentY = player.y;
        //
        //     let distance = 0;
        //
        //     while (distance < range) {
        //         let dxx = cos > 0 ? Math.floor(currentX + 1) - currentX :
        //             Math.ceil(currentX - 1) - currentX;
        //         let dxy = dxx * tan;
        //         let lengthX2 = dxx * dxx + dxy * dxy;
        //
        //         let dyx = sin > 0 ? Math.floor(currentY + 1) - currentY :
        //             Math.ceil(currentY - 1) - currentY;
        //         let dyy = dyx * cot;
        //         let lengthY2 = dyx * dyx + dyy * dyy;
        //
        //         let collisionX = 0;
        //         let collisionY = 0;
        //
        //         if (lengthX2 < lengthY2) {
        //             currentX += dxx;
        //             currentY += dxy;
        //             distance += Math.sqrt(lengthX2);
        //             collisionX = cos < 0 ? 1 : 0;
        //         } else {
        //             currentX += dyy;
        //             currentY += dyx;
        //             distance += Math.sqrt(lengthY2);
        //             collisionY = sin < 0 ? 1 : 0;
        //         }
        //
        //         let collision = this.collision(currentX - collisionX,
        //             currentY - collisionY);
        //
        //         if (collision === -1) {
        //             break;
        //         } else if (collision != 0) {
        //             hit.push({
        //                 x: currentX,
        //                 y: currentY,
        //                 distance: distance,
        //                 wall: collision
        //             })
        //         }
        //
        //     }
        //     // console.log(distance, range)
        //     // xxx
        //
        //     if (hit.length != 0) {
        //       return hit;
        //     } else {
        //       let  x= range * cos;
        //       let y = range * sin;
        //       return [{
        //         x: player.x + x,
        //         y: player.y + y,
        //         distance: Math.sqrt(x*x + y*y),
        //         wall: -1
        //       }]
        //     }
        //     return hit;
        // }
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var noWall = {
            length2: Infinity
        };
        return ray({
            x: player.x,
            y: player.y,
            height: 0,
            distance: 0
        });

        function ray(origin) {
            var stepX = step(sin, cos, origin.x, origin.y);
            var stepY = step(cos, sin, origin.y, origin.x, true);
            var nextStep = stepX.length2 < stepY.length2 ?
                inspect(stepX, 1, 0, origin.distance, stepX.y) :
                inspect(stepY, 0, 1, origin.distance, stepY.x);
            if (nextStep.distance > range) return [origin];
            return [origin].concat(ray(nextStep));
        }

        function step(rise, run, x, y, inverted) {
            if (run === 0) return noWall;
            var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
            var dy = dx * (rise / run);
            return {
                x: inverted ? y + dy : x + dx,
                y: inverted ? x + dx : y + dy,
                length2: dx * dx + dy * dy
            };
        }

        function inspect(step, shiftX, shiftY, distance, offset) {
            var dx = cos < 0 ? shiftX : 0;
            var dy = sin < 0 ? shiftY : 0;
            step.height = map.collision(step.x - dx, step.y - dy);
            step.distance = distance + Math.sqrt(step.length2);
            if (shiftX) step.shading = cos < 0 ? 2 : 0;
            else step.shading = sin < 0 ? 2 : 1;
            step.offset = offset - Math.floor(offset);
            return step;
        }
    }

    collision(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) return -1;
        return level[x][y];
    }
}

class Camera {
    constructor() {
        this.width = 600;
        this.height = this.width / 16 * 9;
        this.focalLength = 0.8;
        this.resolution = this.width;
        // Если расстояние меньше - ошибка из-за того что нет найденной стенки
        this.rayLength = 37;
    }

    drawRay(startX, startY, endX, endY, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.closePath();
        ctx.stroke();
    }

    renderRays() {
        for (let column = 0; column <= this.resolution; column++) {
            // -0.5 < x < 0.5
            let x = column / this.resolution - 0.5;
            let angle = player.direction + Math.atan2(x, this.focalLength);

            var ray = map.castRay(angle, this.rayLength);
            var hit = -1;
            while (++hit < ray.length && ray[hit].height <= 0);
            // console.log(ray)
            // xxx

            let playerX = player.x * WORLD.sizeBlock;
            let playerY = player.y * WORLD.sizeBlock;

            this.drawRay(
                playerX,
                playerY,
                ray[hit].x * WORLD.sizeBlock,
                ray[hit].y * WORLD.sizeBlock,
                "rgba(33, 243, 100, .2)"
            )
        }
    }

    renderPlayer() {
        let x = player.x * WORLD.sizeBlock;
        let y = player.y * WORLD.sizeBlock;

        ctx.fillStyle = "#F4511E";
        ctx.beginPath();
        ctx.arc(x, y, WORLD.playerRadius, 0, CIRCLE, false);
        ctx.fill();

        let lineEndX = x + Math.cos(player.direction) * 40;
        let lineEndY = y + Math.sin(player.direction) * 40;
        this.drawRay(x, y, lineEndX, lineEndY, '#E64A19')
    }

    renderMap() {
        for (let y = 0; y < map.width; y++) {
            for (let x = 0; x < map.height; x++) {
                let wall = level[x][y];
                ctx.fillStyle = "#BDBDBD";
                if (wall > 0) {
                    ctx.fillRect(
                        x * WORLD.sizeBlock, // X
                        y * WORLD.sizeBlock, // Y
                        WORLD.sizeBlock, WORLD.sizeBlock // Width, Height
                    );

                }
            }
        }
    }

    renderWall() {

        for (let column = 0; column < this.resolution; column++) {
            // -0.5 < x < 0.5
            let x = column / this.resolution - 0.5;
            let angle = Math.atan2(x, this.focalLength);

            var ray = map.castRay(player.direction + angle, this.rayLength);

            for (var s = ray.length - 1; s >= 0; s--) {
                if (ray[s].height > 0) {
                    let texture = map.wallTexture[Math.trunc(ray[s].height)];

                    var z = ray[s].distance * Math.cos(angle);
                    var wallHeight = 1000 / z;
                    let top = (this.height - wallHeight) / 2 - wallHeight * (texture[1] - 1);
                    wallHeight *= texture[1];
                    let end = top + wallHeight;
                    let a = z * z / 300;
                    a = Math.min(1, a);

                    let textureX = Math.floor(texture[0].width * ray[s].offset);

                    ctx.globalAlpha = 1;

                    // console.log(texture[0].image, textureX, 0, 1, texture.height, column, top, 1, wallHeight);
                    ctx.drawImage(texture[0].image, textureX, 0, 1, texture[0].height, column, top, 1, wallHeight);

                    //     ctx.fillStyle = '#000000';
                    //     ctx.globalAlpha =  Math.min(a, 1);
                    //     ctx.fillRect(column, top-1, 1, wallHeight + 1);
                }

            }
        }
    }

    render(seconds) {
        ctx.clearRect(0, 0, this.width, this.height);
        this.renderWall();
    }
}
class GameLoop {
    constructor() {
        this.frame = this.frame.bind(this);
        this.lastTime = 0;
        this.callback = function() {};
    }

    start(callback) {
        this.callback = callback;
        requestAnimationFrame(this.frame);
    }
    frame(time) {
        let seconds = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (seconds < 0.2) this.callback(seconds);
        requestAnimationFrame(this.frame);
    };
}

let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");
let map = new Map();
let player = new Player(20, 14, degreesToRadians(-172));
let сamera = new Camera();
let controls = new Control();

canvas.width = сamera.width;
canvas.height = сamera.height;

let loop = new GameLoop();

window.addEventListener("load", loop.start(function(seconds) {
    // map.update(seconds);
    player.update(seconds);
    сamera.render();

    // Mouse rotate
    canvas.onclick = function() {
        if (canvas.getAttribute("lock") === null) {
            canvas.requestPointerLock();
            canvas.setAttribute("lock", "")

        }
    };

    document.addEventListener('pointerlockchange', lockChangeLog, false);

    function lockChangeLog() {
        if (document.pointerLockElement === canvas) {
            document.addEventListener("mousemove", mousemoveCallback, false);
        } else {
            document.removeEventListener("mousemove", mousemoveCallback, false);
            canvas.removeAttribute("lock")
        }
    }

    function mousemoveCallback(event) {
        player.direction += event.movementX * 0.00005;

    }
}));
