// src/executor/playwright/playwrightExpectationMapper.ts

import { ExpectedResult } from "../../core/models/TestExecutionSpec"

export function mapPlaywrightExpectation(er: ExpectedResult): string {
    switch (er.assertion) {
        case "visible":
            return `await expect(page.locator("${er.target}")).toBeVisible()`

        case "equals":
            return `await expect(page.locator("${
                er.target
            }")).toHaveValue(${JSON.stringify(er.expectedValue)})`

        case "contains":
            return `await expect(page.locator("${
                er.target
            }")).toContainText(${JSON.stringify(er.expectedValue)})`

        case "notExists":
            return `await expect(page.locator("${er.target}")).toHaveCount(0)`

        default:
            return `// TODO: assertion not defined`
    }
}
