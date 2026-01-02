// src/core/checker/automationReadinessChecker.ts
import { TestExecutionSpec } from "../models/TestExecutionSpec"
// import { AutomationReadinessResult } from "../models/AutomationReadinessResult"
import { AutomationReadinessResult } from "../models/AutomationReadinessResult"
import { ActionType, AssertionType } from "../constants/automationTypes"

export function checkAutomationReadiness(
    specs: TestExecutionSpec[]
): AutomationReadinessResult[] {
    return specs.map((spec) => {
        const blockers: AutomationReadinessResult["blockers"] = []

        // 1. step action 검사
        for (const step of spec.steps) {
            if (step.action === ActionType.UNKNOWN) {
                blockers.push({
                    type: "UNKNOWN_ACTION",
                    stepOrder: step.order,
                    message: `Step ${step.order} has unknown action`,
                })
            }

            if (
                step.action === ActionType.FILL &&
                (step.input === undefined || step.input === "")
            ) {
                blockers.push({
                    type: "MISSING_INPUT",
                    stepOrder: step.order,
                    message: `Step ${step.order} requires input but none provided`,
                })
            }
        }

        // 2. assertion 검사
        for (const er of spec.expectedResults) {
            if (er.assertion === AssertionType.UNKNOWN) {
                blockers.push({
                    type: "UNKNOWN_ASSERTION",
                    message: "ExpectedResult assertion is unknown",
                })
            }
        }

        return {
            specId: spec.id,
            isReady: blockers.length === 0,
            blockers,
        }
    })
}
