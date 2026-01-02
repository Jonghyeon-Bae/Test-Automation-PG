import { TestCondition } from "../core/models/TestCondition"

export const sampleTestConditions: TestCondition[] = [
    {
        id: "TCND-1",
        testPointId: "TP-회원가입-phoneNumber",
        category: "equivalence",
        description: "phoneNumber에 유효한 값이 입력되면 정상 처리된다",
        expectedResult: "입력이 허용된다",
        relatedTechnique: "equivalence partitioning",
    },
]