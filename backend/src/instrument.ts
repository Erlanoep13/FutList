import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://314e4b76bb5686aac6b11cdb9cbd744b@o4511265138737152.ingest.us.sentry.io/4512222989713408",
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});
