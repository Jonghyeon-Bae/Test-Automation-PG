// src/core/generator/testExecutionSpecGenerator.ts
import { TestPoint } from "../models/TestPoint"
import { TestCase } from "../models/TestCase"
import { TestExecutionSpec } from "../models/TestExecutionSpec"
import { TestCondition } from "../models/TestCondition"
import { mapRiskLevel } from "../mapper/riskLevelMapper"
import { inferAction } from "../inference/inferAction"
import { inferAssertion } from "../inference/inferAssertion"

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

        const tp = testPoints.find(
            (p) => p.id === condition.testPointId
        )
        if (!tp) continue

        specs.push({
            id: `TES-${tc.id}`,
            domain: tp.domain,
            target: tp.target,
            title: tc.title,

            preconditions: [
                {
                    type: "state",
                    description: `${tp.domain} 화면이 열려 있다`,
                },
            ],

            steps: tc.steps.map((s) => {
                const inferredAction = inferAction({ description: s.action })

                return {
                    order: s.order,

                    // 자동화 힌트 (추론 결과)
                    action: inferredAction,

                    // 설계 입력은 input으로만 유지
                    input: s.inputData?s.inputData:"None Input Types",
                }
            }),

            expectedResults: [
                {
                    description: tc.expectedResult, // 사람용 설계 결과
                    type: "ui",

                    // 추론된 검증 힌트
                    assertion: inferAssertion({
                        description: tc.expectedResult,
                    }),
                },
            ],


            relatedTestCaseId: tc.id,
            riskLevel: mapRiskLevel(tp),
        })
    }

    return specs
}
