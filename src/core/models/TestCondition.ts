// src/core/models/TestCondition.ts

import { TestTechnique } from "./TestPoint"

export type TestConditionCategory = "risk" | "boundary" | "equivalence"

export interface TestCondition {
    id: string

    /** 어떤 TestPoint에서 파생되었는지 */
    testPointId: string

    /** 테스트 조건 설명 */
    description: string

    /** 기대 결과 */
    expectedResult: string

    /** 테스트 기법 기반 분류 */
    category: TestConditionCategory

    /** 이 조건을 도출한 테스트 기법 */
    relatedTechnique: TestTechnique
}
