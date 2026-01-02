// import { generatePlaywrightSpec } from "./core/exporter/playwrightSpecGenerator"
// import { testExecutionSpecs } from "./mock/result" // 이미 생성된 결과

// const specText = generatePlaywrightSpec(testExecutionSpecs[0])

// console.log("===== GENERATED PLAYWRIGHT SPEC =====")
// console.log(specText)


import fs from "fs"
import path from "path"

const outputDir = path.resolve("generated")
fs.mkdirSync(outputDir, { recursive: true })

const filePath = path.join(outputDir, "signup-phone.spec.ts")
fs.writeFileSync(filePath, specText, "utf-8")

console.log(`✅ Spec file generated: ${filePath}`)
