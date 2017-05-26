# Emma.css { [emmet](http://docs.emmet.io/cheat-sheet/)-like utility classes }

A collection of [CSS utility classes](emma.css) for rapid and easy front-end development.

[![CircleCI](https://circleci.com/gh/ruedap/emma.css.svg?style=shield)](https://circleci.com/gh/ruedap/emma.css)

## Example

Emma.css only:

``` html
<article class="u-cf">
  <img class="u-d-b u-fl-l u-w-a u-mr-xl u-bdrs-3" src="foo.png">
  <div class="u-fl-l u-ml-lg u-p-md">
    <h1 class="u-m-0 u-ff-t">Title</h1>
    <p class="u-wow-bw u-wfsm-a">Description</p>
    <a class="u-d-ib u-fz-sm u-lh-2" href="#">Read more</a>
  </div>
</article>
```

[SUIT CSS](https://suitcss.github.io/) naming convention + Emma.css:

``` html
<article class="Excerpt u-cf">
  <img class="Excerpt-thumbnail u-d-b u-fl-l u-w-a" src="foo.png">
  <div class="u-fl-l u-ml-lg u-p-md">
    <h1 class="Excerpt-title">Title</h1>
    <p class="u-wow-bw u-wfsm-a">Description</p>
    <a class="Excerpt-readMore" href="#">Read more</a>
  </div>
</article>
```

utility class name | declaration
--- | ---
`.u-cf` (clearfix) | [micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/)
`.u-d-b` | display: block;
`.u-fl-l` | float: left;
`.u-w-a` | width: auto;
`.u-mr-xl` (extra large) | margin-right: 4.0rem;
`.u-bdrs-3` | border-radius: 3px;
`.u-ml-lg` (large) | margin-left: 2.0rem;
`.u-p-md` (medium) | padding: 1.0rem;
`.u-m-0` | margin: 0;
`.u-ff-t` | font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
`.u-wow-bw` | word-wrap: break-word;
`.u-wfsm-a` | -webkit-font-smoothing: antialiased;
`.u-d-ib` | display: inline-block;
`.u-fz-sm` (small) | font-size: small;
`.u-lh-2` | line-height: 2;

See also: [emma.css](emma.css) (all utility classes)

## Getting Started

### Installation

Install or download Emma.css from one of these sources:

* **npm**: `npm install emma.css`
* **Bower**: `bower install emma.css` ([Bower is deprecated.](https://github.com/bower/bower#bower---a-package-manager-for-the-web))
* **Rails**: [emma-css-rails](https://github.com/ruedap/emma-css-rails)
* **Download**: [zip](https://github.com/ruedap/emma.css/releases)
* **Alfred 2**: [Emma.css Workflow](https://github.com/ruedap/alfred-emma-css-workflow)

### Basic usage

SCSS:
``` scss
@import "emma.css/scss/all";
```
CSS output:
``` css
.u-pos-s { position: static !important; }
.u-pos-a { position: absolute !important; }
.u-pos-r { position: relative !important; }
(snip)
```

### Change prefix of utility classes

Default prefix: `u-`  
You can change prefix of utility classes by `$emma-prefix` variable:

``` scss
$emma-prefix: "foo-"; // Change prefix
@import "emma.css/scss/all";
```
CSS output:
``` css
.foo-pos-s { position: static !important; }
.foo-pos-a { position: absolute !important; }
.foo-pos-r { position: relative !important; }
(snip)
```

If you need to remove prefix:

``` scss
$emma-prefix: ""; // Remove prefix
@import "emma.css/scss/all";
```
CSS output:
``` css
.pos-s { position: static !important; }
.pos-a { position: absolute !important; }
.pos-r { position: relative !important; }
(snip)
```

### Remove !important annotations

You can remove `!important` annotations by `$emma-important` variable:

``` scss
$emma-important: false; // Remove !important annotations
@import "emma.css/scss/all";
```
CSS output:
``` css
.u-pos-s { position: static; }
.u-pos-a { position: absolute; }
.u-pos-r { position: relative; }
(snip)
```

### Change default sizes or colors

You can change default sizes or colors by [variables](scss/_vars.scss):

``` scss
$emma-padding-md: 20px;   // default: `1.0rem`
$emma-color-black: #000;  // default: `#111111`
@import "emma.css/scss/all";
```

## Inspired by

* [emmetio/emmet](https://github.com/emmetio/emmet)
* [suitcss/suit](https://github.com/suitcss/suit)
* [jxnblk/basscss](https://github.com/jxnblk/basscss)
* [t32k/wisteria](https://github.com/t32k/wisteria)
* [hail2u/node-edjo](https://github.com/hail2u/node-edjo)

## License

Released under the [MIT license](LICENSE).

## Author

[ruedap](https://github.com/ruedap)
