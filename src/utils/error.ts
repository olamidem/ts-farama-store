export function getReadableError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message;
    if (message.includes("uuid")) {
      return "Please select a valid category.";
    }
    if (message.includes("Invalid login credentials")) {
      return "Incorrect email or password.";
    }
    if (message.includes("Email not confirmed")) {
      return "Please verify your email before signing in.";
    }
    if (message.includes("duplicate")) {
      return "This record already exists.";
    }
    if (message.includes("violates foreign key")) {
      return "The selected category no longer exists.";
    }
    if (message.includes("network")) {
      return "Unable to connect. Check your internet connection.";
    }
    return message;
  }
  return "Something went wrong. Please try again.";
}
