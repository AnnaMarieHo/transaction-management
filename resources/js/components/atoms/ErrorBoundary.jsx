import React from "react";

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in child component tree
 * Logs errors and displays fallback UI instead of crashing
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error Boundary caught an error:", error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <svg
                                className="w-6 h-6 text-red-600 dark:text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-red-900 dark:text-red-200">
                                Something went wrong
                            </h3>
                            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                {this.props.errorMessage ||
                                    "This component encountered an error and couldn't be displayed."}
                            </p>
                            {process.env.NODE_ENV === "development" &&
                                this.state.error && (
                                    <details className="mt-3 text-xs text-red-800 dark:text-red-400">
                                        <summary className="cursor-pointer font-medium hover:text-red-900 dark:hover:text-red-300">
                                            Error details (development only)
                                        </summary>
                                        <pre className="mt-2 p-3 bg-red-100 dark:bg-red-900/30 rounded overflow-auto max-h-40">
                                            {this.state.error.toString()}
                                            {
                                                this.state.errorInfo
                                                    ?.componentStack
                                            }
                                        </pre>
                                    </details>
                                )}
                            <button
                                onClick={this.handleReset}
                                className="mt-3 text-sm font-medium text-red-900 dark:text-red-200 hover:text-red-700 dark:hover:text-red-100 underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
