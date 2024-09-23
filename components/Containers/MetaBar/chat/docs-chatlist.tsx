import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ChatContext } from './docs-chat';

export function ChatList() {
  const { messages, setQuestion, submitQuestion } = useContext(ChatContext);
  const [, setAutoScroll] = useState(true);
  const scrollEl = useMemo(() => {
    return document.querySelector(
      '.chat-scroll [data-radix-scroll-area-viewport]'
    );
  }, []);
  const scrollingToBottom = useCallback(() => {
    if (!scrollEl) return false;
    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    return scrollHeight - scrollTop === clientHeight;
  }, [scrollEl]);

  const debounced = useDebouncedCallback<(el: Element) => void>(
    () => () => {
      setAutoScroll(scrollingToBottom());
    },
    50
  );
  useEffect(() => {
    const handler = () => {
      if (scrollingToBottom()) {
        setAutoScroll(true);
      } else {
        debounced(scrollEl!);
      }
    };
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handler);
    }
    return () => scrollEl?.removeEventListener('scroll', handler);
  }, [debounced, scrollEl, scrollingToBottom]);

  const examples = useMemo(
    () => [
      {
        title: 'Can I see an example of a feature implementation?',
      },
      {
        title: 'How I can add pagination to an action?',
      },
      {
        title: 'What actions does the PostgreSQL extension have?',
      },
      {
        title:
          'How do tags function within workflows, and how do they affect API documentation?',
      },
    ],
    []
  );
  useEffect(() => {
    setTimeout(() => {
      const chat = document.querySelector('#chat-content');
      if (chat) {
        chat.scrollIntoView({
          behavior: 'instant',
          block: 'end',
          inline: 'end',
        });
      }
    });
  }, []);
  useEffect(() => {
    const chat = document.querySelector('#chat-content');
    if (chat) {
      chat.scrollIntoView({ behavior: 'instant', block: 'end', inline: 'end' });
    }
  }, [messages]);
  return (
    <>
      {messages.length === 0 && (
        <div className="mb-4 grid grid-flow-row items-start gap-2 px-4 sm:grid-cols-2 sm:gap-4 sm:px-0">
          {examples.map(example => (
            <div
              onClick={() => {
                setQuestion(example.title);
                submitQuestion();
              }}
              key={example.title}
              className="bg-zinc-50 text-zinc-950 hover:bg-zinc-100 cursor-pointer rounded-2xl p-4 transition-colors sm:p-6"
            >
              <div>{example.title}</div>
            </div>
          ))}
        </div>
      )}
      <div id="chat-content">
        {messages.map(message => (
          <Fragment key={message.id}>{message.content}</Fragment>
        ))}
      </div>
    </>
  );
}
