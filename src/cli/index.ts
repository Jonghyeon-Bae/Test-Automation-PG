// src/cli/index.ts
import fs from "fs"
import { analyzeZodSchema } from "../core/analyzer/formAnalyzer"
import { generateTestPoints } from "../core/generator/testPointGenerator"
import { generateExecutionSpecs } from "../core/generator/testExecutionSpecGenerator"
import { generateTestSuites } from "../core/generator/testSuiteGenerator"
const source = fs.readFileSync("./src/examples/customer-schema.ts", "utf-8")

const specs = analyzeZodSchema(source, "CustomerForm")
const testPoints = generateTestPoints(specs)

/**
 * 예시 TestCase (실제로는 Step 4 Generator 결과)
 */
const testCases = [
    {
        id: "TC-001",
        testConditionId: "TP-CustomerForm-phoneNumber-BOUNDARY",
        title: "전화번호 9자리 입력 시 오류 검증",
        steps: [
            { stepNo: 1, action: "전화번호 입력", inputData: "123456789" },
            { stepNo: 2, action: "저장 버튼 클릭" },
        ],
        expectedResult: "전화번호 길이 부족 오류 메시지가 표시된다",
        relatedTechnique: "boundary value analysis",
    },
]

const executionSpecs = generateExecutionSpecs(testPoints, testCases)
const suites = generateTestSuites(executionSpecs)
console.log(JSON.stringify(executionSpecs, null, 2))
console.log(JSON.stringify(suites, null, 2))
