import {
   isEqualPredicate,
   reject,
   callList
} from './utils';

const _listeners = [];

export default class ApplicationScrollService {
   constructor($window) {
      this._window = $window;
      angular.element($window).on('scroll', () => {
         callList(_listeners, this.getScrollTop());
      });
   }

   addEventListener(listener) {
      _listeners.push(listener);
   }

   removeEventListener(listener) {
      listeners = reject(listeners, isEqualPredicate(listener));
   }

   getScrollTop() {
      return this._window.pageYOffset;
   }
}
ApplicationScrollService.$inject = ['$window'];
