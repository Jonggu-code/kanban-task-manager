const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const HighlightedText = ({
  text,
  query = '',
  className = '',
  markClassName = 'rounded bg-yellow-200/80 px-0 dark:bg-yellow-300/20 dark:text-yellow-100',
}) => {
  if (!text) return null

  const normalizedQuery = query.trim()
  if (!normalizedQuery) {
    return <span className={className}>{text}</span>
  }

  const safeQuery = escapeRegExp(normalizedQuery)
  const regex = new RegExp(safeQuery, 'gi')
  const matches = text.match(regex)

  if (!matches) {
    return <span className={className}>{text}</span>
  }

  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span key={`${index}-part`} className="contents">
          {part}
          {matches[index] ? (
            <mark className={markClassName}>{matches[index]}</mark>
          ) : null}
        </span>
      ))}
    </span>
  )
}
