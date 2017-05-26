# Emma.css { [emmet](http://docs.emmet.io/cheat-sheet/)-like utility classes }

A collection of [CSS utility classes](emma.css) for rapid and easy front-end development.

[![CircleCI](https://circleci.com/gh/ruedap/emma.css.svg?style=shield)](https://circleci.com/gh/ruedap/emma.css)

## Example

Emma.css only:

``` html
<article class="cf">
  <img class="d-b fl-l w-a mr-xl bdrs3" src="foo.png">
  <div class="fl-l ml-lg p-md">
    <h1 class="m0 ff-t">Title</h1>
    <p class="wow-bw wfsm-a">Description</p>
    <a class="d-ib fz-sm lh2" href="#">Read more</a>
  </div>
</article>
```

[SUIT CSS](https://suitcss.github.io/) naming convention + Emma.css (set prefix `u-`):

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
`.cf` (clearfix) | [micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/)
`.d-b` | display: block;
`.fl-l` | float: left;
`.w-a` | width: auto;
`.mr-xl` (extra large) | margin-right: 4.0rem;
`.bdrs3` | border-radius: 3px;
`.ml-lg` (large) | margin-left: 2.0rem;
`.p-md` (medium) | padding: 1.0rem;
`.m0` | margin: 0;
`.ff-t` | font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
`.wow-bw` | word-wrap: break-word;
`.wfsm-a` | -webkit-font-smoothing: antialiased;
`.d-ib` | display: inline-block;
`.fz-sm` (small) | font-size: small;
`.lh2` | line-height: 2;

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
.pos-s { position: static !important; }
.pos-a { position: absolute !important; }
.pos-r { position: relative !important; }
(snip)
```

### Add prefix to utility classes

You can add prefix to utility classes by `$emma-prefix` variable:

``` scss
$emma-prefix: "u-"; // Set prefix
@import "emma.css/scss/all";
```
CSS output:
``` css
.u-pos-s { position: static !important; }
.u-pos-a { position: absolute !important; }
.u-pos-r { position: relative !important; }
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
.pos-s { position: static; }
.pos-a { position: absolute; }
.pos-r { position: relative; }
(snip)
```

### Change default sizes or colors

You can change default sizes or colors by [variables](scss/_vars.scss):

``` scss
$emma-padding-md: 20px;  // default: `1.0rem`
$emma-color-black: #000; // default: `#111111`
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
