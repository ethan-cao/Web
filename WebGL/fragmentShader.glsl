// use medium precision on float
precision mediump float;

// varying fragColor is the input for fragmentShader
varying vec3 fragColor;
 
void main() {
  // a fragment shader is responsible for setting gl_FragColor
  gl_FragColor = vec4(fragColor, 1); 
}