interface EditorListItemProps {
  text: string
}

export const EditorListItem = (props: EditorListItemProps): JSX.Element => {
  return <>{props.text}</>
}
