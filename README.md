<h1 align="center">
<img src="https://github.com/ruedap/emma.css/raw/assets/images/logo-box.svg" style="max-width:100%;" />
</h1>

<p align="center">Emmet-like utility classes for rapid and easy front-end development.</p>

<div align="center">
<a href="https://circleci.com/gh/ruedap/emma.css"><img src="https://circleci.com/gh/ruedap/emma.css.svg?style=shield" alt="Circle CI"></a>
<a href="https://www.npmjs.com/package/emma.css"><img src="https://img.shields.io/npm/v/emma.css.svg?style=flat" alt="NPM Version"></a>
<a href="https://github.com/ruedap/emma.css/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ruedap/emma.css.svg" alt="License"></a>
</div>

## Example

| Emma.css class | [Emmet](https://docs.emmet.io/cheat-sheet/) abbreviation | Declaration (Expanded abbreviation)                                   |
|-----------|---------|---------------------------------------------------------------------|
| .d-b      | d-b     | display: block;                                                     |
| .d-fx     | d-fx    | display: flex;                                                      |
| .m-a      | m-a     | marign: auto;                                                       |
| .p0       | p0      | padding: 0;                                                         |
| ―         | p-5     | padding: -5px;                                                      |
| .w1       | w1      | width: 1px;                                                         |
| .h100p    | h100p   | height: 100%;                                                       |
| .mah50vh  | mah50vh | max-height: 50vh;                                                   |
| .ff-t     | ff-t    | font-family: "Times New Roman", Times, Baskerville, Georgia, serif; |
| .fz16     | fz16    | font-size: 16px;                                                    |
| .fz-sm    | ―       | font-size: small;                                                   |
| .pb-md    | ―       | padding-bottom: 1.0rem; *(default value)*                           |
| .ml-lg    | ―       | margin-left: 2.0rem; *(default value)*                              |

See [emma.css](emma.css) (all classes)

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


## Installation

Install or download Emma.css from one of these sources.

```sh
npm install emma.css
```

**Rails** ([RubyGems](https://rubygems.org/gems/emma-css-rails))

```sh
gem install emma-css-rails
```

**Download**

https://github.com/ruedap/emma.css/releases

**Alfred**

https://github.com/ruedap/alfred-emma-css-workflow


## Getting Started

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


## License

Released under the [MIT license](LICENSE).


## Author

[ruedap](https://github.com/ruedap)
