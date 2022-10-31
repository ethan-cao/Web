// import vertexShaderSource from 'raw-loader!glslify-loader!./shader/vertexShader.glsl'
// import fragmentShaderSource from 'raw-loader!glslify-loader!./shader/fragmentShader.glsl'
import vertexShaderSource from './shader/vertexShader.glsl'
import fragmentShaderSource from './shader/fragmentShader.glsl'

// loading approach 1: using async loading
const fetchShaderSource = async (name) => {
  const path = name === 'vertex' ? '../src/shader/vertexShader.glsl' : '../src/shader/fragmentShader.glsl' 
  return await (await fetch(path)).text()
}

// loading approach 2: using webpack glsl loader
const loadShaderSource = (name) => {
  return name === 'vertex' ? vertexShaderSource : fragmentShaderSource
}

export const compileShader = async (gl, shaderName, shaderType) => {
  // const shaderSource = await fetchShaderSource(shaderName)
  const shaderSource = await loadShaderSource(shaderName)
  
  // console.log(`@@@ glsl source for ${shaderName}: `, shaderSource);

  // create shaders
  const shader = gl.createShader(shaderType)

  // compile shader from glsl to shader
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  // check if anything wrong with compiling shader
  gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw ('ERROR compiling vertexShader, ', gl.getShaderInfoLog(shader))
  }

  return shader
}

export const createProgram = (gl, vertexShader, fragmentShader) => {
  // attach shaders to program
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  // check if anything wrong with linking
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw ('ERROR linking program, ', gl.getProgramInfoLog(program))
  }

  // extra validation, not in production, only for testing
  gl.validateProgram(program)
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    throw ('ERROR validating program, ', gl.getProgramInfoLog(program))
  }

  return program
}
