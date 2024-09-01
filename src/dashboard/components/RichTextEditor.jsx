import React, { useState } from 'react'
import { BtnBold, BtnItalic, Toolbar,Editor,EditorProvider,
  BtnBulletList,
  BtnClearFormatting,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  } from 'react-simple-wysiwyg'
function RichTextEditor({onRichTextEditorChange}) {
  const [value, setValue] = useState();
  return (
    <div>
  <EditorProvider>
  <Editor value={value} onChange={(e)=>{
    setValue(e.target.value)
    onRichTextEditorChange(e)
  }}>    
    <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <BtnLink />
          <Separator />
        </Toolbar>
    </Editor>
    </EditorProvider>
  </div>
  )
}

export default RichTextEditor
