import { ReportHandler } from 'web-vitals';

/**
 * @example reportWebVitals(console.log)
 * @param {ReportHandler} onPerfEntry
 * @see {https://www.npmjs.com/package/web-vitals}
 * @see {https://bit.ly/CRA-vitals}
 */
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
	if (onPerfEntry) {
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
