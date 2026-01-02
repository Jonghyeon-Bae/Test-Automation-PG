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
                const action = inferAction({ description: s.action })
                return {
                    order: s.order,
                    action: action,
                    input: s.inputData,
                    // value: s.inputData,
                }
            }),

            expectedResults: [
                {
                    description: tc.expectedResult,
                    type: "ui",
                    assertion: inferAssertion({ description: tc.expectedResult }),
                },
            ],

            relatedTestCaseId: tc.id,
            riskLevel: mapRiskLevel(tp),
        })
    }

    return specs
}
