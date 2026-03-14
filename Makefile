# fern - Build System
# Requires: esbuild

.PHONY: dist css js clean size

CSS_FILES = src/css/00-base.css \
            src/css/01-tokens.css \
            src/css/animations.css \
            src/css/button.css \
            src/css/form.css \
            src/css/table.css \
            src/css/progress.css \
            src/css/spinner.css \
            src/css/grid.css \
            src/css/card.css \
            src/css/alert.css \
            src/css/badge.css \
            src/css/chip.css \
            src/css/accordion.css \
            src/css/tabs.css \
            src/css/dialog.css \
            src/css/dropdown.css \
            src/css/toast.css \
            src/css/sidebar.css \
            src/css/search.css \
            src/css/metric.css \
            src/css/status.css \
            src/css/tag.css \
            src/css/timeline.css \
            src/css/action-card.css \
            src/css/avatar.css \
            src/css/skeleton.css \
            src/css/tooltip.css \
            src/css/utilities.css

dist: css js size

css:
	@mkdir -p dist
	@cat $(CSS_FILES) > dist/fern.css
	@npx esbuild dist/fern.css --minify --outfile=dist/fern.min.css
	@gzip -9 -k -f dist/fern.min.css
	@echo "CSS: $$(wc -c < dist/fern.min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p dist
	@npx esbuild src/js/index.js --bundle --format=iife --outfile=dist/fern.js
	@npx esbuild src/js/index.js --bundle --format=iife --minify --outfile=dist/fern.min.js
	@gzip -9 -k -f dist/fern.min.js
	@echo "JS: $$(wc -c < dist/fern.min.js | tr -d ' ') bytes (minified)"

clean:
	@rm -rf dist

size:
	@echo ""
	@echo "Bundle:"
	@echo "CSS (src):   $$(wc -c < dist/fern.css | tr -d ' ') bytes"
	@echo "CSS (min):   $$(wc -c < dist/fern.min.css | tr -d ' ') bytes"
	@echo "CSS (gzip):  $$(wc -c < dist/fern.min.css.gz | tr -d ' ') bytes"
	@echo ""
	@echo "JS (src):    $$(wc -c < dist/fern.js | tr -d ' ') bytes"
	@echo "JS (min):    $$(wc -c < dist/fern.min.js | tr -d ' ') bytes"
	@echo "JS (gzip):   $$(wc -c < dist/fern.min.js.gz | tr -d ' ') bytes"
