.PHONY: build
build:
	hugo --gc --minify --panicOnWarning

.PHONY: serve
serve:
	hugo server --bind 0.0.0.0

.PHONY: generate
generate:
	./hack/capmvm.sh
