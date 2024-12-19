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
    return {
      x: (this.x * 100 + width / 2) / scale_factor,
      y: (-this.y * 100 + height / 2) / scale_factor,
      z: this.z,
    };
  }
}

function collect_triangle(v1, v2, v3, color) {
  return {
    vertices: [v1, v2, v3],
    color: color,
    z: (v1.z + v2.z + v3.z) / 3,
  };
}

let axis_x, axis_y, axis_z;
let slider_x, slider_y, slider_z;
let triangles = [];

function setup() {
  createCanvas(400, 400);

  axis_x = new vec3D(1, 0, 0);
  axis_y = new vec3D(0, 1, 0);
  axis_z = new vec3D(0, 0, 1);

  slider_x = createSlider(-360, 360, 0, 1);
  slider_y = createSlider(-360, 360, 0, 1);
  slider_z = createSlider(-360, 360, 0, 1);
}

function draw() {
  background(220);
  let origin = new vec3D(0, 0, 0);
  let angle_x = slider_x.value();
  let angle_y = slider_y.value();
  let angle_z = slider_z.value();

  let x_pos = axis_x
    .rotate("x", angle_x)
    .rotate("y", angle_y)
    .rotate("z", angle_z);
  let y_pos = axis_y
    .rotate("x", angle_x)
    .rotate("y", angle_y)
    .rotate("z", angle_z);
  let z_pos = axis_z
    .rotate("x", angle_x)
    .rotate("y", angle_y)
    .rotate("z", angle_z);

  triangles = [];
  triangles.push(collect_triangle(origin, x_pos, y_pos, "red"));
  triangles.push(collect_triangle(origin, y_pos, z_pos, "blue"));
  triangles.push(collect_triangle(origin, x_pos, z_pos, "green"));
  triangles.push(collect_triangle(x_pos, y_pos, z_pos, "yellow"));

  triangles.sort((a, b) => b.z - a.z);

  for (let tri of triangles) {
    push();
    fill(tri.color);
    noStroke();
    let v1 = tri.vertices[0];
    let v2 = tri.vertices[1];
    let v3 = tri.vertices[2];
    let scale_factor_1 = v1.scale_factor();
    let scale_factor_2 = v2.scale_factor();
    let scale_factor_3 = v3.scale_factor();
    triangle(
      (v1.x * 100 + width / 2) / scale_factor_1,
      (-v1.y * 100 + height / 2) / scale_factor_1,
      (v2.x * 100 + width / 2) / scale_factor_2,
      (-v2.y * 100 + height / 2) / scale_factor_2,
      (v3.x * 100 + width / 2) / scale_factor_3,
      (-v3.y * 100 + height / 2) / scale_factor_3
    );
    pop();
  }

  //x_pos.draw_line("red");
  //y_pos.draw_line("blue");
  //z_pos.draw_line("green");

  push();
  strokeWeight(0.1);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  pop();
}
