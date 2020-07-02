import React from "react";
import { Engine } from "../../../lib/engine";

interface EngineProviderProps {
  engine: null | Engine;
}

export const engineContext = React.createContext<EngineProviderProps>({
  engine: null,
});
const Provider = engineContext.Provider;

export function EngineProvider({
  children,
  engine,
}: {
  children: React.ReactChildren | React.ReactChild;
  engine: Engine;
}) {
  return (
    <Provider
      value={{
        engine,
      }}
    >
      {children}
    </Provider>
  );
}

export function useEngine(): Engine {
  const { engine } = React.useContext(engineContext);
  if (!engine) {
    throw new Error(
      `Engine not set. Did we call useEngine outside of the game context?`
    );
  }
  return engine;
}
