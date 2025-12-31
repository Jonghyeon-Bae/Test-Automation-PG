// src/core/selector/automationReadySelector.ts
import { TestExecutionSpec } from "../models/TestExecutionSpec"
import { ValidationResult } from "../validator/ValidationResult"

export interface AutomationSelectionResult {
    ready: TestExecutionSpec[]
    blocked: {
        spec: TestExecutionSpec
        reasons: ValidationResult[]
    }[]
}

export function selectAutomationReadySpecs(
    specs: TestExecutionSpec[],
    validationMap: Record<string, ValidationResult[]>,
    options?: {
        allowWarnings?: boolean
    }
): AutomationSelectionResult {
    const ready: TestExecutionSpec[] = []
    const blocked: AutomationSelectionResult["blocked"] = []

    for (const spec of specs) {
        const results = validationMap[spec.id] ?? []

        const hasError = results.some((r) => r.level === "error")
        const hasWarning = results.some((r) => r.level === "warning")

        if (hasError || (!options?.allowWarnings && hasWarning)) {
            blocked.push({
                spec,
                reasons: results,
            })
        } else {
            ready.push(spec)
        }
    }

    return { ready, blocked }
}
