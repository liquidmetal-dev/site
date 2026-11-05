#!/bin/bash

TEMPDIR=$(mktemp -d)
CTY_VERSION="v0.0.11"

cleanup() {
	popd &> /dev/null || exit 1
	rm -rf "$TEMPDIR"
}

crd_url() {
	local object="$1"

	echo "https://raw.githubusercontent.com/liquidmetal-dev/cluster-api-provider-microvm/main/config/crd/bases/infrastructure.cluster.x-k8s.io_$object.yaml"
}

download_cty() {
	curl -sL "https://github.com/Skarlso/crd-to-sample-yaml/releases/download/$CTY_VERSION/cty_linux_amd64.tar.gz" \
		| tar xz
}

generate_yaml() {
	local object="$1"

	./cty generate --stdout --url "$(crd_url "$object")"
}

add_yaml_to_page() {
	local input="$1"
	local count="$2"
	local object="$3"

	echo "$input" | awk -v n="$count" \
		-v patt='```yaml' \
		-v content="$(generate_yaml "$object")" \
		'{print} $0 ~ patt && ++count == n {print content}'
}

edit_maps() {
	local key="$1"
	local file="$2"

	sed -i "s|\($key:\)\(.*\)|\1 {string: \"string\"}|" "$file"
}

trap cleanup EXIT

START=$(pwd)

pushd "$TEMPDIR" || exit 1

download_cty

# add generated yamls to the site doc
one=$(add_yaml_to_page "$(cat "$START/docs/component-info/capmvm.md")" 1 "microvmclusters")
two=$(add_yaml_to_page "$one" 2 "microvmmachines")
add_yaml_to_page "$two" 3 "microvmmachinetemplates" > three.yaml
mv three.yaml "$START/docs/component-info/capmvm.md"

## update to make map[string]string clearer
# this is just a hacky stop-gap until the feature is better in cty
edit_maps kernelCmdline "$START/docs/component-info/capmvm.md"
edit_maps annotations "$START/docs/component-info/capmvm.md"
edit_maps labels "$START/docs/component-info/capmvm.md"
edit_maps attributes "$START/docs/component-info/capmvm.md"
