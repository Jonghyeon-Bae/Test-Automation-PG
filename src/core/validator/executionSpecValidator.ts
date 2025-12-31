// src/core/validator/executionSpecValidator.ts
import { TestExecutionSpec } from "../models/TestExecutionSpec"
import { ValidationResult } from "./ValidationResult"

export function validateExecutionSpec(
    spec: TestExecutionSpec
): ValidationResult[] {
    const results: ValidationResult[] = []

    spec.steps.forEach((step) => {
        // 1️⃣ action 없음 → warning
        if (!step.action) {
            results.push({
                specId: spec.id,
                level: "warning",
                code: "STEP_NO_ACTION",
                message: "자동화 action이 정의되지 않은 step입니다",
                stepOrder: step.order,
            })
        }

        // 2️⃣ action 있는데 target 없음 → error
        if (step.action && !step.target) {
            results.push({
                specId: spec.id,
                level: "error",
                code: "STEP_ACTION_NO_TARGET",
                message: "action은 있지만 target이 없습니다",
                stepOrder: step.order,
            })
        }

        // 3️⃣ fill인데 value 없음 → error
        if (step.action === "fill" && step.value === undefined) {
            results.push({
                specId: spec.id,
                level: "error",
                code: "FILL_NO_VALUE",
                message: "fill action에는 value가 필요합니다",
                stepOrder: step.order,
            })
        }
    })

    // 4️⃣ ExpectedResult 검증
    spec.expectedResults.forEach((er) => {
        if (er.assertion && !er.target) {
            results.push({
                specId: spec.id,
                level: "error",
                code: "ASSERTION_NO_TARGET",
                message: "assertion에는 target이 필요합니다",
            })
        }
    })

    return results
}
