export interface Rule {
    kind: "min" | "max" | "pattern" | "enum"
    value?: any
}

export interface InputSpec {
    domain: string
    target: string
    type: "string" | "number"
    constraints: Rule[]
    required: boolean
}
