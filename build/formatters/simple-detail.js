'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _textTable = require('text-table');

var _textTable2 = _interopRequireDefault(_textTable);

var _characters = require('./helpers/characters');

var _characters2 = _interopRequireDefault(_characters);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template Author Sindre Sorhus @eslint
// https://github.com/sindresorhus/eslint-stylish
var logger = (0, _logger2.default)('simple-detail');

logger.debug('loaded');

var tableSettings = {
  align: ['', '', 'r'],
  stringLength: function stringLength(str) {
    return _chalk2.default.stripColor(str).length;
  }
};

function pluralize(word, count) {
  return count === 1 ? word : word + 's';
}

function simpleDetail(results) {
  var totalErrors = 0;
  var totalWarnings = 0;
  var output = '';
  var cleanMsg = '';
  var messageTime = _chalk2.default.gray(`(${new Date().toLocaleTimeString()})`);
  logger.debug(results);
  results.forEach(function (result) {
    var messages = result.messages;
    var warnings = 0;
    var errors = 0;
    if (!messages.length) {
      return;
    }

    var tableText = (0, _textTable2.default)(messages.map(function (message) {
      function getMessageType(msg) {
        if (msg.fatal || msg.severity === 2) {
          totalErrors++;
          errors++;
          return _chalk2.default.red(_characters2.default.x);
        }

        totalWarnings++;
        warnings++;
        return _chalk2.default.yellow(_characters2.default.ex);
      }

      return ['', getMessageType(message), message.line || 0, message.column || 0, _chalk2.default.dim(message.message.replace(/\.$/, '')), _chalk2.default.gray(message.ruleId || '')];
    }), tableSettings);

    output += _chalk2.default.white.underline(result.filePath) + ` (${_chalk2.default.red(errors)}/${_chalk2.default.yellow(warnings)})${_characters2.default.endLine}`;
    output += tableText.split(_characters2.default.endLine).map(function (el) {
      return el.replace(/(\d+)\s+(\d+)/, function (m, p1, p2) {
        return _chalk2.default.gray(`${p1}:${p2}`);
      });
    }).join(_characters2.default.endLine) + _characters2.default.endLine + _characters2.default.endLine;
  });

  if (totalErrors) {
    output += _chalk2.default.red(`${_characters2.default.x} ${totalErrors} ${pluralize('error', totalErrors)} `);
  }
  if (totalWarnings) {
    output += _chalk2.default.yellow(`${_characters2.default.ex} ${totalWarnings} ${pluralize('warning', totalWarnings)} `);
  }

  if (results.length > 0 || !results.length) {
    cleanMsg = _chalk2.default.green(`${_characters2.default.check} Clean`) + ` ${messageTime}`;
  }

  output = totalErrors || totalWarnings ? `${output}${messageTime}${_characters2.default.endLine}` : cleanMsg;

  return output;
}

