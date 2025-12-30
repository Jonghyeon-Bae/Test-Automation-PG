// src/core/suite/suiteTemplates.ts
import { TestSuite } from "../models/TestSuite"

export const SUITE_TEMPLATES: Omit<TestSuite, "testSpecIds">[] = [
    {
        id: "TS-SMOKE",
        name: "Smoke Test Suite",
        description: "핵심 기능 정상 동작 여부 확인",
        criteria: { riskLevel: "High" },
    },
    {
        id: "TS-REGRESSION",
        name: "Regression Test Suite",
        description: "기존 기능 영향 여부 확인",
        criteria: {},
    },
    {
        id: "TS-VALIDATION",
        name: "Validation Focus Suite",
        description: "입력 검증 중심 테스트",
        criteria: { technique: "equivalence partitioning" },
    },
]
