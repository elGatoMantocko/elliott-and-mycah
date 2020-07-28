load("@npm//rollup:index.bzl", "rollup")

def app_bundle(
    name,
    srcs,
    deps,
    rollup_config = "",
    config_deps = [],
    bundle_prefix = "app",
    sourcemaps = False,
    visibility = None
    ):
    """app_bundle runs rollup with outs

    Args:
        name: name of the build
        srcs: input files to bundle from
        deps: for the rollup build
        rollup_config: rollup config to use
        config_deps: dependencies used in the rollup config
        bundle_prefix: prefix to add to the begining of the bundle name
        sourcemaps: bool to add sourcemaps
        visibility: bool to change visibility of rule
    """

    input_files = []
    for src in srcs:
        input_files.append("$(locations " + src + ")")

    output_file = bundle_prefix + ".bundle.js"

    additional_args = []

    outs = [output_file]

    if sourcemaps:
        outs.append(output_file + ".map")
        additional_args.append("--sourcemap")
    
    config_args = []
    config_data = []
    if rollup_config != "":
        config_args.extend(["--config", "$(location " + rollup_config + ")"])
        config_data.append(rollup_config)

    rollup(
        name = name,
        outs = outs,
        args = config_args + [
            "--file",
            "$(location " + output_file + ")",
        ] + additional_args + ["--"] + input_files,
        data = srcs + deps + config_data + config_deps,
        visibility = visibility,
    )