'use strict';

require('mocha');
const assert = require('assert');
const { isMatch, makeRe } = require('..');

// $echo a/{1..3}/b
describe('from the Bash 4.3 spec/unit tests', () => {
  it('should handle "regular globbing"', () => {
    assert(!isMatch('*', 'a*'));
    assert(!isMatch('**', 'a*'));
    assert(!isMatch('\\*', 'a*'));
    assert(!isMatch('a/*', 'a*'));
    assert(!isMatch('b', 'a*'));
    assert(!isMatch('bc', 'a*'));
    assert(!isMatch('bcd', 'a*'));
    assert(!isMatch('bdir/', 'a*'));
    assert(!isMatch('Beware', 'a*'));
    assert(isMatch('a', 'a*'));
    assert(isMatch('ab', 'a*'));
    assert(isMatch('abc', 'a*'));

    assert(!isMatch('*', '\\a*'));
    assert(!isMatch('**', '\\a*'));
    assert(!isMatch('\\*', '\\a*'));

    assert(isMatch('a', '\\a*'));
    assert(!isMatch('a/*', '\\a*'));
    assert(isMatch('abc', '\\a*'));
    assert(isMatch('abd', '\\a*'));
    assert(isMatch('abe', '\\a*'));
    assert(!isMatch('b', '\\a*'));
    assert(!isMatch('bb', '\\a*'));
    assert(!isMatch('bcd', '\\a*'));
    assert(!isMatch('bdir/', '\\a*'));
    assert(!isMatch('Beware', '\\a*'));
    assert(!isMatch('c', '\\a*'));
    assert(!isMatch('ca', '\\a*'));
    assert(!isMatch('cb', '\\a*'));
    assert(!isMatch('d', '\\a*'));
    assert(!isMatch('dd', '\\a*'));
    assert(!isMatch('de', '\\a*'));
  });

  it('should match directories', () => {
    assert(!isMatch('*', 'b*/'));
    assert(!isMatch('**', 'b*/'));
    assert(!isMatch('\\*', 'b*/'));
    assert(!isMatch('a', 'b*/'));
    assert(!isMatch('a/*', 'b*/'));
    assert(!isMatch('abc', 'b*/'));
    assert(!isMatch('abd', 'b*/'));
    assert(!isMatch('abe', 'b*/'));
    assert(!isMatch('b', 'b*/'));
    assert(!isMatch('bb', 'b*/'));
    assert(!isMatch('bcd', 'b*/'));
    assert(isMatch('bdir/', 'b*/'));
    assert(!isMatch('Beware', 'b*/'));
    assert(!isMatch('c', 'b*/'));
    assert(!isMatch('ca', 'b*/'));
    assert(!isMatch('cb', 'b*/'));
    assert(!isMatch('d', 'b*/'));
    assert(!isMatch('dd', 'b*/'));
    assert(!isMatch('de', 'b*/'));
  });

  it('should use escaped characters as literals', () => {
    assert(!isMatch('*', '\\^'));
    assert(!isMatch('**', '\\^'));
    assert(!isMatch('\\*', '\\^'));
    assert(!isMatch('a', '\\^'));
    assert(!isMatch('a/*', '\\^'));
    assert(!isMatch('abc', '\\^'));
    assert(!isMatch('abd', '\\^'));
    assert(!isMatch('abe', '\\^'));
    assert(!isMatch('b', '\\^'));
    assert(!isMatch('bb', '\\^'));
    assert(!isMatch('bcd', '\\^'));
    assert(!isMatch('bdir/', '\\^'));
    assert(!isMatch('Beware', '\\^'));
    assert(!isMatch('c', '\\^'));
    assert(!isMatch('ca', '\\^'));
    assert(!isMatch('cb', '\\^'));
    assert(!isMatch('d', '\\^'));
    assert(!isMatch('dd', '\\^'));
    assert(!isMatch('de', '\\^'));

    assert(isMatch('*', '\\*'));
    assert(isMatch('\\*', '\\*'));
    assert(!isMatch('**', '\\*'));
    assert(!isMatch('a', '\\*'));
    assert(!isMatch('a/*', '\\*'));
    assert(!isMatch('abc', '\\*'));
    assert(!isMatch('abd', '\\*'));
    assert(!isMatch('abe', '\\*'));
    assert(!isMatch('b', '\\*'));
    assert(!isMatch('bb', '\\*'));
    assert(!isMatch('bcd', '\\*'));
    assert(!isMatch('bdir/', '\\*'));
    assert(!isMatch('Beware', '\\*'));
    assert(!isMatch('c', '\\*'));
    assert(!isMatch('ca', '\\*'));
    assert(!isMatch('cb', '\\*'));
    assert(!isMatch('d', '\\*'));
    assert(!isMatch('dd', '\\*'));
    assert(!isMatch('de', '\\*'));

    assert(!isMatch('*', 'a\\*'));
    assert(!isMatch('**', 'a\\*'));
    assert(!isMatch('\\*', 'a\\*'));
    assert(!isMatch('a', 'a\\*'));
    assert(!isMatch('a/*', 'a\\*'));
    assert(!isMatch('abc', 'a\\*'));
    assert(!isMatch('abd', 'a\\*'));
    assert(!isMatch('abe', 'a\\*'));
    assert(!isMatch('b', 'a\\*'));
    assert(!isMatch('bb', 'a\\*'));
    assert(!isMatch('bcd', 'a\\*'));
    assert(!isMatch('bdir/', 'a\\*'));
    assert(!isMatch('Beware', 'a\\*'));
    assert(!isMatch('c', 'a\\*'));
    assert(!isMatch('ca', 'a\\*'));
    assert(!isMatch('cb', 'a\\*'));
    assert(!isMatch('d', 'a\\*'));
    assert(!isMatch('dd', 'a\\*'));
    assert(!isMatch('de', 'a\\*'));

    assert(isMatch('aqa', '*q*'));
    assert(isMatch('aaqaa', '*q*'));
    assert(!isMatch('*', '*q*'));
    assert(!isMatch('**', '*q*'));
    assert(!isMatch('\\*', '*q*'));
    assert(!isMatch('a', '*q*'));
    assert(!isMatch('a/*', '*q*'));
    assert(!isMatch('abc', '*q*'));
    assert(!isMatch('abd', '*q*'));
    assert(!isMatch('abe', '*q*'));
    assert(!isMatch('b', '*q*'));
    assert(!isMatch('bb', '*q*'));
    assert(!isMatch('bcd', '*q*'));
    assert(!isMatch('bdir/', '*q*'));
    assert(!isMatch('Beware', '*q*'));
    assert(!isMatch('c', '*q*'));
    assert(!isMatch('ca', '*q*'));
    assert(!isMatch('cb', '*q*'));
    assert(!isMatch('d', '*q*'));
    assert(!isMatch('dd', '*q*'));
    assert(!isMatch('de', '*q*'));

    assert(isMatch('*', '\\**'));
    assert(isMatch('**', '\\**'));
    assert(!isMatch('\\*', '\\**'));
    assert(!isMatch('a', '\\**'));
    assert(!isMatch('a/*', '\\**'));
    assert(!isMatch('abc', '\\**'));
    assert(!isMatch('abd', '\\**'));
    assert(!isMatch('abe', '\\**'));
    assert(!isMatch('b', '\\**'));
    assert(!isMatch('bb', '\\**'));
    assert(!isMatch('bcd', '\\**'));
    assert(!isMatch('bdir/', '\\**'));
    assert(!isMatch('Beware', '\\**'));
    assert(!isMatch('c', '\\**'));
    assert(!isMatch('ca', '\\**'));
    assert(!isMatch('cb', '\\**'));
    assert(!isMatch('d', '\\**'));
    assert(!isMatch('dd', '\\**'));
    assert(!isMatch('de', '\\**'));
  });

  it('should work for quoted characters', () => {
    assert(!isMatch('*', '"***"'));
    assert(!isMatch('**', '"***"'));
    assert(!isMatch('\\*', '"***"'));
    assert(!isMatch('a', '"***"'));
    assert(!isMatch('a/*', '"***"'));
    assert(!isMatch('abc', '"***"'));
    assert(!isMatch('abd', '"***"'));
    assert(!isMatch('abe', '"***"'));
    assert(!isMatch('b', '"***"'));
    assert(!isMatch('bb', '"***"'));
    assert(!isMatch('bcd', '"***"'));
    assert(!isMatch('bdir/', '"***"'));
    assert(!isMatch('Beware', '"***"'));
    assert(!isMatch('c', '"***"'));
    assert(!isMatch('ca', '"***"'));
    assert(!isMatch('cb', '"***"'));
    assert(!isMatch('d', '"***"'));
    assert(!isMatch('dd', '"***"'));
    assert(!isMatch('de', '"***"'));
    assert(isMatch('***', '"***"'));

    assert(!isMatch('*', "'***'"));
    assert(!isMatch('**', "'***'"));
    assert(!isMatch('\\*', "'***'"));
    assert(!isMatch('a', "'***'"));
    assert(!isMatch('a/*', "'***'"));
    assert(!isMatch('abc', "'***'"));
    assert(!isMatch('abd', "'***'"));
    assert(!isMatch('abe', "'***'"));
    assert(!isMatch('b', "'***'"));
    assert(!isMatch('bb', "'***'"));
    assert(!isMatch('bcd', "'***'"));
    assert(!isMatch('bdir/', "'***'"));
    assert(!isMatch('Beware', "'***'"));
    assert(!isMatch('c', "'***'"));
    assert(!isMatch('ca', "'***'"));
    assert(!isMatch('cb', "'***'"));
    assert(!isMatch('d', "'***'"));
    assert(!isMatch('dd', "'***'"));
    assert(!isMatch('de', "'***'"));
    assert(isMatch('\'***\'', "'***'"));

    assert(!isMatch('*', '"***"'));
    assert(!isMatch('**', '"***"'));
    assert(!isMatch('\\*', '"***"'));
    assert(!isMatch('a', '"***"'));
    assert(!isMatch('a/*', '"***"'));
    assert(!isMatch('abc', '"***"'));
    assert(!isMatch('abd', '"***"'));
    assert(!isMatch('abe', '"***"'));
    assert(!isMatch('b', '"***"'));
    assert(!isMatch('bb', '"***"'));
    assert(!isMatch('bcd', '"***"'));
    assert(!isMatch('bdir/', '"***"'));
    assert(!isMatch('Beware', '"***"'));
    assert(!isMatch('c', '"***"'));
    assert(!isMatch('ca', '"***"'));
    assert(!isMatch('cb', '"***"'));
    assert(!isMatch('d', '"***"'));
    assert(!isMatch('dd', '"***"'));
    assert(!isMatch('de', '"***"'));

    assert(isMatch('*', '"*"*'));
    assert(isMatch('**', '"*"*'));
    assert(!isMatch('\\*', '"*"*'));
    assert(!isMatch('a', '"*"*'));
    assert(!isMatch('a/*', '"*"*'));
    assert(!isMatch('abc', '"*"*'));
    assert(!isMatch('abd', '"*"*'));
    assert(!isMatch('abe', '"*"*'));
    assert(!isMatch('b', '"*"*'));
    assert(!isMatch('bb', '"*"*'));
    assert(!isMatch('bcd', '"*"*'));
    assert(!isMatch('bdir/', '"*"*'));
    assert(!isMatch('Beware', '"*"*'));
    assert(!isMatch('c', '"*"*'));
    assert(!isMatch('ca', '"*"*'));
    assert(!isMatch('cb', '"*"*'));
    assert(!isMatch('d', '"*"*'));
    assert(!isMatch('dd', '"*"*'));
    assert(!isMatch('de', '"*"*'));
  });

  it('should match escaped quotes', () => {
    assert(!isMatch('*', '\\"**\\"'));
    assert(!isMatch('**', '\\"**\\"'));
    assert(!isMatch('\\*', '\\"**\\"'));
    assert(!isMatch('a', '\\"**\\"'));
    assert(!isMatch('a/*', '\\"**\\"'));
    assert(!isMatch('abc', '\\"**\\"'));
    assert(!isMatch('abd', '\\"**\\"'));
    assert(!isMatch('abe', '\\"**\\"'));
    assert(!isMatch('b', '\\"**\\"'));
    assert(!isMatch('bb', '\\"**\\"'));
    assert(!isMatch('bcd', '\\"**\\"'));
    assert(!isMatch('bdir/', '\\"**\\"'));
    assert(!isMatch('Beware', '\\"**\\"'));
    assert(!isMatch('c', '\\"**\\"'));
    assert(!isMatch('ca', '\\"**\\"'));
    assert(!isMatch('cb', '\\"**\\"'));
    assert(!isMatch('d', '\\"**\\"'));
    assert(!isMatch('dd', '\\"**\\"'));
    assert(!isMatch('de', '\\"**\\"'));
    assert(isMatch('"**"', '\\"**\\"'));

    assert(!isMatch('*', 'foo/\\"**\\"/bar'));
    assert(!isMatch('**', 'foo/\\"**\\"/bar'));
    assert(!isMatch('\\*', 'foo/\\"**\\"/bar'));
    assert(!isMatch('a', 'foo/\\"**\\"/bar'));
    assert(!isMatch('a/*', 'foo/\\"**\\"/bar'));
    assert(!isMatch('abc', 'foo/\\"**\\"/bar'));
    assert(!isMatch('abd', 'foo/\\"**\\"/bar'));
    assert(!isMatch('abe', 'foo/\\"**\\"/bar'));
    assert(!isMatch('b', 'foo/\\"**\\"/bar'));
    assert(!isMatch('bb', 'foo/\\"**\\"/bar'));
    assert(!isMatch('bcd', 'foo/\\"**\\"/bar'));
    assert(!isMatch('bdir/', 'foo/\\"**\\"/bar'));
    assert(!isMatch('Beware', 'foo/\\"**\\"/bar'));
    assert(!isMatch('c', 'foo/\\"**\\"/bar'));
    assert(!isMatch('ca', 'foo/\\"**\\"/bar'));
    assert(!isMatch('cb', 'foo/\\"**\\"/bar'));
    assert(!isMatch('d', 'foo/\\"**\\"/bar'));
    assert(!isMatch('dd', 'foo/\\"**\\"/bar'));
    assert(!isMatch('de', 'foo/\\"**\\"/bar'));
    assert(isMatch('foo/"**"/bar', 'foo/\\"**\\"/bar'));

    assert(!isMatch('*', 'foo/\\"*\\"/bar'));
    assert(!isMatch('**', 'foo/\\"*\\"/bar'));
    assert(!isMatch('\\*', 'foo/\\"*\\"/bar'));
    assert(!isMatch('a', 'foo/\\"*\\"/bar'));
    assert(!isMatch('a/*', 'foo/\\"*\\"/bar'));
    assert(!isMatch('abc', 'foo/\\"*\\"/bar'));
    assert(!isMatch('abd', 'foo/\\"*\\"/bar'));
    assert(!isMatch('abe', 'foo/\\"*\\"/bar'));
    assert(!isMatch('b', 'foo/\\"*\\"/bar'));
    assert(!isMatch('bb', 'foo/\\"*\\"/bar'));
    assert(!isMatch('bcd', 'foo/\\"*\\"/bar'));
    assert(!isMatch('bdir/', 'foo/\\"*\\"/bar'));
    assert(!isMatch('Beware', 'foo/\\"*\\"/bar'));
    assert(!isMatch('c', 'foo/\\"*\\"/bar'));
    assert(!isMatch('ca', 'foo/\\"*\\"/bar'));
    assert(!isMatch('cb', 'foo/\\"*\\"/bar'));
    assert(!isMatch('d', 'foo/\\"*\\"/bar'));
    assert(!isMatch('dd', 'foo/\\"*\\"/bar'));
    assert(!isMatch('de', 'foo/\\"*\\"/bar'));
    assert(isMatch('foo/"*"/bar', 'foo/\\"*\\"/bar'));
    assert(isMatch('foo/"a"/bar', 'foo/\\"*\\"/bar'));
    assert(isMatch('foo/"b"/bar', 'foo/\\"*\\"/bar'));
    assert(isMatch('foo/"c"/bar', 'foo/\\"*\\"/bar'));
    assert(!isMatch("foo/'*'/bar", 'foo/\\"*\\"/bar'));
    assert(!isMatch("foo/'a'/bar", 'foo/\\"*\\"/bar'));
    assert(!isMatch("foo/'b'/bar", 'foo/\\"*\\"/bar'));
    assert(!isMatch("foo/'c'/bar", 'foo/\\"*\\"/bar'));

    assert(!isMatch('*', 'foo/"*"/bar'));
    assert(!isMatch('**', 'foo/"*"/bar'));
    assert(!isMatch('\\*', 'foo/"*"/bar'));
    assert(!isMatch('a', 'foo/"*"/bar'));
    assert(!isMatch('a/*', 'foo/"*"/bar'));
    assert(!isMatch('abc', 'foo/"*"/bar'));
    assert(!isMatch('abd', 'foo/"*"/bar'));
    assert(!isMatch('abe', 'foo/"*"/bar'));
    assert(!isMatch('b', 'foo/"*"/bar'));
    assert(!isMatch('bb', 'foo/"*"/bar'));
    assert(!isMatch('bcd', 'foo/"*"/bar'));
    assert(!isMatch('bdir/', 'foo/"*"/bar'));
    assert(!isMatch('Beware', 'foo/"*"/bar'));
    assert(!isMatch('c', 'foo/"*"/bar'));
    assert(!isMatch('ca', 'foo/"*"/bar'));
    assert(!isMatch('cb', 'foo/"*"/bar'));
    assert(!isMatch('d', 'foo/"*"/bar'));
    assert(!isMatch('dd', 'foo/"*"/bar'));
    assert(!isMatch('de', 'foo/"*"/bar'));
    assert(isMatch('foo/*/bar', 'foo/"*"/bar'));
    assert(isMatch('foo/"*"/bar', 'foo/"*"/bar'));
    assert(!isMatch('foo/"a"/bar', 'foo/"*"/bar'));
    assert(!isMatch('foo/"b"/bar', 'foo/"*"/bar'));
    assert(!isMatch('foo/"c"/bar', 'foo/"*"/bar'));
    assert(!isMatch("foo/'*'/bar", 'foo/"*"/bar'));
    assert(!isMatch("foo/'a'/bar", 'foo/"*"/bar'));
    assert(!isMatch("foo/'b'/bar", 'foo/"*"/bar'));
    assert(!isMatch("foo/'c'/bar", 'foo/"*"/bar'));

    assert(!isMatch('*', "\\'**\\'"));
    assert(!isMatch('**', "\\'**\\'"));
    assert(!isMatch('\\*', "\\'**\\'"));
    assert(!isMatch('a', "\\'**\\'"));
    assert(!isMatch('a/*', "\\'**\\'"));
    assert(!isMatch('abc', "\\'**\\'"));
    assert(!isMatch('abd', "\\'**\\'"));
    assert(!isMatch('abe', "\\'**\\'"));
    assert(!isMatch('b', "\\'**\\'"));
    assert(!isMatch('bb', "\\'**\\'"));
    assert(!isMatch('bcd', "\\'**\\'"));
    assert(!isMatch('bdir/', "\\'**\\'"));
    assert(!isMatch('Beware', "\\'**\\'"));
    assert(!isMatch('c', "\\'**\\'"));
    assert(!isMatch('ca', "\\'**\\'"));
    assert(!isMatch('cb', "\\'**\\'"));
    assert(!isMatch('d', "\\'**\\'"));
    assert(!isMatch('dd', "\\'**\\'"));
    assert(!isMatch('de', "\\'**\\'"));
    assert(isMatch("'**'", "\\'**\\'"));
  });

  it("Pattern from Larry Wall's Configure that caused bash to blow up:", () => {
    assert(!isMatch('*', '[a-c]b*'));
    assert(!isMatch('**', '[a-c]b*'));
    assert(!isMatch('\\*', '[a-c]b*'));
    assert(!isMatch('a', '[a-c]b*'));
    assert(!isMatch('a/*', '[a-c]b*'));
    assert(isMatch('abc', '[a-c]b*'));
    assert(isMatch('abd', '[a-c]b*'));
    assert(isMatch('abe', '[a-c]b*'));
    assert(!isMatch('b', '[a-c]b*'));
    assert(isMatch('bb', '[a-c]b*'));
    assert(!isMatch('bcd', '[a-c]b*'));
    assert(!isMatch('bdir/', '[a-c]b*'));
    assert(!isMatch('Beware', '[a-c]b*'));
    assert(!isMatch('c', '[a-c]b*'));
    assert(!isMatch('ca', '[a-c]b*'));
    assert(isMatch('cb', '[a-c]b*'));
    assert(!isMatch('d', '[a-c]b*'));
    assert(!isMatch('dd', '[a-c]b*'));
    assert(!isMatch('de', '[a-c]b*'));
  });

  it('should support character classes', () => {
    assert(!isMatch('*', 'a*[^c]'));
    assert(!isMatch('**', 'a*[^c]'));
    assert(!isMatch('\\*', 'a*[^c]'));
    assert(!isMatch('a', 'a*[^c]'));
    assert(!isMatch('a/*', 'a*[^c]'));
    assert(!isMatch('abc', 'a*[^c]'));
    assert(isMatch('abd', 'a*[^c]'));
    assert(isMatch('abe', 'a*[^c]'));
    assert(!isMatch('b', 'a*[^c]'));
    assert(!isMatch('bb', 'a*[^c]'));
    assert(!isMatch('bcd', 'a*[^c]'));
    assert(!isMatch('bdir/', 'a*[^c]'));
    assert(!isMatch('Beware', 'a*[^c]'));
    assert(!isMatch('c', 'a*[^c]'));
    assert(!isMatch('ca', 'a*[^c]'));
    assert(!isMatch('cb', 'a*[^c]'));
    assert(!isMatch('d', 'a*[^c]'));
    assert(!isMatch('dd', 'a*[^c]'));
    assert(!isMatch('de', 'a*[^c]'));
    assert(!isMatch('baz', 'a*[^c]'));
    assert(!isMatch('bzz', 'a*[^c]'));
    assert(!isMatch('BZZ', 'a*[^c]'));
    assert(!isMatch('beware', 'a*[^c]'));
    assert(!isMatch('BewAre', 'a*[^c]'));

    assert(isMatch('a-b', 'a[X-]b'));
    assert(isMatch('aXb', 'a[X-]b'));

    assert(!isMatch('*', '[a-y]*[^c]'));
    assert(isMatch('a*', '[a-y]*[^c]', { bash: true }));
    assert(!isMatch('**', '[a-y]*[^c]'));
    assert(!isMatch('\\*', '[a-y]*[^c]'));
    assert(!isMatch('a', '[a-y]*[^c]'));
    assert(isMatch('a123b', '[a-y]*[^c]', { bash: true }));
    assert(!isMatch('a123c', '[a-y]*[^c]', { bash: true }));
    assert(isMatch('ab', '[a-y]*[^c]', { bash: true }));
    assert(!isMatch('a/*', '[a-y]*[^c]'));
    assert(!isMatch('abc', '[a-y]*[^c]'));
    assert(isMatch('abd', '[a-y]*[^c]'));
    assert(isMatch('abe', '[a-y]*[^c]'));
    assert(!isMatch('b', '[a-y]*[^c]'));
    assert(isMatch('bd', '[a-y]*[^c]', { bash: true }));
    assert(isMatch('bb', '[a-y]*[^c]'));
    assert(isMatch('bcd', '[a-y]*[^c]'));
    assert(isMatch('bdir/', '[a-y]*[^c]'));
    assert(!isMatch('Beware', '[a-y]*[^c]'));
    assert(!isMatch('c', '[a-y]*[^c]'));
    assert(isMatch('ca', '[a-y]*[^c]'));
    assert(isMatch('cb', '[a-y]*[^c]'));
    assert(!isMatch('d', '[a-y]*[^c]'));
    assert(isMatch('dd', '[a-y]*[^c]'));
    assert(isMatch('dd', '[a-y]*[^c]', { regex: true }));
    assert(isMatch('dd', '[a-y]*[^c]'));
    assert(isMatch('de', '[a-y]*[^c]'));
    assert(isMatch('baz', '[a-y]*[^c]'));
    assert(isMatch('bzz', '[a-y]*[^c]'));
    assert(isMatch('bzz', '[a-y]*[^c]'));
    assert(!isMatch('bzz', '[a-y]*[^c]', { regex: true }));
    assert(!isMatch('BZZ', '[a-y]*[^c]'));
    assert(isMatch('beware', '[a-y]*[^c]'));
    assert(!isMatch('BewAre', '[a-y]*[^c]'));

    assert(isMatch('a*b/ooo', 'a\\*b/*'));
    assert(isMatch('a*b/ooo', 'a\\*?/*'));

    assert(!isMatch('*', 'a[b]c'));
    assert(!isMatch('**', 'a[b]c'));
    assert(!isMatch('\\*', 'a[b]c'));
    assert(!isMatch('a', 'a[b]c'));
    assert(!isMatch('a/*', 'a[b]c'));
    assert(isMatch('abc', 'a[b]c'));
    assert(!isMatch('abd', 'a[b]c'));
    assert(!isMatch('abe', 'a[b]c'));
    assert(!isMatch('b', 'a[b]c'));
    assert(!isMatch('bb', 'a[b]c'));
    assert(!isMatch('bcd', 'a[b]c'));
    assert(!isMatch('bdir/', 'a[b]c'));
    assert(!isMatch('Beware', 'a[b]c'));
    assert(!isMatch('c', 'a[b]c'));
    assert(!isMatch('ca', 'a[b]c'));
    assert(!isMatch('cb', 'a[b]c'));
    assert(!isMatch('d', 'a[b]c'));
    assert(!isMatch('dd', 'a[b]c'));
    assert(!isMatch('de', 'a[b]c'));
    assert(!isMatch('baz', 'a[b]c'));
    assert(!isMatch('bzz', 'a[b]c'));
    assert(!isMatch('BZZ', 'a[b]c'));
    assert(!isMatch('beware', 'a[b]c'));
    assert(!isMatch('BewAre', 'a[b]c'));

    assert(!isMatch('*', 'a["b"]c'));
    assert(!isMatch('**', 'a["b"]c'));
    assert(!isMatch('\\*', 'a["b"]c'));
    assert(!isMatch('a', 'a["b"]c'));
    assert(!isMatch('a/*', 'a["b"]c'));
    assert(isMatch('abc', 'a["b"]c'));
    assert(!isMatch('abd', 'a["b"]c'));
    assert(!isMatch('abe', 'a["b"]c'));
    assert(!isMatch('b', 'a["b"]c'));
    assert(!isMatch('bb', 'a["b"]c'));
    assert(!isMatch('bcd', 'a["b"]c'));
    assert(!isMatch('bdir/', 'a["b"]c'));
    assert(!isMatch('Beware', 'a["b"]c'));
    assert(!isMatch('c', 'a["b"]c'));
    assert(!isMatch('ca', 'a["b"]c'));
    assert(!isMatch('cb', 'a["b"]c'));
    assert(!isMatch('d', 'a["b"]c'));
    assert(!isMatch('dd', 'a["b"]c'));
    assert(!isMatch('de', 'a["b"]c'));
    assert(!isMatch('baz', 'a["b"]c'));
    assert(!isMatch('bzz', 'a["b"]c'));
    assert(!isMatch('BZZ', 'a["b"]c'));
    assert(!isMatch('beware', 'a["b"]c'));
    assert(!isMatch('BewAre', 'a["b"]c'));

    assert(!isMatch('*', 'a[\\\\b]c'));
    assert(!isMatch('**', 'a[\\\\b]c'));
    assert(!isMatch('\\*', 'a[\\\\b]c'));
    assert(!isMatch('a', 'a[\\\\b]c'));
    assert(!isMatch('a/*', 'a[\\\\b]c'));
    assert(isMatch('abc', 'a[\\\\b]c'));
    assert(!isMatch('abd', 'a[\\\\b]c'));
    assert(!isMatch('abe', 'a[\\\\b]c'));
    assert(!isMatch('b', 'a[\\\\b]c'));
    assert(!isMatch('bb', 'a[\\\\b]c'));
    assert(!isMatch('bcd', 'a[\\\\b]c'));
    assert(!isMatch('bdir/', 'a[\\\\b]c'));
    assert(!isMatch('Beware', 'a[\\\\b]c'));
    assert(!isMatch('c', 'a[\\\\b]c'));
    assert(!isMatch('ca', 'a[\\\\b]c'));
    assert(!isMatch('cb', 'a[\\\\b]c'));
    assert(!isMatch('d', 'a[\\\\b]c'));
    assert(!isMatch('dd', 'a[\\\\b]c'));
    assert(!isMatch('de', 'a[\\\\b]c'));
    assert(!isMatch('baz', 'a[\\\\b]c'));
    assert(!isMatch('bzz', 'a[\\\\b]c'));
    assert(!isMatch('BZZ', 'a[\\\\b]c'));
    assert(!isMatch('beware', 'a[\\\\b]c'));
    assert(!isMatch('BewAre', 'a[\\\\b]c'));

    assert(!isMatch('*', 'a[\\b]c'));
    assert(!isMatch('**', 'a[\\b]c'));
    assert(!isMatch('\\*', 'a[\\b]c'));
    assert(!isMatch('a', 'a[\\b]c'));
    assert(!isMatch('a/*', 'a[\\b]c'));
    assert(!isMatch('abc', 'a[\\b]c'));
    assert(!isMatch('abd', 'a[\\b]c'));
    assert(!isMatch('abe', 'a[\\b]c'));
    assert(!isMatch('b', 'a[\\b]c'));
    assert(!isMatch('bb', 'a[\\b]c'));
    assert(!isMatch('bcd', 'a[\\b]c'));
    assert(!isMatch('bdir/', 'a[\\b]c'));
    assert(!isMatch('Beware', 'a[\\b]c'));
    assert(!isMatch('c', 'a[\\b]c'));
    assert(!isMatch('ca', 'a[\\b]c'));
    assert(!isMatch('cb', 'a[\\b]c'));
    assert(!isMatch('d', 'a[\\b]c'));
    assert(!isMatch('dd', 'a[\\b]c'));
    assert(!isMatch('de', 'a[\\b]c'));
    assert(!isMatch('baz', 'a[\\b]c'));
    assert(!isMatch('bzz', 'a[\\b]c'));
    assert(!isMatch('BZZ', 'a[\\b]c'));
    assert(!isMatch('beware', 'a[\\b]c'));
    assert(!isMatch('BewAre', 'a[\\b]c'));

    assert(!isMatch('*', 'a[b-d]c'));
    assert(!isMatch('**', 'a[b-d]c'));
    assert(!isMatch('\\*', 'a[b-d]c'));
    assert(!isMatch('a', 'a[b-d]c'));
    assert(!isMatch('a/*', 'a[b-d]c'));
    assert(isMatch('abc', 'a[b-d]c'));
    assert(!isMatch('abd', 'a[b-d]c'));
    assert(!isMatch('abe', 'a[b-d]c'));
    assert(!isMatch('b', 'a[b-d]c'));
    assert(!isMatch('bb', 'a[b-d]c'));
    assert(!isMatch('bcd', 'a[b-d]c'));
    assert(!isMatch('bdir/', 'a[b-d]c'));
    assert(!isMatch('Beware', 'a[b-d]c'));
    assert(!isMatch('c', 'a[b-d]c'));
    assert(!isMatch('ca', 'a[b-d]c'));
    assert(!isMatch('cb', 'a[b-d]c'));
    assert(!isMatch('d', 'a[b-d]c'));
    assert(!isMatch('dd', 'a[b-d]c'));
    assert(!isMatch('de', 'a[b-d]c'));
    assert(!isMatch('baz', 'a[b-d]c'));
    assert(!isMatch('bzz', 'a[b-d]c'));
    assert(!isMatch('BZZ', 'a[b-d]c'));
    assert(!isMatch('beware', 'a[b-d]c'));
    assert(!isMatch('BewAre', 'a[b-d]c'));

    assert(!isMatch('*', 'a?c'));
    assert(!isMatch('**', 'a?c'));
    assert(!isMatch('\\*', 'a?c'));
    assert(!isMatch('a', 'a?c'));
    assert(!isMatch('a/*', 'a?c'));
    assert(isMatch('abc', 'a?c'));
    assert(!isMatch('abd', 'a?c'));
    assert(!isMatch('abe', 'a?c'));
    assert(!isMatch('b', 'a?c'));
    assert(!isMatch('bb', 'a?c'));
    assert(!isMatch('bcd', 'a?c'));
    assert(!isMatch('bdir/', 'a?c'));
    assert(!isMatch('Beware', 'a?c'));
    assert(!isMatch('c', 'a?c'));
    assert(!isMatch('ca', 'a?c'));
    assert(!isMatch('cb', 'a?c'));
    assert(!isMatch('d', 'a?c'));
    assert(!isMatch('dd', 'a?c'));
    assert(!isMatch('de', 'a?c'));
    assert(!isMatch('baz', 'a?c'));
    assert(!isMatch('bzz', 'a?c'));
    assert(!isMatch('BZZ', 'a?c'));
    assert(!isMatch('beware', 'a?c'));
    assert(!isMatch('BewAre', 'a?c'));

    assert(isMatch('man/man1/bash.1', '*/man*/bash.*'));

    assert(isMatch('*', '[^a-c]*'));
    assert(isMatch('**', '[^a-c]*'));
    assert(!isMatch('a', '[^a-c]*'));
    assert(!isMatch('a/*', '[^a-c]*'));
    assert(!isMatch('abc', '[^a-c]*'));
    assert(!isMatch('abd', '[^a-c]*'));
    assert(!isMatch('abe', '[^a-c]*'));
    assert(!isMatch('b', '[^a-c]*'));
    assert(!isMatch('bb', '[^a-c]*'));
    assert(!isMatch('bcd', '[^a-c]*'));
    assert(!isMatch('bdir/', '[^a-c]*'));
    assert(isMatch('Beware', '[^a-c]*'));
    assert(isMatch('Beware', '[^a-c]*', { bash: true }));
    assert(!isMatch('c', '[^a-c]*'));
    assert(!isMatch('ca', '[^a-c]*'));
    assert(!isMatch('cb', '[^a-c]*'));
    assert(isMatch('d', '[^a-c]*'));
    assert(isMatch('dd', '[^a-c]*'));
    assert(isMatch('de', '[^a-c]*'));
    assert(!isMatch('baz', '[^a-c]*'));
    assert(!isMatch('bzz', '[^a-c]*'));
    assert(isMatch('BZZ', '[^a-c]*'));
    assert(!isMatch('beware', '[^a-c]*'));
    assert(isMatch('BewAre', '[^a-c]*'));
  });

  it('should support basic wildmatch (brackets) features', () => {
    assert(!isMatch('aab', 'a[]-]b'));
    assert(!isMatch('ten', '[ten]'));
    assert(isMatch(']', ']'));
    assert(isMatch('a-b', 'a[]-]b'));
    assert(isMatch('a]b', 'a[]-]b'));
    assert(isMatch('a]b', 'a[]]b'));
    assert(isMatch('aab', 'a[\\]a\\-]b'));
    assert(isMatch('ten', 't[a-g]n'));
    assert(isMatch('ton', 't[^a-g]n'));
  });

  it('should support extended slash-matching features', () => {
    assert(!isMatch('foo/bar', 'f[^eiu][^eiu][^eiu][^eiu][^eiu]r'));
    assert(isMatch('foo/bar', 'foo[/]bar'));
    assert(isMatch('foo-bar', 'f[^eiu][^eiu][^eiu][^eiu][^eiu]r'));
  });

  it('should match escaped characters', () => {
    if (process.platform !== 'win32') {
      assert(isMatch('\\*', '\\\\*'));
      assert(isMatch('XXX/\\', '[A-Z]+/\\\\'));
    }

    assert(isMatch('[ab]', '\\[ab]'));
    assert(isMatch('[ab]', '[\\[:]ab]'));
  });

  it('should consolidate extra stars', () => {
    assert(!isMatch('bbc', 'a**c'));
    assert(isMatch('abc', 'a**c'));
    assert(!isMatch('bbd', 'a**c'));

    assert(!isMatch('bbc', 'a***c'));
    assert(isMatch('abc', 'a***c'));
    assert(!isMatch('bbd', 'a***c'));

    assert(!isMatch('bbc', 'a*****?c'));
    assert(isMatch('abc', 'a*****?c'));
    assert(!isMatch('bbc', 'a*****?c'));

    assert(isMatch('bbc', '?*****??'));
    assert(isMatch('abc', '?*****??'));

    assert(isMatch('bbc', '*****??'));
    assert(isMatch('abc', '*****??'));

    assert(isMatch('bbc', '?*****?c'));
    assert(isMatch('abc', '?*****?c'));

    assert(isMatch('bbc', '?***?****c'));
    assert(isMatch('abc', '?***?****c'));
    assert(!isMatch('bbd', '?***?****c'));

    assert(isMatch('bbc', '?***?****?'));
    assert(isMatch('abc', '?***?****?'));

    assert(isMatch('bbc', '?***?****'));
    assert(isMatch('abc', '?***?****'));

    assert(isMatch('bbc', '*******c'));
    assert(isMatch('abc', '*******c'));

    assert(isMatch('bbc', '*******?'));
    assert(isMatch('abc', '*******?'));

    assert(isMatch('abcdecdhjk', 'a*cd**?**??k'));
    assert(isMatch('abcdecdhjk', 'a**?**cd**?**??k'));
    assert(isMatch('abcdecdhjk', 'a**?**cd**?**??k***'));
    assert(isMatch('abcdecdhjk', 'a**?**cd**?**??***k'));
    assert(isMatch('abcdecdhjk', 'a**?**cd**?**??***k**'));
    assert(isMatch('abcdecdhjk', 'a****c**?**??*****'));
  });

  it('none of these should output anything', () => {
    assert(!isMatch('abc', '??**********?****?'));
    assert(!isMatch('abc', '??**********?****c'));
    assert(!isMatch('abc', '?************c****?****'));
    assert(!isMatch('abc', '*c*?**'));
    assert(!isMatch('abc', 'a*****c*?**'));
    assert(!isMatch('abc', 'a********???*******'));
    assert(!isMatch('a', '[]'));
    assert(!isMatch('[', '[abc'));
  });
});