// src/core/validator/ValidationResult.ts
export interface ValidationResult {
    specId: string
    level: "error" | "warning" | "info"
    code: string
    message: string
    stepOrder?: number
}
