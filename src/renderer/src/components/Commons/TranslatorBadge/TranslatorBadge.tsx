import { Pane, Text } from 'evergreen-ui'

interface TranslatorBadgeProps {
  initials: string
  color: string
  size?: number
  onClick?: () => void
  showBorder?: boolean
}

export const TranslatorBadge = (props: TranslatorBadgeProps): JSX.Element => {
  const size = props.size || 32
  const fontSize = Math.floor(size * 0.375) // 37.5% del tamaño
  const borderRadius = Math.floor(size * 0.1875) // 18.75% del tamaño
  const showBorder = props.showBorder !== false // Por defecto true

  const handleClick = props.onClick
    ? (e: React.MouseEvent): void => {
        e.stopPropagation()
        props.onClick!()
      }
    : undefined

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      borderRadius={borderRadius}
      backgroundColor={props.color}
      boxShadow={showBorder ? '0 0 0 1px white' : 'none'}
      flexShrink={0}
      userSelect="none"
      cursor="pointer"
      onClick={handleClick}
    >
      <Text color="white" fontSize={fontSize} fontWeight={600} userSelect="none">
        {props.initials}
      </Text>
    </Pane>
  )
}
