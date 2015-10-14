import {outerHeight} from './utils';

const STICKY_CLASS     = 'ak-sticky',
      UNSTICKY_CLASS   = 'ak-unsticky';

export default function StickyDirective (ScrollService, LayoutService, StickyService) {
   return {
      restrict: 'A',
      link: function(scope, element) {

         var placeholder   = null,
             content       = element.parent()[0];

         /* --- init --- */
         ScrollService.addEventListener(_checkIfNeedSticky);
         LayoutService.addEventListener(layoutListener);

         element.on('$destroy', function _onElementDestroy() {
            LayoutService.removeEventListener(layoutListener);
            ScrollService.removeEventListener(_checkIfNeedSticky);
            _unstick();
         });

         _checkIfNeedSticky();

         /* === impl === */

         function layoutListener() {
            if ( placeholder ) {
               // we have two-way dependency
               // we need establish width of placeholder is equal width of element
               // but we need refresh width of element when resizing window
               // so the most easy way - restore element in DOM (in common context) and then change position to fixed again
               _unstickElement();
               _stickElement();
            }  else {
               _checkIfNeedSticky();
            }
         }

         function _checkIfNeedSticky() {
            var scrollTop     = ScrollService.getScrollTop() + StickyService.getStickyHeightOver(element),
                contentTop    = content.offsetTop,
                elementOffset = (placeholder || element)[0].offsetTop,
                contentBottom = contentTop + content.scrollHeight;

            if ( (scrollTop >= elementOffset) && (scrollTop < contentBottom) ) {
               _stick();
            } else {
               _unstick();
            }
         }

         function _stick() {
            if ( placeholder ) {
               // already sticky, just monitor size changes
               element.css({
                  top   : StickyService.getStickyHeightOver(element)
               });

               placeholder.css({
                  height   : element[0].clientHeight + 'px'
               });
            } else {
               _stickElement();
               StickyService.registry(element);
            }
         }

         function _stickElement() {
            placeholder = angular.element('<div>');
            placeholder.css({
               height   : element[0].clientHeight + 'px'
            });

            element.addClass(STICKY_CLASS);
            element.removeClass(UNSTICKY_CLASS);

            element.css({
               top      : StickyService.getStickyHeightOver(element) + 'px',
               position : 'fixed',
               width    : element[0].clientWidth + 'px',
               'z-index': 10
            });

            element.after(placeholder);
         }

         function _unstickElement() {
            element.addClass(UNSTICKY_CLASS);
            element.removeClass(STICKY_CLASS);

            element.css({
               top      : '',
               position : '',
               width    : ''
            });

            placeholder.remove();
            placeholder = null;
         }

         function _unstick() {
            if ( placeholder ) {
               _unstickElement();
               StickyService.unregistry(element);
            }
         }
      }
   };
}
StickyDirective.$inject = ['ScrollService', 'LayoutService', 'StickyService'];
