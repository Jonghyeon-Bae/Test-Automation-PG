// src/core/models/AutomationReadinessResult.ts
export interface AutomationBlocker {
    type:
        | "UNKNOWN_ACTION"
        | "UNKNOWN_ASSERTION"
        | "MISSING_INPUT"
    message: string
    stepOrder?: number
}

export interface AutomationReadinessResult {
    specId: string
    isReady: boolean
    blockers: AutomationBlocker[]
}
