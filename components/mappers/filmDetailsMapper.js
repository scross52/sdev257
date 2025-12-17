function formatLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export default function filmDetailsMapper(item) {
  const properties = item.result.properties;

  console.log(item)
  console.log(properties)

  const attributes = Object.entries(properties)
    .filter(([key]) =>  key !== 'title' )
    .map(([key, value]) => ({
      label: key,
      value,
    }))

  return {
    title: properties.title,
    attributes,
  }
}