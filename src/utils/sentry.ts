import * as Sentry from "@sentry/react";

/**
 * Sentry 초기화
 * @param SENTRY_DSN
 */
export function initializeSentry(SENTRY_DSN: string) {
    console.log("* Sentry Initialized! ", SENTRY_DSN);

    Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
}
