import React from "react"
import Markdown from "react-markdown"
import CodeBlock from "./CodeBlock"

export default function MarkDown(props) {
  return (
    <>
      {
        <Markdown
          source={props.data.replaceAll(/\\n/g, "\n")}
          renderers={{ code: CodeBlock }}
          escapeHtml={true}
        />
      }
    </>
  )
}
