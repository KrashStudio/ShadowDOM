// Copyright 2013 The Polymer Authors. All rights reserved.
// Use of this source code is goverened by a BSD-style
// license that can be found in the LICENSE file.

(function(scope) {
  'use strict';

  var GetElementsByInterface = scope.GetElementsByInterface;
  var ParentNodeInterface = scope.ParentNodeInterface;
  var SelectorsInterface = scope.SelectorsInterface;
  var mixin = scope.mixin;
  var registerObject = scope.registerObject;

  var DocumentFragment = registerObject(document.createDocumentFragment());
  var prototype = Object.create(Object.getPrototypeOf(DocumentFragment.prototype), {
    constructor: {
      value: DocumentFragment,
      writable: true,
      enumerable: false,
      configurable: true
    }
  });

  var names = Object.getOwnPropertyNames(DocumentFragment.prototype);

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var descriptor = Object.getOwnPropertyDescriptor(DocumentFragment.prototype, name);

    if (descriptor.configurable || (
        !ParentNodeInterface.hasOwnProperty(name) &&
        !SelectorsInterface.hasOwnProperty(name) &&
        !GetElementsByInterface.hasOwnProperty(name)
      )) {
      Object.defineProperty(prototype, name, descriptor);
    }
  }

  DocumentFragment.prototype = prototype;

  mixin(DocumentFragment.prototype, ParentNodeInterface);
  mixin(DocumentFragment.prototype, SelectorsInterface);
  mixin(DocumentFragment.prototype, GetElementsByInterface);

  var Comment = registerObject(document.createComment(''));

  scope.wrappers.Comment = Comment;
  scope.wrappers.DocumentFragment = DocumentFragment;

})(window.ShadowDOMPolyfill);
