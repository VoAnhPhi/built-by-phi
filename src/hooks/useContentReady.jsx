import React, { createContext, useContext } from "react";

// Create context for content ready state
const ContentReadyContext = createContext(false);

/**
 * Provider component that wraps the app and provides content ready state
 * @param {boolean} isReady - Whether the main content is ready (phase === "content")
 * @param {React.ReactNode} children - Child components
 */
export function ContentReadyProvider({ isReady, children }) {
    return <ContentReadyContext.Provider value={isReady}>{children}</ContentReadyContext.Provider>;
}

/**
 * Hook to check if main content is ready
 * Use this in components that need to wait for loading/intro to finish
 * @returns {boolean} - True when phase === "content", false otherwise
 */
export function useContentReady() {
    const isReady = useContext(ContentReadyContext);
    return isReady;
}
