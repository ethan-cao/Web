import { compileShader, createProgram } from "./utils.js"

const canvas = document.querySelector('#canvas')
const gl = canvas.getContext('webgl2')

if (!gl) {
  throw('No webGL 2 support')
}

const vertexShader = await compileShader(gl, 'src/shader/vertexShader.glsl', gl.VERTEX_SHADER)
const fragmentShader = await compileShader(gl, 'src/shader/fragmentShader.glsl', gl.FRAGMENT_SHADER)
const program = createProgram(gl, vertexShader, fragmentShader)


// vertex data, accessible by CPU, but not GPU
const vertices = [
  //x,    y,    z,    R,    G,    B
  0, 1, 0, 1.0, 1.0, 0.0,
  1, -1, 0, 0.7, 0.0, 1.0,
  -1, -1, 0, 0.1, 1.0, 0.6,
];

// create buffer, accessible by GPU   
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
gl.vertexAttribPointer(
  positionAttributeLocation,  // attribute location
  3,                          // number of elements per attribute (x, y, z)
  gl.FLOAT,                   // type of element
  gl.FALSE,                   // is data normalized
  6 * Float32Array.BYTES_PER_ELEMENT, // size of each vertex (x, y, z, R, G, B)
  0                           // offset from the beginning of a vertex to this attribute
)
gl.vertexAttribPointer(
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