// src/core/generator/testCaseGenerator.ts

import { TestCondition } from "../models/TestCondition"
import { TestCase, TestStep } from "../models/TestCase"
import { TestPoint } from "../models/TestPoint"

let caseSeq = 1

function nextCaseId() {
    return `TC-${caseSeq++}`
}

function resolveRiskLevel(
    category: TestCondition["category"]
): TestCase["priority"] {
    switch (category) {
        case "risk":
            return "High"
        case "boundary":
            return "Medium"
        case "equivalence":
            return "Medium"
        default:
            return "Low"
    }
}

export function generateTestCases(
    conditions: TestCondition[],
    testPoints: TestPoint[]
): TestCase[] {
    return conditions.map((condition) => {
        const tp = testPoints.find((p) => p.id === condition.testPointId)

        if (!tp) {
            throw new Error(`TestPoint not found for condition ${condition.id}`)
        }

        const steps: TestStep[] = [
            {
                order: 1,
                action: "테스트 대상 화면에 진입한다",
                expectedResult: condition.expectedResult,
            },
            {
                order: 2,
                action: condition.description,
                expectedResult: condition.expectedResult,
            },
            {
                order: 3,
                action: "입력을 제출한다",
                expectedResult: condition.expectedResult,
            },
        ]

        return {
            id: nextCaseId(),
            domain: tp.domain, // ✅ 올바른 소스
            target: tp.target, // ✅ 올바른 소스
            testConditionId: condition.id,
            title: condition.description,
            preconditions: ["시스템이 정상 동작 중이어야 한다"],
            steps,
            expectedResult: condition.expectedResult,
            priority: resolveRiskLevel(condition.category),
        }
    })
}
