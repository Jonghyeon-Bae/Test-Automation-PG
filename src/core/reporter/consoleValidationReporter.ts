// src/core/reporter/consoleValidationReporter.ts
import { ValidationResult } from "../validator/ValidationResult"

export function reportValidationResults(results: ValidationResult[]) {
    if (results.length === 0) {
        console.log("✅ 모든 TestExecutionSpec이 자동화 가능 상태입니다.")
        return
    }

    for (const r of results) {
        const prefix =
            r.level === "error" ? "❌" : r.level === "warning" ? "⚠️" : "ℹ️"

        const stepInfo = r.stepOrder ? ` (step ${r.stepOrder})` : ""

        console.log(
            `${prefix} [${r.code}] ${r.specId}${stepInfo} - ${r.message}`
        )
    }
}
