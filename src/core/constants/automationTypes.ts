// src/core/constants/automationTypes.ts

export enum ActionType {
    NAVIGATE = "navigate",
    FILL = "fill",
    CLICK = "click",
    SUBMIT = "submit",
    WAIT = "wait",
    UNDEFINED = "undefined",
}

export enum AssertionType {
    VISIBLE = "visible",
    EQUALS = "equals",
    CONTAINS = "contains",
    NOT_EXISTS = "notExists",
}
