import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-gray-800 text-center">
          <h1 className="text-4xl font-black text-game-red mb-4">Oups ! Une erreur s'est produite.</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl">
            L'application a rencontré un problème, souvent causé par une extension de navigateur (comme Guideflow ou un traducteur) qui modifie la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-game-blue text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
