import { wwSum } from './demo/ww-sum'
import { GenerateNoiseDemo } from './demo/noise-load'
import { wwRenderSceneFix } from './demo/ww-render-fix'

// local info
const maxWorkers = navigator.hardwareConcurrency || 4

// web worker sum demo
// wwSum(false)

// generate noise demo
// GenerateNoiseDemo()

// ray tracing diffuse demo
// rayTracingDiffuse()

// render fix scene
wwRenderSceneFix('dist/ww_ray_tracing_random_worker.js', maxWorkers)
