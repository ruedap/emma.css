import * as fs from 'fs-extra';
import * as _ from 'lodash';

export type TEmmaDocVar = {
  name: string;
  value: string;
}

export type TEmmaDocProp = {
  name: string;
  abbr: string;
  group: string;
  values: {
    name: string;
    abbr: string;
  }[];
}

export type TEmmaDocMixin = {
  name: string;
  abbr: string;
  desc?: string;
  group: string;
  decls: (string | {
    prop: string;
    value: string;
  })[];
}

export type TEmmaDoc = {
  ver: string;
  vars: TEmmaDocVar[];
  rules: {
    props: TEmmaDocProp[];
    mixins: TEmmaDocMixin[];
  };
}

export default class Emma {
  readonly PREFIX_VAR;
  readonly PREFIX_MIXIN;
  readonly SASS_DIR = 'sass';
  readonly TEMP_DIR = 'tmp';
  readonly VAR_FILE = 'vars';
  readonly MIXIN_FILE = 'mixins';
  readonly RULE_FILE = 'rules';
  readonly ROOT_FILE = 'all';
  readonly EMMA_JSON = `${this.TEMP_DIR}/emma-data.json`;
  private emmaDoc: TEmmaDoc;

  constructor(
    prefix_var: string = 'emma-',
    prefix_mixin: string = 'emma-',
  ) {
    this.PREFIX_VAR = prefix_var;
    this.PREFIX_MIXIN = prefix_mixin;
  }

  public exec(): void {
    this.emmaDoc = this.loadEmmaDoc();
    const ver = this.emmaDoc.ver;
    const vars = this.emmaDoc.vars;
    const mixins = this.emmaDoc.rules.mixins;
    const props = this.emmaDoc.rules.props;

    // Make dir
    fs.ensureDirSync(`${this.SASS_DIR}/${this.RULE_FILE}`);

    // Vars
    this.writeFileSync(`_${this.VAR_FILE}`, this.generateVars(vars));

    // Mixins
    this.writeFileSync(`_${this.MIXIN_FILE}`, this.generateMixins(mixins));

    // Rules
    this.generateMixinRules(mixins);
    this.generatePropRules(props);
    const imports = this.generatePropGroupImports(props);
    this.generateMixinGroupImports(mixins);
    this.writeFileSync(`_${this.RULE_FILE}`, imports);

    // Root
    this.writeFileSync(`${this.ROOT_FILE}`, this.generateRootFile(ver));

    // DEBUG
    console.log(`/*! Emma.css ${ver} */`);
    console.log(`vars: ${vars.length}`);
    console.log(`mixins: ${mixins.length}`);
    console.log(`props: ${props.length}`);
  }

  private generateVars(vars: TEmmaDocVar[]): string {
    let result = `// Variables\n`;

    _.forEach(vars, (v) => {
      result += `$${this.PREFIX_VAR}${v.name}: ${v.value} !default;\n`;
    });

    result += `\n// Functions
@function emma-important($bool: $emma-important) {
  $important: "";
  @if $bool { $important: "!important"; }
  @return $important;
}
`;
    return result;
  }

  private generateMixins(mixins: TEmmaDocMixin[]): string {
    const important = "#{emma-important($important)}";
    let result = '';

    _.forEach(mixins, (m) => {
      result += this.generateMixinDesc(m.desc);
      result += `@mixin ${this.PREFIX_MIXIN}${m.abbr}($important: $emma-important) {\n`;
      result += this.generateMixinDecls(m.decls, important);
      result += `}\n\n`;
    });

    return result;
  }

  private generateMixinRules(mixins: TEmmaDocMixin[]): string {
    const important = "#{emma-important($emma-important)}";
    let result = '';

    _.forEach(mixins, (m) => {
      let rulesets = '';
      rulesets += this.generateMixinDesc(m.desc);
      rulesets += `.#{$emma-prefix}${m.abbr} {\n`;
      rulesets += this.generateMixinDecls(m.decls, important);
      rulesets += `}\n\n`;
      this.writeFileSync(`${this.RULE_FILE}/_${m.name}`, rulesets);
      result += rulesets;
    });

    return result;
  }

