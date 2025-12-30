import type { InputSpec } from "../models/InputSpec"

export function analyzeZodSchema(
    sourceCode: string,
    domain: string
): InputSpec[] {
    // MVP: 하드코딩 or 간단 파싱
    return [
        {
            domain,
            target: "phoneNumber",
            type: "string",
            required: true,
            constraints: [
                { kind: "required" }, // Rule 확장 필요
                { kind: "pattern", value: "numeric 10~11" },
            ],
        },
    ]
}
