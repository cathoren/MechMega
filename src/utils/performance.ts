// Performance monitoring utilities for Firebase operations

export class PerformanceMonitor {
    private static instance: PerformanceMonitor;
    private timers: Map<string, number> = new Map();

    static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    startTimer(operation: string): void {
        this.timers.set(operation, performance.now());
        console.log(`🕐 Starting ${operation}...`);
    }

    endTimer(operation: string): number {
        const startTime = this.timers.get(operation);
        if (!startTime) {
            console.warn(`No timer found for operation: ${operation}`);
            return 0;
        }

        const duration = performance.now() - startTime;
        this.timers.delete(operation);

        const emoji = duration < 500 ? "⚡" : duration < 1000 ? "🟡" : "🔴";
        console.log(
            `${emoji} ${operation} completed in ${duration.toFixed(2)}ms`
        );

        return duration;
    }

    measureAsync<T>(operation: string, fn: () => Promise<T>): Promise<T> {
        this.startTimer(operation);
        return fn().finally(() => this.endTimer(operation));
    }
}

export const perfMonitor = PerformanceMonitor.getInstance();
