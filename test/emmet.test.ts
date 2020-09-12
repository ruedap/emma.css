import * as mocha from "mocha";
import * as sinon from "sinon";
import * as assert from "power-assert";

import * as parse from "@emmetio/css-abbreviation";
import * as SnippetsRegistry from "@emmetio/snippets-registry";
import * as Profile from "@emmetio/output-profile";
import resolveSnippets from "@emmetio/css-snippets-resolver";
import stringify from "@emmetio/stylesheet-formatters";

import Emma from "../src/emma";
import * as fs from "fs-extra";
import * as _ from "lodash";

describe("emma-data.json", () => {
  let emma;
  let doc;
  let expand;

  before(() => {
    emma = new Emma();
    doc = JSON.parse(fs.readFileSync(emma.EMMA_JSON, "utf8"));
    const registry = new SnippetsRegistry();
    const emmaProps = {};
    _.each(doc.rules.props, (p) => {
      let values = "";
      _.each(_.reverse(p.values), (v) => {
        values += `${v.name}|`;
      });
      values = _.trimEnd(values, "|");
      // TODO: Fix values (e.g. font-family)
      // console.log(values);
      _.assign(emmaProps, { [p.abbr]: `${p.name}:${values}` });
    });
    registry.add(emmaProps);

    expand = (abbr, profile, syntax, options) => {
      const tree = resolveSnippets(parse(abbr), registry);
      return stringify(tree, profile || new Profile(), syntax, options);
    };
  });

  describe("[rules] [props]", () => {
    it("is valid Emmet abbreviation spec", () => {
      _.each(doc.rules.props, (p) => {
        _.each(p.values, (v) => {
          // FIXME: variable name
          if (emma.isVar(v.name)) {
            return;
          }
          const abbr = emma.generateAbbr(p.abbr, v.abbr);
          // FIXME: Invalid Emmet abbreviation list
          const invalidEmmetAbbrList = [
            "m-a",
            "m0-a",
            "m-a-0",
            "ff-a",
            "ff-t",
            "ff-v",
            "ff-l",
            "ff-ja",
            "op0_1",
            "op0_2",
            "op0_3",
            "op0_4",
            "op0_5",
            "op0_6",
            "op0_7",
            "op0_8",
            "op0_9",
            "fxw-wr",
            "ord1",
            "ord2",
            "ord3",
            "ord4",
            "ord5",
            "ord6",
            "ord9999",
            "ord-1",
            "fx1-0-0",
            "lts0_01e",
            "lts0_1e",
            "lts0_2e",
            "lts0_3e",
            "lts-0_01e",
            "lts-0_1e",
            "lts-0_2e",
            "lts-0_3e",
            "trsdl0_1s",
            "trsdl0_2s",
            "trsdl0_3s",
            "trsdl0_4s",
            "trsdl0_5s",
            "trsdl0_6s",
            "trsdl0_7s",
            "trsdl0_8s",
            "trsdl0_9s",
            "trsdr0_1s",
            "trsdr0_2s",
            "trsdr0_3s",
            "trsdr0_4s",
            "trsdr0_5s",
            "trsdr0_6s",
            "trsdr0_7s",
            "trsdr0_8s",
            "trsdr0_9s",
          ];
          if (_.includes(invalidEmmetAbbrList, abbr)) {
            return;
          }
          assert.equal(expand(abbr), `${p.name}: ${v.name};`);
        });
      });
    });
  });
});
