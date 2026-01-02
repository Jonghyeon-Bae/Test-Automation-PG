// import { inferAction } from "../core/inference/inferAction"
// import { ActionType } from "../core/constants/automationTypes"

// const samples = [
//     "아이디 입력",
//     "비밀번호 작성",
//     "로그인 버튼 클릭",
//     "페이지 이동",
//     "3초 대기",
//     "알 수 없는 행동",
// ]

// for (const text of samples) {
//     const result = inferAction({ description: text })
//     console.log(text, "=>", result)
// }

import { inferAssertion } from "../core/inference/inferAssertion"
import { AssertionType } from "../core/constants/automationTypes"

const samples = [
    "메인 화면이 표시된다",
    "에러 메시지가 나타난다",
    "버튼이 보이지 않는다",
    "값이 동일하다",
    "알 수 없는 결과",
]

for (const text of samples) {
    const result = inferAssertion({ description: text })
    console.log(text, "=>", result)
}
