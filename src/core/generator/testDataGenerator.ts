import { InputSpec } from "../models/InputSpec"
import { TestData } from "../models/TestData"

let dataSeq = 1
const nextId = () => `TD-${dataSeq++}`

export function generateTestData(spec: InputSpec): TestData[] {
    const results: TestData[] = []

    for (const constraint of spec.constraints) {
        switch (constraint.kind) {
            case "min":
                results.push(
                    {
                        id: nextId(),
                        target: spec.target,
                        value: constraint.value - 1,
                        validity: "invalid",
                        description: "최소값 미만",
                    },
                    {
                        id: nextId(),
                        target: spec.target,
                        value: constraint.value,
                        validity: "valid",
                        description: "최소값",
                    }
                )
                break

            case "max":
                results.push(
                    {
                        id: nextId(),
                        target: spec.target,
                        value: constraint.value,
                        validity: "valid",
                        description: "최대값",
                    },
                    {
                        id: nextId(),
                        target: spec.target,
                        value: constraint.value + 1,
                        validity: "invalid",
                        description: "최대값 초과",
                    }
                )
                break

            case "pattern":
                results.push(
                    {
                        id: nextId(),
                        target: spec.target,
                        value: "01012345678",
                        validity: "valid",
                        description: "정상 패턴",
                    },
                    {
                        id: nextId(),
                        target: spec.target,
                        value: "abc123",
                        validity: "invalid",
                        description: "패턴 불일치",
                    }
                )
                break
        }
    }

    return results
}
