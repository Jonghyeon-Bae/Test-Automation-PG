import { generateExecutionSpecs } from "../core/generator/testExecutionSpecGenerator"
import { sampleTestPoints } from "./sampleTestPoint"
import { sampleTestCases } from "./sampleTestCase"
import { sampleTestConditions } from "./sampleTestCondition"
import { checkAutomationReadiness } from "../core/checker/automationReadinessChecker"

console.log("🚀 ExecutionSpec Generator Test START")

const specs = generateExecutionSpecs(
    sampleTestPoints,
    sampleTestCases,
    sampleTestConditions
)

console.dir(specs, { depth: null })

console.log("🎉 ExecutionSpec Generator Test END")



const readiness = checkAutomationReadiness(specs)
console.log(readiness)
