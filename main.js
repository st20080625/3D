class vec3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    add(x, y, z) {
      return new vec3D(this.x + x, this.y + y, this.z + z);
    }
  
    sub(x, y, z) {
      return new vec3D(this.x - x, this.y - y, this.z - z);
    }
  
    mul(scalar) {
      return new vec3D(this.x * scalar, this.y * scalar, this.z * scalar);
    }
  
    div(scalar) {
      return new vec3D(this.x / scalar, this.y / scalar, this.z / scalar);
    }
  
    rotate(axis, angle) {
      let rad = radians(angle);
      if (axis == "x") {
        return new vec3D(
          this.x,
          this.y * cos(rad) - this.z * sin(rad),
          this.y * sin(rad) + this.z * cos(rad)
        );
      } else if (axis == "y") {
        return new vec3D(
          this.x * cos(rad) + this.z * sin(rad),
          this.y,
          -this.x * sin(rad) + this.z * cos(rad)
        );
      } else if (axis == "z") {
        return new vec3D(
          this.x * cos(rad) - this.y * sin(rad),
          this.x * sin(rad) + this.y * cos(rad),
          this.z
        );
      }
    }
    scale_factor() {
      return 500 / (this.z + 500);
    }
    draw_line(line_color) {
      push();
      stroke(line_color);
      let scale_factor = this.scale_factor();
      line(
        width / 2,
        height / 2,
        (this.x * 100 + width / 2) / scale_factor,
        (-this.y * 100 + height / 2) / scale_factor
      );
      pop();
    }
  }
  
  function setup() {
    createCanvas(400, 400);
  
    axis_x = new vec3D(1, 0, 0);
    axis_y = new vec3D(0, 1, 0);
    axis_z = new vec3D(0, 0, 1);
  }
  let angle_x = 0;
  let angle_y = 0;
  let angle_z = 0;
  function draw() {
    background(220);
  
    angle_x=0;
    angle_y++;
    angle_z++;
   
    /**
    angle_x = 0
    angle_y = 0
    angle_z = 0
    **/
    axis_x
      .rotate("x", angle_x)
      .rotate("y", angle_y)
      .rotate("z", angle_z)
      .draw_line("red");
    axis_y
      .rotate("x", angle_x)
      .rotate("y", angle_y)
      .rotate("z", angle_z)
      .draw_line("blue");
    axis_z
      .rotate("x", angle_x)
      .rotate("y", angle_y)
      .rotate("z", angle_z)
      .draw_line("green");
    push()
    strokeWeight(0.1)
    line(0, height / 2, width, height / 2);
    line(width/2,0,width/2,height)
    pop()
  }
  