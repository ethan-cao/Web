
# switch drawings:
## WebGL/webpack.config.js:   
entry: './src/index.js', --> './src/index1.js'


## WebGL/src/utils.js:   
// index.js use these:   
import vertexShaderSource from './shader/vertexShader.glsl' .  
import fragmentShaderSource from './shader/fragmentShader.glsl' .  

// index1.js use these:   
import vertexShaderSource from './shader/vertexShader_points.glsl' .  
import fragmentShaderSource from './shader/fragmentShader_points.glsl' .  