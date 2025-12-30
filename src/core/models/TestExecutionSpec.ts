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
    riskLevel?: "Low" | "Medium" | "High"

    automationHint?: AutomationHint
}

export interface Precondition {
    type: "state" | "data"
    description: string
}

export interface ExecutionStep {
    order: number

    /** 사람용 설명 */
    // description: string

    /** 자동화 힌트 */
    action?: "navigate" | "fill" | "click" | "submit" | "wait"
    target?: string // logical target or selector key
    value?: string | number

    /** 기존 호환 */
    input?: any
}

export interface ExpectedResult {
    /** 사람용 */
    description: string

    /** 검증 타입 */
    type: "ui" | "state" | "message" | "api"

    /** 자동화 힌트 */
    assertion?: "visible" | "equals" | "contains" | "notExists"
    target?: string
    expectedValue?: any
}
export interface AutomationHint {
    framework?: "playwright" | "jest" | "cypress"
    pageObject?: string
}