  private generateMixinDesc(desc: string): string {
    let result = '';
    if (typeof desc === 'string') { result += `// ${desc}\n`; }
    return result;
  }

  private generateMixinDecls(decls: string | object, important: string): string {
    let result = '';

    _.forEach(decls, (d) => {
      const r_value = (this.isVar(d.value)) ? this.prefixedVar(this.PREFIX_VAR, d.value) : d.value;
      if (typeof d === 'string') {
        result += `  ${d}\n`;
      } else {
        result += `  ${d.prop}: ${r_value} ${important};\n`;
      }
    });

    return result;
  }

  private isVar(str: string, target: string = '$'): boolean {
    return _.startsWith(str, target);
  }

  private prefixedVar(prefix: string, name: string, sign: string = '$'): string {
    return `${sign}${prefix}${_.trimStart(name, sign)}`;
  }

  private generatePropRules(props: TEmmaDocProp[]): string {
    const important = "#{emma-important($emma-important)}";
    let result = '';

    _.forEach(props, (p) => {
      let rulesets = '';

      _.forEach(p.values, (v) => {
        const v_name = this.isVar(v.name) ? this.prefixedVar(this.PREFIX_VAR, v.name) : v.name;
        const abbr = this.generateAbbr(p.abbr, v.abbr);
        rulesets += `.#{$emma-prefix}${abbr} {\n`;
        rulesets += `  ${p.name}: ${v_name} ${important};\n`;
        rulesets += `}\n\n`;
      });

      const pFileName = _.trimStart(p.name, '-');
      this.writeFileSync(`${this.RULE_FILE}/_${pFileName}`, rulesets);
      result += rulesets;
    });

    return result;
  }

  private generateAbbr(propAbbr: string, valueAbbr: string): string {
    if (this.isUnit(valueAbbr)) {
      return `${propAbbr}${valueAbbr}`;
    } else {
      return `${propAbbr}-${valueAbbr}`;
    }
  }

  private isUnit(str: string): boolean {
    let result = false;
    result = str.match(/^[\d-]/) ? true : false;
    return result;
  }

  private generatePropGroupImports(props: TEmmaDocProp[]): string {
    const groups: any = _.groupBy(props, 'group');
    if (_.isEmpty(groups)) {
      throw new Error('Failed generate single group declarations.');
    }

    let result ='';

    _.forEach(groups, (v, groupName) => {
      let imports = '';
      result += `@import "${groupName}";\n`;

      _.forEach(v, (p) => {
        const pFileName = _.trimStart(p.name, '-');
        imports += `@import "${this.RULE_FILE}/${pFileName}";\n`;
      });

      this.writeFileSync(`_${groupName}`, imports);
    });

    return result;
  }

  private generateMixinGroupImports(mixins: TEmmaDocMixin[]): void {
    const groups: any = _.groupBy(mixins, 'group');
    if (_.isEmpty(groups)) {
      throw new Error('Failed generate multiple group declarations.');
    }

    _.forEach(groups, (v, groupName) => {
      let imports = '';

      _.forEach(v, (p) => {
        const pFileName = _.trimStart(p.name, '-');
        imports += `@import "${this.RULE_FILE}/${pFileName}";\n`;
      });

      this.appendFileSync(`_${groupName}`, imports);
    });
  }

  private generateRootFile(ver: string): string {
    let result = '';

    result += `/*! Emma.css ${ver} | MIT License | https://git.io/emma */\n`
    result += `@import "${this.VAR_FILE}";\n`
    result += `@import "${this.MIXIN_FILE}";\n`
    result += `@import "${this.RULE_FILE}";\n`

    return result;
  }

  private writeFileSync(filename: string, str: string): void {
    fs.writeFileSync(`${this.SASS_DIR}/${filename}.scss`, str);
  }

  private appendFileSync(filename: string, str: string): void {
    fs.appendFileSync(`${this.SASS_DIR}/${filename}.scss`, str);
  }

  private loadEmmaDoc(filename: string = this.EMMA_JSON): TEmmaDoc {
    let doc;

    try {
      doc = JSON.parse(fs.readFileSync(filename, 'utf8')) as TEmmaDoc;
    } catch (e) {
      throw new Error(e.message);
    }

    return doc;
  }
}
