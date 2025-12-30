// src/core/mapper/riskLevelMapper.ts
import { TestPoint } from "../models/TestPoint"

export function mapRiskLevel(tp: TestPoint): "Low" | "Medium" | "High" {
    if (tp.businessImpact) return "High"
    if (tp.risk.type === "validation") return "Medium"
    return "Low"
}
