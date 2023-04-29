import { useEffect, useState } from 'react';

const useDocumentTitle = (title?: string) => {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    const section = documentTitle ? ` - ${documentTitle}` : '';
    document.title = `My Links${section}`;
  }, [documentTitle]);
  return [title, setDocumentTitle];
};

export default useDocumentTitle;
