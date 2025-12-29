import { InputSpec } from "../models/InputSpec"
import { TestTechnique } from "../models/TestPoint"

export function mapTechniques(spec: InputSpec): TestTechnique[] {
    const techniques: TestTechnique[] = []

    if (spec.constraints.length > 0) {
        techniques.push("equivalence partitioning")
    }

    if (spec.constraints.some((c) => c.kind === "min" || c.kind === "max")) {
        techniques.push("boundary value analysis")
    }

    return techniques
}
