interface SlottedComponentProps {
  children: React.ReactElement[] | React.ReactElement
  slot: string
}

export const SlottedComponent = (props: SlottedComponentProps): JSX.Element => {
  const checkSlot = (slot: string, element: React.ReactElement): boolean => {
    return element.props.slot && element.props.slot === slot
  }

  const getSlot = (): JSX.Element => {
    if (Array.isArray(props.children)) {
      for (let i = 0; i < props.children.length; i++) {
        if (checkSlot(props.slot, props.children[i])) {
          return props.children[i]
        }
      }
    } else {
      if (checkSlot(props.slot, props.children)) {
        return props.children
      }
    }
    return <></>
  }

  return <>{getSlot()}</>
}
