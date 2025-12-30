// src/executor/playwright/playwrightPreconditionMapper.ts

import { Precondition } from "../../core/models/TestExecutionSpec"

export function mapPreconditionToPlaywright(pre: Precondition): string {
    if (pre.type === "state") {
        return `// Precondition: ${pre.description}`
    }

    if (pre.type === "data") {
        return `// Test data setup: ${pre.description}`
    }

    return `// Unknown precondition`
}
