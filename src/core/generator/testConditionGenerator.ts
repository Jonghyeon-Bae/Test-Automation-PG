import { TestPoint } from "../models/TestPoint"
import { TestCondition } from "../models/TestCondition"

let conditionSeq = 1

function nextId() {
    return `TCND-${conditionSeq++}`
}

export function generateTestConditions(
    testPoints: TestPoint[]
): TestCondition[] {
    const conditions: TestCondition[] = []

    for (const tp of testPoints) {
        // 1. Equivalence Partitioning
        if (tp.recommendedTechniques.includes("equivalence partitioning")) {
            conditions.push({
                id: nextId(),
                testPointId: tp.id,
                category: "equivalence",
                description: `${tp.target}에 유효한 값이 입력되면 정상 처리된다`,
                expectedResult: "입력이 허용된다",
                relatedTechnique: "equivalence partitioning",
            })

            conditions.push({
                id: nextId(),
                testPointId: tp.id,
                category: "equivalence",
                description: `${tp.target}에 유효하지 않은 값이 입력되면 오류가 발생한다`,
                expectedResult: "오류 메시지가 표시된다",
                relatedTechnique: "equivalence partitioning",
            })
        }

        // 2. Boundary Value Analysis
        if (tp.recommendedTechniques.includes("boundary value analysis")) {
            conditions.push({
                id: nextId(),
                testPointId: tp.id,
                category: "boundary",
                description: `${tp.target} 값이 경계값을 벗어난 경우`,
                expectedResult: "경계값 오류가 발생한다",
                relatedTechnique: "boundary value analysis",
                // TODO: min/max 기반 상세 경계 조건 분해 필요
            })
        }

        // 3. Risk-based (Error Guessing)
        if (tp.risk.type === "validation" || tp.risk.type === "data") {
            conditions.push({
                id: nextId(),
                testPointId: tp.id,
                category: "risk",
                description: `${tp.target}에 예외적인 입력이 포함된 경우`,
                expectedResult: "입력이 거부된다",
                relatedTechnique: "error guessing",
            })
        }
    }

    return conditions
}
