define([], function () {

    "use strict";

    var math = {

        scale: function (v, s) {
            if (v) {
                for (var i = 0; i < v.length; i++)
                    v[i] *= s;
            }
            return v;
        },

        // TODO: unit test
        distance: function (a, b) {
            return Math.sqrt(this.distanceSquared(a, b));
        },

        // TODO: unit test
        distanceSquared: function (a, b) {
            return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
        },

        magSquared: function (a) {
            return this.distanceSquared(a, a);
        },

        magnitude: function (a) {
            return this.distance(a, a);
        },

        crossProduct: function (a, b) {
            return [
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]];
        },

        dotProduct: function (a, b) {
            var v = 0;
            if (a && b && (a.length === b.length)) {
                for (var i = 0; i < a.length; i++)
                    v += a[i] * b[i];
            }
            return v;
        },

        subtract: function (a, b) {
            return [
                b[0] - a[0],
                b[1] - a[1],
                b[2] - a[2]
            ];
        },

        mean: function (vertices) {
            if (!vertices || vertices.length < 1)
                return null;
            var len = vertices.length, vlen = vertices[0].length;
            var m = [], vertex, i, j;
            for (j = 0; j < vlen; j++) {
                m[j] = 0;
                for (i = 0; i < len; i++)
                    m[j] += vertices[i][j];
                m[j] /= len;
            }
            return m;
        },

        normalise: function (a) {
            var mag = this.magnitude(a);
            if (mag === 0)
                return null;
            a[0] = a[0] / mag;
            a[1] = a[1] / mag;
            a[2] = a[2] / mag;
            return a;
        },

        normal: function (a, b) {
            var v = this.crossProduct(a, b);
            return this.normalise(v);
        },

        normalFromVertices: function (v1, v2, v3) {
            var a = this.subtract(v2, v1);
            var b = this.subtract(v3, v1);
            return this.normal(a, b);
        }
    };

    return math;
});