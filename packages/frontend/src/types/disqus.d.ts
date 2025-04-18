declare global {
  interface Window {
    DISQUS: {
      reset: (options: {
        reload: boolean;
        config: () => void;
      }) => void;
    };
  }
} 