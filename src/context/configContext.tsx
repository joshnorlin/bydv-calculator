import { createContext, useState, useContext } from "react";
import type { ReactNode } from 'react';
import config from "../../data.config.json";

// question whether we need a whole context file?
// i believe it has two main purposes:
// 1. allow farmers to update yield
// 2. importing as global context might make calculation fetching faster.

export type ConfigType = {
  "bushelPrice": 'number',
  "treatmentCostsPerAcre": {
    "cont": 'number',
    "neon": 'number',
    "fallApp": 'number',
    "springApp": 'number',
    "neonFallApp": 'number',
    "neonSpringApp": 'number'
  },
  "treatmentProfitsPerAcre": {
    "sparec": {
      "sept-oct": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": 'number',
        "springApp": 'number',
        "neonFallApp": 'number',
        "neonSpringApp": 'number'
      },
      "oct-nov": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": 'number',
        "springApp": 'number',
        "neonFallApp": 'number',
        "neonSpringApp": 'number'
      },
      "nov-dec": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": null,
        "springApp": 'number',
        "neonFallApp": null,
        "neonSpringApp": 'number'
      }
    },
    "rusty": {
      "sept-oct": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": 'number',
        "springApp": 'number',
        "neonFallApp": 'number',
        "neonSpringApp": 'number'
      },
      "oct-nov": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": 'number',
        "springApp": 'number',
        "neonFallApp": 'number',
        "neonSpringApp": 'number'
      },
      "nov-dec": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": null,
        "springApp": 'number',
        "neonFallApp": null,
        "neonSpringApp": 'number'
      }
    },
    "warsaw": {
      "sept-oct": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": 'number',
        "springApp": 'number',
        "neonFallApp": 'number',
        "neonSpringApp": 'number'
      },
      "oct-nov": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": 'number',
        "springApp": 'number',
        "neonFallApp": 'number',
        "neonSpringApp": 'number'
      },
      "nov-dec": {
        "cont": 'number',
        "neon": 'number',
        "fallApp": null,
        "springApp": 'number',
        "neonFallApp": null,
        "neonSpringApp": 'number'
      }
    }
  }
};

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
