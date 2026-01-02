import { TestCase } from "../core/models/TestCase"
export const sampleTestCases: TestCase[] = [
    {
        id: "TC-1",
        // domain: "회원가입",
        // target: "phoneNumber",
        testConditionId: "TCND-1",
        title: "휴대폰 번호 유효성 검증",

        preconditions: ["회원가입 화면 진입"],

        steps: [
            {
                order: 1,
                action: "휴대폰 번호 입력",
                inputData: "01012345678",
            },
            {
                order: 2,
                action: "제출 버튼 클릭",
            },
        ],

        expectedResult: "정상적으로 가입이 진행된다",
        priority: "Medium",
    },
]
