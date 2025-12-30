// src/executor/playwright/playwrightExpectationMapper.ts

import { ExpectedResult } from "../../core/models/TestExecutionSpec"

export function mapExpectedResultToPlaywright(result: ExpectedResult): string {
    switch (result.type) {
        case "message":
            return `
await expect(page.locator('.message')).toContainText('${result.description}')
`
        case "ui":
            return `
await expect(page.locator('${inferUiSelector(
                result.description
            )}')).toBeVisible()
`
        case "state":
            return `
/* state verification: ${result.description} */
`
    }
}
function inferUiSelector(desc: string): string {
    if (desc.includes("오류")) return ".error"
    if (desc.includes("정상")) return ".success"
    return "body"
}
