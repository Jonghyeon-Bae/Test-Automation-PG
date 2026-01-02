// src/index.ts

import { analyzeZodSchema } from "../core/analyzer/formAnalyzer"

import { generateTestPoints } from "../core/generator/testPointGenerator"
import { generateTestConditions } from "../core/generator/testConditionGenerator"
import { generateTestCases } from "../core/generator/testCaseGenerator"
import { generateTestData } from "../core/generator/testDataGenerator"
import { generateScenarios } from "../core/generator/testScenarioGenerator"
import { generateExecutionSpecs } from "../core/generator/testExecutionSpecGenerator"
import { generateTestSuites } from "../core/generator/testSuiteGenerator"

import type { InputSpec } from "../core/models/InputSpec"
import type { TestData } from "../core/models/TestData"

function runTestDesignPipeline() {
    console.log("🚀 Test Design Automation Pipeline START")

    // 1️⃣ 입력 분석 (현재는 Zod 코드 → InputSpec) 1
    const sourceCode = `z.object({ phoneNumber: z.string().regex(...) })`

    const inputSpecs: InputSpec[] = analyzeZodSchema(sourceCode, "회원가입")

    console.log("✅ InputSpec", inputSpecs)

    // 2️⃣ TestPoint 생성
    const testPoints = generateTestPoints(inputSpecs)
    console.log("✅ TestPoint", testPoints)

    // 3️⃣ TestCondition 생성
    const testConditions = generateTestConditions(testPoints)
    console.log("✅ TestCondition", testConditions)

    // 4️⃣ TestCase 생성
    const testCases = generateTestCases(testConditions, testPoints)
    console.log("✅ TestCase", testCases)

    // 5️⃣ TestData 생성 + Map 구성
    const testDataMap: Record<string, TestData[]> = {}

    for (const spec of inputSpecs) {
        const key = `${spec.domain}.${spec.target}`
        testDataMap[key] = generateTestData(spec)
    }

    console.log("✅ TestDataMap", testDataMap)

    // 6️⃣ TestScenario 생성
    const scenarios = generateScenarios(
        testCases,
        testPoints,
        testConditions,
        testDataMap
    )

    console.log("✅ TestScenario", scenarios)

    // 7️⃣ TestExecutionSpec 생성
    const executionSpecs = generateExecutionSpecs(
        testPoints,
        testCases,
        testConditions
    )

    console.log("✅ TestExecutionSpec", executionSpecs)

    // 8️⃣ TestSuite 생성
    const testSuites = generateTestSuites(executionSpecs)
    console.log("✅ TestSuite", testSuites)

    console.log("🎉 Test Design Automation Pipeline END")
}

// 실행
runTestDesignPipeline()
