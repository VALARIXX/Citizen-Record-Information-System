import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

const ErrorBoundary = () => {
    const error = useRouteError();
    let errorMessage = 'An unexpected error has occurred.';
    let errorTitle = 'Unexpected Error';
    let is404 = false;

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            errorTitle = 'Page Not Found';
            errorMessage = "Sorry, we couldn't find the page you're looking for.";
            is404 = true;
        } else {
            errorTitle = `Error ${error.status}`;
            errorMessage = error.statusText;
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="mx-auto flex items-center justify-center p-4">
                    <div className={`p-4 rounded-full ${is404 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                        <AlertTriangle size={64} />
                    </div>
                </div>

                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    {errorTitle}
                </h2>

                <p className="mt-2 text-md text-gray-600">
                    {errorMessage}
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Reload Page
                    </button>

                    <Link
                        to="/"
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                        <Home size={16} className="mr-2" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary;
