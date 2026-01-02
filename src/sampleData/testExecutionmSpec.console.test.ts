import { generateExecutionSpecs } from "../core/generator/testExecutionSpecGenerator"
import { sampleTestPoints } from "./sampleTestPoint"
import { sampleTestCases } from "./sampleTestCase"
import { sampleTestConditions } from "./sampleTestCondition"

console.log("🚀 ExecutionSpec Generator Test START")

const specs = generateExecutionSpecs(
    sampleTestPoints,
    sampleTestCases,
    sampleTestConditions
)

console.dir(specs, { depth: null })

console.log("🎉 ExecutionSpec Generator Test END")
