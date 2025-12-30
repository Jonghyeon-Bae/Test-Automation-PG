// src/core/models/TestSuite.ts
import { TestTechnique } from "./TestPoint"

export interface TestSuite {
    id: string
    name: string
    description: string

    criteria: SuiteCriteria
    testSpecIds: string[]
}

export interface SuiteCriteria {
    domain?: string
    riskLevel?: "high" | "medium" | "low"
    technique?: TestTechnique
}
