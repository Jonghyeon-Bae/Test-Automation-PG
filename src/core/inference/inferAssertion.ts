import { AssertionType } from "../constants/automationTypes"
type InferAssertionInput = {
    assertion?: string
    description?: string
}

export function inferAssertion(
    step: InferAssertionInput
): AssertionType {
    const text = (step.assertion || step.description || "").toLowerCase()

    // 존재하지 않음이 가장 명확하므로 최우선
    if (
        text.includes("없") ||
        text.includes("보이지 않") ||
        text.includes("표시되지")
    ) {
        return AssertionType.NOT_EXISTS
    }

    if (
        text.includes("보인다") ||
        text.includes("표시된다") ||
        text.includes("노출")
    ) {
        return AssertionType.VISIBLE
    }

    if (
        text.includes("같다") ||
        text.includes("일치")
    ) {
        return AssertionType.EQUALS
    }

    if (
        text.includes("포함")
    ) {
        return AssertionType.CONTAINS
    }

    return AssertionType.UNKNOWN
}
