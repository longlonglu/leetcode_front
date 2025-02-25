import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value } = this.props
    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        language={language}
        linenumberstyle={{ color: "#ddd", fontSize: 20 }}
      >
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock
