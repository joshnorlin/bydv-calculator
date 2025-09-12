import { createContext, useState, useContext } from "react";
import type { ReactNode } from 'react';
import config from "../../data.config.json";
import type { ConfigType } from "../types/types";

type ConfigContextType = {
  config: ConfigType;
  updateConfig: (updates: Partial<ConfigType>) => void;
  resetConfig: () => void;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

type ConfigProviderProps = {
  children: ReactNode;
  initialConfig?: Partial<ConfigType>;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ 
  children, 
  initialConfig = {}
}) => {
  // Type assertion for the imported config
  const typedConfig = config as unknown as ConfigType;
  
  const [configState, setConfigState] = useState<ConfigType>({
    ...typedConfig,
    ...initialConfig
  });

  const updateConfig = (updates: Partial<ConfigType>) => {
    setConfigState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetConfig = () => {
    setConfigState(typedConfig);
  };

  return (
    <ConfigContext.Provider 
      value={{ 
        config: configState, 
        updateConfig,
        resetConfig
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
