import * as React from 'react';
import { get, debounce } from 'lodash-es';

import { IDeviceServiceModel, IDeviceServiceProps } from './interfaces';

const RESIZE_HANDLER_DELAY = 10;
const RESIZE_EVENT = 'resize';

const defaultDeviceServiceModel: IDeviceServiceModel = {
    isDesktop: (get(window, 'innerWidth', 0) > 1364),
	isTablet: (get(window, 'innerWidth', 0) < 1365 && get(window, 'innerWidth', 0) > 767),
	isMobile: (get(window, 'innerWidth', 0) < 768),
	layoutHeiht: get(window, 'innerHeight', 0),
	layoutWidth: get(window, 'innerWidth', 0),
};

export const DeviceServiceContext = React.createContext(defaultDeviceServiceModel);

const DeviceServiceProvider: React.FC<IDeviceServiceProps> = (props): JSX.Element => {
	const [deviceServiceModel, setDeviceServiceModel] = React.useState(defaultDeviceServiceModel);
	
	React.useEffect(() => {
		const handleOnResize = () => {
			setDeviceServiceModel({
                isDesktop: (get(window, 'innerWidth', 0) > 1364),
				isTablet: (get(window, 'innerWidth', 0) < 1365 && get(window, 'innerWidth', 0) > 767),
				isMobile: (get(window, 'innerWidth', 0) < 768),
				layoutHeiht: get(window, 'innerHeight', 0),
				layoutWidth: get(window, 'innerWidth', 0),
			});
		};
		const debouncedHandler = debounce(handleOnResize, RESIZE_HANDLER_DELAY);
		window.addEventListener(RESIZE_EVENT, debouncedHandler);

		return () => {
			window.removeEventListener(RESIZE_EVENT, debouncedHandler);
		};
	}, []);

	return (
		<DeviceServiceContext.Provider value={deviceServiceModel}>
			{get(props, 'children', '')}
		</DeviceServiceContext.Provider>
	);
};

export default DeviceServiceProvider;
