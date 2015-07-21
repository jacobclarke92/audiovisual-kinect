import { EFFECT_ADD, EFFECT_CHANGE } from './ActionTypes';

export function effectAdd(effectName) {
  return {
    type: EFFECT_ADD,
    effectName
  };
}

export function effectChange(effectName) {
  return {
    type: EFFECT_CHANGE,
    effectName
  };
}
