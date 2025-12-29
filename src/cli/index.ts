import fs from "fs"
import { analyzeZodSchema } from "../core/analyzer/formAnalyzer"
import { generateTestPoints } from "../core/generator/testPointGenerator"

const source = fs.readFileSync("./src/examples/customer-schema.ts", "utf-8")

const specs = analyzeZodSchema(source, "CustomerForm")
const testPoints = generateTestPoints(specs)

console.log(JSON.stringify(testPoints, null, 2))
