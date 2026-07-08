export function getReadableError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message;
    if (message.includes("uuid")) {
      return "Please select a valid category.";
    }
    if (message.includes("Invalid login credentials")) {
      return "Incorrect email or password.";
    }
    if (message.includes("duplicate")) {
      return "This record already exists.";
    }
    return message;
  }
  return "Something went wrong. Please try again.";
}
