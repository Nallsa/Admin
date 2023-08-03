import { useState, useEffect } from 'react';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './Editor.css';

interface IProps {
  state: any;
  setState: Function;
}

const Editor: React.FC<IProps> = ({ state, setState }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const convertState = () => {
    /** Convert html string to draft JS */
    if (state) {
      const contentBlock = htmlToDraft(state);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const newEditorState = EditorState.createWithContent(contentState);

      setEditorState(newEditorState);
    }
  };

  useEffect(() => {
    convertState();
  }, [state]);

  return (
    <div>
      <DraftEditor
        editorState={editorState}
        onEditorStateChange={newState => {
          setEditorState(newState);
          setState(draftToHtml(convertToRaw(newState.getCurrentContent())));
        }}
        wrapperClassName='wrapper_class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'history'],
        }}
      />
    </div>
  );
};

export default Editor;
