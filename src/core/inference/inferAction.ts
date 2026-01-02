// src/core/inference/inferAction.ts
import { ActionType } from "../constants/automationTypes"

export function inferAction(step: {
    description?: string
}): ActionType {
    const text = (step.description ?? "").toLowerCase()

    if (text.includes("입력") || text.includes("작성"))
        return ActionType.FILL

    if (text.includes("클릭") || text.includes("선택"))
        return ActionType.CLICK

    if (text.includes("제출"))
        return ActionType.SUBMIT

    if (text.includes("이동"))
        return ActionType.NAVIGATE

    if (text.includes("대기"))
        return ActionType.WAIT

    return ActionType.UNKNOWN
}
