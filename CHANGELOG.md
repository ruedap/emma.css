See: https://github.com/ruedap/emma.css/releases

<a name="0.15.0"></a>
# [0.15.0](https://github.com/ruedap/emma.css/compare/v0.14.0...v0.15.0) (2018-05-28)


### Features

* Add snippets `fx0`, `fx1`, `fx2`, `fx3` ([2c7c200](https://github.com/ruedap/emma.css/commit/2c7c200))
* Declare variables of font-family ([6e97b9f](https://github.com/ruedap/emma.css/commit/6e97b9f))
* Declare variables of font-weight ([370db6e](https://github.com/ruedap/emma.css/commit/370db6e))
* Remove snippets `ff-a`, `ff-t`, `ff-v`, `ff-l`, `ff-ja` ([f3a0cdc](https://github.com/ruedap/emma.css/commit/f3a0cdc))


### BREAKING CHANGES

* Several snippets of the font-family have been deleted.



<a name="0.14.0"></a>
# [0.14.0](https://github.com/ruedap/emma.css/compare/v0.13.0...v0.14.0) (2018-04-19)


### Bug Fixes

* Remove snippet `abce` ([c98c7c0](https://github.com/ruedap/emma.css/commit/c98c7c0))


### Features

* Add snippet `cxcy` ([02f3b89](https://github.com/ruedap/emma.css/commit/02f3b89))
* Add snippet `fw-l` (font-weight: 300) ([f58fb4c](https://github.com/ruedap/emma.css/commit/f58fb4c))
* Add snippet `fx-a` ([9b5e1f0](https://github.com/ruedap/emma.css/commit/9b5e1f0))
* Add snippets `deol`, `deul` ([dedc8e3](https://github.com/ruedap/emma.css/commit/dedc8e3))
* Add snippets `trsdl`, `trstf`, `trsdr` , `trsp` ([29f77e2](https://github.com/ruedap/emma.css/commit/29f77e2))
* Improve font-weight values (normal -> 400, bold -> 700) ([92122e5](https://github.com/ruedap/emma.css/commit/92122e5))
* Improve snippet `reli` ([2867cc2](https://github.com/ruedap/emma.css/commit/2867cc2))


### BREAKING CHANGES

* The snippet `abce` has been removed.



<a name="0.13.0"></a>
# [0.13.0](https://github.com/ruedap/emma.css/compare/v0.12.0...v0.13.0) (2018-03-28)


### Features

* Improve snippet: letter-spacing ([9f30b4c](https://github.com/ruedap/emma.css/commit/9f30b4c))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/ruedap/emma.css/compare/0.11.0...v0.12.0) (2018-03-27)


### Code Refactoring

* Change SCSS files' directory name ([5091e6c](https://github.com/ruedap/emma.css/commit/5091e6c))


### Features

* Improve snippet: border-radius ([65f2506](https://github.com/ruedap/emma.css/commit/65f2506))
* Improve snippet: tetr ([91849f2](https://github.com/ruedap/emma.css/commit/91849f2))


### BREAKING CHANGES

* The directory name of the SCSS files has changed from `sass/` to `scss/`.



<a name="0.11.0"></a>
# [0.11.0](https://github.com/ruedap/emma.css/compare/0.10.0...0.11.0) (2017-07-30)
* Add snippets:
    * `trf-n` (`transform: none`)
    * `t100p` (`top: 100%`)
    * `r100p` (`right: 100%`)
    * `b100p` (`bottom: 100%`)
    * `l100p` (`left: 100%`)
    * `fx0-0-100p` (`flex: 0 0 100%`)
    * -webkit-overflow-scrolling
* Rename snippets:
    * `wkfsm-a` -> `wkfsm-aa` (`-webkit-font-smoothing: antialiased`)
    * `wkfsm-sa` -> `wkfsm-saa` (`-webkit-font-smoothing: subpixel-antialiased`)
* Change black color from #111111 to #000000
* Change group of backface-visibility
* Add package-lock.json and remove yarn
* Introduce Prettier (#12)


<a name="0.10.0"></a>
# [0.10.0](https://github.com/ruedap/emma.css/compare/0.9.0...0.10.0) (2017-05-27)
* Move root Sass file (from `./emma.scss` to `./sass/all.scss`)
* Remove default prefix `u-`
* Avoid hyphenation at numeric values (e.g. `mt-0` -> `mt0`)
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



<a name="0.9.0"></a>
# [0.9.0](https://github.com/ruedap/emma.css/compare/0.8.0...0.9.0) (2017-05-21)
* Restructure based on YAML documents



<a name="0.8.0"></a>
# [0.8.0](https://github.com/ruedap/emma.css/compare/0.7.0...0.8.0) (2017-04-10)
* Add snippet: `fz-0` (`font-size: 0`)
* Add snippet: horizontal and vertical padding
* Add snippet: horizontal and vertical margin



<a name="0.7.0"></a>
# [0.7.0](https://github.com/ruedap/emma.css/compare/0.6.0...0.7.0) (2016-08-08)
* Add snippet: `ff-j` (`font-family for Japanese`)
* Add snippet: `z-9999` (`z-index: 9999`)
* Change from ruby-sass to node-sass
* Introduce npm run commands to build sass



<a name="0.6.0"></a>
# [0.6.0](https://github.com/ruedap/emma.css/compare/0.5.0...0.6.0) (2016-06-03)
* Change `$emma-alternative-colors` default value from false to true
* Add Makefile



<a name="0.5.0"></a>
# [0.5.0](https://github.com/ruedap/emma.css/compare/0.4.0...0.5.0) (2016-03-31)
* Add max-width sizes
* Add border-radius sizes
* Add 5 colors
* Change margin/padding variables
* Change line-height variables
* Change font-size variables



<a name="0.4.0"></a>
# [0.4.0](https://github.com/ruedap/emma.css/compare/0.3.0...0.4.0) (2015-04-25)
* Rename snippet name: `lire` -> `reli`
* Improve snippet: `tehi`
* Improve snippet: `abce`



<a name="0.3.0"></a>
# [0.3.0](https://github.com/ruedap/emma.css/compare/0.2.0...0.3.0) (2015-03-25)
* Add snippet: `tehi` (Text hiding)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/ruedap/emma.css/compare/0.1.0...0.2.0) (2015-03-20)
* Rename `opacity` snippet names (e.g. `op-01` -> `op-0_1`)
* Rename multiple declaration snippet names
    * `tet` -> `tetr`
    * `lir` -> `lire`
    * `abc` -> `abce`
* Add snippet: `m-a` (`margin: auto`)
* Add snippet: `m-0_a` (`margin: 0 auto`)



<a name="0.1.0"></a>
# 0.1.0 (2015-03-20)
* Initial public release
