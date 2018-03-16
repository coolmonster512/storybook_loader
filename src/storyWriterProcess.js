const logger = require('./logger');
const { loadStories } = require('./storyFinder');
const { writeFile } = require('./writer');

const sortFiles = files => files.concat().sort();

const writeOutStoryLoader = pathConfig => {
  logger.debug('writeOutStoryLoader', pathConfig);
  pathConfig.outputFiles.forEach(outputFileConfig => {
    logger.info('Output file:      ', outputFileConfig.outputFile);
    logger.info(
      'Patterns:         ',
      JSON.stringify(outputFileConfig.patterns)
    );

    const storyFiles = [];

    outputFileConfig.patterns.forEach(pattern => {
      const patternStories = loadStories(pattern);
      Array.prototype.push.apply(storyFiles, patternStories);
      logger.info(
        `Located ${patternStories.length} files matching pattern '${pattern}'`
      );
    });

    const sortedFiles = sortFiles(storyFiles);
    writeFile(sortedFiles, outputFileConfig.outputFile);
    logger.info(
      `Compiled story loader for ${storyFiles.length} files:\n`,
      ` ${storyFiles.join('\n  ')}`
    );
  });
};

module.exports = { writeOutStoryLoader };
