/* © 2012 Artem Sapegin http://sapegin.me */

/* eslint-disable */

var SeedableRandom = require('../vendor/gamesoup/random');
var Sprite = require('../vendor/gamesoup/sprite');
var collide = require('../vendor/gamesoup/collisions');
var JSGameSoup = require('../vendor/gamesoup/jsgamesoup');

/*global JSGameSoup:false, Sprite:false, SeedableRandom:false, collide:false */

// http://youmightnotneedjquery.com/#fade_in
function fadeIn(el, duration) {
	el.style.opacity = 0;

	var last = +new Date();
	var tick = function() {
		el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
		last = +new Date();

		if (+el.style.opacity < 1) {
			requestAnimationFrame(tick);
		}
	};

	tick();
}

var WORLD_WIDTH = 1600,
	PLAYGROUND_WIDTH,
	PLAYGROUND_HEIGHT = 201,
	DIR = '/build/images/embeds/ironman/',
	SPIDERS = [
		[522, 77],
		[649, 60],
		[869, 62],
		[1048, 60]
	],
	BLOOD_DROPS = 3,
	BG_COLOR = '#000';

var r = getRandomGenerator(),
	canvasElem = getCanvas(),
	gs = new JSGameSoup(canvasElem, 30);

// Preload sprites
Sprite.preload([
		DIR + 'map.png',
		DIR + 'sceleton_right.png',
		DIR + 'sceleton_left.png',
		DIR + 'sceleton_walk-right_1.png',
		DIR + 'sceleton_walk-right_2.png',
		DIR + 'sceleton_walk-left_1.png',
		DIR + 'sceleton_walk-left_2.png',
		DIR + 'enemy_right.png',
		DIR + 'enemy_left.png',
		DIR + 'enemy_walk-right_1.png',
		DIR + 'enemy_walk-right_2.png',
		DIR + 'enemy_walk-left_1.png',
		DIR + 'enemy_walk-left_2.png',
		DIR + 'spider.png'
	],
	// Create the world when all sprites loaded
	function() {
		gs.addEntity(new World());
		fadeIn(canvasElem, 1200);
	}
);

if (gs) {
	gs.launch();
}


/**
 * Labyrinth
 */
function Labyrinth(world) {
	var sprite = new Sprite(['left', 'top'], {
			'normal': [[DIR + 'map.png', 0]]
		},
		function() {
			sprite.action('normal');
		}
	);

	this.draw = function(ctx) {
		sprite.draw(ctx, world.camera([0, 0]));
	};
}


/**
 * Player
 */
function Player(world) {
	this.type = 'player';

	var WALK_FRAMES = 3,
		WALK_VX = 3,
		MIN_X = 218,
		MAX_X = 1358;

	var pos = this.pos = [360, 189],
		vx = 0;  // Velocity

	var sprite = new Sprite(['center', 'bottom'], {
			'stand': [
				[DIR + 'sceleton_right.png', 0]
			],
			'stand left': [
				[DIR + 'sceleton_left.png', 0]
			],
			'walk right': [
				[DIR + 'sceleton_walk-right_1.png', WALK_FRAMES],
				[DIR + 'sceleton_walk-right_2.png', WALK_FRAMES]
			],
			'walk left': [
				[DIR + 'sceleton_walk-left_1.png', WALK_FRAMES],
				[DIR + 'sceleton_walk-left_2.png', WALK_FRAMES]
			]
		},
		function() {
			sprite.action('stand');
		}
	);

	this.draw = function(ctx) {
		sprite.draw(ctx, world.camera(pos));
	};

	this.updateanimation = function() {
		chooseWalkingSprite(vx, WALK_VX, sprite);
	};

	this.update = function() {
		if ((pos[0] + vx < MIN_X) || (pos[0] + vx > MAX_X)) vx = 0;
		pos[0] += vx;
		this.updateanimation();
		sprite.update();
	};

	// Return the bounding box of our sprite for the collision test
	this.get_collision_aabb = function() {
		return sprite.aabb(pos);
	};

	this.collide_aabb = function(who) {
		if (who.type === 'spider')
			damage();
	};


	/* Input events */

	this.keyDown_37 = function() {
		this.updateanimation();
		vx = -WALK_VX;
	};

	this.keyDown_39 = function() {
		this.updateanimation();
		vx = WALK_VX;
	};

	this.keyUp_37 = this.keyUp_39 = function() {
		this.updateanimation();
		vx = 0;
	};

	function damage() {
		var forward = true,
			frame = 0,
			velocity = 80;

		sprite.filter(function(data) {
			frame += forward ? 1 : -1;
			var offset = frame * velocity,
				done = true;

			if (!offset)
				return false;

			for (var i = 0; i < data.length; i += 4) {
				if (data[i] + data[i+1] + data[i+2]) {
					data[i] += offset;
					data[i+1] -= offset;
					data[i+2] -= offset;

					if (forward) {
						if (data[i] !== 255 ||data[i+1] + data[i+2] !== 0)
							done = false;
					}
				}
			}

			if (done) {
				forward = false;
			}
			return data;
		});
	}
}


