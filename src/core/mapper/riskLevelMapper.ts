// src/core/mapper/riskLevelMapper.ts
import { TestPoint } from "../models/TestPoint"

export function mapRiskLevel(tp: TestPoint): "low" | "medium" | "high" {
    if (tp.businessImpact) return "high"
    if (tp.risk.type === "validation") return "medium"
    return "low"
}
