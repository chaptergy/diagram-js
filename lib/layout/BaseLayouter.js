/**
 * @typedef {import('../model').Base} Base
 * @typedef {import('../model').Connection} Connection
 *
 * @typedef {import('../util').Point} Point
 */

import {
  getMid
} from './LayoutUtil';


/**
 * A base connection layouter implementation
 * that layouts the connection by directly connecting
 * mid(source) + mid(target).
 */
export default function BaseLayouter() {}


/**
 * Return the new layouted waypoints for the given connection.
 *
 * The connection passed is still unchanged; you may figure out about
 * the new connection start / end via the layout hints provided.
 *
 * @param {Connection} connection
 * @param {Object} [hints]
 * @param {Point} [hints.connectionStart]
 * @param {Point} [hints.connectionEnd]
 * @param {Base} [hints.source]
 * @param {Base} [hints.target]
 *
 * @return {Point[]} The waypoints of the laid out connection.
 */
BaseLayouter.prototype.layoutConnection = function(connection, hints) {

  hints = hints || {};

  return [
    hints.connectionStart || getMid(hints.source || connection.source),
    hints.connectionEnd || getMid(hints.target || connection.target)
  ];
};
