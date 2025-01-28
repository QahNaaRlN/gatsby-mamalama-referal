import React from "react";

export interface TextNode {
  type: 'text';
  text: string;
}

export interface ParagraphNode {
  type: 'paragraph';
  children: RichTextNode[];
}

export interface LinkNode {
  type: 'link';
  url: string;
  children: RichTextNode[];
}

export type RichTextNode = TextNode | ParagraphNode | LinkNode;

/**
 * Рендерит массив узлов Rich Text в JSX-элементы.
 * @param content Массив узлов Rich Text.
 * @returns Массив JSX-элементов.
 */
export const renderRichText = (content: RichTextNode | RichTextNode[] | unknown): JSX.Element[] => {
  if (!content) return [];

  if (Array.isArray(content)) {
    return content.map((item, index) => renderRichTextNode(item, index));
  }

  // Если content — одиночный объект
  return [renderRichTextNode(content, 0)];
};

function isRichTextNode(node: any): node is RichTextNode {
  return (
    node &&
    (node.type === 'text' || node.type === 'paragraph' || node.type === 'link') &&
    (node.type !== 'paragraph' && node.type !== 'link' ? true : Array.isArray(node.children))
  );
}

const renderRichTextNode = (node: unknown, index: number): JSX.Element => {
  if (isRichTextNode(node)) {
    switch (node.type) {
      case 'paragraph':
        return <p key={index}>{renderRichText(node.children)}</p>;
      case 'text':
        return <span key={index}>{node.text}</span>;
      case 'link':
        return (
          <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
            {renderRichText(node.children)}
          </a>
        );
      default:
        return <React.Fragment key={index} />;
    }
  }

  // Если тип неизвестен, возвращаем null или пустой фрагмент
  return <React.Fragment key={index} />;
};