import Paragraph from 'antd/es/typography/Paragraph'
const htmlContent = '<p>Hello, <b>world!</b></p>'
function TestComponent({ content }: any) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default TestComponent
