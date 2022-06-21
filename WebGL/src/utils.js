const fetchShaderSource = async (name) => {
  return await (await fetch(name)).text()
}

export const compileShader = async (gl, shaderPath, shaderType) => {
  const shaderSource = await fetchShaderSource(shaderPath)

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
