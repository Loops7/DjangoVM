function Vector(x, y) {
	this.x = x;
	this.y = y;
}

function Particle(m, v, x, y) {
	this.mass = m;
	this.velocity = v;
	this.x = x;
	this.y = y;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.absorb = absorbParticle;
	this.paint = paintParticle;
}

function absorbParticle(p) {
	this.velocity.x = (this.velocity.x * this.mass + p.velocity.x * p.mass) / (this.mass + p.mass);
	this.velocity.y = (this.velocity.y * this.mass + p.velocity.y * p.mass) / (this.mass + p.mass);
	this.x = (this.x * this.mass + p.x * p.mass) / (this.mass + p.mass);
	this.y = (this.y * this.mass + p.y * p.mass) / (this.mass + p.mass);
	this.mass += p.mass;
	if (this.mass < p.mass) {
		this.color = p.color;
	}
}

function paintParticle() {
	var ctx = $("#canvas")[0].getContext("2d");
	var radius = Math.pow(Math.log(this.mass) + 1, 2) / 5;
	ctx.beginPath();
	ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.color;
	ctx.fill();
}

function paintParticles(p) {
	for (var i = 0; i < p.length; i++) {
		p[i].paint();
	}
}

function gravityCalc(p) {
	for (var i = 0; i < p.length; i++) {
		forceSum = new Vector(0, 0);
		for (var j = 0; j < p.length; j++) {
			if (j != i) {
				var xDist = p[i].x - p[j].x;
				var yDist = p[i].y - p[j].y;
				var distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
				if (distance == 0) {
					p[i].absorb(p[j]);
					p.splice(j, 1);
				} else {
					var forceMag = (p[i].mass * p[j].mass) / Math.pow(distance, 2);
					var nextStep = forceMag / p[i].mass + forceMag / p[j].mass;
					if (distance < nextStep) {
					  p[i].absorb(p[j]);
					  p.splice(j, 1);
					} else {
  					forceSum.x -= Math.abs(forceMag * (xDist / distance)) * Math.sign(xDist);
  					forceSum.y -= Math.abs(forceMag * (yDist / distance)) * Math.sign(yDist);
					}
				}
			}
		}
		p[i].velocity.x += forceSum.x / p[i].mass;
		p[i].velocity.y += forceSum.y / p[i].mass;
	}
	for (var i = 0; i < p.length; i++) {
		p[i].x += p[i].velocity.x / 10;
		p[i].y += p[i].velocity.y / 10;
	}
}	