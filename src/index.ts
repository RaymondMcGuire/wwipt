import { wwSum } from './demo/ww-sum'
import { GenerateNoiseDemo } from './demo/noise-load'
import { rayTracingDiffuse } from './demo/ray-tracing-diffuse'
import { wwRayTracingDiffuse } from './demo/ww-ray-tracing-diffuse'

// local info
const maxWorkers = navigator.hardwareConcurrency || 4

// web worker sum demo
// wwSum(false)

// generate noise demo
// GenerateNoiseDemo()

// ray tracing diffuse demo
// rayTracingDiffuse()

wwRayTracingDiffuse('dist/ww_ray_tracing_diffuse_worker.js', maxWorkers)
