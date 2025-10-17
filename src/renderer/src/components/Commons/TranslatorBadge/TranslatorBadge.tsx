import { Pane, Text } from 'evergreen-ui'

interface TranslatorBadgeProps {
  initials: string
  color: string
  size?: number
  onClick?: () => void
}

export const TranslatorBadge = (props: TranslatorBadgeProps): JSX.Element => {
  const size = props.size || 32
  const fontSize = Math.floor(size * 0.375) // 37.5% del tamaño
  const borderRadius = Math.floor(size * 0.1875) // 18.75% del tamaño

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      borderRadius={borderRadius}
      backgroundColor={props.color}
      boxShadow="0 0 0 1px white"
      flexShrink={0}
      userSelect="none"
      cursor={props.onClick ? 'pointer' : 'default'}
      onClick={props.onClick}
    >
      <Text color="white" fontSize={fontSize} fontWeight={600} userSelect="none">
        {props.initials}
      </Text>
    </Pane>
  )
}
