import { TestPoint } from "../core/models/TestPoint"

export const sampleTestPoints: TestPoint[] = [
    {
        id: "TP-회원가입-phoneNumber",
        domain: "회원가입",
        target: "phoneNumber",
        constraints: [],
        risk: {
            type: "validation",
            description: "Invalid input format",
        },
        recommendedTechniques: ["equivalence partitioning"],
    },
]
