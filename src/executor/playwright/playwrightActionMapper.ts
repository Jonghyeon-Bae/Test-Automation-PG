// src/executor/playwright/playwrightActionMapper.ts

import { ExecutionStep } from "../../core/models/TestExecutionSpec"

export function mapPlaywrightAction(step: ExecutionStep): string {
    switch (step.action) {
        case "navigate":
            return `await page.goto("${step.target}")`

        case "fill":
            return `await page.fill("${step.target}", "${step.value}")`

        case "click":
            return `await page.click("${step.target}")`

        case "submit":
            return `await page.click("${step.target}")`

        case "wait":
            return `await page.waitForTimeout(${step.value ?? 1000})`

        default:
            return `// TODO: action not defined`
    }
}
