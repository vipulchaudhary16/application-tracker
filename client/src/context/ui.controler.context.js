import { useState } from 'react';
import { createContext } from 'react';

export const UIContext = createContext({
	activeModel: '',
	setActiveModeType: () => {},
	progress: 0,
	setProgress: () => {},
	isLoading: false,
	setIsLoading: () => {},
});

export const MODAL_TYPES = {
	ADD: 'add',
	UPDATE: 'update',
};

export const UIProvider = ({ children }) => {
	const [activeModel, setActiveMode] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const setActiveModeType = (type) => {
		setActiveMode(type);
	};

	const value = {
		setActiveModeType,
		activeModel,
		progress,
		setProgress,
		isLoading,
		setIsLoading,
	};
	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
