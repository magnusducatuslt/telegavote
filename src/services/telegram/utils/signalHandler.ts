export function onSignal(signal: string): void {
  switch (signal) {
    case "SIGINT":
      process.exit();
      break;
    case "SIGTERM":
      process.exit();
      break;
    case "SIGQUIT":
      process.exit();
      break;
    default:
      process.exit();
      break;
  }
}
