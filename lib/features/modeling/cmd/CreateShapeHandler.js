import { assign } from 'min-dash';

/**
 * @typedef {import('../../../model').Base} Base
 *
 * @typedef {import('../../../util/Types').Point} Point
 *
 * @typedef {import('../../../core/Canvas').default} Canvas
 */

var round = Math.round;


/**
 * A handler that implements reversible addition of shapes.
 *
 * @param {canvas} Canvas
 */
export default function CreateShapeHandler(canvas) {
  this._canvas = canvas;
}

CreateShapeHandler.$inject = [ 'canvas' ];


// api //////////////////////


/**
 * Appends a shape to a target shape
 *
 * @param {Object} context
 * @param {Base} context.parent The parent.
 * @param {Point} context.position The position at which to create the new shape.
 * @param {number} [context.parentIndex] The optional index at which to add the
 * shape to the parent's children.
 */
CreateShapeHandler.prototype.execute = function(context) {

  var shape = context.shape,
      positionOrBounds = context.position,
      parent = context.parent,
      parentIndex = context.parentIndex;

  if (!parent) {
    throw new Error('parent required');
  }

  if (!positionOrBounds) {
    throw new Error('position required');
  }

  // (1) add at event center position _or_ at given bounds
  if (positionOrBounds.width !== undefined) {
    assign(shape, positionOrBounds);
  } else {
    assign(shape, {
      x: positionOrBounds.x - round(shape.width / 2),
      y: positionOrBounds.y - round(shape.height / 2)
    });
  }

  // (2) add to canvas
  this._canvas.addShape(shape, parent, parentIndex);

  return shape;
};


/**
 * Undo append by removing the shape
 */
CreateShapeHandler.prototype.revert = function(context) {

  var shape = context.shape;

  // (3) remove form canvas
  this._canvas.removeShape(shape);

  return shape;
};