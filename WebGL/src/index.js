import { compileShader, createProgram } from "./utils.js"
import { mat4 } from 'gl-matrix'

const canvas = document.querySelector('#canvas')

if (!canvas) {
  throw('no canvas found')
}

const gl = canvas.getContext('webgl2')

if (!gl) {
  throw('No webGL 2 support')
}

const vertexShader = await compileShader(gl, 'vertex', gl.VERTEX_SHADER)
const fragmentShader = await compileShader(gl, 'fragment', gl.FRAGMENT_SHADER)
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
// specify in what order the attributes are stored in the buffer and what data type they are
gl.vertexAttribPointer(
  positionAttributeLocation,  // attribute location
  3,                          // number of elements per attribute (x, y, z)
  gl.FLOAT,                   // type of element
  gl.FALSE,                   // is data normalized
  6 * Float32Array.BYTES_PER_ELEMENT, // stride, size of each vertex (x, y, z, R, G, B), the total byte length of all attributes for one vertex
  0                           // offset from the beginning of a vertex to this attribute
)
// tell WebGL that this attribute should  be filled with data from array buffer
gl.enableVertexAttribArray(positionAttributeLocation)


const colorAttributeLocation = gl.getAttribLocation(program, 'color')
gl.vertexAttribPointer(
  colorAttributeLocation,     // attribute location
  3,                          // number of elements per attribute (R, G, B)
  gl.FLOAT,                   // type of element
  gl.FALSE,                   // is data normalized
  6 * Float32Array.BYTES_PER_ELEMENT, // size of each vertex  (x, y, z, R, G, B)
  3 * Float32Array.BYTES_PER_ELEMENT   // offset from the beginning of a vertex to this attribute (x, y, z)
)
gl.enableVertexAttribArray(colorAttributeLocation)


gl.useProgram(program)

// location to GPU accessible variables
const worldMatrixLocation = gl.getUniformLocation(program, 'worldMatrix')
const viewMatrixLocation = gl.getUniformLocation(program, 'viewMatrix')
const projectionMatrixLocation = gl.getUniformLocation(program, 'projectionMatrix')

// CPU accessible variable
const worldMatrix = new Float32Array(16)
const viewMatrix = new Float32Array(16)
const projectionMatrix = new Float32Array(16)
mat4.identity(worldMatrix) // generate identity matrix in worldMatrix
mat4.identity(viewMatrix)
mat4.identity(projectionMatrix)

// send CPU accessible variables to shader
gl.uniformMatrix4fv(worldMatrixLocation, gl.FALSE, worldMatrix)
gl.uniformMatrix4fv(viewMatrixLocation, gl.FALSE, viewMatrix)
gl.uniformMatrix4fv(projectionMatrixLocation, gl.FALSE, projectionMatrix)

// main render loop
// const loop = () => {
//   requestAnimationFrame(loop)
// }

// requestAnimationFrame(loop)

// draw
gl.drawArrays(gl.TRIANGLES, 0, 3)