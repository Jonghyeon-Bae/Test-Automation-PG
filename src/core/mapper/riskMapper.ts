import { InputSpec } from "../models/InputSpec"
import { Risk } from "../models/TestPoint"

export function mapRisk(spec: InputSpec): Risk {
    if (spec.constraints.some((c) => c.kind === "pattern")) {
        return {
            type: "validation",
            description: "Invalid input format",
        }
    }

    return {
        type: "input",
        description: "Invalid input value",
    }
}
