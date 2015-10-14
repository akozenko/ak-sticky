import {isEqualPredicate, reject} from './utils';

let _elements = [];

export default class StickyService {

   registry(element) {
      _elements.push(element);
   }

   unregistry(element) {
      _elements = reject(_elements, isEqualPredicate(element));
   }

   getStickyHeightOver(element) {
      var offset = 0;
      _elements.every(h => {
         if (h === element) {
            return false;
         }
         offset += h[0].clientHeight;
         return true;
      });

      return offset;
   }

}
