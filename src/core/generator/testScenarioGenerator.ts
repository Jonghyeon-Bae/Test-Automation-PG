import { TestCase } from "../models/TestCase"
import { TestData } from "../models/TestData"
import { TestScenario } from "../models/TestScenario"
import { TestPoint } from "../models/TestPoint"
import { TestCondition } from "../models/TestCondition"

let scenarioSeq = 1
const nextId = () => `TS-${scenarioSeq++}`

export function generateScenarios(
    testCases: TestCase[],
    testPoints: TestPoint[],
    testConditions: TestCondition[],
    testDataMap: Record<string, TestData[]>
): TestScenario[] {
    const scenarios: TestScenario[] = []

    for (const testCase of testCases) {
        // 1. TestCondition 찾기
        const condition = testConditions.find(
            (c) => c.id === testCase.testConditionId
        )
        if (!condition) continue

        const testPoint = testPoints.find(
            (tp) => tp.id === condition.testPointId
        )

        if (!testPoint) continue

        const key = `${testPoint.domain}.${testPoint.target}`
        const dataList = testDataMap[key] || []

        // const dataList = testDataMap[testPoint.target] || []

        for (const data of dataList) {
            scenarios.push({
                id: nextId(),
                testPoint,
                testCase,
                testData: data,
                expectedResult:
                    data.validity === "valid"
                        ? "요청이 정상 처리된다"
                        : "유효성 오류 메시지가 표시된다",
                executionHint: "UI 입력 후 제출 버튼 클릭",
            })
        }
    }

    return scenarios
}
