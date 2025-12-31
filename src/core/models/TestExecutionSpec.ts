// src/core/models/TestExecutionSpec.ts
import { ActionType, AssertionType } from "../constants/automationTypes"
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

    /** 자동화 힌트 */
    action: ActionType
    target?: string
    value?: string | number

    /** 기존 TestCase 호환 */
    input?: any
}

export interface ExpectedResult {
    description: string
    type: "ui" | "state" | "message" | "api"

    assertion?: AssertionType
    target?: string
    expectedValue?: any
}

export interface AutomationHint {
    framework?: "playwright" | "jest" | "cypress"
    pageObject?: string
}
