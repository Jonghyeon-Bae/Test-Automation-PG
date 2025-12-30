// src/core/models/TestExecutionSpec.ts
export interface TestExecutionSpec {
    id: string
    domain: string
    target: string
    title: string

    preconditions: Precondition[]
    steps: ExecutionStep[]
    expectedResults: ExpectedResult[]

    relatedTestCaseId: string
    riskLevel?: "low" | "medium" | "high"
}

export interface Precondition {
    type: "state" | "data"
    description: string
}

export interface ExecutionStep {
    order: number
    action: string
    input?: any
}

export interface ExpectedResult {
    type: "ui" | "state" | "message"
    description: string
}