/**
 * Enemy
 */
function Enemy(world) {
	this.type = 'enemy';

	var WALK_FRAMES = 6,
		WALK_VX = 1,
		MIN_X = 1430,
		MAX_X = 1550;

	var pos = this.pos = [1440, 189],
		vx = WALK_VX;  // Velocity

	var sprite = new Sprite(['center', 'bottom'], {
			'stand': [
				[DIR + 'enemy_right.png', 0]
			],
			'stand left': [
				[DIR + 'enemy_left.png', 0]
			],
			'walk right': [
				[DIR + 'enemy_walk-right_1.png', WALK_FRAMES],
				[DIR + 'enemy_walk-right_2.png', WALK_FRAMES]
			],
			'walk left': [
				[DIR + 'enemy_walk-left_1.png', WALK_FRAMES],
				[DIR + 'enemy_walk-left_2.png', WALK_FRAMES]
			]
		},
		function() {
			sprite.action('walk right');
		}
	);

	this.draw = function(ctx) {
		sprite.draw(ctx, world.camera(pos));
	};

	this.updateanimation = function() {
		chooseWalkingSprite(vx, WALK_VX, sprite);
	};

	this.update = function() {
		if ((pos[0] + vx < MIN_X) || (pos[0] + vx > MAX_X)) vx = -vx;
		pos[0] += vx;
		this.updateanimation();
		sprite.update();
	};
}


/**
 * Spider
 */
function Spider(world, pos) {
	this.type = 'spider';

	var MIN_Y = pos[1],
		MAX_Y = 150,
		INNER_OFFSET = 8,
		WEB_COLOR = '#aaa';

	var vy = 1;

	// Random initial position
	pos[1] = r.nextInt(MIN_Y, MAX_Y);

	var sprite = new Sprite(['center', 'top'], {
			'normal': [[DIR + 'spider.png', 0]]
		},
		function() {
			sprite.action('normal');
		}
	);

	this.draw = function(ctx) {
		ctx.save();
		ctx.fillStyle = WEB_COLOR;
		var x = pos[0] - world.cameraX;
		ctx.fillRect(x, MIN_Y, 1, pos[1] + INNER_OFFSET - MIN_Y);
		sprite.draw(ctx, world.camera([pos[0] + 1, pos[1]]));
		ctx.restore();
	};

	this.update = function() {
		if ((pos[1] + vy < MIN_Y) || (pos[1] + vy > MAX_Y)) vy = -vy;
		pos[1] += vy;
		sprite.update();
	};

	// Return the bounding box of our sprite for the collision test
	this.get_collision_aabb = function() {
		return sprite.aabb(pos);
	};
}


/**
 * Falling drop
 */
function Drop(world, options) {
	this.type = 'drop';

	var MIN_Y = options.minY,
		MAX_Y = 190;

	var vy = 0.75,
		pos = [options.x, MIN_Y],
		paused = false;

	this.draw = function(ctx) {
		ctx.save();
		ctx.fillStyle = options.color;
		ctx.fillRect(pos[0] - world.cameraX, pos[1], 1, 1);
		ctx.restore();
	};

	this.update = function() {
		if (pos[1] + vy > MAX_Y) {
			pos[1] = MIN_Y;
			if (!isNaN(options.minPause) && !isNaN(options.maxPause)) {
				paused = true;
				setTimeout(function() {
					paused = false;
				}, r.nextInt(options.minPause, options.maxPause));
			}
		}
		else if (!paused) {
			pos[1] += vy;
		}
	};
}


