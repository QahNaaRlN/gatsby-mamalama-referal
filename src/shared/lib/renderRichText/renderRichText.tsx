import React, { useMemo } from "react";

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

interface RichTextRendererProps {
  content: RichTextNode | RichTextNode[] | unknown;
  variables?: Variables;
}

const cache = {
  variables: new WeakMap<Variables, Map<string, (string | JSX.Element)[]>>(),
  nodes: new WeakMap<object, RichTextNode | RichTextNode[]>(),
  rendered: new Map<number, WeakMap<object, JSX.Element>>()
};

const isVariableConfig = (value: string | VariableConfig): value is VariableConfig => {
  return typeof value === 'object' && 'value' in value;
};

const memoizedReplaceVariables = (text: string, variables: Variables): (string | JSX.Element)[] => {
  let variableCache = cache.variables.get(variables);
  if (!variableCache) {
    variableCache = new Map();
    cache.variables.set(variables, variableCache);
  }

  const cacheKey = text;
  const cached = variableCache.get(cacheKey);
  if (cached) return cached;

  const parts: (string | JSX.Element)[] = [];
  let currentIndex = 0;

  Object.entries(variables).forEach(([key, config]) => {
    const placeholder = `{{ ${key} }}`;
    const index = text.indexOf(placeholder, currentIndex);

    if (index !== -1) {
      if (index > currentIndex) {
        parts.push(text.substring(currentIndex, index));
      }

      if (isVariableConfig(config) && config.render) {
        parts.push(config.render(config.value));
      } else {
        const value = isVariableConfig(config) ? config.value : config;
        parts.push(value);
      }

      currentIndex = index + placeholder.length;
    }
  });

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  variableCache.set(cacheKey, parts);
  return parts;
};

const memoizedProcessNode = (node: RichTextNode, variables: Variables): RichTextNode | RichTextNode[] => {
  if (!node || typeof node !== 'object') return node;

  const cached = cache.nodes.get(node);
  if (cached) return cached;

  let result: RichTextNode | RichTextNode[];

  switch (node.type) {
    case 'text': {
      const parts = memoizedReplaceVariables(node.text, variables);

      if (parts.length === 1 && typeof parts[0] === 'string') {
        result = { ...node, text: parts[0] };
      } else {
        result = parts.map((part, index) => {
          if (typeof part === 'string') {
            return { type: 'text', text: part } as TextNode;
          }
          return {
            type: 'custom',
            content: part,
            key: `formatted-${index}`
          } as CustomNode;
        });
      }
      break;
    }
    case 'paragraph':
    case 'link':
      result = {
        ...node,
        children: node.children.flatMap(child =>
          isRichTextNode(child) ? memoizedProcessNode(child, variables) : [child]
        )
      };
      break;
    default:
      result = node;
  }

  cache.nodes.set(node, result);
  return result;
};

function isRichTextNode(node: any): node is RichTextNode {
  return (
    node &&
    typeof node === 'object' &&
    'type' in node &&
    (node.type === 'text' || node.type === 'paragraph' || node.type === 'link' || node.type === 'custom') &&
    (node.type === 'custom' ? 'content' in node :
      node.type !== 'paragraph' && node.type !== 'link' ? true :
        Array.isArray(node.children))
  );
}

const memoizedRenderNode = (node: unknown, index: number): JSX.Element => {
  if (!node || typeof node !== 'object') {
    return <React.Fragment key={index} />;
  }

  // Получаем кэш для текущего индекса
  let indexCache = cache.rendered.get(index);
  if (!indexCache) {
    indexCache = new WeakMap();
    cache.rendered.set(index, indexCache);
  }

  // Проверяем кэш
  const cached = indexCache.get(node as object);
  if (cached) {
    return cached;
  }

  let result: JSX.Element;

  if (isRichTextNode(node)) {
    switch (node.type) {
      case 'paragraph':
        result = <p key={index}>{renderRichText(node.children)}</p>;
        break;
      case 'text':
        result = <span key={index}>{node.text}</span>;
        break;
      case 'link':
        result = (
          <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
            {renderRichText(node.children)}
          </a>
        );
        break;
      case 'custom':
        result = React.cloneElement(node.content, { key: index });
        break;
      default:
        result = <React.Fragment key={index} />;
    }
  } else {
    result = <React.Fragment key={index} />;
  }

  // Сохраняем в кэш
  indexCache.set(node as object, result);
  return result;
};

interface RichTextRendererProps {
  content: RichTextNode | RichTextNode[] | unknown;
  variables?: Variables;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, variables = {} }) => {
  const renderedContent = useMemo(() => {
    if (!content) return [];

    if (Array.isArray(content)) {
      return content.map((item, index) =>
        memoizedRenderNode(
          isRichTextNode(item) ? memoizedProcessNode(item, variables) : item,
          index
        )
      );
    }

    return [memoizedRenderNode(
      isRichTextNode(content) ? memoizedProcessNode(content, variables) : content,
      0
    )];
  }, [content, variables]);

  return <>{renderedContent}</>;
};

RichTextRenderer.displayName = 'RichTextRenderer';

export const renderRichText = (
  content: RichTextNode | RichTextNode[] | unknown,
  variables: Variables = {}
): JSX.Element[] => {
  return React.createElement(RichTextRenderer, {
    content,
    variables
  }) as unknown as JSX.Element[];
};

export const MemoizedRichTextRenderer = React.memo(RichTextRenderer);