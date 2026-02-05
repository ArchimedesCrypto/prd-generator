import { useEffect } from 'react';

interface HighlightCodeProps {
  children: React.ReactNode;
}

export default function HighlightCode({ children }: HighlightCodeProps) {
  useEffect(() => {
    // You can integrate Prism.js or highlight.js here if needed
    // For now, we'll just render the code as-is
  }, []);

  return <>{children}</>;
}
