const GLOBAL_EXCLUDED_KEYS = ['created', 'edited', 'url'];

function formatLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function mapAttributes(properties, excludedKeys = []) {
  const allExcluded = new Set([
    ...GLOBAL_EXCLUDED_KEYS,
    ...excludedKeys,
  ]);

  return Object.entries(properties)
    .filter(([key, value]) =>
      !allExcluded.has(key) &&
      !Array.isArray(value)
    )
    .map(([key, value]) => ({
      label: formatLabel(key),
      value: String(value),
    }));
}

function filmDetailsMapper(item) {
  const properties = item.result.properties;

  return {
    title: properties.title,
    attributes: mapAttributes(properties, ['title', 'planets', 'starships', 'vehicles', 'characters']),
    relations: {
      planets: properties.planets ?? [],
      starships: properties.starships ?? [],
      vehicles: properties.vehicles ?? [],
      characters: properties.characters ?? [],
    }
  };
}

function planetDetailsMapper(item) {
  const properties = item.result.properties;

  return {
    title: properties.title,
    attributes: mapAttributes(properties, ['title']),
    relations: {
      planets: properties.planets ?? [],
      starships: properties.starships ?? [],
      vehicles: properties.vehicles ?? [],
      characters: properties.characters ?? [],
    }
  };
}

export const EntityMappers = {
  film: filmDetailsMapper,
  planet: planetDetailsMapper,
};