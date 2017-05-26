import * as fs from 'fs-extra';
import * as _ from 'lodash';

export default class Emma {
  readonly PREFIX_VAR;
  readonly PREFIX_MIXIN;
  readonly SASS_DIR = 'scss';
  readonly TEMP_DIR = 'tmp';
  readonly VAR_FILE = 'vars';
  readonly MIXIN_FILE = 'mixins';
  readonly RULE_FILE = 'rules';
  readonly ROOT_FILE = 'all';
  readonly EMMA_JSON = `${this.TEMP_DIR}/emma-data.json`;
  private doc;

  constructor(
    prefix_var: string = 'emma-',
    prefix_mixin: string = 'emma-',
  ) {
    this.PREFIX_VAR = prefix_var;
    this.PREFIX_MIXIN = prefix_mixin;
  }

  public exec(): void {
    this.doc = this.loadEmmaDoc();
    const ver = this.doc.ver;
    const vars = this.doc.vars;
    const mixins = this.doc.rules.mixins;
    const props = this.doc.rules.props;

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

  private generateVars(vars: any): string {
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

  private generateMixins(mixins: any): string {
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

  private generateMixinRules(mixins: any): string {
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

  private generateMixinDecls(decls: any, important: string): string {
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

  private generatePropRules(props: any): string {
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

  private generatePropGroupImports(props: any): string {
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

  private generateMixinGroupImports(mixins: any): void {
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

  private loadEmmaDoc(filename: string = this.EMMA_JSON): object {
    let doc;

    try {
      doc = JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (e) {
      throw new Error(e.message);
    }

    return doc;
  }
}
