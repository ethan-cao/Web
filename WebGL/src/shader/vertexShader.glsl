// use medium precision on float
precision mediump float;

// attribute is the input for vertexShader
attribute vec3 position;   // vec3: vector of 3 components, xyz
attribute vec3 color;      // vec4: vector of 4 components, RGBA

// varying is the output from vertexShader to fragmentShader
varying vec3 fragColor;

// shared variables between shaders
// mat4: 4*4 matrix
uniform mat4 worldMatrix;  // rotate in 3D space 
uniform mat4 viewMatrix;   // camera position
uniform mat4 projectionMatrix;

// all shaders have a main function
void main() {
  // gl_Position is global var, which is used as the output of vertexShader
  // operaton happens from right to left
  gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(position, 1);

  // fragColor is sent to fragmentShader
  fragColor = color;
}