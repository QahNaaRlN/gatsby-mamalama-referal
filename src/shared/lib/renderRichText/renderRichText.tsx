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

export interface CustomNode {
  type: 'custom';
  content: JSX.Element;
  key: string;
}

export type RichTextNode = TextNode | ParagraphNode | LinkNode | CustomNode;

interface VariableConfig {
  value: string;
  render?: (value: string) => JSX.Element;
}

type Variables = {
  [key: string]: string | VariableConfig;
}

/**
 * Проверяет, является ли значение конфигурацией переменной
 */
const isVariableConfig = (value: string | VariableConfig): value is VariableConfig => {
  return typeof value === 'object' && 'value' in value;
};

/**
 * Заменяет переменные в тексте с поддержкой форматирования
 */
const replaceVariablesWithFormatting = (text: string, variables: Variables): (string | JSX.Element)[] => {
  const parts: (string | JSX.Element)[] = [];
  let currentIndex = 0;

  // Ищем все переменные в тексте с двойными скобками {{ variable }}
  Object.entries(variables).forEach(([key, config]) => {
    const placeholder = `{{ ${key} }}`;
    const index = text.indexOf(placeholder, currentIndex);

    if (index !== -1) {
      // Добавляем текст до переменной
      if (index > currentIndex) {
        parts.push(text.substring(currentIndex, index));
      }

      // Добавляем переменную с форматированием или без
      if (isVariableConfig(config) && config.render) {
        parts.push(config.render(config.value));
      } else {
        const value = isVariableConfig(config) ? config.value : config;
        parts.push(value);
      }

      currentIndex = index + placeholder.length;
    }
  });

  // Добавляем оставшийся текст
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts;
};

/**
 * Обрабатывает узел Rich Text
 */
const processNode = (node: RichTextNode, variables: Variables): RichTextNode | RichTextNode[] => {
  switch (node.type) {
    case 'text': {
      const parts = replaceVariablesWithFormatting(node.text, variables);

      // Если нет форматированных частей, возвращаем обычный текстовый узел
      if (parts.length === 1 && typeof parts[0] === 'string') {
        return { ...node, text: parts[0] };
      }

      // Создаем массив узлов для каждой части
      return parts.map((part, index) => {
        if (typeof part === 'string') {
          return { type: 'text', text: part } as TextNode;
        }
        // Для JSX элементов создаем специальный узел
        return {
          type: 'custom',
          content: part,
          key: `formatted-${index}`
        } as CustomNode;
      });
    }
    case 'paragraph':
    case 'link':
      return {
        ...node,
        children: node.children.flatMap(child =>
          isRichTextNode(child) ? processNode(child, variables) : [child]
        )
      };
    default:
      return node;
  }
};

/**
 * Проверяет, является ли узел узлом Rich Text
 */
function isRichTextNode(node: any): node is RichTextNode {
  return (
    node &&
    (node.type === 'text' || node.type === 'paragraph' || node.type === 'link' || node.type === 'custom') &&
    (node.type === 'custom' ? 'content' in node :
      node.type !== 'paragraph' && node.type !== 'link' ? true :
        Array.isArray(node.children))
  );
}

/**
 * Рендерит отдельный узел Rich Text
 */
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
      case 'custom':
        return React.cloneElement((node as any).content, { key: index });
      default:
        return <React.Fragment key={index} />;
    }
  }

  return <React.Fragment key={index} />;
};

/**
 * Рендерит Rich Text с поддержкой переменных и форматирования
 * @param content Контент Rich Text
 * @param variables Объект с переменными для замены и их форматированием
 */
export const renderRichText = (
  content: RichTextNode | RichTextNode[] | unknown,
  variables: Variables = {}
): JSX.Element[] => {
  if (!content) return [];

  if (Array.isArray(content)) {
    return content.map((item, index) =>
      renderRichTextNode(
        isRichTextNode(item) ? processNode(item, variables) : item,
        index
      )
    );
  }

  return [renderRichTextNode(
    isRichTextNode(content) ? processNode(content, variables) : content,
    0
  )];
};