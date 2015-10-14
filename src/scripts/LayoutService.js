import {
   isEqualPredicate,
   reject,
   callList
} from './utils';

const _listeners = [];

export default class LayoutService {
   constructor($window) {
      angular.element($window).on('resize', () => {
         callList(_listeners);
      });
   }

   addEventListener(listener) {
      _listeners.push(listener);
   }

   removeEventListener(listener) {
      listeners = reject(listeners, isEqualPredicate(listener));
   }
}
LayoutService.$inject = ['$window'];
