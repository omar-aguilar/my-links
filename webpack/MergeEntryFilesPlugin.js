/**
 * This plugin kind of patches webpack entries, merging all the dependant code within a single file
 * despite optimization.splitChunks.chunks: 'all' option.
 *
 * This may be useful when you want to have a single file a specific entry, but still want to use
 * code splitting for the rest of the code. For example a web extension where the background file
 * needs to have all the code accessible either on a single file, probably not the best solution.
 *
 * @author Omar Aguilar
 */

class MergeEntryFilesPlugin {
  static PluginName = 'MergeEntryFilesPlugin';

  #options = {
    entries: [],
  };

  constructor(options) {
    const hasStringEntries = options?.entries?.every((entry) => typeof entry === 'string') ?? false;
    if (hasStringEntries) {
      this.#options.entries = options.entries;
    }
  }

  apply(compiler) {
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { ConcatSource } = webpack.sources;

    const updateAssetEntry = (entry, assets, compilation) => {
      const entryFound = compilation.entrypoints.has(entry);
      if (!entryFound) {
        return;
      }
      const files = compilation.entrypoints.get(entry).getFiles();
      const entryName = files.slice(-1)[0];
      const newBackground = new ConcatSource();
      files.forEach((file) => {
        newBackground.add(assets[file]);
        newBackground.add('\n');
      });
      compilation.updateAsset(entryName, newBackground);
    };

    compiler.hooks.thisCompilation.tap(this.constructor.PluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: this.constructor.PluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        (assets, callback) => {
          this.#options.entries.forEach((entry) => {
            updateAssetEntry(entry, assets, compilation);
          });
          callback();
        }
      );
    });
  }
}

module.exports = MergeEntryFilesPlugin;
