import { wwSum } from './demo/ww-sum'
import { GenerateNoiseDemo } from './demo/noise-load'
import { wwRender } from './demo/ww-render'

// local info
const maxWorkers = navigator.hardwareConcurrency || 4

// web worker sum demo
// wwSum(false)

// generate noise demo
// GenerateNoiseDemo()

// ray tracing diffuse demo
// rayTracingDiffuse()

wwRender('dist/ww_ray_tracing_dielectric_worker.js', maxWorkers)
