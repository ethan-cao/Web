import { glMatrix, mat4 } from 'gl-matrix'
import { compileShader, createProgram } from "./utils.js"
import crate from './assets/crate.png'

const canvas = document.querySelector('#canvas')

if (!canvas) {
  throw('no canvas found')
}

const gl = canvas.getContext('webgl2')

if (!gl) {
  throw('No webGL 2 support')
}


const image = document.querySelector('#image')
image.src = crate


gl.enable(gl.DEPTH_TEST)

// avoid unnecessary calculation
gl.enable(gl.CULL_FACE)
gl.frontFace(gl.CCW)
gl.cullFace(gl.BACK)


const vertexShader = await compileShader(gl, 'vertex', gl.VERTEX_SHADER)
const fragmentShader = await compileShader(gl, 'fragment', gl.FRAGMENT_SHADER)
const program = createProgram(gl, vertexShader, fragmentShader)


// vertex data, accessible by CPU, but not GPU
const boxVertices = 
[ // X, Y, Z           R, G, B
  // Top
  -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,    // 0th vertex
  -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,    // 1st vertex
  1.0, 1.0, 1.0,     0.5, 0.5, 0.5,    // 2nd vertex 
  1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

  // Left
  -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
  -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
  -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
  -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

  // Right
  1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
  1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
  1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
  1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

  // Front
  1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
  1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
  -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
  -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

  // Back
  1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
  1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
  -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
  -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

  // Bottom
  -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
  -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
  1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
  1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
];

const boxIndices =
[  
  // number is index in boxVertices

  // Top
  0, 1, 2,     // the 0th, 1st, 2nd vertices form the 0th triangle
  0, 2, 3,

  // Left
  5, 4, 6,
  6, 4, 7,

  // Right
  8, 9, 10,
  8, 10, 11,

  // Front
  13, 12, 14,
  15, 14, 12,

  // Back
  16, 17, 18,
  16, 18, 19,

  // Bottom
  21, 20, 22,
  22, 20, 23
];

// create buffer, accessible by GPU   
const vertexBuffer = gl.createBuffer()
// bind buffer to the bind point named gl.ARRAY_BUFFER, bind point is where data from CPU goes to GPU
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
// send vertices in CPU to buffer in GPU through gl.ARRAY_BUFFER
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW)



// order of triangle
const indexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW)


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

// worldMatrix handles rotation
mat4.identity(worldMatrix) // generate identity matrix in worldMatrix
// viewMatrix creates camera
mat4.lookAt(viewMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0])
mat4.perspective(projectionMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

// send CPU accessible variables to shader
gl.uniformMatrix4fv(worldMatrixLocation, gl.FALSE, worldMatrix)
gl.uniformMatrix4fv(viewMatrixLocation, gl.FALSE, viewMatrix)
gl.uniformMatrix4fv(projectionMatrixLocation, gl.FALSE, projectionMatrix)


const xRotationMatrix = new Float32Array(16)
const yRotationMatrix = new Float32Array(16)

const identityMatrix = new Float32Array(16)
mat4.identity(identityMatrix)


// main render loop
const loop = () => {
  // rotation
  const angle = performance.now() / 1000 / 6 * 2 * Math.PI  
  mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0])
  mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0])
  mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix)
  gl.uniformMatrix4fv(worldMatrixLocation, gl.FALSE, worldMatrix)

  // clean previous draw
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  // draw
  gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
  
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
