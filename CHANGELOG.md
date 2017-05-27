# CHANGELOG

## master (unreleased)
* Nothing

## 0.10.0
* Move root Sass file (from `./emma.scss` to `./sass/all.scss`)
* Remove default prefix `u-`
* Avoid hyphenation at unit value (e.g. `mt-0` -> `mt0`)
* Add snippets:
    * Viewport units (vw, vh, vmax, vmin)
    * flex-grow
    * flex-shrink
    * flex-basis
    * appearance
    * user-select
    * -webkit-touch-callout
    * -moz-osx-font-smoothing
    * `fsm-a` (mixin)
    * `d-ih` (`display: inherit`)
    * `pos-sk` (`position: sticky`)
    * `bdrs9999` (`border-radius: 9999px`)
* Improve snippets:
    * flex
    * width
    * max-width
    * `cf` (clearfix)
    * `ff-ja` (Japanese font-family)
* Rename snippets:
    * `d-f` -> `d-fx` (`display: flex`)
    * `d-if` -> `d-ifx` (`display: inline-flex`)
    * `wfsm` -> `wkfsm` (`-webkit-font-smoothing`)
    * `bgsz` -> `bgz` (`background-size`)
    * `rsz` -> `rz` (`resize`)
* Remove snippets:
    * `d-rb` (`display: ruby`)
    * `d-rbb` (`display: ruby-base`)
    * `d-rbbg` (`display: ruby-base-group`)
    * `d-rbt` (`display: ruby-text`)
    * `d-rbtg` (`display: ruby-text-group`)
    * `d-ri` (`display: run-in`)
    * `d-cp` (`display: compact`)
    * `d-tbcp` (`display: table-caption`)
    * `d-tbco` (`display: table-column`)
    * `d-tbcog` (`display: table-column-group`)
    * `fw-l` (`font-weight: light`)
* [Bower is deprecated](https://github.com/bower/bower/pull/2458)

## 0.9.0
* Restructure based on YAML documents

## 0.8.0
* Add snippet: `fz-0` (`font-size: 0`)
* Add snippet: horizontal and vertical padding
* Add snippet: horizontal and vertical margin

## 0.7.0
* Add snippet: `ff-j` (`font-family for Japanese`)
* Add snippet: `z-9999` (`z-index: 9999`)
* Change from ruby-sass to node-sass
* Introduce npm run commands to build sass

## 0.6.0
* Change `$emma-alternative-colors` default value from false to true
* Add Makefile

## 0.5.0
* Add max-width sizes
* Add border-radius sizes
* Add 5 colors
* Change margin/padding variables
* Change line-height variables
* Change font-size variables

## 0.4.0
* Rename snippet name: `lire` -> `reli`
* Improve snippet: `tehi`
* Improve snippet: `abce`

## 0.3.0
* Add snippet: `tehi` (Text hiding)

## 0.2.0
* Rename `opacity` snippet names (e.g. `op-01` -> `op-0_1`)
* Rename multiple declaration snippet names
    * `tet` -> `tetr`
    * `lir` -> `lire`
    * `abc` -> `abce`
* Add snippet: `m-a` (`margin: auto`)
* Add snippet: `m-0_a` (`margin: 0 auto`)

## 0.1.0
* Initial public release
