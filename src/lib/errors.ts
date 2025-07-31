// src/lib/errors.ts
import { FieldError, ValidationErrorResponse } from "@/features/auth/types";

export function isValidationErrorResponse(
  err: unknown
): err is ValidationErrorResponse {
  // 1) Must be a non-null object
  if (typeof err !== "object" || err === null) {
    return false;
  }

  // 2) Must have a `detail` property
  if (!("detail" in err)) {
    return false;
  }

  // 3) Grab it (no `any`—we cast to the interface we expect)
  const detail = (err as ValidationErrorResponse).detail;

  // 4) It must be an array
  return Array.isArray(detail);
}

export function logFieldErrors(errors: FieldError[]): void {
  console.group("422 Validation Errors");
  errors.forEach(({ loc, msg }) =>
    console.log(`${loc.join(" → ")}: ${msg}`)
  );
  console.groupEnd();
}
