import { describe, it, expect, beforeEach } from './jasmine.js';
import formatBytes from '../source/format-bytes.js';

describe('Format bytes', function() {
  let tests;

  beforeEach(() => {
    tests = [
      {
        in: [320, 3],
        out: '320 B'
      },
      {
        in: [200000],
        out: '195.3 KiB'
      },
      {
        in: [3124352],
        out: '2.980 MiB'
      },
      {
        in: [432303020202, 6],
        out: '402.614 GiB'
      },
      {
        in: [5323330102372, 3],
        out: '4.84 TiB'
      },
      {
        in: ['5323330102372', '3'],
        out: '4.84 TiB'
      },
      {
        in: [1000],
        out: '1000 B'
      },
      {
        in: [1000, 0],
        out: '1000 B'
      },
      {
        in: [1024, 0],
        out: '1.000 KiB'
      },
      {
        in: [4326, 5],
        out: '4.2246 KiB'
      },
      {
        in: [3045827469],
        out: '2.837 GiB'
      },
      {
        in: [84567942345572238],
        out: '75.11 PiB'
      },
      {
        in: [5213456204567832146028],
        out: '4.416 ZiB'
      },
      {
        in: [NaN],
        out: ''
      },
      {
        in: ['quack'],
        out: ''
      }
    ];
  });

  it('should determine the best size and suffix to display', () => {
    tests.forEach(function(test) {
      expect(formatBytes.apply(null, test.in)).toEqual(test.out);
    });
  });
});
