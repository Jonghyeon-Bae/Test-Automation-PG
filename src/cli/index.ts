#!/usr/bin/env node

/// <reference types="node" />

import fs from "fs"
import path from "path"

import { analyzeZodSchema } from "../core/analyzer/formAnalyzer"
import { generateTestPoints } from "../core/generator/testPointGenerator"
import { generateTestConditions } from "../core/generator/testConditionGenerator"
import { generateTestCases } from "../core/generator/testCaseGenerator"
import { generateScenarios } from "../core/generator/testScenarioGenerator"

// --------------------
// 1. CLI 인자 파싱
// --------------------
const args = process.argv.slice(2)

function getArg(flag: string): string | undefined {
    const index = args.indexOf(flag)
    return index !== -1 ? args[index + 1] : undefined
}

const inputPath = getArg("--input")
const domain = getArg("--domain")
const outDir = getArg("--out") || "./testcraft-output"

if (!inputPath || !domain) {
    console.error("Usage:")
    console.error(
        "  testcraft analyze --input <file> --domain <domain> [--out <dir>]"
    )
    process.exit(1)
}

// --------------------
// 2. 입력 파일 읽기
// --------------------
const sourceCode = fs.readFileSync(inputPath, "utf-8")

// --------------------
// 3. TestCraft 파이프라인 실행
// --------------------
const inputSpecs = analyzeZodSchema(sourceCode, domain)
const testPoints = generateTestPoints(inputSpecs)
const testConditions = generateTestConditions(testPoints)
const testCases = generateTestCases(testConditions, testPoints)

// (TestData, Scenario는 Step 2에서 확장)

// --------------------
// 4. 출력 디렉토리 생성
// --------------------
fs.mkdirSync(outDir, { recursive: true })

function writeJSON(filename: string, data: any) {
    fs.writeFileSync(
        path.join(outDir, filename),
        JSON.stringify(data, null, 2),
        "utf-8"
    )
}

// --------------------
// 5. 결과 출력
// --------------------
writeJSON("input-specs.json", inputSpecs)
writeJSON("test-points.json", testPoints)
writeJSON("test-conditions.json", testConditions)
writeJSON("test-cases.json", testCases)

console.log("✅ TestCraft analysis complete.")
console.log(`📂 Output directory: ${outDir}`)
