import Immutable from 'immutable';
import * as StoreUtils from '../utils/StoreUtils';
import AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

let params = Immutable.fromJS([

  {family: 'Filter', name: 'rgbSplit',  label: 'RGB Split', value: 0, min: 0, max: 100, step: 0.5},
  {family: 'Filter', name: 'displacement', label: 'Displacement', value: 0, min: 0, max: 1000, step: 10},
  {family: 'Filter', name: 'pixelate', label: 'Pixelate', value: 0, min: 0, max: 100, step: 1},
  {family: 'Filter', name: 'twist', label: 'Twist', value: 0, min: 0, max: 15, step: 0.1},
  {family: 'Filter', name: 'invert', label: 'Invert', value: 0, min: -1, max: 2, step: 0.05},
  {family: 'Filter', name: 'blur', label: 'Blur', value: 0, min: 0, max: 30, step: 0.5},
  {family: 'Filter', name: 'glow', label: 'Glow', value: 0, min: 0, max: 10, step: 0.2},
  {family: 'Filter', name: 'outline', label: 'Outline', value: 0, min: 0, max: 20, step: 0.5},
  {family: 'Filter', name: 'tiltshift', label: 'Tilt-Shift', value: 0, min: 0, max: 100, step: 0.5},
  {family: 'Filter', name: 'kaleidoscopeSides', label: 'Kaleidoscope Segments', value: 0, min: 0, max: 24, step: 1},
  {family: 'Filter', name: 'kaleidoscopeAngle', label: 'Kaleidoscope Angle', value: 0, min: 0, max: 360, step: 1},
  
  {family: 'Calibration', name: 'minRange', label: 'Minimum Depth', value: 50, min: 0, max: 110, step: 1},
  {family: 'Calibration', name: 'maxRange', label: 'Maximum Depth', value: 50, min: 0, max: 120, step: 1},
  {family: 'Calibration', name: 'mirrored', label: 'Mirrored', value: 0, min: 0, max: 1, step: 1}, // checkbox 
  {family: 'Calibration', name: 'zoom', label: 'Zoom', value: 1, min: 0.2, max: 4, step: 0.05},
  /*
  {family: 'Calibration', name: 'offsetX', label: 'Position Offset X (px)', value: 0, min: -320, max: 320, step: 0.5},
  {family: 'Calibration', name: 'offsetY', label: 'Position Offset Y (px)', value: 0, min: -240, max: 240, step: 0.5},
  {family: 'Calibration', name: 'rotateX', label: '3D Rotate X', value: 0, min: -65, max: 65, step: 1},
  {family: 'Calibration', name: 'rotateY', label: '3D Rotate Y', value: 0, min: -65, max: 65, step: 1},
  {family: 'Calibration', name: 'perspective', label: '3D Perspetive', value: 800, min: 100, max: 2000, step: 20},
  */
]);

AppDispatcher.register(function(payload) {
 
  switch(payload.type) {

  	case ActionTypes.PARAM_VALUE_UPDATED:

  		const index = params.findIndex(function(obj) {
  			return (obj.get('name') === payload.data.name && obj.get('family') === payload.data.family && obj.get('effectName') === payload.data.effectName);
  		});
  		params = params.setIn([index, 'value'], payload.data.value);
  		break;

  	default:
  		return true;
  }

  ParamStore.emitChange();
  return true;

});

const ParamStore = StoreUtils.createStore({
  
  getParamsByFamily(family) {
    return params.filter(function(obj) {
      return obj.get('family') === family;
    });
  },

  getEffectParams(effectName) {
    return params.filter(function(obj) {
      return (obj.get('family') === 'Effect' && obj.get('effectName') === effectName);
    });
  },

  getEffectParamValues(effectName) {
    let paramValues = {};
    params.forEach(function(obj) {
      if(obj.get('family') === 'Effect' && obj.get('effectName') === effectName) {
        paramValues[obj.get('name')] = obj.get('value');
      }
    });
    return paramValues;
  },

  getEffectParamValue(paramName, effectName) {
    const index = params.findIndex(function(obj) {
      return (obj.get('name') === paramName && obj.get('family') === 'Effect' && obj.get('effectName') === effectName);
    });
    return params.getIn([index, 'value']);
  },

  getParamValue(family, paramName) {
    const index = params.findIndex(function(obj) {
      return (obj.get('name') === paramName && obj.get('family') === family);
    });
    return params.getIn([index, 'value']);
  },
  
  addEffectParams(paramArray) {

    console.log(paramArray);

    let newParams = [];
    for(let param of paramArray) {

      console.log(param)

      const index = params.findIndex(function(obj) {
        return (obj.get('family') === param.family && obj.get('name') === param.name && obj.get('effectName') === param.effectName);
      });

      console.log(index);

      if(index === -1) newParams.push(param);
    }
    console.log(params);
    params = params.concat(Immutable.fromJS(newParams));
    console.log(params);

  },

  loadNewEffectParams(paramArray) {
    const paramsWithoutEffect = params.filter(function(obj) {
      return obj.get('family') !== 'Effect';
    });
    const newParams = paramsWithoutEffect.concat(Immutable.fromJS(paramArray))
    params = newParams;
  }

});

export default ParamStore;
window.params = ParamStore;