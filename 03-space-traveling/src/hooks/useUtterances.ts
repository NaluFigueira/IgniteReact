import { useEffect } from 'react';

export const useUtterances = (commentNodeId: string): void => {
  useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return undefined;
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'NaluFigueira/IgniteReact');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment :speech_balloon:');
    script.setAttribute('theme', 'photon-dark');
    script.setAttribute('crossorigin', 'anonymous');

    scriptParentNode.appendChild(script);

    return () => {
      scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [commentNodeId]);
};
