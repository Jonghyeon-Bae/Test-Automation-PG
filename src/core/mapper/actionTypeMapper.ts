// src/core/mapper/actionTypeMapper.ts
import { ActionType } from "../constants/automationTypes"

export function mapActionType(action?: string): ActionType | undefined {
    switch (action) {
        case "navigate":
            return ActionType.NAVIGATE
        case "fill":
            return ActionType.FILL
        case "click":
            return ActionType.CLICK
        case "submit":
            return ActionType.SUBMIT
        case "wait":
            return ActionType.WAIT
        default:
            return undefined
    }
}
