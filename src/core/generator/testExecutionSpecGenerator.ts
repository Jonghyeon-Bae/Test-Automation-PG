// src/core/generator/testExecutionSpecGenerator.ts
import { TestPoint } from "../models/TestPoint"
import { TestCase } from "../models/TestCase"
import { TestExecutionSpec } from "../models/TestExecutionSpec"
import { mapRiskLevel } from "../mapper/riskLevelMapper"

export function generateExecutionSpecs(
    testPoints: TestPoint[],
    testCases: TestCase[]
): TestExecutionSpec[] {
    const specs: TestExecutionSpec[] = []

    for (const tp of testPoints) {
        const relatedCases = testCases.filter((tc) =>
            tc.testConditionId.startsWith(tp.id)
        )

        for (const tc of relatedCases) {
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

                steps: tc.steps.map((s) => ({
                    order: s.order,
                    action: s.action,
                    input: s.inputData,
                })),

                expectedResults: [
                    {
                        type: "ui",
                        description: tc.expectedResult,
                    },
                ],

                relatedTestCaseId: tc.id,
                riskLevel: mapRiskLevel(tp),
            })
        }
    }

    return specs
}
