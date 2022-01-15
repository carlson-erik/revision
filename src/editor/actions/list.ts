import { Transforms } from "slate";
import { getElementPath, getElementNode, getParentElementNode } from "./element";
import { CustomEditor } from "../types";

const indentListItem = (editor: CustomEditor) => { 
  const currentPath = getElementPath(editor);
  const currentNode = getElementNode(editor);
  const parentNode = getParentElementNode(editor);
  console.log('-------- indentListItem --------', 
              '\nparentNode:', parentNode, 
              '\ncurrentNode:', currentNode, 
              '\ncurrentPath:', currentPath,
              '\n-------- indentListItem --------',);
  
};

const canUnindentListItem = (editor: CustomEditor) => {
  const currentPath = getElementPath(editor);
  return currentPath && currentPath.length > 2;
}

const unindentListItem = (editor: CustomEditor) => {
  const currentPath = getElementPath(editor);
  const currentNode = getElementNode(editor);
  

  if(currentNode && currentPath && currentPath.length > 2) {
    // For the Parent node, get the Path and Node
    const parentNode = getParentElementNode(editor);
    const parentPath = [...currentPath].slice(0, currentPath.length - 1);

    // If we're the only list-item in this list, remove the old list.
    if(parentNode?.children.length === 1) {
      currentPath.pop();
    }

    /*
     * TODO: I need to handle the case where a list item is the last 
    */

    // Remove old node at currentPath
    Transforms.removeNodes(editor, { at: currentPath });

    // Insert into new location
    Transforms.insertNodes(editor, currentNode, { at: parentPath });

    // Move selection to the newly inserted node 
    editor.selection = {
      anchor: {
        path: parentPath,
        offset: 0
      },
      focus: {
        path: parentPath,
        offset: 0
      }
    };
  }
};

export {
  indentListItem,
  canUnindentListItem,
  unindentListItem
}