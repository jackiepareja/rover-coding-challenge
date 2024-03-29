window || (window = {}),
  (window.onload = function () {
    console.log("onload called"), (window.rover = window.initGame());
    var o = document.getElementById("playfield").getContext("2d"),
      e = 2 * document.getElementById("playfield").width,
      n = 2 * document.getElementById("playfield").height,
      t = [],
      t = [];
    (o.font = "bold 18px monospace"), (o.fillStyle = "black"), (o.textAlign = "center");
    var r = function (o, e, n) {
      t = [];
      for (var l = o.bounds, a = o.robos, s = [], d = 0; d <= l[0]; d++) s.push(".");
      for (var d = 0; d <= l[1]; d++) {
        var c = [].concat(s);
        t.push(c);
      }
      return (
        (o.robos = rover.tick(a)),
        (function (o) {
          for (var e in o) {
            var n = o[e],
              r = t[n.y];
            r && (r[n.x] = n.o);
          }
        })(o.robos),
        e && i(t, o.robos),
        e &&
        window.setTimeout(function () {
          var e = !1;
          _.each(o.robos, function (o) {
            0 !== o.command.length && !1 === e && (e = !0);
          }),
            !1 === e ? (rover.summary(o.robos), runTests(t)) : r(o, !0);
        }, 400),
        t
      );
    },
      i = function (t) {
        console.log("render", t), o.clearRect(0, 0, e, n);
        for (var r = 0; r < t.length; r++) {
          var i = t[r].join("");
          o.fillText(i, 250, 18 * r + 18);
        }
      };
    (runTests = function (o) {
      console.log("runtests: ");
      var e = [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "s", ".", ".", ".", ".", ".", ".", ".", ".", "."];
      window.doneTrigger
        ? (console.log("fire doneTrigger: ", e, o), window.doneTrigger(e, _.flatten(o)))
        : _.isEqual(_.flatten(o).join().toLowerCase(), e.join())
          ? (document.getElementById("test").innerText = "your business logic is correct, which means you beat task #1 and #2")
          : (document.getElementById("test").innerText = "your solution was incorrect");
    }),
      r(rover.parse(rover.command), !0);
  });
