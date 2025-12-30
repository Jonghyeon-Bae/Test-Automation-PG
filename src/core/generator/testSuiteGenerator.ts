// src/core/generator/testSuiteGenerator.ts
import { TestExecutionSpec } from "../models/TestExecutionSpec"
import { TestSuite } from "../models/TestSuite"
import { SUITE_TEMPLATES } from "../suite/suiteTemplates"

export function generateTestSuites(specs: TestExecutionSpec[]): TestSuite[] {
    const suites: TestSuite[] = SUITE_TEMPLATES.map((t) => ({
        ...t,
        testSpecIds: [],
    }))

    for (const spec of specs) {
        for (const suite of suites) {
            if (matchesCriteria(spec, suite.criteria)) {
                suite.testSpecIds.push(spec.id)
            }
        }
    }

    return suites
}

function matchesCriteria(spec: TestExecutionSpec, criteria: any): boolean {
    if (criteria.riskLevel && spec.riskLevel !== criteria.riskLevel) {
        return false
    }

    if (criteria.domain && spec.domain !== criteria.domain) {
        return false
    }

    if (criteria.technique) {
        // ExecutionSpec은 직접 technique을 모르므로
        // TestCase / TestPoint 연계 시 확장 포인트
        return true
    }

    return true
}
