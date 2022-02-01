const canvas = document.querySelector('#test-canvas')
const gl = canvas.getContext('webgl')

if (!gl) {
  console.error('No webGL support')
}

// create shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

// load GLSL
const vertexShaderSource = document.querySelector("#vertex-shader").innerHTML;
const fragmentShaderSource = document.querySelector("#fragment-shader").innerHTML

// compile shader from glsl to shader
gl.shaderSource(vertexShader, vertexShaderSource)
gl.shaderSource(fragmentShader, fragmentShaderSource)
gl.compileShader(vertexShader)
gl.compileShader(fragmentShader)

// check if anything wrong with compiling shader
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error('ERROR compiling vertexShader, ', gl.getShaderInfoLog(vertexShader))
  // return
}

// check if anything wrong with compiling shader
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error('ERROR compiling fragmentShader, ', gl.getShaderInfoLog(fragmentShader))
  // return
}

// attach shaders to program
const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

// check if anything wrong with linking
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('ERROR linking program, ', gl.getShaderInfoLog(program))
  // return
}

// extra validation, not in production, only for testing
gl.validateProgram(program)
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUE)) {
  console.error('ERROR validating program, ', gl.getShaderInfoLog(program))
}




// vertex data, which is accessible by CPU, but not GPU
const vertices = [
 //x,    y,    z,    R,    G,    B
   0,    1,    0,    1.0,  1.0,  0.0,
   1,   -1,    0,    0.7,  0.0,  1.0,
  -1,   -1,    0,    0.1,  1.0,  0.6,
];

// create buffer
const buffer = gl.createBuffer()
// bind buffer to the bind point named gl.ARRAY_BUFFER, bind point is where data from CPU goes to GPU
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)  
// send vertices in CPU to buffer in GPU through gl.ARRAY_BUFFER
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)


// inform vertexShader how its attributes (input) gets value 
// get the location of attribute position (defined in vertexShader)
const positionAttributeLocation = gl.getAttribLocation(program, 'position') 
// get the location of attribute color (defined in vertexShader)
const colorAttributeLocation = gl.getAttribLocation(program, 'color')       
// load data from
gl.vertexAttribLocation(
  positionAttributeLocation,  // attribute location
  3,                          // number of elements per attribute (x, y, z)
  gl.FLOAT,                   // type of element
  gl.FALSE,                   // is data normalized
  6 * Float32Array.BYTES_PER_ELEMENT, // size of each vertex (x, y, z, R, G, B)
  0                           // offset from the beginning of a vertex to this attribute
)
gl.vertexAttribLocation(
  colorAttributeLocation,     // attribute location
  3,                          // number of elements per attribute (R, G, B)
  gl.FLOAT,                   // type of element
  gl.FALSE,                   // is data normalized
  6 * Float32Array.BYTES_PER_ELEMENT, // size of each vertex  (x, y, z, R, G, B)
  3 * Float32Array.BYTES_PER_ELEMENT   // offset from the beginning of a vertex to this attribute (x, y, z)
)
gl.enableVertexAttribArray(positionAttributeLocation)
gl.enableVertexAttribArray(colorAttributeLocation)


// draw
gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 3)