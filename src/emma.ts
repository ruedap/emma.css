import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as jsyaml from 'js-yaml';

export class Emma {
  readonly PREFIX_VAR;
  readonly PREFIX_MIXIN;
  readonly SASS_DIR = './sass';
  readonly TEMP_DIR = './tmp';
  readonly RULE_PATH = 'rules';
  readonly EMMA_JSON = `${this.TEMP_DIR}/emma.json`;
  private doc;

  constructor(
    prefix_var: string = 'emma-',
    prefix_mixin: string = 'emma-',
  ) {
    this.PREFIX_VAR = prefix_var;
    this.PREFIX_MIXIN = prefix_mixin;

    this.doc = this.loadEmmaDoc();
  }

  public execute() {
    const vars = this.doc.vars;
    console.log(`variables: ${vars.length}`);
    const mixins = this.doc.rules.mixins;
    console.log(`mixins: ${mixins.length}`);
    const props = this.doc.rules.props;
    console.log(`properties: ${props.length}`);

    // Make dir
    fs.ensureDirSync(`${this.SASS_DIR}/${this.RULE_PATH}`);

    // Vars
    this.writeFileSync('_vars', this.generateVars(vars));

    // Mixins
    this.writeFileSync('_mixins', this.generateMixins(mixins));

    // Rules
    this.generateMixinRules(mixins);
    this.generatePropRules(props);
    const imports = this.generatePropGroupImports(props);
    this.generateMixinGroupImports(mixins);
    this.writeFileSync(`_${this.RULE_PATH}`, imports);
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
      this.writeFileSync(`${this.RULE_PATH}/_${m.name}`, rulesets);
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
        rulesets += `.#{$emma-prefix}${p.abbr}-${v.abbr} {\n`;
        rulesets += `  ${p.name}: ${v_name} ${important};\n`;
        rulesets += `}\n\n`;
      });

      const pFileName = _.trimStart(p.name, '-');
      this.writeFileSync(`${this.RULE_PATH}/_${pFileName}`, rulesets);
      result += rulesets;
    });

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
        imports += `@import "${this.RULE_PATH}/${pFileName}";\n`;
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
        imports += `@import "${this.RULE_PATH}/${pFileName}";\n`;
      });

      this.appendFileSync(`_${groupName}`, imports);
    });
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
