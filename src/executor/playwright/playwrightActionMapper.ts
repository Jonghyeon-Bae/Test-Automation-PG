// src/executor/playwright/playwrightActionMapper.ts

import { ExecutionStep } from "../../core/models/TestExecutionSpec"

function extractTarget(action: string): string {
    // 예: "phoneNumber 입력"
    return action.split(" ")[0] || ""
}

function extractClickTarget(action: string): string {
    // 예: "제출 버튼 클릭"
    if (action.includes("제출")) return "button[type=submit]"
    return "button"
}

function extractPath(action: string): string {
    // 예: "회원가입 페이지로 이동"
    if (action.includes("회원가입")) return "/signup"
    return "/"
}

export function mapExecutionStepToPlaywright(step: ExecutionStep): string {
    const action = step.action.toLowerCase()

    // 입력
    if (action.includes("입력")) {
        return `
await page.fill('[name=${extractTarget(step.action)}]', '${step.input}')
`
    }

    // 클릭
    if (action.includes("클릭")) {
        return `
await page.click('${extractClickTarget(step.action)}')
`
    }

    // 페이지 이동
    if (action.includes("이동")) {
        return `
await page.goto('${extractPath(step.action)}')
`
    }

    return `// ⚠️ 매핑되지 않은 action: ${step.action}`
}
