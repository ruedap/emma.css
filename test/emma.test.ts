import * as mocha from "mocha";
import * as sinon from "sinon";
import * as assert from "power-assert";

import {
  default as Emma,
  TEmmaDocVar,
  TEmmaDocProp,
  TEmmaDocMixinDecl,
  TEmmaDocMixin,
  TEmmaDoc,
} from "../src/emma";
import * as fs from 'fs-extra';

describe("Emma",() => {
  const varsArg: TEmmaDocVar[] = [
    {
      "name": "prefix",
      "value": "\"u-\""
    },
    {
      "name": "important",
      "value": "true"
    },
    {
      "name": "font-size-xs",
      "value": "0.75rem"
    },
  ];
  const mixinsArg: TEmmaDocMixin[] = [
    {
      "name": "clearfix",
      "abbr": "cf",
      "desc": "Clearfix (Contain floats)",
      "group": "float",
      "decls": [
        {
          "prop": "",
          "value": "&::after { content: \"\"; display: table; clear: both; }"
        },
      ]
    },
    {
      "name": "margin-x-0",
      "abbr": "mx-0",
      "group": "margin",
      "decls": [
        {
          "prop": "margin-left",
          "value": "0"
        },
        {
          "prop": "margin-right",
          "value": "0"
        }
      ]
    },
  ];
  const propsArg: TEmmaDocProp[] = [
    {
      "name": "position",
      "abbr": "pos",
      "group": "display",
      "values": [
        {
          "name": "static",
          "abbr": "s"
        },
        {
          "name": "absolute",
          "abbr": "a"
        },
        {
          "name": "relative",
          "abbr": "r"
        },
        {
          "name": "fixed",
          "abbr": "f"
        }
      ]
    },
    {
      "name": "top",
      "abbr": "t",
      "group": "display",
      "values": [
        {
          "name": "auto",
          "abbr": "a"
        },
        {
          "name": "0",
          "abbr": "0"
        }
      ]
    },
  ];
  let emma;

  beforeEach(() => {
    emma = new Emma();
  });

  describe("constructor()", () => {
    it("sets args", () => {
      emma = new Emma('var-', 'mixin-');
      assert(emma.PREFIX_VAR === 'var-');
      assert(emma.PREFIX_MIXIN === 'mixin-');
    });
  });

  describe("generateVars()", () => {
    it("returns valid string", () => {
      const actual = emma.generateVars(varsArg);
      const expected = "// Variables\n$emma-prefix: \"u-\" !default;\n$emma-important: true !default;\n$emma-font-size-xs: 0.75rem !default;\n\n// Functions\n@function emma-important($bool: $emma-important) {\n  $important: \"\";\n  @if $bool { $important: \"!important\"; }\n  @return $important;\n}\n";
      assert(actual === expected);
    });
  });

  describe("generateMixins()", () => {
    it("returns valid string", () => {
      const actual = emma.generateMixins(mixinsArg);
      const expected = "// Clearfix (Contain floats)\n@mixin emma-cf($important: $emma-important) {\n  &::after { content: \"\"; display: table; clear: both; }\n}\n\n@mixin emma-mx-0($important: $emma-important) {\n  margin-left: 0 #{emma-important($important)};\n  margin-right: 0 #{emma-important($important)};\n}\n\n";
      assert(actual === expected);
    });
  });

  describe("generateMixinRules()", () => {
    it("returns valid string", () => {
      const emmaMock = sinon.mock(emma);
      emmaMock.expects("writeFileSync").exactly(2);

      const actual = emma.generateMixinRules(mixinsArg);
      const expected = "// Clearfix (Contain floats)\n.#{$emma-prefix}cf {\n  &::after { content: \"\"; display: table; clear: both; }\n}\n\n.#{$emma-prefix}mx-0 {\n  margin-left: 0 #{emma-important($emma-important)};\n  margin-right: 0 #{emma-important($emma-important)};\n}\n\n";
      assert(emmaMock.verify());
      assert(actual === expected);
    });
  });

  describe("generateMixinDesc()", () => {
    it("returns valid string", () => {
      const actual = emma.generateMixinDesc(mixinsArg[0].desc);
      assert(actual === "// Clearfix (Contain floats)\n");
    });
  });

  describe("generateMixinDecls()", () => {
    describe("when the prop is a blank string", () => {
      it("returns valid string", () => {
        const arg1: TEmmaDocMixinDecl[] = [
          {
            "prop": "",
            "value": "&::after { content: \"\"; display: table; clear: both; }"
          },
        ];
        const arg2 = "";

        const actual = emma.generateMixinDecls(arg1, arg2);
        const expected = "  &::after { content: \"\"; display: table; clear: both; }\n";
        assert(actual === expected);
      });
    });

    describe("when the prop is not a blank string", () => {
      it("returns valid string", () => {
        const arg1: TEmmaDocMixinDecl[] = [
          {
            "prop": "margin-left",
            "value": "0"
          },
          {
            "prop": "margin-right",
            "value": "0"
          }
        ];
        const arg2 = "#{emma-important($emma-important)}";

        const actual = emma.generateMixinDecls(arg1, arg2);
        const expected = "  margin-left: 0 #{emma-important($emma-important)};\n  margin-right: 0 #{emma-important($emma-important)};\n";
        assert(actual === expected);
      });
    });
  });

  describe("isVar()", () => {
    it("returns true", () => {
      assert(emma.isVar('$foo') === true);
      assert(emma.isVar('$_foo') === true);
    });

    it("returns false", () => {
      assert(emma.isVar('foo$') === false);
      assert(emma.isVar('f$oo') === false);
    });
  });

  describe("prefixedVar()", () => {
    it("returns prefixed variable", () => {
      assert(emma.prefixedVar('prefix-', 'name') === '$prefix-name');
    });
  });

  describe("generatePropRules()", () => {
    it("returns valid string", () => {
      const emmaMock = sinon.mock(emma);
      emmaMock.expects("writeFileSync").exactly(2);

      const actual = emma.generatePropRules(propsArg);
      const expected = ".#{$emma-prefix}pos-s {\n  position: static #{emma-important($emma-important)};\n}\n\n.#{$emma-prefix}pos-a {\n  position: absolute #{emma-important($emma-important)};\n}\n\n.#{$emma-prefix}pos-r {\n  position: relative #{emma-important($emma-important)};\n}\n\n.#{$emma-prefix}pos-f {\n  position: fixed #{emma-important($emma-important)};\n}\n\n.#{$emma-prefix}t-a {\n  top: auto #{emma-important($emma-important)};\n}\n\n.#{$emma-prefix}t0 {\n  top: 0 #{emma-important($emma-important)};\n}\n\n";
      assert(emmaMock.verify());
      assert(actual === expected);
    });
  });

  describe("generateAbbr()", () => {
    it("returns valid string", () => {
      assert(emma.generateAbbr('z', '1') === 'z1');
      assert(emma.generateAbbr('ti', '-9999') === 'ti-9999');
    });
  });

  describe("isUnit()", () => {
    it("returns true", () => {
      assert(emma.isUnit('1') === true);
      assert(emma.isUnit('-') === true);
    });

    it("returns false", () => {
      assert(emma.isUnit('a') === false);
    });
  });

  describe("generatePropGroupImports()", () => {
    it("returns valid string", () => {
      const emmaMock = sinon.mock(emma);
      emmaMock.expects("writeFileSync").exactly(1);

      const actual = emma.generatePropGroupImports(propsArg);
      const expected = "@import \"display\";\n";
      assert(emmaMock.verify());
      assert(actual === expected);
    });
  });

  describe("generateMixinGroupImports()", () => {
    it("calls the original function", () => {
      const emmaMock = sinon.mock(emma);
      emmaMock.expects("appendFileSync").exactly(2);

      emma.generateMixinGroupImports(mixinsArg);
      assert(emmaMock.verify());
    });
  });

  describe("generateRootFile()", () => {
    it("returns valid string", () => {
      const actual = emma.generateRootFile('0.10.0');
      const expected = "/*! Emma.css 0.10.0 | MIT License | https://git.io/emma */\n@import \"vars\";\n@import \"mixins\";\n@import \"rules\";\n";
      assert(actual === expected);
    });
  });

  describe("writeFileSync()", () => {
    it("calls the original function", () => {
      const fsMock = sinon.mock(fs);
      fsMock.expects("writeFileSync").withArgs("sass/foo.scss", "bar").exactly(1);

      emma.writeFileSync("foo", "bar");
      assert(fsMock.verify());
    });
  });

  describe("appendFileSync()", () => {
    it("calls the original function", () => {
      const fsMock = sinon.mock(fs);
      fsMock.expects("appendFileSync").withArgs("sass/foo.scss", "bar").exactly(1);

      emma.appendFileSync("foo", "bar");
      assert(fsMock.verify());
    });
  });

  describe("loadEmmaDoc()", () => {
    it("returns doc", () => {
      let doc = emma.loadEmmaDoc();
      assert(typeof doc === 'object');
    });

    it("causes error", () => {
      assert.throws(
        () => {
          emma.loadEmmaDoc('invalid_path');
        },
        (error) => {
          const m = "ENOENT: no such file or directory, open 'invalid_path'";
          assert(error.message === m);
          return true;
        }
      );
    });
  });

});
