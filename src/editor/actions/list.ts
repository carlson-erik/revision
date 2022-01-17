import { Transforms, Path } from "slate";
import { getElementPath, getElementNode, getParentElementNode } from "./element";
import { CustomEditor, CustomElement, ListElement, ListElementType } from "../types";

const isListElement = (element: CustomElement | null): element is ListElement => {
  return element && (element.type === 'unordered-list' || element.type === 'ordered-list') ? true : false;
}

const focusPath = (editor: CustomEditor, focusPath: Path): void => {
  editor.selection = {
    anchor: {
      path: focusPath,
      offset: 0
    },
    focus: {
      path: focusPath,
      offset: 0
    }
  };
};

const indentListItem = (editor: CustomEditor) => { 
  const currentPath = getElementPath(editor);
  const currentNode = getElementNode(editor);
  const parentNode = getParentElementNode(editor);
  if (currentNode && currentNode.type === 'list-item' && currentPath && parentNode && isListElement(parentNode)) {
    // can't indent if there is only one item in the list
    if (parentNode.children.length === 1) return;
  
    // Get the current node's index (for parentNode's children)
    const currentNodeIndex = currentPath[currentPath.length - 1];

    if (parentNode.children.length >= 3 && (currentNodeIndex > 0 && currentNodeIndex < parentNode.children.length - 1)) {
      // Create Path to the node before the current node
      const prevNodePath: Path = [...currentPath];
      prevNodePath[prevNodePath.length - 1] -= 1;

      // Create Path to the node after the current node
      const nextNodePath: Path = [...currentPath];
      nextNodePath[nextNodePath.length - 1] += 1;

      // Get previous and next nodes using new Paths
      const nextNodeItem = getElementNode(editor, nextNodePath);
      const prevNodeItem = getElementNode(editor, prevNodePath);

      if (isListElement(nextNodeItem) && isListElement(prevNodeItem)) {
        // Construct node merging previous, current and next nodes
        const mergedNode: ListElement = {
          type: prevNodeItem.type,
          children: [
            ...prevNodeItem.children,
            currentNode,
            ...nextNodeItem.children
          ]
        };
        // Remove old nodes
        Transforms.removeNodes(editor, { at: prevNodePath });
        Transforms.removeNodes(editor, { at: prevNodePath });
        Transforms.removeNodes(editor, { at: prevNodePath });
        // Insert new node
        Transforms.insertNodes(editor, mergedNode, { at: prevNodePath });
        // Focus correct location in new merged node
        focusPath(editor, [...prevNodePath, prevNodeItem.children.length]);
      } else if (isListElement(nextNodeItem)) {
        const mergedNode: ListElement = {
          type: nextNodeItem.type,
          children: [
            currentNode,
            ...nextNodeItem.children
          ]
        };
        // Remove old nodes
        Transforms.removeNodes(editor, { at: currentPath });
        Transforms.removeNodes(editor, { at: currentPath });
        // Insert new node
        Transforms.insertNodes(editor, mergedNode, { at: currentPath });
        // Focus correct location in new merged node
        focusPath(editor, [...currentPath, 0]);
      } else if (isListElement(prevNodeItem)) {
        const mergedNode: ListElement = {
          type: prevNodeItem.type,
          children: [
            ...prevNodeItem.children,
            currentNode,
          ]
        };
        // Remove old nodes
        Transforms.removeNodes(editor, { at: prevNodePath });
        Transforms.removeNodes(editor, { at: prevNodePath });
        // Insert new node
        Transforms.insertNodes(editor, mergedNode, { at: prevNodePath });
        // Focus correct location in new merged node
        focusPath(editor, [...prevNodePath, prevNodeItem.children.length]);
      } else {
        const wrappingNode: ListElement = {
          type: parentNode.type,
          children: [
            currentNode
          ]
        };
        Transforms.removeNodes(editor, { at: currentPath });
        Transforms.insertNodes(editor, wrappingNode, { at: currentPath });
        focusPath(editor, currentPath);
      }
    } else if (currentNodeIndex === 0) {
      // Create Path to the node after the current node
      const nextNodePath: Path = [...currentPath];
      nextNodePath[nextNodePath.length - 1] += 1;
      // Get next node using new Path
      const nextNodeItem = getElementNode(editor, nextNodePath);

      if (isListElement(nextNodeItem)) {
        const mergedNode: ListElement = {
          type: nextNodeItem.type,
          children: [
            currentNode,
            ...nextNodeItem.children
          ]
        };
        // Remove old nodes
        Transforms.removeNodes(editor, { at: currentPath });
        Transforms.removeNodes(editor, { at: currentPath });
        // Insert new node
        Transforms.insertNodes(editor, mergedNode, { at: currentPath });
        // Focus correct location in new merged node
        focusPath(editor, [...currentPath, 0]);
      } else {
        const wrappingNode: ListElement = {
          type: parentNode.type,
          children: [
            currentNode
          ]
        };
        Transforms.removeNodes(editor, { at: currentPath });
        Transforms.insertNodes(editor, wrappingNode, { at: currentPath });
        focusPath(editor, currentPath);
      }
    } else if (currentNodeIndex === parentNode.children.length - 1) {
      // Create Path to the node before the current node
      const prevNodePath: Path = [...currentPath];
      prevNodePath[prevNodePath.length - 1] -= 1;
      // Get previous node using new Paths
      const prevNodeItem = getElementNode(editor, prevNodePath);

      if (isListElement(prevNodeItem)) {
        const mergedNode: ListElement = {
          type: prevNodeItem.type,
          children: [
            ...prevNodeItem.children,
            currentNode,
          ]
        };
        // Remove old nodes
        Transforms.removeNodes(editor, { at: prevNodePath });
        Transforms.removeNodes(editor, { at: prevNodePath });
        // Insert new node
        Transforms.insertNodes(editor, mergedNode, { at: prevNodePath });
        // Focus correct location in new merged node
        focusPath(editor, [...prevNodePath, prevNodeItem.children.length]);
      } else {
        const wrappingNode: ListElement = {
          type: parentNode.type,
          children: [
            currentNode
          ]
        };
        Transforms.removeNodes(editor, { at: currentPath });
        Transforms.insertNodes(editor, wrappingNode, { at: currentPath });
        focusPath(editor, currentPath);
      }
    }
  }
}; 

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
    focusPath(editor, parentPath);
  }
};

const canUnindentListItem = (editor: CustomEditor): boolean => {
  const currentPath = getElementPath(editor);
  return currentPath && currentPath.length > 2 ? true : false;
}

const canIndentListItem = (editor: CustomEditor): boolean => {
  const currentNode = getElementNode(editor);
  const parentNode = getParentElementNode(editor);
  if (currentNode && currentNode.type === 'list-item' && parentNode) {
    if (parentNode.children.length > 1) return true;
  }
  return false;
}

export {
  indentListItem,
  canUnindentListItem,
  canIndentListItem,
  unindentListItem
}