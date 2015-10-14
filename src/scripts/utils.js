export function isEqualPredicate(obj) {
   return function _predicate(another) {
      return obj === another;
   };
}

export function negate(predicate) {
   return function() {
      return !predicate.apply(this, arguments);
   };
}

export function reject(list, predicate) {
   return list.filter(negate(predicate));
}

export function callList(listeners, ...args) {
   listeners.forEach(function(listener) {
      listener.apply(null, args);
   });
}

export function outerHeight(element) {
   var height = element.clientHeight;
   var computedStyle = window.getComputedStyle(element);
   height += parseInt(computedStyle.marginTop, 10);
   height += parseInt(computedStyle.marginBottom, 10);
   height += parseInt(computedStyle.borderTopWidth, 10);
   height += parseInt(computedStyle.borderBottomWidth, 10);
   return height;
}
