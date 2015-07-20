import { VIEWPORT_UPDATE } from './ActionTypes';

export function viewportUpdate(size) {
  return {
    type: VIEWPORT_UPDATE,
    size
  };
}
