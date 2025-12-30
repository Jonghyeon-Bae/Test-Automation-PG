import { TestCase } from "./TestCase"
import { TestData } from "./TestData"
import { TestPoint } from "./TestPoint"

export interface TestScenario {
    id: string
    testCase: TestCase
    testData: TestData
    testPoint: TestPoint
    expectedResult: string
    executionHint?: string
}
