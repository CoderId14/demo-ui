function TestComponent({ content }: any) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default TestComponent
