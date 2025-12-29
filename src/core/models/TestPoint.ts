import type { Rule } from "./InputSpec"

export type TestTechnique =
    | "equivalence partitioning"
    | "boundary value analysis"
    | "error guessing"

export interface Risk {
    type: "input" | "validation" | "data"
    description: string
}

export interface TestPoint {
    id: string
    domain: string
    target: string
    constraints: Rule[]
    risk: Risk
    recommendedTechniques: TestTechnique[]
    businessImpact?: string
}
