import { createSelector } from 'reselect';

export const rangeCalibrationParams = (state) => {
	return state.calibrationParams.get('params').filter((param) => {
		return param.get('type') == 'range';
	});
};

export const rangeDepthCalibrationParams = createSelector(
	[rangeCalibrationParams],
	(params) => params.filter(param => param.get('label').match(/depth/i))
);