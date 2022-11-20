import { glMatrix, mat4, vec3 } from 'gl-matrix'
import { compileShader, createProgram } from "./utils.js"

const canvas = document.querySelector('#canvas')

if (!canvas) {
  throw('no canvas found')
}

const gl = canvas.getContext('webgl2')
window.gl = gl

if (!gl) {
  throw('No webGL 2 support')
}


// depth test, let vertex closer to camera takes precedence over other vertex
gl.enable(gl.DEPTH_TEST)

// avoid unnecessary calculation
gl.enable(gl.CULL_FACE)
gl.frontFace(gl.CCW)
gl.cullFace(gl.BACK)



const getX = () => Math.random() - 0.5;
const getY = () => Math.random() - 0.5;
const getZ = () => Math.random() - 0.5;

function getPoints(pointCount) {
  let points = [];

  for (let i = 0; i < pointCount; i++) {
    const inputPoint = [getX(), getY(), getZ()];
    const outputPoint = vec3.normalize(vec3.create(), inputPoint);
    points.push(...outputPoint);
  }

  return points;
}

const vertexData = getPoints(10000);



const vertexShader = await compileShader(gl, 'vertex', gl.VERTEX_SHADER)
const fragmentShader = await compileShader(gl, 'fragment', gl.FRAGMENT_SHADER)
const program = createProgram(gl, vertexShader, fragmentShader)

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.enable(gl.DEPTH_TEST);

const uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
};

const modelMatrix = mat4.create();
const viewMatrix = mat4.create();
const projectionMatrix = mat4.create();
mat4.perspective(projectionMatrix,
  glMatrix.toRadian(80), // vertical field-of-view (angle, radians)
    canvas.clientWidth / canvas.clientHeight, // aspect W/H
    0.1, // near cull distance
    1000 // far cull distance
);

const mvMatrix = mat4.create();
const worldMatrix = mat4.create();

mat4.translate(modelMatrix, modelMatrix, [0, 0, 0]);
mat4.translate(viewMatrix, viewMatrix, [0, 0.1, 2]);
mat4.invert(viewMatrix, viewMatrix);


function main() {
    mat4.rotateY(modelMatrix, modelMatrix, 0.005);

    mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
    mat4.multiply(worldMatrix, projectionMatrix, mvMatrix);
    gl.uniformMatrix4fv(uniformLocations.matrix, false, worldMatrix);
    
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, vertexData.length / 3);

    requestAnimationFrame(main);
}

main();