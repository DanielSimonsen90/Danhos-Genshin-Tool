import Router from "./Router";
import { ErrorBoundary, useErrorBoundaryToast } from "./ErrorBoundary";

const AppWithErrorHandling = () => {
  const { handleProductionError } = useErrorBoundaryToast();
  
  return (
    <ErrorBoundary onProductionError={handleProductionError}>
      <Router />
    </ErrorBoundary>
  );
};

export const App = () => <AppWithErrorHandling />;

export default App;