import { VIEWPORT_RESIZE } from './ActionTypes';

export function viewportResize(width, height) {
  return {
    type: VIEWPORT_RESIZE,
    width, 
    height
  };
}
