// use medium precision on float
precision mediump float;

// attribute is the input for vertexShader
attribute vec3 position;   // vec3: vector of 3 components, xyz
attribute vec4 color;      // vec4: vector of 4 components, RGBA

// varying is the output from vertexShader
varying vec4 fragColor;

// shared variable, between shaders
uniform float screenWidth;

// all shaders have a main function
void main() {
  // gl_Position is global var, which is used as the output of vertexShader
  gl_Position = vec4(position, 1);
  // gl_Position = vec4(1.0, 0.0, 0.0, 1.0);

  // fragColor is sent to fragmentShader
  fragColor = color;
}