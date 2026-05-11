export type ValidationSeverity = "success" | "warning" | "danger";

export interface ValidationMessage {
  label: string;
  message: string;
  severity: ValidationSeverity;
}
