import * as mocha from "mocha";
import * as sinon from "sinon";
import * as assert from "power-assert";

import Emma from "../src/emma";
import * as fs from "fs-extra";
import * as _ from "lodash";
import * as semverRegex from "semver-regex";

describe("emma-data.json", () => {
  let emma;
  let doc;

  beforeEach(() => {
    emma = new Emma();
    doc = JSON.parse(fs.readFileSync(emma.EMMA_JSON, "utf8"));
  });

  it("is valid length", () => {
    assert(doc.vars.length === 63);
    assert(doc.rules.mixins.length === 34);
    assert(doc.rules.props.length === 112);
    const propValuesLength = _.reduce(
      doc.rules.props,
      (result, v) => {
        return result + v.values.length;
      },
      0
    );
    assert(propValuesLength === 777);
  });

  it("is unique abbreviations", () => {
    let actual = [];
    _.each(doc.rules.props, p => {
      _.each(p.values, v => {
        actual.push(emma.generateAbbr(p.abbr, v.abbr));
      });
    });
    _.each(doc.rules.mixins, m => {
      actual.push(m.abbr);
    });
    assert(_.isEqual(actual, _.uniq(actual)));
  });

  describe("[ver]", () => {
    it("is valid SemVer", () => {
      assert(semverRegex().test(doc.ver));
    });
  });

  describe("[vars]", () => {
    it("is unique [name]", () => {
      let actual = _.map(doc.vars, "name");
      assert(_.isEqual(actual, _.uniq(actual)));
    });
  });

  describe("[rules]", () => {
    describe("[props]", () => {
      it("is unique [name]", () => {
        let actual = _.map(doc.rules.props, "name");
        assert(_.isEqual(actual, _.uniq(actual)));
      });

      it("is unique [abbr]", () => {
        let actual = _.map(doc.rules.props, "abbr");
        assert(_.isEqual(actual, _.uniq(actual)));
      });

      describe("[values]", () => {
        it("is unique [name]", () => {
          _.forEach(doc.rules.props, p => {
            let actual = _.map(p.values, "name");
            assert(_.isEqual(actual, _.uniq(actual)));
          });
        });

        it("is unique [abbr]", () => {
          _.forEach(doc.rules.props, p => {
            let actual = _.map(p.values, "abbr");
            assert(_.isEqual(actual, _.uniq(actual)));
          });
        });
      });
    });

    describe("[mixins]", () => {
      it("is unique [name]", () => {
        let actual = _.map(doc.rules.mixins, "name");
        assert(_.isEqual(actual, _.uniq(actual)));
      });

      it("is unique [abbr]", () => {
        let actual = _.map(doc.rules.mixins, "abbr");
        assert(_.isEqual(actual, _.uniq(actual)));
      });
    });
  });
});
