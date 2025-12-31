// src/core/generator/testExecutionSpecGenerator.ts
import { TestPoint } from "../models/TestPoint"
import { TestCase } from "../models/TestCase"
import { TestExecutionSpec, ExecutionStep } from "../models/TestExecutionSpec"
import { mapRiskLevel } from "../mapper/riskLevelMapper"
import { TestCondition } from "../models/TestCondition"

function inferAction(step: {
    action?: string
    description?: string
}): ExecutionStep["action"] {
    const text = (step.description || "").toLowerCase()
    if (text.includes("입력") || text.includes("작성"))
        return "fill" as ExecutionStep["action"]
    if (text.includes("클릭") || text.includes("선택"))
        return "click" as ExecutionStep["action"]
    if (text.includes("제출")) return "submit" as ExecutionStep["action"]
    if (text.includes("페이지 이동"))
        return "navigate" as ExecutionStep["action"]
    if (text.includes("대기")) return "wait" as ExecutionStep["action"]
    return "undefined" as ExecutionStep["action"]
}

export function generateExecutionSpecs(
    testPoints: TestPoint[],
    testCases: TestCase[],
    testConditions: TestCondition[]
): TestExecutionSpec[] {
    const specs: TestExecutionSpec[] = []

    for (const tc of testCases) {
        const condition = testConditions.find(
            (c) => c.id === tc.testConditionId
        )
        if (!condition) continue

        const tp = testPoints.find((p) => p.id === condition.testPointId)
        if (!tp) continue

        specs.push({
            id: `TES-${tc.id}`,
            domain: tp.domain,
            target: tp.target,
            title: tc.title,

            preconditions: [
                { type: "state", description: `${tp.domain} 화면이 열려 있다` },
            ],

            steps: tc.steps.map((s, idx) => ({
                order: idx + 1,
                action: inferAction(s),
                input: s.inputData, // 기존 호환
            })),

            expectedResults: [{ type: "ui", description: tc.expectedResult }],

            relatedTestCaseId: tc.id,
            riskLevel: mapRiskLevel(tp),
        })
    }

    return specs
}
