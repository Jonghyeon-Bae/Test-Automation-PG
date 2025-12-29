import { InputSpec } from "../models/InputSpec"
import { TestPoint } from "../models/TestPoint"
import { mapRisk } from "../mapper/riskMapper"
import { mapTechniques } from "../mapper/techniqueMapper"

export function generateTestPoints(specs: InputSpec[]): TestPoint[] {
    return specs.map((spec) => ({
        id: `TP-${spec.domain}-${spec.target}`,
        domain: spec.domain,
        target: spec.target,
        constraints: spec.constraints,
        risk: mapRisk(spec),
        recommendedTechniques: mapTechniques(spec),
        businessImpact: "고객 연락 불가",
    }))
}
