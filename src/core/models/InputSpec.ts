export interface Rule {
    kind: "required" | "min" | "max" | "pattern" | "enum"
    value?: any
}

export interface InputSpec {
    domain: string | undefined
    target: string
    type: "string" | "number"
    constraints: Rule[]
    required: boolean
}
