const { FeatureFlag } = require('../../models');

async function seedFeatureFlags() {
  const featureFlags = [
    {
      name: 'example-feature',
      enabled: true,
      type: 'flag',
      description: 'An example feature flag.',
    },
    {
      name: 'example-ab',
      enabled: true,
      type: 'ab',
      description: 'An example AB test.',
    },
  ];

  for (const flag of featureFlags) {
    await FeatureFlag.findOrCreate({
      where: { name: flag.name },
      defaults: flag,
    });
  }

  console.log('Feature flags seeded!');
}

module.exports = seedFeatureFlags;