exports.default = simpleDetail;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXJzL3NpbXBsZS1kZXRhaWwuanMiXSwibmFtZXMiOlsibG9nZ2VyIiwiZGVidWciLCJ0YWJsZVNldHRpbmdzIiwiYWxpZ24iLCJzdHJpbmdMZW5ndGgiLCJzdHIiLCJzdHJpcENvbG9yIiwibGVuZ3RoIiwicGx1cmFsaXplIiwid29yZCIsImNvdW50Iiwic2ltcGxlRGV0YWlsIiwicmVzdWx0cyIsInRvdGFsRXJyb3JzIiwidG90YWxXYXJuaW5ncyIsIm91dHB1dCIsImNsZWFuTXNnIiwibWVzc2FnZVRpbWUiLCJncmF5IiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImZvckVhY2giLCJyZXN1bHQiLCJtZXNzYWdlcyIsIndhcm5pbmdzIiwiZXJyb3JzIiwidGFibGVUZXh0IiwibWFwIiwibWVzc2FnZSIsImdldE1lc3NhZ2VUeXBlIiwibXNnIiwiZmF0YWwiLCJzZXZlcml0eSIsInJlZCIsIngiLCJ5ZWxsb3ciLCJleCIsImxpbmUiLCJjb2x1bW4iLCJkaW0iLCJyZXBsYWNlIiwicnVsZUlkIiwid2hpdGUiLCJ1bmRlcmxpbmUiLCJmaWxlUGF0aCIsImVuZExpbmUiLCJzcGxpdCIsImVsIiwibSIsInAxIiwicDIiLCJqb2luIiwiZ3JlZW4iLCJjaGVjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQU5BO0FBQ0E7QUFPQSxJQUFNQSxTQUFTLHNCQUFPLGVBQVAsQ0FBZjs7QUFFQUEsT0FBT0MsS0FBUCxDQUFhLFFBQWI7O0FBRUEsSUFBSUMsZ0JBQWdCO0FBQ2xCQyxTQUFPLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxHQUFULENBRFc7QUFFbEJDLGdCQUFjLHNCQUFDQyxHQUFEO0FBQUEsV0FBUyxnQkFBTUMsVUFBTixDQUFpQkQsR0FBakIsRUFBc0JFLE1BQS9CO0FBQUE7QUFGSSxDQUFwQjs7QUFLQSxTQUFTQyxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMs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LE1BQWxDLEVBQTBDO0FBQ3hDUyxlQUFXLGdCQUFNb0MsS0FBTixDQUFhLEdBQUUscUJBQUVDLEtBQU0sUUFBdkIsSUFBbUMsSUFBR3BDLFdBQVksRUFBN0Q7QUFDRDs7QUFFREYsV0FBVUYsZUFBZUMsYUFBaEIsR0FBa0MsR0FBRUMsTUFBTyxHQUFFRSxXQUFZLEdBQUUscUJBQUU0QixPQUFRLEVBQXJFLEdBQXlFN0IsUUFBbEY7O0FBRUEsU0FBT0QsTUFBUDtBQUNEOztrQkFFY0osWSIsImZpbGUiOiJzaW1wbGUtZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGVtcGxhdGUgQXV0aG9yIFNpbmRyZSBTb3JodXMgQGVzbGludFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9lc2xpbnQtc3R5bGlzaFxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCB0YWJsZSBmcm9tICd0ZXh0LXRhYmxlJztcblxuaW1wb3J0IGMgZnJvbSAnLi9oZWxwZXJzL2NoYXJhY3RlcnMnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuXG5jb25zdCBsb2dnZXIgPSBMb2dnZXIoJ3NpbXBsZS1kZXRhaWwnKTtcblxubG9nZ2VyLmRlYnVnKCdsb2FkZWQnKTtcblxudmFyIHRhYmxlU2V0dGluZ3MgPSB7XG4gIGFsaWduOiBbJycsICcnLCAnciddLFxuICBzdHJpbmdMZW5ndGg6IChzdHIpID0+IGNoYWxrLnN0cmlwQ29sb3Ioc3RyKS5sZW5ndGhcbn07XG5cbmZ1bmN0aW9uIHBsdXJhbGl6ZSh3b3JkLCBjb3VudCkge1xuICByZXR1cm4gKGNvdW50ID09PSAxID8gd29yZCA6IHdvcmQgKyAncycpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVEZXRhaWwocmVzdWx0cykge1xuICBsZXQgdG90YWxFcnJvcnMgPSAwO1xuICBsZXQgdG90YWxXYXJuaW5ncyA9IDA7XG4gIGxldCBvdXRwdXQgPSAnJztcbiAgbGV0IGNsZWFuTXNnID0gJyc7XG4gIGxldCBtZXNzYWdlVGltZSA9IGNoYWxrLmdyYXkoYCgke25ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9KWApO1xuICBsb2dnZXIuZGVidWcocmVzdWx0cyk7XG4gIHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgbGV0IG1lc3NhZ2VzID0gcmVzdWx0Lm1lc3NhZ2VzO1xuICAgIGxldCB3YXJuaW5ncyA9IDA7XG4gICAgbGV0IGVycm9ycyA9IDA7XG4gICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdGFibGVUZXh0ID0gdGFibGUoXG4gICAgICBtZXNzYWdlcy5tYXAoZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0TWVzc2FnZVR5cGUobXNnKSB7XG4gICAgICAgICAgaWYgKG1zZy5mYXRhbCB8fCBtc2cuc2V2ZXJpdHkgPT09IDIpIHtcbiAgICAgICAgICAgIHRvdGFsRXJyb3JzKys7XG4gICAgICAgICAgICBlcnJvcnMrKztcbiAgICAgICAgICAgIHJldHVybiBjaGFsay5yZWQoYy54KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b3RhbFdhcm5pbmdzKys7XG4gICAgICAgICAgd2FybmluZ3MrKztcbiAgICAgICAgICByZXR1cm4gY2hhbGsueWVsbG93KGMuZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFsnJyxcbiAgICAgICAgICBnZXRNZXNzYWdlVHlwZShtZXNzYWdlKSxcbiAgICAgICAgICBtZXNzYWdlLmxpbmUgfHwgMCxcbiAgICAgICAgICBtZXNzYWdlLmNvbHVtbiB8fCAwLFxuICAgICAgICAgIGNoYWxrLmRpbShtZXNzYWdlLm1lc3NhZ2UucmVwbGFjZSgvXFwuJC8sICcnKSksXG4gICAgICAgICAgY2hhbGsuZ3JheShtZXNzYWdlLnJ1bGVJZCB8fCAnJyldO1xuICAgICAgfSksIHRhYmxlU2V0dGluZ3MpO1xuXG4gICAgb3V0cHV0ICs9IGNoYWxrLndoaXRlLnVuZGVybGluZShyZXN1bHQuZmlsZVBhdGgpICsgYCAoJHtjaGFsay5yZWQoZXJyb3JzKX0vJHtjaGFsay55ZWxsb3cod2FybmluZ3MpfSkke2MuZW5kTGluZX1gO1xuICAgIG91dHB1dCArPSB0YWJsZVRleHQuc3BsaXQoYy5lbmRMaW5lKS5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gZWwucmVwbGFjZSgvKFxcZCspXFxzKyhcXGQrKS8sIChtLCBwMSwgcDIpID0+IGNoYWxrLmdyYXkoYCR7cDF9OiR7cDJ9YCkpO1xuICAgIH0pLmpvaW4oYy5lbmRMaW5lKSArIGMuZW5kTGluZSArIGMuZW5kTGluZTtcbiAgfSk7XG5cbiAgaWYodG90YWxFcnJvcnMpIHtcbiAgICBvdXRwdXQgKz0gY2hhbGsucmVkKGAke2MueH0gJHt0b3RhbEVycm9yc30gJHtwbHVyYWxpemUoJ2Vycm9yJywgdG90YWxFcnJvcnMpfSBgKTtcbiAgfVxuICBpZiAodG90YWxXYXJuaW5ncykge1xuICAgIG91dHB1dCArPSBjaGFsay55ZWxsb3coYCR7Yy5leH0gJHt0b3RhbFdhcm5pbmdzfSAke3BsdXJhbGl6ZSgnd2FybmluZycsIHRvdGFsV2FybmluZ3MpfSBgKTtcbiAgfVxuXG4gIGlmKHJlc3VsdHMubGVuZ3RoID4gMCB8fCAhcmVzdWx0cy5sZW5ndGgpIHtcbiAgICBjbGVhbk1zZyA9IGNoYWxrLmdyZWVuKGAke2MuY2hlY2t9IENsZWFuYCkgKyBgICR7bWVzc2FnZVRpbWV9YDtcbiAgfVxuXG4gIG91dHB1dCA9ICh0b3RhbEVycm9ycyB8fCB0b3RhbFdhcm5pbmdzKSA/IGAke291dHB1dH0ke21lc3NhZ2VUaW1lfSR7Yy5lbmRMaW5lfWAgOiBjbGVhbk1zZztcblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaW1wbGVEZXRhaWw7XG4iXX0=