/**
 * World
 */
function World() {
	var that = this;

	// Camera position
	this.cameraX = 260;
	var CAMERA_THRESHOLD = 100,
		CAMERA_STEP = 3;

	// Entities
	var player = new Player(this),
		spiders = [];

	// Defines a simple screen-relative camera method
	this.camera = function(pos) {
		return [pos[0] - this.cameraX, pos[1]];
	};

	this.init = function() {
		function addDrop() {
			gs.addEntity(new Drop(that, { x: 157, minY: 16, color: '#a00', minPause: 0, maxPause: 1000 }));
		}

		// Background
		gs.addEntity(new Labyrinth(that));
		// Water drop
		gs.addEntity(new Drop(that, { x: 486, minY: 50, color: '#5656fd', minPause: 200, maxPause: 2000 }));
		// Blood drops
		for (var dropIdx = 1; dropIdx <= BLOOD_DROPS; dropIdx++) {
			setTimeout(addDrop, r.nextInt(dropIdx * 1000, dropIdx * 1000 + 1000));
		}
		// Player
		gs.addEntity(player);
		// Enemy
		gs.addEntity(new Enemy(that));
		// Spiders
		for (var spiderIdx = 0; spiderIdx < SPIDERS.length; spiderIdx++) {
			var spider = new Spider(that, SPIDERS[spiderIdx]);
			gs.addEntity(spider);
			spiders.push(spider);
		}
	};

	this.draw = function() {
		gs.background(BG_COLOR);
	};

	this.update = function() {
		// Collisions
		collide.aabb([player], spiders);

		// Camera position
		var x = player.pos[0] - this.cameraX;
		if (x > gs.width - CAMERA_THRESHOLD) {
			this.cameraX += CAMERA_STEP;
		}
		else if (x < CAMERA_THRESHOLD) {
			this.cameraX -= CAMERA_STEP;
		}

		// Detect window resize
		if (gs.width + this.cameraX > WORLD_WIDTH - CAMERA_THRESHOLD)
			 this.cameraX = WORLD_WIDTH - CAMERA_THRESHOLD - gs.width;
	};

	// Mouse/touch detection
	this.pointerDown = function() {
		if (gs.pointerPosition[0] < player.pos[0] - this.cameraX)
			player.keyDown_37();
		else
			player.keyDown_39();
	};

	this.pointerUp = function() {
		player.keyUp_37();
	};

	this.pointerBox = function() {
		return [0, 0, gs.width, gs.height];
	};
}


/**
 * Canvas initialization
 */
function getCanvas() {
	var container = document.getElementById('IronMan'),
		canvas = document.createElement('canvas');

	resizeCanvas(container, canvas);
	container.appendChild(canvas);

	window.addEventListener('resize', function() {
		resizeCanvas(container, canvas);
	});

	return canvas;
}


/**
 * Resizes canvas according to container width
 */
function resizeCanvas(container, canvas) {
	PLAYGROUND_WIDTH = container.offsetWidth;
	canvas.style.width = canvas.width = PLAYGROUND_WIDTH;
	canvas.style.height = canvas.height = PLAYGROUND_HEIGHT;

	if (gs) gs.width = PLAYGROUND_WIDTH;
}


/**
 * Seedable random number generator
 */
function getRandomGenerator() {
	var r = new SeedableRandom();
	r.seed((new Date()).getTime());
	return r;
}

/**
 */
function chooseWalkingSprite(vx, walkX, sprite) {
	if (vx >= walkX) {
		sprite.action('walk right');
	}
	else if (vx <= -walkX) {
		sprite.action('walk left');
	}
	else {
		var action = sprite.get_action();
		if (action === 'walk right')
			sprite.action('stand');
		else if (action === 'walk left')
			sprite.action('stand left');
	}
}
