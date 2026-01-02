// src/core/models/TestCase.ts

export interface TestCase {
    id: string
    /** 어떤 TestCondition에서 파생되었는지 */
    testConditionId: string
    title: string
    preconditions?: string[]
    steps: TestStep[]
    /** 테스트 케이스 전체 기대 결과 */
    expectedResult: string
    priority: string
    // relatedTechnique: string
}

export interface TestStep {
    order: number
    action: string
    inputData?: string
    expectedResult: string
    note?:string
}
