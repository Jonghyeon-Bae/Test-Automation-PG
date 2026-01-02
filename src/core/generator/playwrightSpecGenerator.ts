// src/core/generator/playwrightSpecGenerator.ts

import { TestExecutionSpec } from "../models/TestExecutionSpec"
import { ActionType, AssertionType } from "../constants/automationTypes"

export function generatePlaywrightSpec(
    spec: TestExecutionSpec
): string {
    const lines: string[] = []

    lines.push(`import { test, expect } from "@playwright/test"\n`)
    lines.push(`test("${spec.title}", async ({ page }) => {`)

    // Preconditions (주석)
    for (const pre of spec.preconditions) {
        lines.push(`  // Precondition: ${pre.description}`)
    }

    // Steps
    for (const step of spec.steps) {
        lines.push(``)
        lines.push(`  // Step ${step.order}`)

        switch (step.action) {
            case ActionType.NAVIGATE:
                lines.push(`  await page.goto("${step.target ?? "TODO_URL"}")`)
                break

            case ActionType.FILL:
                lines.push(
                    `  await page.fill("${step.target ?? "TODO_SELECTOR"}", "${step.value ?? ""}")`
                )
                break

            case ActionType.CLICK:
                lines.push(
                    `  await page.click("${step.target ?? "TODO_SELECTOR"}")`
                )
                break

            case ActionType.SUBMIT:
                lines.push(
                    `  await page.click("${step.target ?? "button[type='submit']"}")`
                )
                break

            case ActionType.WAIT:
                lines.push(`  await page.waitForTimeout(1000)`)
                break

            case ActionType.UNKNOWN:
            default:
                lines.push(
                    `  // TODO: action 추론 실패 (step ${step.order})`
                )
        }
    }

    // Expected Results
    lines.push(``)
    for (const exp of spec.expectedResults) {
        lines.push(`  // Expect: ${exp.description}`)

        switch (exp.assertion) {
            case AssertionType.VISIBLE:
                lines.push(
                    `  await expect(page.locator("${exp.target ?? "TODO_SELECTOR"}")).toBeVisible()`
                )
                break

            case AssertionType.EQUALS:
                lines.push(
                    `  await expect(page.locator("${exp.target ?? "TODO_SELECTOR"}")).toHaveText("${exp.expectedValue ?? ""}")`
                )
                break

            case AssertionType.CONTAINS:
                lines.push(
                    `  await expect(page.locator("${exp.target ?? "TODO_SELECTOR"}")).toContainText("${exp.expectedValue ?? ""}")`
                )
                break

            case AssertionType.NOT_EXISTS:
                lines.push(
                    `  await expect(page.locator("${exp.target ?? "TODO_SELECTOR"}")).toHaveCount(0)`
                )
                break

            case AssertionType.UNKNOWN:
            default:
                lines.push(`  // TODO: assertion 추론 실패`)
        }
    }

    lines.push(`})`)

    return lines.join("\n")
}
